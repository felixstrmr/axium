'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Credential } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Eye, Monitor, Terminal } from 'lucide-react'

export const columns: ColumnDef<Credential>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
