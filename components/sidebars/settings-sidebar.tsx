'use client'

import { cn } from '@/utils'
import { Key, LucideIcon, Server, User, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsAccount = [
    {
      name: 'Account',
      href: '/settings',
      icon: User,
      isActive: segment === null,
    },
  ]

  const itemsAdministration = [
    {
      name: 'Users',
      href: '/settings/users',
      icon: Users,
      isActive: segment === 'users',
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
      <div className='flex items-center border-b p-4'>
        <div className='flex h-8 items-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
        </div>
      </div>
      <div className='flex flex-col gap-1 p-4'>
        <h2 className='text-muted-foreground mb-1 text-xs'>Account</h2>
        {itemsAccount.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </div>
      <div className='flex flex-col gap-1 p-4'>
        <h2 className='text-muted-foreground mb-1 text-xs'>Workspace</h2>
        {itemsAdministration.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
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
    <Link href={item.href}>
      <div
        className={cn(
          'flex h-8 items-center gap-2 rounded-md border p-2 transition-all',
          item.isActive
            ? 'bg-background text-foreground border-border shadow-sm'
            : 'text-muted-foreground hover:bg-background hover:border-border border-transparent',
        )}
      >
        <item.icon className='size-4' />
        <span className='text-sm'>{item.name}</span>
      </div>
    </Link>
  )
}
