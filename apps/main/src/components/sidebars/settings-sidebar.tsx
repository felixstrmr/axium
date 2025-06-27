'use client'

import { cn } from '@axium/utils'
import {
  Cog,
  Folder,
  Key,
  LucideIcon,
  Server,
  Settings2,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsPersoal = [
    {
      name: 'Preferences',
      href: '/settings',
      icon: Settings2,
      isActive: segment === null,
    },
  ]

  const itemsAdmin = [
    {
      name: 'General',
      href: '/settings/general',
      icon: Cog,
      isActive: segment === 'general',
    },
    {
      name: 'Users',
      href: '/settings/users',
      icon: Users,
      isActive: segment === 'users',
    },
    {
      name: 'Groups',
      href: '/settings/groups',
      icon: Folder,
      isActive: segment === 'groups',
    },
    {
      name: 'Credentials',
      href: '/settings/credentials',
      icon: Key,
      isActive: segment === 'credentials',
    },
    {
      name: 'Servers',
      href: '/settings/servers',
      icon: Server,
      isActive: segment === 'servers',
    },
  ]

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col border-r'>
      <div className='border-b px-5 py-3'>
        <h1 className='text-lg font-semibold tracking-tight'>Settings</h1>
      </div>
      <div className='space-y-3.5 p-3'>
        <div className='space-y-1'>
          <p className='text-muted-foreground mb-1 ml-2 text-xs'>Personal</p>
          {itemsPersoal.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground mb-1 ml-2 text-xs'>Admin</p>
          {itemsAdmin.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
      </div>
    </aside>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  icon: LucideIcon
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2 transition-colors',
        item.isActive
          ? 'text-foreground bg-muted'
          : 'text-muted-foreground hover:bg-muted',
      )}
    >
      <item.icon className='size-4' />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
