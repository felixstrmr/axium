'use client'

import { Folder, Server } from '@/types'
import { cn } from '@/utils'
import { Eye, FolderClosed, FolderOpen, Monitor, Terminal } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  servers: Server[]
  folders: Folder[]
}

export default function ServersSidebarNavigation({ servers, folders }: Props) {
  const segment = useSelectedLayoutSegment()
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(
    new Set(),
  )

  const rootServers = servers.filter((server) => !server.folderId)
  const rootFolders = folders.filter((folder) => !folder.parentId)

  const findParentFolders = React.useCallback(
    (folderId: string | null): string[] => {
      if (!folderId) return []
      const folder = folders.find((f) => f.id === folderId)
      if (!folder) return []
      return [...findParentFolders(folder.parentId), folder.id]
    },
    [folders],
  )

  React.useEffect(() => {
    if (!segment) return

    const activeServer = servers.find((server) => server.id === segment)
    if (!activeServer) return

    const parentFolderIds = findParentFolders(activeServer.folderId)
    if (parentFolderIds.length > 0) {
      setExpandedFolders(new Set(parentFolderIds))
    }
  }, [segment, servers, findParentFolders])

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const getServersInFolder = (folderId: string) => {
    return servers.filter((server) => server.folderId === folderId)
  }

  const getSubfolders = (parentId: string) => {
    return folders.filter((folder) => folder.parentId === parentId)
  }

  const renderFolder = (folder: Folder, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id)
    const serversInFolder = getServersInFolder(folder.id)
    const subfolders = getSubfolders(folder.id)
    const hasChildren = serversInFolder.length > 0 || subfolders.length > 0

    return (
      <div key={folder.id}>
        <div
          className={cn(
            'hover:bg-muted text-muted-foreground mt-1 flex h-7 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-sm transition-all',
            isExpanded && 'text-foreground',
          )}
          style={{ transform: `translateX(${level * 8}px)` }}
          onClick={() => hasChildren && toggleFolder(folder.id)}
        >
          {isExpanded ? (
            <FolderOpen className='size-3.5' />
          ) : (
            <FolderClosed className='size-3.5' />
          )}
          {folder.name}
        </div>
        {isExpanded && (
          <div className='flex flex-col gap-1'>
            {subfolders.map((subfolder) => renderFolder(subfolder, level + 1))}
            {serversInFolder.map((server) => (
              <ServerItem
                key={server.id}
                server={server}
                isActive={segment === server.id}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col p-4'>
      {rootServers.map((server) => (
        <ServerItem
          key={server.id}
          server={server}
          isActive={segment === server.id}
          level={0}
        />
      ))}
      {rootFolders.map((folder) => renderFolder(folder))}
    </div>
  )
}

type ServerItemProps = {
  server: Server
  isActive: boolean
  level: number
}

function ServerItem({ server, isActive, level }: ServerItemProps) {
  const isRoot = !server.folderId

  const Icon = {
    ssh: Terminal,
    vnc: Eye,
    rdp: Monitor,
  }[server.protocol]

  return (
    <Link
      href={`/servers/${server.id}`}
      className={cn(
        'mt-1 flex h-7 w-fit items-center gap-2 rounded-md px-2 text-sm transition-all',
        isActive
          ? 'bg-muted text-foreground'
          : 'hover:bg-muted text-muted-foreground',
      )}
      style={{ transform: `translateX(${isRoot ? '0px' : `${level * 8}px`})` }}
    >
      <Icon className='size-3.5' />
      {server.name}
    </Link>
  )
}
