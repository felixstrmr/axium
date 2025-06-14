'use client'

import HouseIcon from '@/components/icons/house-icon'
import ServerIcon from '@/components/icons/server-icon'
import SettingsIcon from '@/components/icons/settings-icon'
import { cn } from '@/utils'
import { Terminal } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: HouseIcon,
      isActive: segment === null,
    },
    {
      name: 'Servers',
      href: '/servers',
      icon: ServerIcon,
      isActive: segment === 'servers',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/settings',
      icon: SettingsIcon,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='flex flex-col gap-4 border-r p-4'>
      <Link
        href={'/'}
        className='bg-primary flex size-8 items-center justify-center rounded-md'
      >
        <Terminal className='text-primary-foreground size-4' />
      </Link>
      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-1'>
          {itemsTop.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <div className='space-y-1'>
          {itemsBottom.map((item) => (
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
  icon: React.ElementType
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex size-8 items-center justify-center rounded-md border transition-all',
        item.isActive
          ? 'bg-muted border-border text-foreground'
          : 'text-muted-foreground hover:bg-muted hover:border-border border-transparent bg-transparent',
      )}
    >
      <item.icon className='size-4' />
    </Link>
  )
}
