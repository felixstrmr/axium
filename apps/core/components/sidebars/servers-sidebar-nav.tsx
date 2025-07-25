'use client'

import { cn } from '@axium/ui/lib/utils'
import { FolderIcon, FolderOpenIcon, ServerIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import type { Server, ServerFolder } from '@/types'

type Props = {
  folders: ServerFolder[]
  servers: Server[]
}

type TreeNode = {
  id: string
  name: string
  type: 'folder' | 'server'
  level: number
  children?: TreeNode[]
  server?: Server
  folder?: ServerFolder
}

function buildTree(folders: ServerFolder[], servers: Server[]): TreeNode[] {
  const folderMap = new Map<string, ServerFolder[]>()
  const serverMap = new Map<string, Server[]>()

  for (const folder of folders) {
    const parentId = folder.parentId || 'root'
    const existing = folderMap.get(parentId) || []
    existing.push(folder)
    folderMap.set(parentId, existing)
  }

  for (const server of servers) {
    const parentId = server.folderId || 'root'
    const existing = serverMap.get(parentId) || []
    existing.push(server)
    serverMap.set(parentId, existing)
  }

  function buildNodes(parentId: string, level: number): TreeNode[] {
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

function findServerPath(folders: ServerFolder[], server: Server): string[] {
  if (!server.folderId) {
    return []
  }

  const path: string[] = []
  let currentFolderId = server.folderId

  const folderMap = new Map<string, ServerFolder>()
  for (const folder of folders) {
    folderMap.set(folder.id, folder)
  }

  while (currentFolderId) {
    const folder = folderMap.get(currentFolderId)
    if (!folder) break

    path.unshift(folder.id)
    currentFolderId = folder.parentId || ''
  }

  return path
}

export default function ServersSidebarNav({ folders, servers }: Props) {
  const searchParams = useSearchParams()
  const segment = useSelectedLayoutSegment()

  const [expandedFolders, setExpandedFolders] = React.useState<string[]>([])

  const treeData = React.useMemo(
    () => buildTree(folders, servers),
    [folders, servers]
  )

  React.useEffect(() => {
    if (segment && segment !== 'servers') {
      const currentServer = servers.find((server) => server.id === segment)

      if (currentServer) {
        const serverPath = findServerPath(folders, currentServer)

        setExpandedFolders((prev) => {
          const newExpandedFolders = [...prev]
          for (const folderId of serverPath) {
            if (!newExpandedFolders.includes(folderId)) {
              newExpandedFolders.push(folderId)
            }
          }
          return newExpandedFolders
        })
      }
    }
  }, [segment, folders, servers])

  const params = React.useMemo(
    () => (searchParams ? `?${searchParams.toString()}` : ''),
    [searchParams]
  )

  const handleFolderToggle = React.useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const isExpanded = prev.includes(folderId)
      return isExpanded
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    })
  }, [])

  return (
    <div className='space-y-1'>
      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          segment={segment}
          params={params}
          expandedFolders={expandedFolders}
          onFolderToggle={handleFolderToggle}
        />
      ))}
    </div>
  )
}

const TreeNodeComponent = React.memo<{
  node: TreeNode
  segment: string | null
  params: string
  expandedFolders: string[]
  onFolderToggle: (folderId: string) => void
}>(({ node, segment, params, expandedFolders, onFolderToggle }) => {
  const isExpanded = expandedFolders.includes(node.id)

  const handleToggle = React.useCallback(() => {
    onFolderToggle(node.id)
  }, [onFolderToggle, node.id])

  if (node.type === 'server') {
    return (
      <ServerItem
        server={node.server!}
        level={node.level}
        isActive={segment === node.id}
        params={params}
      />
    )
  }

  return (
    <div className='space-y-1'>
      <div style={{ paddingLeft: `${node.level * 16}px` }}>
        <button
          type='button'
          className='hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2'
          onClick={handleToggle}
        >
          {isExpanded ? (
            <FolderOpenIcon className='text-muted-foreground size-4' />
          ) : (
            <FolderIcon className='text-muted-foreground size-4' />
          )}
          <span
            className={cn(
              'truncate text-sm',
              isExpanded ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {node.name}
          </span>
        </button>
      </div>
      {isExpanded && node.children && (
        <div className='space-y-1'>
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              segment={segment}
              params={params}
              expandedFolders={expandedFolders}
              onFolderToggle={onFolderToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
})

TreeNodeComponent.displayName = 'TreeNodeComponent'

const ServerItem = React.memo<{
  server: Server
  level: number
  isActive: boolean
  params: string
}>(({ server, level, isActive, params }) => {
  const paddingLeft = `${level * 16}px`

  return (
    <div style={{ paddingLeft }} className='relative'>
      <Link
        href={`/servers/${server.id}${params}`}
        className={cn(
          'flex h-8 items-center gap-2 rounded-md pr-1.5 pl-2',
          isActive ? 'bg-muted' : 'hover:bg-muted'
        )}
      >
        <ServerIcon className='size-4' />
        <span
          className={cn(
            'truncate text-sm',
            isActive ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {server.name}
        </span>
      </Link>
    </div>
  )
})

ServerItem.displayName = 'ServerItem'
