'use client'

import React from 'react'
import type { Server, ServerFolder } from '@/types'

interface TreeNode {
  id: string
  name: string
  type: 'folder' | 'server'
  level: number
  children?: TreeNode[]
  server?: Server
  folder?: ServerFolder
}

interface TreeNodeComponentProps {
  node: TreeNode
  expandedFolders: Set<string>
  onFolderToggle: (folderId: string) => void
  renderServer: (
    server: Server,
    level: number,
    isActive: boolean
  ) => React.ReactNode
  renderFolder: (
    folder: ServerFolder,
    level: number,
    isExpanded: boolean,
    hasChildren: boolean,
    onToggle: () => void
  ) => React.ReactNode
}

interface ServerTreeProps {
  folders: ServerFolder[]
  servers: Server[]
  expandedFolders: Set<string>
  onFolderToggle: (folderId: string) => void
  renderServer: (
    server: Server,
    level: number,
    isActive: boolean
  ) => React.ReactNode
  renderFolder: (
    folder: ServerFolder,
    level: number,
    isExpanded: boolean,
    hasChildren: boolean,
    onToggle: () => void
  ) => React.ReactNode
  emptyState?: React.ReactNode
}

const createFolderMap = (
  folders: ServerFolder[]
): Map<string, ServerFolder[]> => {
  const folderMap = new Map<string, ServerFolder[]>()

  for (const folder of folders) {
    const parentId = folder.parentId || 'root'
    const existing = folderMap.get(parentId) || []
    existing.push(folder)
    folderMap.set(parentId, existing)
  }

  return folderMap
}

const createServerMap = (servers: Server[]): Map<string, Server[]> => {
  const serverMap = new Map<string, Server[]>()

  for (const server of servers) {
    const parentId = server.folderId || 'root'
    const existing = serverMap.get(parentId) || []
    existing.push(server)
    serverMap.set(parentId, existing)
  }

  return serverMap
}

const buildTree = (folders: ServerFolder[], servers: Server[]): TreeNode[] => {
  const folderMap = createFolderMap(folders)
  const serverMap = createServerMap(servers)

  const buildNodes = (parentId: string, level: number): TreeNode[] => {
    const nodes: TreeNode[] = []
    const childFolders = folderMap.get(parentId) || []
    const childServers = serverMap.get(parentId) || []

    for (const folder of childFolders) {
      nodes.push({
        id: folder.id,
        name: folder.name,
        type: 'folder',
        level,
        folder,
        children: buildNodes(folder.id, level + 1),
      })
    }

    for (const server of childServers) {
      nodes.push({
        id: server.id,
        name: server.name,
        type: 'server',
        level,
        server,
      })
    }

    return nodes
  }

  return buildNodes('root', 0)
}

const TreeNodeComponent = React.memo<TreeNodeComponentProps>(
  ({ node, expandedFolders, onFolderToggle, renderServer, renderFolder }) => {
    const isExpanded = expandedFolders.has(node.id)

    if (node.type === 'server' && node.server) {
      return (
        <div key={node.id}>{renderServer(node.server, node.level, false)}</div>
      )
    }

    if (node.type === 'folder' && node.folder) {
      const hasChildren = Boolean(node.children && node.children.length > 0)

      return (
        <div key={node.id} className='space-y-1'>
          {renderFolder(node.folder, node.level, isExpanded, hasChildren, () =>
            onFolderToggle(node.id)
          )}
          {isExpanded && hasChildren && node.children && (
            <div className='space-y-1'>
              {node.children.map((child) => (
                <TreeNodeComponent
                  key={child.id}
                  node={child}
                  expandedFolders={expandedFolders}
                  onFolderToggle={onFolderToggle}
                  renderServer={renderServer}
                  renderFolder={renderFolder}
                />
              ))}
            </div>
          )}
        </div>
      )
    }

    return null
  }
)

TreeNodeComponent.displayName = 'TreeNodeComponent'

export function ServerTree({
  folders,
  servers,
  expandedFolders,
  onFolderToggle,
  renderServer,
  renderFolder,
  emptyState,
}: ServerTreeProps) {
  const treeData = React.useMemo(() => {
    return buildTree(folders, servers)
  }, [folders, servers])

  if (treeData.length === 0) {
    return emptyState ? (
      emptyState
    ) : (
      <div className='size-full flex items-center justify-center'>
        <p className='text-center text-sm text-muted-foreground'>
          No items found.
        </p>
      </div>
    )
  }

  return (
    <div className='space-y-1'>
      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          expandedFolders={expandedFolders}
          onFolderToggle={onFolderToggle}
          renderServer={renderServer}
          renderFolder={renderFolder}
        />
      ))}
    </div>
  )
}

export { buildTree, createFolderMap, createServerMap }
export type { TreeNode }
