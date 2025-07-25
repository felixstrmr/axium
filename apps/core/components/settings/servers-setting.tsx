'use client'

import { Button } from '@axium/ui/components/button'
import { cn } from '@axium/ui/lib/utils'
import {
  Cog,
  FolderIcon,
  FolderOpenIcon,
  FolderPlus,
  ServerIcon,
  Trash,
} from 'lucide-react'
import { useCallback, useState } from 'react'
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
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())

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
      return (
        <div
          style={{ paddingLeft: `${level * 16}px` }}
          className='flex flex-col'
        >
          <div className='flex items-center group'>
            <button
              type='button'
              className={cn(
                'group-hover:bg-muted flex h-8 min-h-8 flex-1 cursor-pointer items-center gap-2 rounded-md px-2',
                isExpanded ? 'text-foreground' : 'text-muted-foreground'
              )}
              onClick={() => handleFolderToggle(folder.id)}
              aria-expanded={isExpanded}
              title={folder.name}
            >
              {isExpanded ? (
                <FolderOpenIcon className='size-4' />
              ) : (
                <FolderIcon className='size-4' />
              )}
              <span className='truncate text-sm'>{folder.name}</span>
            </button>
            <div className='flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100'>
              <Button
                variant='ghost'
                size='iconSm'
                onClick={() => {
                  setServerFolder(null)
                  setParentId(folder.id)
                  setIsOpenFolder(true)
                }}
              >
                <FolderPlus />
              </Button>
              <Button
                variant='ghost'
                size='iconSm'
                onClick={() => {
                  setServer(null)
                  setFolderId(folder.id)
                  setIsOpenServer(true)
                }}
              >
                <ServerIcon />
              </Button>
              <Button
                variant='ghost'
                size='iconSm'
                onClick={() => {
                  setServerFolder(folder)
                  setIsOpenFolder(true)
                }}
              >
                <Cog />
              </Button>
              <Button variant='ghost' size='iconSm'>
                <Trash />
              </Button>
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
        />
      </div>
    </div>
  )
}
