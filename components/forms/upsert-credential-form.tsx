'use client'

import { upsertCredentialAction } from '@/actions/upsert-credential-action'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { upsertCredentialSchema } from '@/schemas'
import { Credential, Environment } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, Monitor, Terminal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  environments: Environment[]
  credential: Credential | null
}

export default function UpsertCredentialForm({
  environments,
  credential,
}: Props) {
  const router = useRouter()

  const form = useForm<z.infer<typeof upsertCredentialSchema>>({
    resolver: zodResolver(upsertCredentialSchema),
    defaultValues: {
      id: credential?.id ?? '',
      name: credential?.name ?? '',
      description: credential?.description ?? '',
      type: credential?.type ?? 'ssh',
      username: credential?.username ?? '',
      password: credential?.password ?? '',
      domain: credential?.domain ?? '',
    },
  })

  const { execute, isExecuting } = useAction(upsertCredentialAction, {
    onExecute: () => {
      toast.loading('Creating credential...', {
        id: 'upsert-credential-form',
      })
    },
    onSuccess: () => {
      router.push('/settings/credentials')
      toast.success('Credential created successfully!', {
        id: 'upsert-credential-form',
      })
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-credential-form',
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
                    placeholder='e.g. Admin Credential'
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isExecuting}
                    placeholder='e.g. This is the admin credential for the server'
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='environmentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select an environment' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {environments.map((environment) => (
                      <SelectItem
                        key={environment.id}
                        value={environment.id}
                        className='flex items-center gap-2'
                      >
                        <div
                          className='size-2 rounded-full'
                          style={{ backgroundColor: environment.color }}
                        />
                        {environment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Tabs onValueChange={field.onChange} value={field.value}>
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
                  </Tabs>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('type') === 'ssh' && (
            <>
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
            </>
          )}
          {form.watch('type') === 'vnc' && (
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
          )}
          {form.watch('type') === 'rdp' && (
            <>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isExecuting}
                        placeholder='e.g. CONTOSO\Administrator'
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
              <FormField
                control={form.control}
                name='domain'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain (optional)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isExecuting}
                        placeholder='e.g. WORKGROUP'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <div className='flex justify-end gap-2'>
          <Link
            href='/settings/credentials'
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </Link>
          <Button
            isLoading={isExecuting}
            disabled={!form.formState.isDirty || isExecuting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
