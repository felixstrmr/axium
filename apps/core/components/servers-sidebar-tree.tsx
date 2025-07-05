'use client'

import { Folder, Server } from '@/db/types'
import { cn } from '@axium/utils'
import { FolderClosed, FolderOpen, ServerIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  folders: Folder[]
  servers: Server[]
}

type TreeNode = {
  id: string
  name: string
  type: 'folder' | 'server'
  level: number
  children?: TreeNode[]
  server?: Server
  folder?: Folder
}

export default function ServersSidebarTree({ folders, servers }: Props) {
  const router = useRouter()
  const segment = useSelectedLayoutSegment()

  const treeData = React.useMemo(() => {
    return buildOptimizedTree(folders, servers)
  }, [folders, servers])

  const handleRemove = React.useCallback(() => {
    router.push('/servers')
  }, [router])

  return (
    <div className='space-y-1'>
      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          segment={segment}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

const TreeNodeComponent = React.memo(
  ({
    node,
    segment,
    onRemove,
  }: {
    node: TreeNode
    segment: string | null
    onRemove: (serverId: string) => void
  }) => {
    const [isExpanded, setIsExpanded] = React.useState(segment === node.id)

    const handleToggle = React.useCallback(() => {
      setIsExpanded((prev) => !prev)
    }, [])

    if (node.type === 'server') {
      return (
        <ServerItem
          server={node.server!}
          level={node.level}
          isActive={segment === node.id}
          onRemove={onRemove}
        />
      )
    }

    return (
      <div className='space-y-1'>
        <div style={{ paddingLeft: `${node.level * 16}px` }}>
          <button
            className={cn(
              'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 transition-colors',
              isExpanded ? 'text-foreground' : 'text-muted-foreground',
            )}
            onClick={handleToggle}
          >
            {isExpanded ? (
              <FolderOpen className='size-4' aria-hidden='true' />
            ) : (
              <FolderClosed className='size-4' aria-hidden='true' />
            )}
            <span className='truncate text-sm'>{node.name}</span>
          </button>
        </div>
        {isExpanded && node.children && (
          <div className='space-y-1'>
            {node.children.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                segment={segment}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

TreeNodeComponent.displayName = 'TreeNodeComponent'

const ServerItem = React.memo(
  ({
    server,
    level,
    isActive,
    onRemove,
  }: {
    server: Server
    level: number
    isActive: boolean
    onRemove: (serverId: string) => void
  }) => {
    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onRemove(server.id)
      },
      [server.id, onRemove],
    )

    return (
      <div style={{ paddingLeft: `${level * 16}px` }} className='relative'>
        <Link
          href={`/servers/${server.id}/ssh`}
          className={cn(
            'flex h-8 items-center gap-2 rounded-md pr-1.5 pl-2 transition-colors',
            isActive
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted',
          )}
        >
          <ServerIcon className='size-4' aria-hidden='true' />
          <span className='truncate text-sm'>{server.name}</span>
          {isActive && (
            <button
              type='button'
              className='hover:bg-foreground/10 ml-auto cursor-pointer rounded-sm p-0.5 transition-colors'
              onClick={handleRemove}
            >
              <X className='size-4' aria-hidden='true' />
            </button>
          )}
        </Link>
      </div>
    )
  },
)

ServerItem.displayName = 'ServerItem'

function buildOptimizedTree(folders: Folder[], servers: Server[]): TreeNode[] {
  const folderMap = new Map<string, Folder>()
  const serverMap = new Map<string, Server>()
  const folderChildren = new Map<string, Folder[]>()
  const serverChildren = new Map<string, Server[]>()

  folders.forEach((folder) => {
    folderMap.set(folder.id, folder)
    const parentId = folder.parentFolderId || 'root'
    if (!folderChildren.has(parentId)) {
      folderChildren.set(parentId, [])
    }
    folderChildren.get(parentId)!.push(folder)
  })

  servers.forEach((server) => {
    serverMap.set(server.id, server)
    const parentId = server.folderId || 'root'
    if (!serverChildren.has(parentId)) {
      serverChildren.set(parentId, [])
    }
    serverChildren.get(parentId)!.push(server)
  })

  function buildNodes(parentId: string | null, level: number): TreeNode[] {
    const nodes: TreeNode[] = []

    const parentKey = parentId || 'root'
    const childFolders = folderChildren.get(parentKey) || []
    const childServers = serverChildren.get(parentKey) || []

    childFolders.forEach((folder) => {
      nodes.push({
        id: folder.id,
        name: folder.name,
        type: 'folder',
        level,
        folder,
        children: buildNodes(folder.id, level + 1),
      })
    })

    childServers.forEach((server) => {
      nodes.push({
        id: server.id,
        name: server.name,
        type: 'server',
        level,
        server,
      })
    })

    return nodes
  }

  return buildNodes(null, 0)
}
