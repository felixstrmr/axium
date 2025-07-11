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

const OS_ICONS = {
  debian: DebianIcon,
  ubuntu: UbuntuIcon,
  windows: WindowsIcon,
} as const

function buildTree(folders: Folder[], servers: Server[]): TreeNode[] {
  const folderMap = new Map<string, Folder[]>()
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

export default function ServersSidebarNavigation({ folders, servers }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const segment = useSelectedLayoutSegment()
  const { currentEnvironmentId } = useEnvironment()

  const [expandedFolders, setExpandedFolders] = React.useState<string[]>([])

  const { filteredFolders, filteredServers } = React.useMemo(() => {
    if (currentEnvironmentId === 'all') {
      return { filteredFolders: folders, filteredServers: servers }
    }

    return {
      filteredFolders: folders.filter(
        (folder) => folder.environmentId === currentEnvironmentId,
      ),
      filteredServers: servers.filter(
        (server) => server.environmentId === currentEnvironmentId,
      ),
    }
  }, [folders, servers, currentEnvironmentId])

  const treeData = React.useMemo(
    () => buildTree(filteredFolders, filteredServers),
    [filteredFolders, filteredServers],
  )

  const params = React.useMemo(
    () => (searchParams ? `?${searchParams.toString()}` : ''),
    [searchParams],
  )

  const handleRemove = React.useCallback(() => {
    router.push(`/servers${params}`)
  }, [router, params])

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
          onRemove={handleRemove}
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
  onRemove: () => void
  params: string
  expandedFolders: string[]
  onFolderToggle: (folderId: string) => void
}>(({ node, segment, onRemove, params, expandedFolders, onFolderToggle }) => {
  const isExpanded = expandedFolders.includes(node.id)

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

  const handleToggle = React.useCallback(() => {
    onFolderToggle(node.id)
  }, [onFolderToggle, node.id])

  return (
    <div className='space-y-1'>
      <div style={{ paddingLeft: `${node.level * 16}px` }}>
        <button
          type='button'
          className={cn(
            'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2',
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
  onRemove: () => void
  params: string
}>(({ server, level, isActive, onRemove, params }) => {
  const handleRemove = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onRemove()
    },
    [onRemove],
  )

  const Icon = server.operatingSystem
    ? OS_ICONS[server.operatingSystem as keyof typeof OS_ICONS] || ServerIcon
    : ServerIcon

  const paddingLeft = `${level * 16}px`

  return (
    <div style={{ paddingLeft }} className='relative'>
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
})

ServerItem.displayName = 'ServerItem'
