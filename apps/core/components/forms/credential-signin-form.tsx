'use client'

import { Button } from '@axium/ui/components/button'
import { Checkbox } from '@axium/ui/components/checkbox'
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
import { useRouter } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'
import { credentialSigninAction } from '@/actions/credential-signin-action'
import { credentialSigninSchema } from '@/schemas/credential-signin-schema'

export default function CredentialSigninForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof credentialSigninSchema>>({
    resolver: zodResolver(credentialSigninSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const { execute, isExecuting } = useAction(credentialSigninAction, {
    onExecute: () => {
      toast.loading('Signing in...', {
        id: 'credential-signin-form',
      })
    },
    onSuccess: () => {
      toast.success('Signed in successfully', {
        id: 'credential-signin-form',
      })
      router.push('/')
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'credential-signin-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className='space-y-8 w-64'>
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
                    required
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
                    required
                    placeholder='••••••••••••'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rememberMe'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center gap-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isExecuting}
                    />
                  </FormControl>
                  <FormLabel>Remember me</FormLabel>
                </div>
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
