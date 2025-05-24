'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { Home, LucideIcon, Server, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      isActive: segment === null,
    },
    {
      name: 'Servers',
      href: '/servers',
      icon: Server,
      isActive: segment === 'servers',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='bg-muted flex flex-col border-r p-4'>
      <Link href={'/'}>
        <div className='bg-primary size-8 rounded-md' />
      </Link>
      <Separator className='my-4' />
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
  icon: LucideIcon
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex size-8 items-center justify-center rounded-md border transition-all',
        item.isActive
          ? 'text-foreground bg-background border-border shadow-xs'
          : 'text-muted-foreground hover:bg-background hover:border-border border-transparent',
      )}
    >
      <item.icon className='size-4' />
    </Link>
  )
}
