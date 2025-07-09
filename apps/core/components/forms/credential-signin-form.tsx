'use client'

import { credentialSigninAction } from '@/actions/credential-signin-action'
import { credentialSigninSchema } from '@/schemas/credential-signin-schema'
import { Button } from '@axium/ui/components/button'
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
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export default function CredentialSigninForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof credentialSigninSchema>>({
    resolver: zodResolver(credentialSigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { execute, isExecuting } = useAction(credentialSigninAction, {
    onExecute: () => {
      toast.loading('Signing in...', {
        id: 'credential-signin-action',
      })
    },
    onSuccess: () => {
      toast.success('Signed in successfully', {
        id: 'credential-signin-action',
      })
      router.push('/')
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'credential-signin-action',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='w-64 space-y-8'>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    autoFocus
                    placeholder='email@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    type='password'
                    placeholder='••••••••••••'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button isLoading={isExecuting} className='w-full'>
          Sign in
        </Button>
      </form>
    </Form>
  )
}
