'use client'

import { Button } from '@axium/ui/components/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@axium/ui/components/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { formatRelative } from 'date-fns'
import { Cog, MoreHorizontal, ShieldCheck, Trash } from 'lucide-react'
import UserAvatar from '@/components/user-avatar'
import { upsertUserStore } from '@/stores/upsert-user-store'
import type { User } from '@/types'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex items-center gap-2'>
          <UserAvatar user={user} size='sm' variant='outline' />
          <span>{user.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex items-center gap-1'>
          {user.role === 'admin' ? (
            <ShieldCheck className='size-3.5 text-muted-foreground' />
          ) : null}
          <p className='capitalize'>{user.role}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'lastLoginAt',
    header: 'Last login',
    cell: ({ row }) => {
      const user = row.original

      return (
        <p className='first-letter:uppercase'>
          {user.lastLoginAt
            ? formatRelative(user.lastLoginAt, new Date())
            : 'Never'}
        </p>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { setIsOpen, setUser } = upsertUserStore()

      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                setUser(user)
                setIsOpen(true)
              }}
            >
              <Cog />
              Edit user
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>
              <Trash />
              Delete user
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
