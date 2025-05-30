'use client'

import { Server } from '@/types'
import { cn } from '@/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  servers: Server[]
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
  return (
    <Link
      href={`/servers/${item.server.id}`}
      className={cn(
        'flex h-7 items-center rounded-md px-2 text-sm transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'hover:bg-muted text-muted-foreground',
      )}
    >
      {item.server.name}
    </Link>
  )
}
