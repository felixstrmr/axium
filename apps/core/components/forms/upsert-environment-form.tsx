'use client'

import { upsertEnvironmentAction } from '@/actions/upsert-environment-action'
import { DEFAULT_ENVIRONMENT_COLORS } from '@/lib/constants'
import { upsertEnvironmentSchema } from '@/schemas/upsert-environment-schema'
import { Environment } from '@axium/database/types'
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
import { Switch } from '@axium/ui/components/switch'
import { Textarea } from '@axium/ui/components/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  environment: Environment | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertEnvironmentForm({
  environment,
  setIsOpen,
}: Props) {
  const form = useForm<z.infer<typeof upsertEnvironmentSchema>>({
    resolver: zodResolver(upsertEnvironmentSchema),
    defaultValues: {
      id: environment?.id ?? undefined,
      name: environment?.name ?? '',
      color: environment?.color ?? '',
      description: environment?.description ?? undefined,
      isDefault: environment?.isDefault ?? false,
    },
  })

  const { execute, isExecuting } = useAction(upsertEnvironmentAction, {
    onExecute: () => {
      toast.loading(`${environment ? 'Updating' : 'Creating'} environment...`, {
        id: 'upsert-environment-action',
      })
    },
    onSuccess: () => {
      toast.success(
        `${environment ? 'Updated' : 'Created'} environment successfully`,
        {
          id: 'upsert-environment-action',
        },
      )
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-environment-action',
      })
    },
  })

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
                    placeholder='e.g. Production'
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
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isExecuting}
                    placeholder='e.g. Production environment'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isDefault'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center gap-2'>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Default environment</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <div className='flex items-center gap-2'>
                    {DEFAULT_ENVIRONMENT_COLORS.map((color) => (
                      <div
                        key={color}
                        className='flex h-7 w-full cursor-pointer items-center justify-center rounded-md'
                        style={{ backgroundColor: color }}
                        onClick={() => field.onChange(color)}
                      >
                        {field.value === color && (
                          <Check className='text-primary-foreground size-4' />
                        )}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button isLoading={isExecuting}>
            {environment ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
