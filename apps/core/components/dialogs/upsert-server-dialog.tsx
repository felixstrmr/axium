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

export default function UpsertServerDialog() {
  const { isOpen, setIsOpen, server, setServer } = upsertServerStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DialogTrigger asChild>
          <Button onClick={() => setServer(null)}>Add server</Button>
        </DialogTrigger>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{server ? 'Update' : 'Create'} server</DialogTitle>
        </DialogHeader>
        <UpsertServerForm server={server} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
