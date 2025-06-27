'use client'

import { Separator } from '@axium/ui/components/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import { cn } from '@axium/utils'
import { Cog, House, LucideIcon, Server } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: House,
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
      icon: Cog,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='flex flex-col p-4'>
      <Link href='/'>
        <div className='bg-primary size-8 rounded-md' />
      </Link>
      <Separator className='mx-auto my-4 max-w-6' />
      <div className='flex flex-col gap-1'>
        {itemsTop.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
        <Separator className='mx-auto my-3 max-w-6' />
        {itemsBottom.map((item) => (
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
    <Tooltip>
      <TooltipTrigger>
        <Link
          href={item.href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md transition-colors',
            item.isActive
              ? 'text-foreground bg-muted'
              : 'text-muted-foreground hover:bg-muted',
          )}
        >
          <item.icon className='size-4' />
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
