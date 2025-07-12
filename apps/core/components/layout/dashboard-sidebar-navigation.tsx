'use client'

import UserAvatar from '@/components/user-avatar'
import { User } from '@axium/database/types'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import HouseIcon from '@axium/ui/icons/house-icon'
import MessageCircleIcon from '@axium/ui/icons/message-circle-icon'
import ServerIcon from '@axium/ui/icons/server-icon'
import SettingsIcon from '@axium/ui/icons/settings-icon'
import { cn } from '@axium/utils'
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
              className='flex size-8 items-center justify-center rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800'
            >
              <MessageCircleIcon className='text-muted-foreground size-4' />
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
  icon: React.ElementType
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
              ? 'text-foreground bg-zinc-200 dark:bg-zinc-800'
              : 'text-muted-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800',
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
