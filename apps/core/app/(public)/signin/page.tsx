import CredentialSigninForm from '@/components/forms/credential-signin-form'

export default function Page() {
  return (
    <div className='size-full flex items-center justify-center'>
      <div className='bg-muted rounded-2xl p-1 shadow-xs'>
        <div className='bg-background rounded-xl p-8 shadow-xs'>
          <div className='mb-8'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Welcome back!
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your details to sign in.
            </p>
          </div>
          <CredentialSigninForm />
        </div>
      </div>
    </div>
  )
}
