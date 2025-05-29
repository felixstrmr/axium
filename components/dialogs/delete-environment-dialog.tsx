'use client'

import { deleteEnvironmentAction } from '@/actions/delete-environment-action'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Environment } from '@/types'
import { Loader, Trash } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'

type Props = {
  environment: Environment
}

export default function DeleteEnviromentDialog({ environment }: Props) {
  const { execute, isExecuting } = useAction(deleteEnvironmentAction, {
    onExecute: () => {
      toast.loading('Deleting environment...', {
        id: 'delete-environment-dialog',
      })
    },
    onSuccess: () => {
      toast.success('Environment deleted successfully!', {
        id: 'delete-environment-dialog',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'delete-environment-dialog',
      })
    },
  })

  const handleDelete = () => {
    execute({ id: environment.id })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'} size={'iconSm'}>
          <Trash className='text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete "{environment.name}" Environment
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className='p-6'>
          <div className='border-destructive/15 bg-destructive/5 rounded-md border p-4'>
            <p className='text-destructive text-center'>
              Are you sure you want to delete this environment? This will
              permanently delete it from the database.
            </p>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: 'destructive' })}
            disabled={isExecuting}
            onClick={handleDelete}
          >
            {isExecuting && <Loader className='size-4 animate-spin' />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
