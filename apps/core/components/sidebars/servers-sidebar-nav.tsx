'use client'

import { cn } from '@axium/ui/lib/utils'
import { FolderIcon, FolderOpenIcon, ServerIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { useEnvironment } from '@/components/providers/environment-provider'
import { ServerTree } from '@/components/server-tree'
import type { Server, ServerFolder } from '@/types'

interface Props {
  folders: ServerFolder[]
  servers: Server[]
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

export default function ServersSidebarNav({ folders, servers }: Props) {
  const searchParams = useSearchParams()
  const segment = useSelectedLayoutSegment()
  const { selectedEnvironmentId } = useEnvironment()

  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set()
  )

  const filteredServers = React.useMemo(
    () => filterByEnvironment(servers, selectedEnvironmentId),
    [servers, selectedEnvironmentId]
  )

  const filteredFolders = React.useMemo(
    () => filterByEnvironment(folders, selectedEnvironmentId),
    [folders, selectedEnvironmentId]
  )

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

  const renderServer = React.useCallback(
    (server: Server, level: number) => {
      const paddingLeft = `${level * 16}px`
      const isServerActive = segment === server.id

      return (
        <div style={{ paddingLeft }} className='relative'>
          <Link
            href={`/servers/${server.id}${params}`}
            className={cn(
              'flex h-8 items-center gap-2 rounded-md pr-1.5 pl-2 border',
              isServerActive
                ? 'bg-muted border-border shadow-xs'
                : 'hover:bg-muted border-transparent text-muted-foreground'
            )}
            aria-current={isServerActive ? 'page' : undefined}
            title={server.description || server.name}
          >
            <ServerIcon
              className={cn(
                'size-4 flex-shrink-0',
                isServerActive && 'text-primary'
              )}
              aria-hidden='true'
            />
            <span className='truncate text-sm'>{server.name}</span>
          </Link>
        </div>
      )
    },
    [params, segment]
  )

  const renderFolder = React.useCallback(
    (folder: ServerFolder, level: number, isExpanded: boolean) => {
      const serverCount = filteredServers.filter(
        (server) => server.folderId === folder.id
      ).length

      return (
        <div style={{ paddingLeft: `${level * 16}px` }}>
          <button
            type='button'
            className={cn(
              'hover:bg-muted flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2',
              isExpanded ? 'text-foreground' : 'text-muted-foreground'
            )}
            onClick={() => handleFolderToggle(folder.id)}
            title={folder.name}
          >
            {isExpanded ? (
              <FolderOpenIcon className='size-4' />
            ) : (
              <FolderIcon className='size-4' />
            )}
            <span className='truncate text-sm'>{folder.name}</span>
            <span className='text-xs text-muted-foreground'>{serverCount}</span>
          </button>
        </div>
      )
    },
    [handleFolderToggle, filteredServers]
  )

  const emptyState = (
    <div className='size-full flex items-center justify-center pb-16'>
      <p className='text-center text-sm text-muted-foreground'>
        No servers found.
      </p>
    </div>
  )

  return (
    <nav className='flex size-full flex-col gap-1 '>
      <ServerTree
        folders={filteredFolders}
        servers={filteredServers}
        expandedFolders={expandedFolders}
        onFolderToggle={handleFolderToggle}
        renderServer={renderServer}
        renderFolder={renderFolder}
        emptyState={emptyState}
      />
    </nav>
  )
}
