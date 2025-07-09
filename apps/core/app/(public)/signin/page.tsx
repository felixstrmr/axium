import CredentialSigninForm from '@/components/forms/credential-signin-form'
import AxiumIcon from '@axium/ui/icons/axium-icon'

export default async function Page() {
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='bg-muted rounded-2xl p-1'>
        <div className='bg-background rounded-xl border p-8 shadow-xs'>
          <AxiumIcon />
          <div className='mt-4 mb-8'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Welcome back!
            </h1>
            <p className='text-muted-foreground text-sm'>
              Enter your details to continue.
            </p>
          </div>
          <CredentialSigninForm />
        </div>
      </div>
    </div>
  )
}
