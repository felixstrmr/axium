'use client'

import { Separator } from '@axium/ui/components/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import HomeIcon from '@axium/ui/icons/home-icon'
import ServerIcon from '@axium/ui/icons/server-icon'
import SettingsIcon from '@axium/ui/icons/settings-icon'
import { cn } from '@axium/utils'
import { Home, LucideIcon, MessageCircle, Server, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function DashboardSidebar() {
  const segment = useSelectedLayoutSegment()

  const itemsTop = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
      activeIcon: HomeIcon,
      isActive: segment === null,
    },
    {
      name: 'Servers',
      href: '/servers',
      icon: Server,
      activeIcon: ServerIcon,
      isActive: segment === 'servers',
    },
  ]

  const itemsBottom = [
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      activeIcon: SettingsIcon,
      isActive: segment === 'settings',
    },
  ]

  return (
    <aside className='flex flex-col items-center border border-transparent px-4 py-5'>
      <Link href='/'>
        <div className='bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md'>
          <AxiumIcon className='size-5' />
        </div>
      </Link>
      <Separator className='my-4 max-w-4' />
      <div className='flex h-full flex-col justify-between'>
        <div className='space-y-1'>
          {itemsTop.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </div>
        <div className='space-y-1'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href='https://axium.userjot.com'
                target='_blank'
                className='hover:bg-muted flex size-8 items-center justify-center rounded-md transition-colors'
              >
                <MessageCircle className='text-muted-foreground size-4' />
              </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>
              <p>Feedback</p>
            </TooltipContent>
          </Tooltip>
          {itemsBottom.map((item) => (
            <SidebarItem key={item.name} item={item} />
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
  activeIcon: React.FC<React.SVGProps<SVGSVGElement>>
  isActive: boolean
}

function SidebarItem({ item }: { item: SidebarItemProps }) {
  const Icon = item.isActive ? item.activeIcon : item.icon

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            'flex size-8 items-center justify-center rounded-md transition-colors',
            item.isActive
              ? 'bg-muted text-foreground'
              : 'hover:bg-muted text-muted-foreground',
          )}
        >
          <Icon className='size-4' />
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{item.name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
