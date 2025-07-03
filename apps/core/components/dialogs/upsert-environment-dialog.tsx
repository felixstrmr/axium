import { Environment } from '@/db/types'
import { Button } from '@axium/ui/components/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@axium/ui/components/dialog'

type Props = {
  environment?: Environment
}

export default function UpsertEnvironmentDialog({}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create environment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
