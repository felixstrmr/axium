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
import { Label } from '@/components/ui/label'
import { upsertEnvironmentSchema } from '@/schemas'
import { Environment } from '@/types'
import { cn } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  environment: Environment | null
  setOpen: (isOpen: boolean) => void
}

export default function UpsertEnviromentForm({ environment, setOpen }: Props) {
  const form = useForm<z.infer<typeof upsertEnvironmentSchema>>({
    resolver: zodResolver(upsertEnvironmentSchema),
    defaultValues: {
      id: environment?.id ?? '',
      name: environment?.name ?? '',
      color: environment?.color ?? '',
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
      const errorMessage = error.serverError?.includes('unique')
        ? 'Environment name must be unique'
        : error.serverError

      toast.error(errorMessage, {
        id: 'upsert-environment-form',
      })
    },
  })

  const colors = [
    {
      name: 'Green',
      value: '#16a34a',
    },
    {
      name: 'Red',
      value: '#dc2626',
    },

    {
      name: 'Yellow',
      value: '#ca8a04',
    },
    {
      name: 'Orange',
      value: '#ea580c',
    },
    {
      name: 'Blue',
      value: '#2563eb',
    },
    {
      name: 'Purple',
      value: '#9333ea',
    },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)}>
        <div className='space-y-4 p-6'>
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
          <div className='space-y-2'>
            <Label>Color</Label>
            <div className='grid grid-cols-3 gap-2'>
              {colors.map((color) => (
                <button
                  key={color.name}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-md border p-2 shadow-xs',
                    form.watch('color') === color.value
                      ? 'border-ring bg-muted'
                      : 'border-border hover:bg-muted',
                  )}
                  type='button'
                  onClick={() => {
                    form.setValue('color', color.value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    })
                  }}
                >
                  <div
                    className='size-3 rounded-full'
                    style={{ backgroundColor: color.value }}
                  />
                  <p className='text-sm'>{color.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>Cancel</Button>
          </DialogClose>
          <Button
            isLoading={isExecuting}
            disabled={!form.formState.isDirty || isExecuting}
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
