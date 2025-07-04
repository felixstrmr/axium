import CredentialSigninForm from '@/components/forms/credential-signin-form'
import { auth } from '@/lib/auth'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/')
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='bg-muted rounded-2xl p-1'>
        <div className='bg-background rounded-lg border p-8 shadow-xs'>
          <div className='mb-8'>
            <div className='bg-primary text-primary-foreground mb-4 flex size-8 items-center justify-center rounded-md border'>
              <AxiumIcon className='size-4' aria-hidden='true' />
            </div>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Welcome back!
            </h1>
            <p className='text-muted-foreground text-sm'>
              Please enter your details to continue.
            </p>
          </div>
          <CredentialSigninForm />
        </div>
      </div>
    </div>
  )
}
