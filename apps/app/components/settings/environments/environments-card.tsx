'use client'

import UpsertEnvironmentDialog from '@/components/dialogs/upsert-environment-dialog'
import { Environment } from '@axium/db/types'

type Props = {
  environments: Environment[]
}

export default function EnvironmentsCard({ environments }: Props) {
  return (
    <div className='bg-muted rounded-2xl p-1'>
      <div className='flex items-center justify-between p-4'>
        <div>
          <h2 className='text-lg font-semibold tracking-tight'>Environments</h2>
          <p className='text-muted-foreground text-sm'>
            Manage your environments here.
          </p>
        </div>
        <UpsertEnvironmentDialog />
      </div>
      <div className='bg-background rounded-lg border p-4 shadow-xs'>
        {environments.map((environment) => (
          <div key={environment.id}>{environment.name}</div>
        ))}
      </div>
    </div>
  )
}
