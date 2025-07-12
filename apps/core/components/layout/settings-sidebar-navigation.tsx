'use client'

import BuildingIcon from '@axium/ui/icons/building-icon'
import FolderIcon from '@axium/ui/icons/folder-icon'
import LockIcon from '@axium/ui/icons/lock-icon'
import UserCogIcon from '@axium/ui/icons/user-cog-icon'
import UserIcon from '@axium/ui/icons/user-icon'
import { cn } from '@axium/utils'
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
      icon: UserCogIcon,
      isActive: segment === null,
    },
  ]

  const itemsAdmin = [
    {
      name: 'Workspace',
      href: '/settings/workspace',
      icon: BuildingIcon,
      isActive: segment === 'workspace',
    },
    {
      name: 'Users',
      href: '/settings/users',
      icon: UserIcon,
      isActive: segment === 'users',
    },
    {
      name: 'Groups',
      href: '/settings/groups',
      icon: FolderIcon,
      isActive: segment === 'groups',
    },
    {
      name: 'Credentials',
      href: '/settings/credentials',
      icon: LockIcon,
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
    <Link
      href={href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md px-2',
        item.isActive ? 'bg-muted' : 'hover:bg-muted',
      )}
    >
      <item.icon className='text-muted-foreground size-4' />
      <span
        className={cn(
          'text-sm',
          item.isActive ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {item.name}
      </span>
    </Link>
  )
}
