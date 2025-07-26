'use client'

import { cn } from '@axium/ui/lib/utils'
import {
  Cog,
  FolderIcon,
  FolderOpenIcon,
  FolderPlus,
  ServerIcon,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import EmptyState from '@/components/empty-state'
import { ServerTree } from '@/components/server-tree'
import { upsertServerFolderStore } from '@/stores/upsert-server-folder-store'
import { upsertServerStore } from '@/stores/upsert-server-store'
import type { Server, ServerFolder } from '@/types'

type Props = {
  servers: Server[]
  folders: ServerFolder[]
}

export default function ServersSetting({ servers, folders }: Props) {
  const {
    setServerFolder,
    setIsOpen: setIsOpenFolder,
    setParentId,
  } = upsertServerFolderStore()
  const {
    setServer,
    setFolderId,
    setIsOpen: setIsOpenServer,
  } = upsertServerStore()

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(() => {
    const foldersWithItems = new Set<string>()

    const foldersWithServers = new Set(
      servers.map((server) => server.folderId).filter(Boolean) as string[]
    )

    const foldersWithSubfolders = new Set(
      folders.map((folder) => folder.parentId).filter(Boolean) as string[]
    )

    foldersWithServers.forEach((folderId) => foldersWithItems.add(folderId))
    foldersWithSubfolders.forEach((folderId) => foldersWithItems.add(folderId))

    return foldersWithItems
  })

  const handleFolderToggle = useCallback((folderId: string) => {
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

  const renderServer = useCallback((server: Server, level: number) => {
    const paddingLeft = `${level * 16}px`

    return (
      <div style={{ paddingLeft }} className='relative'>
        <button
          type='button'
          className={cn(
            'flex h-8 items-center w-full gap-2 rounded-md pr-1.5 pl-2 border transition-colors',
            'hover:bg-muted border-transparent text-muted-foreground'
          )}
          title={server.description || server.name}
        >
          <ServerIcon
            className={cn('size-4 flex-shrink-0')}
            aria-hidden='true'
          />
          <span className='truncate text-sm'>{server.name}</span>
        </button>
      </div>
    )
  }, [])

  const renderFolder = useCallback(
    (folder: ServerFolder, level: number, isExpanded: boolean) => {
      const serverCount = servers.filter(
        (server) => server.folderId === folder.id
      ).length

      return (
        <div
          style={{ paddingLeft: `${level * 16}px` }}
          className='flex flex-col'
        >
          <div className='flex h-8 items-center group hover:bg-muted/50 rounded-md'>
            <button
              type='button'
              className={cn(
                'flex flex-1 cursor-pointer items-center gap-2 rounded-md px-2',
                isExpanded ? 'text-foreground' : 'text-muted-foreground'
              )}
              onClick={() => handleFolderToggle(folder.id)}
            >
              {isExpanded ? (
                <FolderOpenIcon className='size-4' />
              ) : (
                <FolderIcon className='size-4' />
              )}
              <span className='truncate text-sm'>{folder.name}</span>
              <span className='text-xs text-muted-foreground'>
                {serverCount}
              </span>
            </button>
            <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100'>
              <button
                type='button'
                className='size-6 flex items-center cursor-pointer justify-center hover:bg-muted rounded-md'
                onClick={() => {
                  setServerFolder(null)
                  setParentId(folder.id)
                  setIsOpenFolder(true)
                }}
              >
                <FolderPlus className='size-3.5' />
              </button>
              <button
                type='button'
                className='size-6 flex items-center cursor-pointer justify-center hover:bg-muted rounded-md'
                onClick={() => {
                  setServer(null)
                  setFolderId(folder.id)
                  setIsOpenServer(true)
                }}
              >
                <ServerIcon className='size-3.5' />
              </button>
              <button
                type='button'
                className='size-6 flex items-center cursor-pointer justify-center hover:bg-muted rounded-md'
                onClick={() => {
                  setServerFolder(folder)
                  setIsOpenFolder(true)
                }}
              >
                <Cog className='size-3.5' />
              </button>
            </div>
          </div>
        </div>
      )
    },
    [
      handleFolderToggle,
      setIsOpenFolder,
      setIsOpenServer,
      setParentId,
      setServerFolder,
      setServer,
      setFolderId,
      servers,
    ]
  )

  return (
    <div className='bg-muted/50 p-1 size-full rounded-xl'>
      <div className={cn('bg-background p-4 border rounded-lg size-full')}>
        <ServerTree
          folders={folders}
          servers={servers}
          expandedFolders={expandedFolders}
          onFolderToggle={handleFolderToggle}
          renderServer={renderServer}
          renderFolder={renderFolder}
          emptyState={
            <div className='size-full flex items-center justify-center'>
              <EmptyState
                icon={ServerIcon}
                title='No servers or folders found'
                description='Create a server or folder to get started.'
              />
            </div>
          }
        />
      </div>
    </div>
  )
}
