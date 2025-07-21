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
import { Switch } from '@axium/ui/components/switch'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { upsertEnvironmentAction } from '@/actions/upsert-environment-action'
import { DEFAULT_ENVIRONMENT_COLORS } from '@/lib/constants'
import { upsertEnvironmentSchema } from '@/schemas/upsert-environment-schema'
import type { Environment } from '@/types'

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
      id: environment?.id,
      name: environment?.name ?? '',
      color: environment?.color ?? '',
      isDefault: environment?.isDefault ?? false,
    },
  })

  const { execute, isExecuting } = useAction(upsertEnvironmentAction, {
    onExecute: () => {
      toast.loading('Saving environment...', {
        id: 'upsert-environment-form',
      })
    },
    onSuccess: () => {
      toast.success('Environment saved successfully', {
        id: 'upsert-environment-form',
      })
      setIsOpen(false)
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
        <div className='space-y-4 p-4'>
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
                    placeholder='Production'
                    {...field}
                  />
                </FormControl>
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
                  <div className='flex gap-1'>
                    {DEFAULT_ENVIRONMENT_COLORS.map((color) => (
                      <button
                        type='button'
                        key={color}
                        className='h-7 w-full cursor-pointer rounded-md flex items-center justify-center'
                        style={{ backgroundColor: color }}
                        onClick={() => field.onChange(color)}
                      >
                        {field.value === color && (
                          <Check className='size-3.5 text-white' />
                        )}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='isDefault'
            render={({ field }) => (
              <FormItem className='flex'>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Default environment</FormLabel>
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
          <Button type='submit' isLoading={isExecuting}>
            Save
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
