'use client'

import { cn } from '@axium/ui/lib/utils'
import { FolderIcon, FolderOpenIcon, ServerIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { useEnvironment } from '@/components/providers/environment-provider'
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
  segment: string | null
  params: string
  expandedFolders: Set<string>
  onFolderToggle: (folderId: string) => void
}

interface ServerItemProps {
  server: Server
  level: number
  isActive: boolean
  params: string
}

interface Props {
  folders: ServerFolder[]
  servers: Server[]
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

const findServerPath = (folders: ServerFolder[], server: Server): string[] => {
  if (!server.folderId) return []

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

const filterByEnvironment = <T extends { environmentId?: string | null }>(
  items: T[],
  environmentId: string | null
): T[] => {
  if (!environmentId) return items
  return items.filter((item) => item.environmentId === environmentId)
}

const ServerItem = React.memo<ServerItemProps>(
  ({ server, level, isActive, params }) => {
    const paddingLeft = `${level * 16}px`

    return (
      <div style={{ paddingLeft }} className='relative'>
        <Link
          href={`/servers/${server.id}${params}`}
          className={cn(
            'flex h-8 items-center gap-2 rounded-md pr-1.5 pl-2 border transition-colors',
            isActive
              ? 'bg-muted border-border shadow-xs'
              : 'hover:bg-muted border-transparent text-muted-foreground'
          )}
          aria-current={isActive ? 'page' : undefined}
          title={server.description || server.name}
        >
          <ServerIcon
            className={cn('size-4 flex-shrink-0', isActive && 'text-primary')}
            aria-hidden='true'
          />
          <span className='truncate text-sm'>{server.name}</span>
        </Link>
      </div>
    )
  }
)

ServerItem.displayName = 'ServerItem'

const TreeNodeComponent = React.memo<TreeNodeComponentProps>(
  ({ node, segment, params, expandedFolders, onFolderToggle }) => {
    const isExpanded = expandedFolders.has(node.id)

    const handleToggle = React.useCallback(
      (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault()
        onFolderToggle(node.id)
      },
      [onFolderToggle, node.id]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleToggle(e)
        }
      },
      [handleToggle]
    )

    if (node.type === 'server' && node.server) {
      return (
        <ServerItem
          server={node.server}
          level={node.level}
          isActive={segment === node.id}
          params={params}
        />
      )
    }

    const hasChildren = node.children && node.children.length > 0

    return (
      <div className='space-y-1'>
        <div style={{ paddingLeft: `${node.level * 16}px` }}>
          <button
            type='button'
            className={cn(
              'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 transition-colors',
              isExpanded ? 'text-foreground' : 'text-muted-foreground',
              !hasChildren && 'opacity-50 cursor-not-allowed'
            )}
            onClick={hasChildren ? handleToggle : undefined}
            onKeyDown={hasChildren ? handleKeyDown : undefined}
            disabled={!hasChildren}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} folder ${node.name}`}
            title={node.name}
          >
            {hasChildren ? (
              isExpanded ? (
                <FolderOpenIcon
                  className='size-4 flex-shrink-0'
                  aria-hidden='true'
                />
              ) : (
                <FolderIcon
                  className='size-4 flex-shrink-0'
                  aria-hidden='true'
                />
              )
            ) : (
              <FolderIcon
                className='size-4 flex-shrink-0 opacity-50'
                aria-hidden='true'
              />
            )}
            <span className='truncate text-sm'>{node.name}</span>
          </button>
        </div>
        {isExpanded && hasChildren && node.children && (
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
  }
)

TreeNodeComponent.displayName = 'TreeNodeComponent'

export default function ServersSidebarNav({ folders, servers }: Props) {
  const searchParams = useSearchParams()
  const segment = useSelectedLayoutSegment()
  const { selectedEnvironmentId } = useEnvironment()

  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set()
  )

  const { treeData } = React.useMemo(() => {
    const filteredServers = filterByEnvironment(servers, selectedEnvironmentId)
    const filteredFolders = filterByEnvironment(folders, selectedEnvironmentId)
    const treeData = buildTree(filteredFolders, filteredServers)

    return { treeData }
  }, [servers, folders, selectedEnvironmentId])

  React.useEffect(() => {
    if (segment && segment !== 'servers') {
      const currentServer = servers.find((server) => server.id === segment)

      if (currentServer) {
        const serverPath = findServerPath(folders, currentServer)

        setExpandedFolders((prev) => {
          const newExpandedFolders = new Set(prev)
          for (const folderId of serverPath) {
            newExpandedFolders.add(folderId)
          }
          return newExpandedFolders
        })
      }
    }
  }, [segment, servers, folders])

  const params = React.useMemo(
    () => (searchParams ? `?${searchParams.toString()}` : ''),
    [searchParams]
  )

  const handleFolderToggle = React.useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const newExpandedFolders = new Set(prev)
      if (newExpandedFolders.has(folderId)) {
        newExpandedFolders.delete(folderId)
      } else {
        newExpandedFolders.add(folderId)
      }
      return newExpandedFolders
    })
  }, [])

  if (treeData.length === 0) {
    return (
      <div className='size-full flex items-center justify-center'>
        <p className='text-center text-sm text-muted-foreground'>
          No servers found in this environment.
        </p>
      </div>
    )
  }

  return (
    <nav className='space-y-1' aria-label='Server navigation'>
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
    </nav>
  )
}
