'use client'

import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'
import { upsertServerStore } from '@/stores/upsert-server-store'

export default function UpsertServerDialog() {
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
      </DialogContent>
    </Dialog>
  )
}
