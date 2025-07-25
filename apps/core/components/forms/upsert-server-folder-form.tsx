'use client'

import { Button } from '@axium/ui/components/button'
import { DialogFooter } from '@axium/ui/components/dialog'
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
import type z from 'zod'
import { upsertServerFolderAction } from '@/actions/upsert-server-folder-action'
import { upsertServerFolderSchema } from '@/schemas/upsert-server-folder-schema'
import type { ServerFolder } from '@/types'

type Props = {
  serverFolder: ServerFolder | null
  parentId: string | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertServerFolderForm({
  serverFolder,
  parentId,
  setIsOpen,
}: Props) {
  const form = useForm<z.infer<typeof upsertServerFolderSchema>>({
    resolver: zodResolver(upsertServerFolderSchema),
    defaultValues: {
      id: serverFolder?.id ?? undefined,
      name: serverFolder?.name ?? '',
      parentId: serverFolder?.parentId ?? parentId ?? undefined,
      environmentId: serverFolder?.environmentId ?? undefined,
    },
  })

  const { execute, isExecuting } = useAction(upsertServerFolderAction, {
    onSuccess: () => {
      setIsOpen(false)
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
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button isLoading={isExecuting}>Save</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
