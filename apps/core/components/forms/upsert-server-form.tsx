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
import { cn } from '@axium/ui/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, Monitor, Plus, Terminal } from 'lucide-react'
import { useAction } from 'next-safe-action/hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'
import { upsertServerAction } from '@/actions/upsert-server-action'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'
import type { Identity, Server } from '@/types'
import {
  type StepConfig,
  useStepValidation,
  validationRules,
} from '@/utils/step-validation'

type Props = {
  server: Server | null
  identities: Identity[]
  setIsOpen: (isOpen: boolean) => void
  folderId: string | null
}

const stepConfigs: StepConfig[] = [
  {
    title: 'Server',
    fields: ['server.name', 'server.host'],
    validation: [
      validationRules.required('server.name', 'Name is required'),
      validationRules.required('server.host', 'Host is required'),
    ],
  },
  {
    title: 'Identity',
    fields: [
      'identityId',
      'identity.username',
      'identity.password',
      'identity.port',
    ],
    customValidation: (formData) => {
      const errors: string[] = []

      if (
        !formData.identityId &&
        (!formData.identity?.username?.trim() ||
          !formData.identity?.password?.trim())
      ) {
        errors.push('Please select an identity or create a new one')
      }

      if (formData.identity?.port && formData.identity.port < 1) {
        errors.push('Port must be greater than 0')
      }

      return { isValid: errors.length === 0, errors }
    },
  },
]

const steps = stepConfigs.map((config, index) => ({
  ...config,
  index,
}))

export default function UpsertServerForm({
  identities,
  setIsOpen,
  folderId,
}: Props) {
  const [currentStep, setCurrentStep] = useState(steps[0]?.index ?? 0)
  const [isNewIdentity, setIsNewIdentity] = useState(false)

  const form = useForm<z.infer<typeof upsertServerSchema>>({
    resolver: zodResolver(upsertServerSchema),
    defaultValues: {
      server: {
        name: '',
        description: undefined,
        host: '',
        environmentId: undefined,
        folderId: folderId ?? undefined,
        icon: undefined,
      },
      identityId: undefined,
      identity: {
        name: '',
        type: 'ssh',
        port: 22,
        username: '',
        password: '',
        domain: undefined,
      },
    },
  })

  const { validateStep } = useStepValidation(form)

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

  const handlePreviousStep = () => {
    if (currentStep === 0) {
      setIsOpen(false)
    } else {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNextStep = async () => {
    const stepConfig = stepConfigs[currentStep]
    if (!stepConfig) return

    const formData = form.getValues()
    const isValid = await validateStep(stepConfig, formData)

    if (!isValid) {
      return
    }

    if (currentStep === steps.length - 1) {
      execute(formData)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <Form {...form}>
      <form>
        <div className='border-b w-full mt-4'>
          <div className='flex px-4 gap-1'>
            {steps.map((step) => (
              <div key={step.title} className='flex flex-col gap-1'>
                <button
                  type='button'
                  onClick={() => setCurrentStep(step.index)}
                  className={cn(
                    'h-8 px-2 flex items-center justify-center cursor-pointer rounded-md text-sm hover:bg-muted',
                    currentStep === step.index
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </button>
                <div
                  className={cn(
                    'w-full h-px',
                    currentStep === step.index ? 'bg-foreground' : 'bg-muted'
                  )}
                />
              </div>
            ))}
          </div>
        </div>
        {currentStep === 0 && (
          <div className='space-y-4 p-4'>
            <FormField
              control={form.control}
              name='server.name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isExecuting}
                      autoFocus
                      required
                      placeholder='My Server'
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
                name='server.host'
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
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className='space-y-4 p-4'>
            {!isNewIdentity && (
              <FormField
                control={form.control}
                name='identityId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identity</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Select an identity' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {identities.map((identity) => (
                          <SelectItem key={identity.id} value={identity.id}>
                            {identity.name}
                          </SelectItem>
                        ))}
                        <button
                          type='button'
                          onClick={() => setIsNewIdentity(true)}
                          className='h-7 flex items-center gap-2 cursor-pointer text-sm hover:bg-muted w-full px-2 rounded-sm'
                        >
                          <Plus className='size-4.5 text-muted-foreground' />
                          New identity
                        </button>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {isNewIdentity && (
              <>
                <div className='flex gap-4'>
                  <FormField
                    control={form.control}
                    name='identity.type'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Tabs
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <TabsList className='w-full'>
                              <TabsTrigger value='ssh'>
                                <Terminal />
                                SSH
                              </TabsTrigger>
                              <TabsTrigger value='vnc'>
                                <Eye />
                                VNC
                              </TabsTrigger>
                              <TabsTrigger value='rdp'>
                                <Monitor />
                                RDP
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
                    name='identity.port'
                    render={({ field }) => (
                      <FormItem className='w-1/4'>
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

                <FormField
                  control={form.control}
                  name='identity.name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          autoFocus
                          required
                          placeholder='My Identity'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='identity.username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isExecuting}
                          required
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
                  name='identity.password'
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
              </>
            )}
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild className='mr-auto'>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <div className='flex items-center gap-2'>
            {currentStep > 0 && (
              <Button
                variant='outline'
                type='button'
                onClick={handlePreviousStep}
              >
                Back
              </Button>
            )}
            <Button
              isLoading={isExecuting}
              type='button'
              onClick={handleNextStep}
            >
              {currentStep === steps.length - 1 ? 'Save' : 'Next'}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  )
}
