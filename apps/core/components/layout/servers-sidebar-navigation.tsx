'use client'

import { useEnvironment } from '@/components/providers/environment-provider'
import { Folder, Server } from '@axium/database/types'
import DebianIcon from '@axium/ui/icons/debian-icon'
import UbuntuIcon from '@axium/ui/icons/ubuntu-icon'
import WindowsIcon from '@axium/ui/icons/windows-icon'
import { cn } from '@axium/utils'
import { FolderClosed, FolderOpen, ServerIcon, X } from 'lucide-react'
import Link from 'next/link'
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
} from 'next/navigation'
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

export default function ServersSidebarNavigation({ folders, servers }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const { currentEnvironmentId } = useEnvironment()

  const treeData = React.useMemo(() => {
    const filteredFolders =
      currentEnvironmentId === 'all'
        ? folders
        : folders.filter(
            (folder) => folder.environmentId === currentEnvironmentId,
          )

    const filteredServers =
      currentEnvironmentId === 'all'
        ? servers
        : servers.filter(
            (server) => server.environmentId === currentEnvironmentId,
          )

    return buildTree(filteredFolders, filteredServers)
  }, [folders, servers, currentEnvironmentId])

  const params = searchParams ? `?${searchParams.toString()}` : ''

  const handleRemove = React.useCallback(() => {
    router.push(`/servers${params}`)
  }, [router, params])

  return (
    <div className='space-y-1'>
      {treeData.map((node) => (
        <TreeNodeComponent
          key={node.id}
          node={node}
          segment={segment}
          onRemove={handleRemove}
          params={params}
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
    params,
  }: {
    node: TreeNode
    segment: string | null
    onRemove: (serverId: string) => void
    params: string
  }) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    if (node.type === 'server') {
      return (
        <ServerItem
          server={node.server!}
          level={node.level}
          isActive={segment === node.id}
          onRemove={onRemove}
          params={params}
        />
      )
    }

    return (
      <div className='space-y-1'>
        <div style={{ paddingLeft: `${node.level * 16}px` }}>
          <button
            className={cn(
              'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2',
              isExpanded ? 'text-foreground' : 'text-muted-foreground',
            )}
            onClick={() => setIsExpanded(!isExpanded)}
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
                params={params}
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
    params,
  }: {
    server: Server
    level: number
    isActive: boolean
    onRemove: (serverId: string) => void
    params: string
  }) => {
    const handleRemove = React.useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onRemove(server.id)
      },
      [server.id, onRemove],
    )

    const IconMap = {
      debian: DebianIcon,
      ubuntu: UbuntuIcon,
      windows: WindowsIcon,
    }

    const Icon = server.operatingSystem
      ? IconMap[server.operatingSystem as keyof typeof IconMap] || ServerIcon
      : ServerIcon

    return (
      <div style={{ paddingLeft: `${level * 16}px` }} className='relative'>
        <Link
          href={`/servers/${server.id}${params}`}
          className={cn(
            'flex h-8 items-center gap-2 rounded-md pr-1.5 pl-2',
            isActive
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:bg-muted',
          )}
        >
          <Icon className='size-4' />
          <span className='truncate text-sm'>{server.name}</span>
          {isActive && (
            <button
              type='button'
              className='ml-auto cursor-pointer rounded-sm p-0.5 hover:bg-zinc-200'
              onClick={handleRemove}
            >
              <X className='size-4' />
            </button>
          )}
        </Link>
      </div>
    )
  },
)

ServerItem.displayName = 'ServerItem'

function buildTree(folders: Folder[], servers: Server[]): TreeNode[] {
  const folderChildren = new Map<string, Folder[]>()
  const serverChildren = new Map<string, Server[]>()

  folders.forEach((folder) => {
    const parentId = folder.parentId || 'root'
    if (!folderChildren.has(parentId)) {
      folderChildren.set(parentId, [])
    }
    folderChildren.get(parentId)!.push(folder)
  })

  servers.forEach((server) => {
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
