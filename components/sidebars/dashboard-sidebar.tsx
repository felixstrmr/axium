'use client'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils'
import { Home, LucideIcon, Server, Settings, Terminal } from 'lucide-react'
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
    <aside className='flex flex-col border-r'>
      <div className='border-b p-4'>
        <Link
          href={'/'}
          className='from-primary border-primary shadow-[inset_0_1px_0_0_theme(colors.primary-foreground/15%)] flex size-8 items-center justify-center rounded-md border bg-gradient-to-t to-neutral-600 dark:from-zinc-300 dark:to-zinc-50'
        >
          <Terminal className='text-primary-foreground size-4' />
        </Link>
      </div>
      <div className='flex flex-col items-center p-4'>
        <div className='space-y-1'>
          {itemsTop.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <Separator className='my-4' />
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
        'flex size-8 items-center justify-center rounded-md transition-all',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted',
      )}
    >
      <item.icon className='size-4' />
    </Link>
  )
}
