'use client'

import UpsertEnviromentForm from '@/components/forms/upsert-environment-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useUpsertEnvironmentStore } from '@/store/use-upsert-environment-store'
import { Plus } from 'lucide-react'

export default function UpsertEnvironmentDialog() {
  const { isOpen, setOpen, setEnvironment, environment } =
    useUpsertEnvironmentStore()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setEnvironment(null)}>
          <Plus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {environment ? 'Update' : 'Create'} Environment
          </DialogTitle>
        </DialogHeader>
        <UpsertEnviromentForm environment={environment} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
