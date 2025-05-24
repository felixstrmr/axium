'use client'

import { createCredentialAction } from '@/actions/create-credential-action'
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
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { createCredentialSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, Monitor, Terminal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export default function CreateCredentialForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof createCredentialSchema>>({
    resolver: zodResolver(createCredentialSchema),
    defaultValues: {
      name: '',
      description: '',
      username: '',
      password: '',
      domain: '',
      type: 'ssh',
    },
  })

  const { execute, isExecuting } = useAction(createCredentialAction, {
    onExecute: () => {
      toast.loading('Creating credential...', {
        id: 'create-credential-form',
      })
    },
    onSuccess: () => {
      router.push('/settings/credentials')
      toast.success('Credential created successfully!', {
        id: 'create-credential-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'create-credential-form',
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
                    placeholder='e.g. Admin Credentials'
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
                    placeholder='Additional notes about these credentials...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label>Type</Label>
            <Tabs
              value={form.watch('type')}
              onValueChange={(value) =>
                form.setValue('type', value as 'ssh' | 'vnc' | 'rdp')
              }
              className='mt-2'
            >
              <TabsList className='w-full'>
                <TabsTrigger value='ssh'>
                  <Terminal className='size-3.5' />
                  SSH
                </TabsTrigger>
                <TabsTrigger value='vnc'>
                  <Eye className='size-3.5' />
                  VNC
                </TabsTrigger>
                <TabsTrigger value='rdp'>
                  <Monitor className='size-3.5' />
                  RDP
                </TabsTrigger>
              </TabsList>
              <TabsContent value='ssh' className='space-y-4 pt-4'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          placeholder='e.g. root'
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
              </TabsContent>
              <TabsContent value='vnc' className='pt-4'>
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
              </TabsContent>
              <TabsContent value='rdp'>rdp</TabsContent>
            </Tabs>
          </div>
        </div>
        <Button isLoading={isExecuting}>Create credential</Button>
      </form>
    </Form>
  )
}
