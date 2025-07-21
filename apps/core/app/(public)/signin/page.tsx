import { buttonVariants } from '@axium/ui/components/button'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import Link from 'next/link'
import CredentialSigninForm from '@/components/forms/credential-signin-form'

export default function Page() {
  return (
    <div className='size-full flex items-center justify-center'>
      <div className='bg-muted rounded-2xl p-1 shadow-xs'>
        <div className='bg-background rounded-xl border p-8 shadow-xs'>
          <Link
            href='/'
            className={buttonVariants({ variant: 'default', size: 'icon' })}
          >
            <AxiumIcon className='size-4' />
          </Link>
          <div className='mb-8 mt-4'>
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
