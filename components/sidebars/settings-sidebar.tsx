'use client'

import { cn } from '@/utils'
import { Building, LucideIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SettingsSidebar() {
  const pathname = usePathname()

  const itemsUser = [
    {
      name: 'General',
      href: '/settings',
      icon: Settings,
      isActive: pathname === '/settings',
    },
  ]

  const itemsAdmin = [
    {
      name: 'General',
      href: '/settings/admin',
      icon: Building,
      isActive: pathname === '/settings/admin',
    },
  ]

  return (
    <aside className='flex max-w-64 min-w-64 flex-col gap-4 border-r p-4'>
      <div className='flex h-8 items-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>User</p>
          {itemsUser.map((item) => (
            <SidebarItem key={item.name} {...item} />
          ))}
        </div>
        <div className='space-y-1'>
          <p className='text-muted-foreground text-xs'>Admin</p>
          {itemsAdmin.map((item) => (
            <SidebarItem key={item.name} {...item} />
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
  isActive: boolean
}

function SidebarItem(item: SidebarItemProps) {
  return (
    <Link
      href={item.href}
      className={cn(
        'flex h-8 items-center gap-2 rounded-md border px-3 transition-all',
        item.isActive
          ? 'text-foreground bg-muted border-border'
          : 'text-muted-foreground hover:bg-muted hover:border-border border-transparent',
      )}
    >
      <item.icon className='size-4' />
      {item.name}
    </Link>
  )
}
