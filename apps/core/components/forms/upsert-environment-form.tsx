'use client'

import { upsertEnvironmentAction } from '@/actions/upsert-environment-action'
import { DEFAULT_COLORS } from '@/lib/constants'
import { upsertEnvironmentSchema } from '@/schemas/create-environment-schema'
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
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function UpsertEnvironmentForm() {
  const [selectedColor, setSelectedColor] = React.useState(DEFAULT_COLORS[0])

  const form = useForm<z.infer<typeof upsertEnvironmentSchema>>({
    resolver: zodResolver(upsertEnvironmentSchema),
    defaultValues: {
      name: '',
      description: '',
      color: selectedColor,
      isDefault: false,
    },
  })

  const { execute, isExecuting } = useAction(upsertEnvironmentAction, {
    onExecute: () => {
      toast.loading('Creating environment...', {
        id: 'create-environment-form    ',
      })
    },
    onSuccess: () => {
      toast.success('Environment created successfully', {
        id: 'create-environment-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'create-environment-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isExecuting}
                  placeholder='Production, Staging, Development...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
