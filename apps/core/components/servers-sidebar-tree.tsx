'use client'

import { Folder, Server } from '@/db/types'
import { cn } from '@axium/utils'
import { FolderClosed, FolderOpen, ServerIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { parseAsString, useQueryState } from 'nuqs'
import React from 'react'

type Props = {
  servers: Server[]
  folders: Folder[]
}

const FolderItem = React.memo<{
  folder: Folder
  level: number
  isExpanded: boolean
  serversInFolder: Server[]
  subfolders: Folder[]
  onToggle: (folderId: string) => void
  activeSegment: string | null
}>(
  ({
    folder,
    level,
    isExpanded,
    serversInFolder,
    subfolders,
    onToggle,
    activeSegment,
  }) => {
    const hasChildren = serversInFolder.length > 0 || subfolders.length > 0

    return (
      <div className='relative'>
        <div
          style={{ paddingLeft: `${level * 16}px` }}
          className='flex items-center'
        >
          {level > 0 && (
            <span
              className='border-border absolute top-0 left-0 h-full border-l'
              style={{ left: `${(level - 1) * 16 + 7}px`, width: '1px' }}
              aria-hidden='true'
            />
          )}
          <div
            className='hover:bg-muted text-muted-foreground flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 transition-all'
            onClick={() => hasChildren && onToggle(folder.id)}
          >
            {isExpanded ? (
              <FolderOpen className='size-4' aria-hidden='true' />
            ) : (
              <FolderClosed className='size-4' aria-hidden='true' />
            )}
            <span className='text-sm'>{folder.name}</span>
          </div>
        </div>
        {isExpanded && (
          <div className='flex flex-col'>
            {subfolders.map((subfolder) => (
              <FolderItem
                key={subfolder.id}
                folder={subfolder}
                level={level + 1}
                isExpanded={false}
                serversInFolder={[]}
                subfolders={[]}
                onToggle={onToggle}
                activeSegment={activeSegment}
              />
            ))}
            {serversInFolder.map((server) => (
              <ServerItem
                key={server.id}
                server={server}
                isActive={activeSegment === server.id}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

FolderItem.displayName = 'FolderItem'

const ServerItem = React.memo<{
  server: Server
  isActive: boolean
  level: number
}>(({ server, isActive, level }) => {
  const router = useRouter()
  const isRoot = !server.folderId

  return (
    <div style={{ marginLeft: `${isRoot ? '0px' : `${level * 16}px`}` }}>
      <Link
        href={`/servers/${server.id}/ssh`}
        className={cn(
          'flex h-8 w-full items-center gap-2 rounded-md px-2 transition-all first:mt-1',
          isActive
            ? 'bg-muted text-foreground'
            : 'hover:bg-muted text-muted-foreground',
        )}
      >
        <ServerIcon className='size-4' aria-hidden='true' />
        <span className='truncate text-sm'>{server.name}</span>
        {isActive && (
          <button
            className='ml-auto flex size-4.5 cursor-pointer items-center justify-center rounded-[3px] transition-all hover:bg-zinc-700'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              router.push(`/servers`)
            }}
          >
            <X className='size-4' aria-hidden='true' />
          </button>
        )}
      </Link>
    </div>
  )
})

ServerItem.displayName = 'ServerItem'

export default function ServersSidebarTree({
  servers: initialServers,
  folders,
}: Props) {
  const [environmentId] = useQueryState(
    'environment',
    parseAsString.withDefault('all'),
  )

  const segment = useSelectedLayoutSegment()
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(),
  )

  const servers = React.useMemo(() => {
    if (environmentId === 'all') return initialServers
    return initialServers.filter(
      (server) => server.environmentId === environmentId,
    )
  }, [initialServers, environmentId])

  const serversByFolderId = React.useMemo(() => {
    const map = new Map<string, Server[]>()
    servers.forEach((server) => {
      const folderId = server.folderId ?? 'root'
      if (!map.has(folderId)) {
        map.set(folderId, [])
      }
      map.get(folderId)!.push(server)
    })
    return map
  }, [servers])

  const foldersByParentId = React.useMemo(() => {
    const map = new Map<string, Folder[]>()
    folders.forEach((folder) => {
      const parentId = folder.parentFolderId ?? 'root'
      if (!map.has(parentId)) {
        map.set(parentId, [])
      }
      map.get(parentId)!.push(folder)
    })
    return map
  }, [folders])

  const foldersById = React.useMemo(() => {
    return new Map(folders.map((folder) => [folder.id, folder]))
  }, [folders])

  const rootServers = React.useMemo(() => {
    return serversByFolderId.get('root') || []
  }, [serversByFolderId])

  const rootFolders = React.useMemo(() => {
    return foldersByParentId.get('root') || []
  }, [foldersByParentId])

  const findParentFolders = React.useCallback(
    (folderId: string | null): string[] => {
      if (!folderId) return []

      const result: string[] = []
      let currentFolderId: string | null = folderId

      while (currentFolderId) {
        const folder = foldersById.get(currentFolderId)
        if (!folder) break

        result.unshift(folder.id)
        currentFolderId = folder.parentFolderId
      }

      return result
    },
    [foldersById],
  )

  const activeServer = React.useMemo(() => {
    if (!segment) return null
    return servers.find((server) => server.id === segment) || null
  }, [segment, servers])

  React.useEffect(() => {
    if (!activeServer) return

    const parentFolderIds = findParentFolders(activeServer.folderId)
    if (parentFolderIds.length > 0) {
      setExpandedFolders(new Set(parentFolderIds))
    }
  }, [activeServer, findParentFolders])

  const toggleFolder = React.useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const newExpanded = new Set(prev)
      if (newExpanded.has(folderId)) {
        newExpanded.delete(folderId)
      } else {
        newExpanded.add(folderId)
      }
      return newExpanded
    })
  }, [])

  const renderFolder = React.useCallback(
    (folder: Folder, level: number = 0) => {
      const isExpanded = expandedFolders.has(folder.id)
      const serversInFolder = serversByFolderId.get(folder.id) || []
      const subfolders = foldersByParentId.get(folder.id) || []

      return (
        <FolderItem
          key={folder.id}
          folder={folder}
          level={level}
          isExpanded={isExpanded}
          serversInFolder={serversInFolder}
          subfolders={subfolders}
          onToggle={toggleFolder}
          activeSegment={segment}
        />
      )
    },
    [
      expandedFolders,
      serversByFolderId,
      foldersByParentId,
      toggleFolder,
      segment,
    ],
  )

  return (
    <div className='space-y-1'>
      {rootFolders.map((folder) => renderFolder(folder))}
      {rootServers.map((server) => (
        <ServerItem
          key={server.id}
          server={server}
          isActive={segment === server.id}
          level={0}
        />
      ))}
    </div>
  )
}
