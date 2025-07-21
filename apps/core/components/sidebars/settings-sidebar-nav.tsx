'use client'

import { cn } from '@axium/ui/lib/utils'
import {
  Building,
  Key,
  type LucideIcon,
  Server,
  UserCog,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  isAdmin: boolean
}

export default function SettingsSidebarNav({ isAdmin }: Props) {
  const searchParams = useSearchParams()
  const segment = useSelectedLayoutSegment()

  const itemsUser = [
    {
      name: 'Account',
      href: `/settings?${searchParams ? searchParams.toString() : ''}`,
      icon: UserCog,
      isActive: segment === null,
    },
  ]

  const itemsGeneral = [
    {
      name: 'Workspace',
      href: `/settings/workspace?${searchParams ? searchParams.toString() : ''}`,
      icon: Building,
      isActive: segment === 'workspace',
    },
    {
      name: 'Users',
      href: `/settings/users?${searchParams ? searchParams.toString() : ''}`,
      icon: Users,
      isActive: segment === 'users',
    },
  ]

  const itemsServer = [
    {
      name: 'Servers',
      href: `/settings/servers?${searchParams ? searchParams.toString() : ''}`,
      icon: Server,
      isActive: segment === 'servers',
    },
    {
      name: 'Identities',
      href: `/settings/identities?${searchParams ? searchParams.toString() : ''}`,
      icon: Key,
      isActive: segment === 'identities',
    },
  ]

  return (
    <nav className='flex flex-col gap-4'>
      <ul className='space-y-1'>
        {itemsUser.map((item) => (
          <SidebarItem key={item.name} {...item} />
        ))}
      </ul>
      {isAdmin && (
        <div className='space-y-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-muted-foreground'>General</p>
            <ul className='space-y-1'>
              {itemsGeneral.map((item) => (
                <SidebarItem key={item.name} {...item} />
              ))}
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-xs text-muted-foreground'>Server</p>
            <ul className='space-y-1'>
              {itemsServer.map((item) => (
                <SidebarItem key={item.name} {...item} />
              ))}
            </ul>
          </div>
        </div>
      )}
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
    <Link
      href={item.href}
      className={cn(
        'h-8 px-2 gap-2 flex items-center rounded-md border',
        item.isActive
          ? 'bg-muted text-foreground border-border shadow-xs'
          : 'text-muted-foreground border-transparent hover:bg-muted'
      )}
    >
      <item.icon className={cn('size-4', item.isActive && 'text-primary ')} />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
