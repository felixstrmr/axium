'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import { cn } from '@axium/ui/lib/utils'
import {
  Cog,
  House,
  type LucideIcon,
  MessageCircle,
  Server,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebarNav() {
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: `/?${searchParams ? searchParams.toString() : ''}`,
      icon: House,
      isActive: segment === null,
    },
    {
      name: 'Servers',
      href: `/servers?${searchParams ? searchParams.toString() : ''}`,
      icon: Server,
      isActive: segment === 'servers',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: `/settings?${searchParams ? searchParams.toString() : ''}`,
      icon: Cog,
      isActive: segment === 'settings',
    },
  ]

  return (
    <nav className='flex flex-col gap-4 justify-between h-full'>
      <ul className='space-y-1'>
        {itemsTop.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </ul>
      <ul className='space-y-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='https://axium.userjot.com'
              target='_blank'
              className='flex size-8 items-center justify-center rounded-md border border-transparent hover:border-border hover:bg-background'
            >
              <MessageCircle className='text-muted-foreground size-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>Feedback</p>
          </TooltipContent>
        </Tooltip>
        {itemsBottom.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </ul>
    </nav>
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
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'size-8 flex items-center justify-center rounded-md border',
            item.isActive
              ? 'text-foreground bg-background border-border shadow-xs'
              : 'text-muted-foreground border-transparent hover:border-border hover:bg-background'
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
