'use client'

import { cn } from '@/lib/utils'
import { Code, Key, LucideIcon, Server, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function SettingsSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsPersonal = [
    {
      name: 'Connecton',
      href: '/settings',
      icon: Code,
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
      <div className='p-4'>
        <div className='flex flex-col'>
          <p className='text-muted-foreground mb-2 text-xs'>Personal</p>
          <div className='space-y-1'>
            {itemsPersonal.map((item) => (
              <SidebarItem key={item.name} {...item} />
            ))}
          </div>
          <p className='text-muted-foreground mt-4 mb-2 text-xs'>
            Administration
          </p>
          <div className='space-y-1'>
            {itemsAdministration.map((item) => (
              <SidebarItem key={item.name} {...item} />
            ))}
          </div>
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
        'flex h-8 items-center rounded-md px-2 text-sm transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted',
      )}
    >
      <item.icon className='mr-2 size-4' />
      {item.name}
    </Link>
  )
}
