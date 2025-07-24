'use client'

import { Button, buttonVariants } from '@axium/ui/components/button'
import { Separator } from '@axium/ui/components/separator'
import { MoreVertical, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { Environment, Identity, Server } from '@/types'

type Props = {
  server: Server
  identity: Identity
  environment: Environment | null
}

export default function SSHViewHeader({ server, environment }: Props) {
  const searchParams = useSearchParams()

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex h-8 items-center gap-4'>
        <Link
          href={`/servers?${searchParams ? searchParams.toString() : ''}`}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <X className='text-muted-foreground size-4' />
        </Link>
        <Separator orientation='vertical' className='max-h-4' />
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {server.name}
          </h1>
          {environment && (
            <div className='flex items-center gap-2'>
              <div
                className='size-2 rounded-full'
                style={{ backgroundColor: environment.color }}
              />
              <span className='text-sm'>{environment?.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <p className='text-muted-foreground text-sm'>{server.host}</p>
        <Button variant='ghost' size='icon'>
          <MoreVertical />
        </Button>
      </div>
    </div>
  )
}
