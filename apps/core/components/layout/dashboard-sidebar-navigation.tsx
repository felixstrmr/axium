'use client'

import UserAvatar from '@/components/user-avatar'
import { User } from '@axium/database/types'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import { cn } from '@axium/utils'
import { Home, LucideIcon, MessageCircle, Server, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  user: User
}

export default function DashboardSidebarNavigation({ user }: Props) {
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

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
    <nav className='flex h-full flex-col justify-between'>
      <div className='space-y-1'>
        {itemsTop.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            searchParams={searchParams}
          />
        ))}
      </div>
      <div className='flex flex-col items-center gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href='https://axium.userjot.com'
              target='_blank'
              className='flex size-8 items-center justify-center rounded-md hover:bg-zinc-200'
            >
              <MessageCircle className='text-muted-foreground size-4' />
            </Link>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>Feedback</p>
          </TooltipContent>
        </Tooltip>
        {itemsBottom.map((item) => (
          <SidebarItem
            key={item.name}
            item={item}
            searchParams={searchParams}
          />
        ))}
        <UserAvatar user={user} className='mt-4' />
      </div>
    </nav>
  )
}

type SidebarItemProps = {
  name: string
  href: string
  icon: LucideIcon
  isActive: boolean
  searchParams?: URLSearchParams
}

function SidebarItem({
  item,
  searchParams,
}: {
  item: SidebarItemProps
  searchParams: URLSearchParams
}) {
  const href = React.useMemo(() => {
    const params = searchParams ? `?${searchParams.toString()}` : ''

    return `${item.href}${params}`
  }, [item.href, searchParams])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md',
            item.isActive
              ? 'text-foreground bg-zinc-200'
              : 'text-muted-foreground hover:bg-zinc-200',
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
