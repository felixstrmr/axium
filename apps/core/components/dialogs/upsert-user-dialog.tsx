'use client'

import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'
import UpsertUserForm from '@/components/forms/upsert-user-form'
import { upsertUserStore } from '@/stores/upsert-user-store'

export default function UpsertUserDialog() {
  const { isOpen, setIsOpen, user, setUser } = upsertUserStore()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setUser(null)}>Add user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Update' : 'Create'} user</DialogTitle>
        </DialogHeader>
        <UpsertUserForm user={user} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
