'use client'

import { upsertCredentialAction } from '@/actions/upsert-credential-action'
import { useEnvironment } from '@/components/providers/environment-provider'
import { upsertCredentialSchema } from '@/schemas/upsert-credential-schema'
import { Credential } from '@axium/database/types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { Tabs, TabsList, TabsTrigger } from '@axium/ui/components/tabs'
import { Textarea } from '@axium/ui/components/textarea'
import WindowsIcon from '@axium/ui/icons/windows-icon'
import { zodResolver } from '@hookform/resolvers/zod'
import { Monitor, Terminal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

type Props = {
  credential: Credential | null
  setIsOpen: (isOpen: boolean) => void
}

export default function UpsertCredentialForm({ credential, setIsOpen }: Props) {
  const { currentEnvironmentId, environments } = useEnvironment()

  const form = useForm<z.infer<typeof upsertCredentialSchema>>({
    resolver: zodResolver(upsertCredentialSchema),
    defaultValues: {
      id: credential?.id ?? undefined,
      name: credential?.name ?? '',
      description: credential?.description ?? undefined,
      username: credential?.username ?? '',
      password: credential?.password ?? '',
      domain: credential?.domain ?? '',
      environmentId:
        credential?.environmentId ??
        (currentEnvironmentId === 'all' ? undefined : currentEnvironmentId),
      type: credential?.type ?? 'ssh',
    },
  })

  const { execute, isExecuting } = useAction(upsertCredentialAction, {
    onExecute: () => {
      toast.loading(`${credential ? 'Updating' : 'Creating'} credential...`, {
        id: 'upsert-credential-action',
      })
    },
    onSuccess: () => {
      toast.success(
        `${credential ? 'Updated' : 'Created'} credential successfully`,
        {
          id: 'upsert-credential-action',
        },
      )
      setIsOpen(false)
    },
    onError: ({ error }) => {
      toast.error(error.serverError, {
        id: 'upsert-credential-action',
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
                    placeholder='e.g. Admin'
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
                    placeholder='e.g. Admin credentials'
                    className='resize-none'
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
                    <SelectTrigger className='mb-4 w-full'>
                      <SelectValue placeholder='Select an environment' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {environments.map((environment) => (
                      <SelectItem key={environment.id} value={environment.id}>
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
                <FormControl>
                  <Tabs value={field.value} onValueChange={field.onChange}>
                    <TabsList className='w-full'>
                      <TabsTrigger value='ssh'>
                        <Terminal className='size-3.5' />
                        SSH
                      </TabsTrigger>
                      <TabsTrigger value='vnc'>
                        <Monitor />
                        VNC
                      </TabsTrigger>
                      <TabsTrigger value='rdp'>
                        <WindowsIcon className='size-3.5' />
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
                        placeholder='root'
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
                        placeholder='root'
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
                        placeholder='root'
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
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isExecuting}
                        placeholder='example.com'
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
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button isLoading={isExecuting}>
            {credential ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
