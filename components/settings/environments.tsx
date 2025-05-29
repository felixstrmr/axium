'use client'

import UpsertEnvironmentDialog from '@/components/dialogs/upsert-environment-dialog'
import { Button } from '@/components/ui/button'
import { useUpsertEnvironmentStore } from '@/store/use-upsert-environment-store'
import { Environment } from '@/types'
import { Box, Pencil, Trash } from 'lucide-react'

type Props = {
  environments: Environment[]
}

export default function Environments({ environments }: Props) {
  const { setOpen, setEnvironment } = useUpsertEnvironmentStore()

  return (
    <div className='bg-muted w-full rounded-lg'>
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center gap-2'>
          <h2 className='text-lg font-semibold tracking-tight'>Environments</h2>
          <p className='text-muted-foreground text-sm'>{environments.length}</p>
        </div>
        <UpsertEnvironmentDialog />
      </div>
      <div className='flex flex-col gap-1 px-1 pb-1'>
        {environments.map((environment) => (
          <div
            key={environment.id}
            className='bg-background flex items-center justify-between rounded-md border p-3 shadow-xs'
          >
            <div className='flex items-center gap-2'>
              <Box className='text-muted-foreground size-4' />
              <p>{environment.name}</p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant={'ghost'}
                size={'iconSm'}
                onClick={() => {
                  setEnvironment(environment)
                  setOpen(true)
                }}
              >
                <Pencil />
              </Button>
              <Button variant={'ghost'} size={'iconSm'}>
                <Trash className='text-destructive' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
