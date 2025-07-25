'use client'

import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'
import UpsertServerFolderForm from '@/components/forms/upsert-server-folder-form'
import { upsertServerFolderStore } from '@/stores/upsert-server-folder-store'

export default function UpsertServerFolderDialog() {
  const {
    isOpen,
    setIsOpen,
    serverFolder,
    setServerFolder,
    parentId,
    setParentId,
  } = upsertServerFolderStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          onClick={() => {
            setServerFolder(null)
            setParentId(null)
          }}
        >
          Add folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{serverFolder ? 'Update' : 'Create'} folder</DialogTitle>
        </DialogHeader>
        <UpsertServerFolderForm
          serverFolder={serverFolder}
          parentId={parentId}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
