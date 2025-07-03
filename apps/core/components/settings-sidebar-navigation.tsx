'use client'

import { cn } from '@axium/utils'
import { LucideIcon, Settings2, UserCog } from 'lucide-react'
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
      name: 'General',
      href: '/settings/general',
      icon: Settings2,
      isActive: segment === 'general',
    },
  ]

  return (
    <div className='flex flex-col gap-4'>
      <div className='space-y-1'>
        <p className='text-muted-foreground mb-2 text-xs'>Personal</p>
        {itemsPersonal.map((item) => (
          <SidebarItem key={item.name} item={item} />
        ))}
      </div>
      {isAdmin && (
        <div className='space-y-1'>
          <p className='text-muted-foreground mb-2 text-xs'>Admin</p>
          {itemsAdmin.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </div>
      )}
    </div>
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
        'flex h-8 items-center gap-2 rounded-md px-2 transition-colors',
        item.isActive
          ? 'bg-muted text-foreground'
          : 'text-muted-foreground hover:bg-muted',
      )}
    >
      <item.icon className='size-4' />
      <span className='text-sm'>{item.name}</span>
    </Link>
  )
}
