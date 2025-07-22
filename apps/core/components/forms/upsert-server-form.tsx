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
import { Tabs, TabsList, TabsTrigger } from '@axium/ui/components/tabs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Monitor, Terminal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { upsertServerAction } from '@/actions/upsert-server-action'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'
import type { Identity, Server } from '@/types'

const step1Schema = upsertServerSchema.pick({
  serverName: true,
  serverHost: true,
  serverPort: true,
})

type Props = {
  server: Server | null
  identity: Identity | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertServerForm({ setIsOpen }: Props) {
  const [step, setStep] = useState(1)
  const totalSteps = 2

  const form = useForm<z.infer<typeof upsertServerSchema>>({
    resolver: zodResolver(upsertServerSchema),
    defaultValues: {
      serverName: '',
      serverHost: '',
      serverPort: 22,
      identityType: 'ssh',
    },
  })

  const { execute, isExecuting } = useAction(upsertServerAction, {
    onExecute: () => {
      toast.loading('Saving server...', {
        id: 'upsert-server-form',
      })
    },
    onSuccess: () => {
      toast.success('Server saved successfully', {
        id: 'upsert-server-form',
      })
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-server-form',
      })
    },
  })

  const handleNext = async () => {
    if (step === 1) {
      const values = form.getValues()
      const result = step1Schema.safeParse({
        serverName: values.serverName,
        serverHost: values.serverHost,
        serverPort: values.serverPort,
      })
      if (!result.success) {
        result.error.issues.forEach((error) => {
          form.setError(error.path[0] as keyof typeof form.formState.errors, {
            message: error.message,
          })
        })
        return
      }
      setStep(2)
    } else if (step === 2) {
      form.handleSubmit((data) => execute(data))()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleNext()
        }}
      >
        <div className='space-y-4 p-4'>
          {step === 1 && (
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='serverName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isExecuting}
                        autoFocus
                        required
                        placeholder='My server'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex gap-2'>
                <FormField
                  control={form.control}
                  name='serverHost'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Host</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          required
                          placeholder='192.168.1.1'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='serverPort'
                  render={({ field }) => (
                    <FormItem className='w-1/3'>
                      <FormLabel>Port</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          required
                          placeholder='22'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='identityType'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Tabs value={field.value} onValueChange={field.onChange}>
                        <TabsList className='w-full'>
                          <TabsTrigger value='ssh'>
                            <Terminal className='size-3.5' />
                            SSH
                          </TabsTrigger>
                          <TabsTrigger value='rdp'>
                            <Monitor className='size-3.5' />
                            RDP
                          </TabsTrigger>
                          <TabsTrigger value='vnc'>
                            <Monitor className='size-3.5' />
                            VNC
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='identityUsername'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isExecuting}
                        placeholder='john.doe'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='identityPassword'
                render={({ field }) => (
                  <FormItem className='w-full'>
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
              {form.watch('identityType') === 'rdp' && (
                <FormField
                  control={form.control}
                  name='identityDomain'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Domain</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          placeholder='example.com'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        </div>
        <DialogFooter className='w-full justify-between flex'>
          <div className='flex items-center justify-between mr-auto'>
            <span className='text-sm text-muted-foreground'>
              Step {step} of {totalSteps}
            </span>
          </div>
          <Button
            type='button'
            variant='outline'
            onClick={handleBack}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button isLoading={isExecuting} type='submit'>
            {step === totalSteps ? 'Save' : 'Next'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
