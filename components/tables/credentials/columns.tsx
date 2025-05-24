'use client'

import { Credential } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye, Monitor, Terminal } from 'lucide-react'

export const columns: ColumnDef<Credential>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const crendential = row.original

      const Icon = {
        ssh: Terminal,
        vnc: Eye,
        rdp: Monitor,
      }[crendential.type]

      return (
        <div className='flex items-center gap-2'>
          <Icon className='size-3.5' />
          <span className='uppercase'>{crendential.type}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'username',
    header: 'Username',
    cell: ({ row }) => {
      const crendential = row.original

      return <p>{crendential.username || '-'}</p>
    },
  },
  {
    accessorKey: 'createdBy.name',
    header: 'Created By',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const crendential = row.original

      return <p>{format(crendential.createdAt, 'PP')}</p>
    },
  },
]
