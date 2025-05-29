'use client'

import { upsertEnvironmentAction } from '@/actions/upsert-environment-action'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { upsertEnvironmentSchema } from '@/schemas'
import { useUpsertEnvironmentStore } from '@/store/use-upsert-environment-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function UpsertEnviromentForm() {
  const { environment, setOpen } = useUpsertEnvironmentStore()

  const form = useForm<z.infer<typeof upsertEnvironmentSchema>>({
    resolver: zodResolver(upsertEnvironmentSchema),
    defaultValues: {
      id: environment?.id ?? '',
      name: environment?.name ?? '',
    },
  })

  const { execute, isExecuting } = useAction(upsertEnvironmentAction, {
    onExecute: () => {
      toast.loading('Creating environment...', {
        id: 'upsert-environment-form',
      })
    },
    onSuccess: () => {
      setOpen(false)
      toast.success('Environment created successfully!', {
        id: 'upsert-environment-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-environment-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <div className='p-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder='e.g. Production'
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
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button isLoading={isExecuting} disabled={!form.formState.isDirty}>
            {environment ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
