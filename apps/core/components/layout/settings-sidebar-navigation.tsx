'use client'

import { cn } from '@axium/utils'
import { Building2, Key, LucideIcon, UserCog, Users } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

type Props = {
  isAdmin: boolean
}

export default function SettingsSidebarNavigation({ isAdmin }: Props) {
  const segment = useSelectedLayoutSegment()

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
        <SidebarItem key={item.name} item={item} />
      ))}
      {isAdmin && (
        <div className='mt-4 flex flex-col gap-1'>
          <p className='text-muted-foreground text-xs'>Admin</p>
          {itemsAdmin.map((item) => (
            <SidebarItem key={item.name} item={item} />
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
}

function SidebarItem({ item }: { item: SidebarItemProps }) {
  return (
    <Link
      href={item.href}
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
