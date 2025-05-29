'use client'

import DeleteEnviromentDialog from '@/components/dialogs/delete-environment-dialog'
import UpsertEnvironmentDialog from '@/components/dialogs/upsert-environment-dialog'
import { Button } from '@/components/ui/button'
import { useUpsertEnvironmentStore } from '@/store/use-upsert-environment-store'
import { Environment, Server } from '@/types'
import { Pencil } from 'lucide-react'

type Props = {
  environments: Environment[]
  servers: Server[]
}

export default function Environments({ environments, servers }: Props) {
  const { setOpen, setEnvironment } = useUpsertEnvironmentStore()

  const getServersByEnvironment = (environment: Environment) => {
    return servers.filter((server) => server.environmentId === environment.id)
  }

  return (
    <div className='bg-muted w-full rounded-lg'>
      <div className='flex items-center justify-between p-4'>
        <div>
          <div className='flex items-center gap-2'>
            <h2 className='text-lg font-semibold tracking-tight'>
              Environments
            </h2>
            <p className='text-muted-foreground text-sm'>
              {environments.length}
            </p>
          </div>
          <p className='text-muted-foreground text-sm'>
            Manage your environments here.
          </p>
        </div>

        <UpsertEnvironmentDialog />
      </div>
      {environments.length > 0 && (
        <div className='flex flex-col gap-1 px-1 pb-1'>
          {environments.map((environment) => (
            <div
              key={environment.id}
              className='group bg-background flex items-center justify-between rounded-md border p-3 shadow-xs'
            >
              <div className='flex h-7 items-center gap-2'>
                <div
                  className='size-3 rounded-full'
                  style={{ backgroundColor: environment.color }}
                />
                <p>{environment.name}</p>
                <p className='text-muted-foreground rounded-full border px-2 py-0.5 text-xs shadow-xs'>
                  {getServersByEnvironment(environment).length} servers
                </p>
              </div>
              <div className='translate-x-2 items-center gap-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100'>
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
                <DeleteEnviromentDialog environment={environment} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
