'use client'

import { Button } from '@axium/ui/components/button'
import { Cog, Trash } from 'lucide-react'
import { useState } from 'react'
import DeleteEnvironmentDialog from '@/components/dialogs/delete-environment-dialog'
import UpsertEnvironmentDialog from '@/components/dialogs/upsert-environment-dialog'
import type { Environment } from '@/types'

type Props = {
  environments: Environment[]
}

export default function EnvironmentsSetting({ environments }: Props) {
  const [isUpsertOpen, setIsUpsertOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] =
    useState<Environment | null>(null)

  const handleUpdateEnvironment = (environment: Environment) => {
    setIsUpsertOpen(true)
    setSelectedEnvironment(environment)
  }

  const handleDeleteEnvironment = (environment: Environment) => {
    setIsDeleteOpen(true)
    setSelectedEnvironment(environment)
  }

  return (
    <div className='bg-muted/50 p-1 rounded-xl w-full'>
      <div className='p-4 flex items-center justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold tracking-tight'>Environments</h3>
          <p className='text-sm text-muted-foreground'>
            Manage your environments.
          </p>
        </div>
        <UpsertEnvironmentDialog
          isOpen={isUpsertOpen}
          setIsOpen={setIsUpsertOpen}
          environment={selectedEnvironment}
          setEnvironment={setSelectedEnvironment}
        />
        <DeleteEnvironmentDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          environment={selectedEnvironment}
          setEnvironment={setSelectedEnvironment}
        />
      </div>
      <div className='bg-background rounded-lg shadow-xs border'>
        {environments.length < 1 ? (
          <div className='p-4'>
            <p className='text-sm text-muted-foreground'>
              No environments found.
            </p>
          </div>
        ) : (
          environments.map((environment) => (
            <div
              key={environment.id}
              className='p-4 border-t flex items-center gap-4 shadow-xs first:border-none group'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='size-2 rounded-full'
                  style={{ backgroundColor: environment.color }}
                />
                <h4>{environment.name}</h4>
              </div>
              {environment.isDefault && (
                <div className='px-2 border rounded-full bg-blue-50 border-blue-100'>
                  <span className='text-xs text-primary'>Default</span>
                </div>
              )}
              <div className='ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100'>
                <Button
                  variant='ghost'
                  size='iconSm'
                  onClick={() => handleUpdateEnvironment(environment)}
                >
                  <Cog />
                </Button>
                <button
                  type='button'
                  className='cursor-pointer size-7 flex items-center justify-center rounded-md text-destructive hover:text-destructive hover:bg-destructive/10'
                  onClick={() => handleDeleteEnvironment(environment)}
                >
                  <Trash className='size-3.5' />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
