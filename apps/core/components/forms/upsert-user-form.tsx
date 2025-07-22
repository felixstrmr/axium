'use client'

import { Button } from '@axium/ui/components/button'
import { Checkbox } from '@axium/ui/components/checkbox'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { upsertUserAction } from '@/actions/upsert-user-action'
import { upsertUserSchema } from '@/schemas/upsert-user-schema'
import type { User } from '@/types'

type Props = {
  user: User | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertUserForm({ user, setIsOpen }: Props) {
  const form = useForm<z.infer<typeof upsertUserSchema>>({
    resolver: zodResolver(upsertUserSchema),
    defaultValues: {
      id: user?.id ?? undefined,
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: (user?.role as 'admin' | 'user') ?? 'user',
      password: '',
      confirmPassword: '',
    },
  })

  const { execute, isExecuting } = useAction(upsertUserAction, {
    onExecute: () => {
      toast.loading('Saving user...', {
        id: 'upsert-user-form',
      })
    },
    onSuccess: () => {
      toast.success('User saved successfully', {
        id: 'upsert-user-form',
      })
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-user-form',
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
                    required
                    placeholder='John Doe'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isExecuting}
                    required
                    placeholder='john.doe@example.com'
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
          {form.watch('password') && (
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
          )}
          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center gap-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value === 'admin'}
                      onCheckedChange={() =>
                        field.onChange(
                          field.value === 'admin' ? 'user' : 'admin'
                        )
                      }
                      disabled={isExecuting}
                    />
                  </FormControl>
                  <FormLabel>Administrator</FormLabel>
                </div>
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
