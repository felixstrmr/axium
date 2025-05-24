'use client'

import { createServerAction } from '@/actions/create-server-action'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createServerSchema } from '@/schemas'
import { Credential } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  credentials: Credential[]
}

export default function CreateServerForm({ credentials }: Props) {
  const [authType, setAuthType] = React.useState<'manual' | 'credentials'>(
    'credentials',
  )

  const form = useForm<z.infer<typeof createServerSchema>>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      name: '',
      host: '',
      port: 22,
      protocol: 'ssh',
      username: '',
      password: '',
      os: 'linux',
    },
  })

  const { execute, isExecuting } = useAction(createServerAction, {
    onExecute: () => {
      toast.loading('Creating server...', {
        id: 'create-server-form',
      })
    },
    onSuccess: () => {
      toast.success('Server created successfully!', {
        id: 'create-server-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'create-server-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8'>
        <div className='space-y-4'>
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
                    placeholder='e.g. PROD-DC-01'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isLoading={isExecuting}>Create server</Button>
      </form>
    </Form>
  )
}
