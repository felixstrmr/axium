'use client'

import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'
import UpsertServerForm from '@/components/forms/upsert-server-form'
import { upsertServerStore } from '@/stores/upsert-server-store'
import type { Identity } from '@/types'

type Props = {
  identities: Identity[]
}

export default function UpsertServerDialog({ identities }: Props) {
  const { isOpen, setIsOpen, server, setServer, folderId, setFolderId } =
    upsertServerStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setServer(null)
            setFolderId(null)
          }}
        >
          Add server
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{server ? 'Update' : 'Create'} server</DialogTitle>
        </DialogHeader>
        <UpsertServerForm
          server={server}
          identities={identities}
          setIsOpen={setIsOpen}
          folderId={folderId}
        />
      </DialogContent>
    </Dialog>
  )
}
