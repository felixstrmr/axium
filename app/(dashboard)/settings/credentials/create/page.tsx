import CreateCredentialForm from '@/components/forms/create-credential-form'

export default function Page() {
  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-12 p-24'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create credential
        </h1>
        <p className='text-muted-foreground text-sm'>
          Enter the details of the credential you want to create.
        </p>
      </div>
      <CreateCredentialForm />
    </div>
  )
}
