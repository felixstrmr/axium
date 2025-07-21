'use client'

import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'
import UpsertEnvironmentForm from '@/components/forms/upsert-environment-form'
import type { Environment } from '@/types'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  environment: Environment | null
  setEnvironment: (environment: Environment | null) => void
}

export default function UpsertEnvironmentDialog({
  isOpen,
  setIsOpen,
  environment,
  setEnvironment,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setEnvironment(null)}>Add environment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {environment ? 'Update' : 'Create'} environment
          </DialogTitle>
        </DialogHeader>
        <UpsertEnvironmentForm
          environment={environment}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
