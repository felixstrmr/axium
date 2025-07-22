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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { Textarea } from '@axium/ui/components/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { upsertServerAction } from '@/actions/upsert-server-action'
import { useEnvironment } from '@/components/providers/environment-provider'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'
import type { Server } from '@/types'

type Props = {
  server: Server | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertServerForm({ server, setIsOpen }: Props) {
  const { environments, currentEnvironmentId } = useEnvironment()

  const form = useForm<z.infer<typeof upsertServerSchema>>({
    resolver: zodResolver(upsertServerSchema),
    defaultValues: {
      id: server?.id,
      name: server?.name ?? '',
      description: server?.description ?? undefined,
      host: server?.host ?? '',
      environmentId:
        server?.environmentId ??
        (currentEnvironmentId !== 'all' ? currentEnvironmentId : undefined),
    },
  })

  const { execute, isExecuting } = useAction(upsertServerAction, {
    onExecute: () => {
      toast.loading('Saving server...', {
        id: 'upsert-server-form',
      })
    },
    onSuccess: () => {
      toast.success('Server saved successfully', {
        id: 'upsert-server-form',
      })
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-server-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <div className='space-y-4 p-4'>
          {environments.length > 0 && (
            <FormField
              control={form.control}
              name='environmentId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environment (optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select an environment' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {environments.map((environment) => (
                        <SelectItem key={environment.id} value={environment.id}>
                          <div
                            className='size-2 rounded-full'
                            style={{
                              backgroundColor: environment.color,
                            }}
                          />
                          {environment.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
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
                    required
                    placeholder='My server'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isExecuting}
                    className='resize-none'
                    placeholder='My server description'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='host'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    required
                    placeholder='e.g. 192.168.1.100'
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
          <Button isLoading={isExecuting}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
