'use client'

import type { ColumnDef } from '@tanstack/react-table'
import UserAvatar from '@/components/user-avatar'
import type { User } from '@/types'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className='flex items-center gap-2'>
          <UserAvatar user={user} size='sm' />
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

      return <p className='capitalize'>{user.role}</p>
    },
  },
]
