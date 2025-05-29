'use client'

import UpsertCredentialForm from '@/components/forms/upsert-credential-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useUpsertCredentialStore } from '@/store/use-upsert-credential-store'
import { Credential, Environment } from '@/types'
import { Plus } from 'lucide-react'

type Props = {
  environments: Environment[]
}

export default function UpsertCredentialDialog({ environments }: Props) {
  const { isOpen, setOpen, credential } = useUpsertCredentialStore()

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Credential</DialogTitle>
        </DialogHeader>
        <UpsertCredentialForm
          environments={environments}
          credential={credential as Credential}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
