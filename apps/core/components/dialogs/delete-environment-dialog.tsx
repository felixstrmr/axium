'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@axium/ui/components/dialog'
import DeleteEnvironmentForm from '@/components/forms/delete-environment-form'
import type { Environment } from '@/types'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  environment: Environment | null
  setEnvironment: (environment: Environment | null) => void
}

export default function DeleteEnvironmentDialog({
  isOpen,
  setIsOpen,
  environment,
}: Props) {
  if (!environment) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete environment</DialogTitle>
        </DialogHeader>
        <div className='p-4'>
          <div className='bg-destructive/10 border border-destructive/20 p-4 justify-center items-center flex gap-4 rounded-md'>
            <p className='text-destructive text-sm text-center'>
              This action cannot be undone. <br /> This will permanently delete
              the environment.
            </p>
          </div>
        </div>
        <DeleteEnvironmentForm
          environment={environment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
