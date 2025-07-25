'use client'

import { Button } from '@axium/ui/components/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@axium/ui/components/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { waitlistJoinAction } from '@/actions/waitlist-join-action'
import { waitlistJoinSchema } from '@/schemas/waitlist-join-schema'

type Props = {
  className?: string
}

export default function WaitlistJoinForm({ className }: Props) {
  const form = useForm<z.infer<typeof waitlistJoinSchema>>({
    resolver: zodResolver(waitlistJoinSchema),
    defaultValues: {
      email: '',
    },
  })

  const { execute, isExecuting } = useAction(waitlistJoinAction, {
    onExecute: () => {
      toast.loading('Joining waitlist...', {
        id: 'waitlist-join-form',
      })
    },
    onSuccess: () => {
      toast.success('Joined waitlist successfully', {
        id: 'waitlist-join-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'waitlist-join-form',
      })
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className={className}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <div className='border-input focus-within:border-ring focus-within:ring-ring/50 hover:border-ring bg-background flex w-fit rounded-xl border p-1 pl-3 shadow-lg transition-[color,box-shadow,border] focus-within:ring-[3px]'>
                <FormControl>
                  <input
                    disabled={isExecuting}
                    placeholder='email@example.com'
                    className='w-80 p-0 outline-none'
                    {...field}
                  />
                </FormControl>
                <Button size='lg' isLoading={isExecuting}>
                  Join waitlist
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
