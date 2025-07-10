'use client'

import UpsertCredentialForm from '@/components/forms/upsert-credential-form'
import { upsertCredentialStore } from '@/stores/upsert-credential-store'
import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'

type Props = {}

export default function UpsertCredentialDialog({}: Props) {
  const { isOpen, setIsOpen, credential, setCredential } =
    upsertCredentialStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setCredential(null)}>Add credential</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {credential ? 'Update' : 'Create'} credential
          </DialogTitle>
        </DialogHeader>
        <UpsertCredentialForm credential={credential} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
