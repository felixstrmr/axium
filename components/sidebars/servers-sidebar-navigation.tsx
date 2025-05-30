'use client'

import { Folder, Server } from '@/types'
import { cn } from '@/utils'
import { Eye, Monitor, Terminal } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  servers: Server[]
  folders: Folder[]
}

export default function ServersSidebarNavigation({ servers }: Props) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className='flex flex-col gap-1 p-4'>
      {servers.map((server) => (
        <SidebarItem
          key={server.id}
          server={server}
          isActive={segment === server.id}
        />
      ))}
    </div>
  )
}

type SidebarItemProps = {
  server: Server
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  const Icon = {
    ssh: Terminal,
    vnc: Eye,
    rdp: Monitor,
  }[item.server.protocol]

  return (
    <Link
      href={`/servers/${item.server.id}`}
      className={cn(
        'flex h-7 w-fit items-center gap-2 rounded-md px-2 pr-3 text-sm transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'hover:bg-muted text-muted-foreground',
      )}
    >
      <Icon className='size-4' />
      {item.server.name}
    </Link>
  )
}
