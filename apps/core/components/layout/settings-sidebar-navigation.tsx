'use client'

import { cn } from '@axium/utils'
import { Building2, Key, LucideIcon, UserCog, Users } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  isAdmin: boolean
}

export default function SettingsSidebarNavigation({ isAdmin }: Props) {
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  const itemsPersonal = [
    {
      name: 'Account',
      href: '/settings',
      icon: UserCog,
      isActive: segment === null,
    },
  ]

  const itemsAdmin = [
    {
      name: 'Workspace',
      href: '/settings/workspace',
      icon: Building2,
      isActive: segment === 'workspace',
    },
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
  ]

  return (
    <nav className='flex flex-col gap-1'>
      {itemsPersonal.map((item) => (
        <SidebarItem key={item.name} item={item} searchParams={searchParams} />
      ))}
      {isAdmin && (
        <div className='mt-4 flex flex-col gap-1'>
          <p className='text-muted-foreground text-xs'>Admin</p>
          {itemsAdmin.map((item) => (
            <SidebarItem
              key={item.name}
              item={item}
              searchParams={searchParams}
            />
          ))}
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
    <Link
      href={href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2',
        item.isActive
          ? 'text-foreground bg-muted'
          : 'text-muted-foreground hover:bg-muted',
      )}
    >
      <item.icon className='size-4' />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
