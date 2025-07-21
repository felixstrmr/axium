'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@axium/ui/components/dropdown-menu'
import type { User } from 'better-auth'
import { SettingsIcon } from 'lucide-react'
import UserAvatar from '@/components/user-avatar'

type Props = {
  user: User
}

export default function UserDropdown({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent side='right' align='end' className='w-48'>
        <DropdownMenuItem>
          <SettingsIcon />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
