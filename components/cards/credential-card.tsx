'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Credential, Server } from '@/types'
import { cn } from '@/utils'
import { format } from 'date-fns'
import { Eye, Monitor, MoreHorizontal, Pencil, Terminal } from 'lucide-react'
import React from 'react'

type Props = {
  credential: Credential
  servers: Server[]
}

export default function CredentialCard({ credential, servers }: Props) {
  const [isOpen, setIsOpen] = React.useState(false)

  const Icon = {
    ssh: Terminal,
    vnc: Eye,
    rdp: Monitor,
  }[credential.type]

  return (
    <div className='group bg-background flex w-full flex-col gap-2 rounded-md border p-4 shadow-xs'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-2'>
          <div className='bg-muted flex size-7 items-center justify-center rounded-md'>
            <Icon className='text-muted-foreground size-4' />
          </div>
          <p>{credential.name}</p>
        </div>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='iconSm'
              className={cn(
                'translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100',
                isOpen && 'translate-x-0 opacity-100',
              )}
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='start'
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem>
              <Pencil />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='flex items-center gap-2'>
        <p className='text-muted-foreground text-xs'>
          {format(credential.createdAt, 'PP')}
        </p>
        <p className='mb-1'>•</p>
        <p className='text-muted-foreground text-xs'>
          {servers.length} servers
        </p>
      </div>
    </div>
  )
}
