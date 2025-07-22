'use client'

import { Button } from '@axium/ui/components/button'
import { DialogClose, DialogFooter } from '@axium/ui/components/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@axium/ui/components/form'
import { Input } from '@axium/ui/components/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { deleteEnvironmentAction } from '@/actions/delete-environment-action'
import { deleteEnvironmentSchema } from '@/schemas/delete-environment-schema'
import type { Environment } from '@/types'

type Props = {
  environment: Environment
  setIsOpen: (isOpen: boolean) => void
}

export default function DeleteEnvironmentForm({
  environment,
  setIsOpen,
}: Props) {
  const form = useForm<z.infer<typeof deleteEnvironmentSchema>>({
    resolver: zodResolver(deleteEnvironmentSchema),
    defaultValues: {
      id: environment.id,
      name: '',
    },
  })

  const { execute, isExecuting } = useAction(deleteEnvironmentAction, {
    onExecute: () => {
      toast.loading('Deleting environment...', {
        id: 'delete-environment-form',
      })
    },
    onSuccess: () => {
      toast.success('Environment deleted successfully', {
        id: 'delete-environment-form',
      })
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'delete-environment-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <div className='space-y-4 p-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  To confirm, type "{environment.name}" below
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    required
                    placeholder={environment.name}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' variant='outline'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            isLoading={isExecuting}
            disabled={environment.name !== form.watch('name') || isExecuting}
            variant='destructive'
          >
            Delete
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
