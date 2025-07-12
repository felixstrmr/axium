'use client'

import { Environment, Server } from '@axium/database/types'
import { Button, buttonVariants } from '@axium/ui/components/button'
import { Separator } from '@axium/ui/components/separator'
import { MoreVertical, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Props = {
  server: Server
  environment: Environment | null
}

export default function RDPViewHeader({ server, environment }: Props) {
  const searchParams = useSearchParams()

  const params = searchParams ? `?${searchParams.toString()}` : ''

  return (
    <div className='flex items-center justify-between p-4'>
      <div className='flex h-8 items-center gap-4'>
        <Link
          href={`/servers/${params}`}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <X className='text-muted-foreground size-4' />
        </Link>
        <Separator orientation='vertical' className='max-h-4' />
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            {server.name}
          </h1>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Button variant='ghost' size='icon'>
          <MoreVertical />
        </Button>
      </div>
    </div>
  )
}
