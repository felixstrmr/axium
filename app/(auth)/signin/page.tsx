import SigninForm from '@/components/forms/signin-form'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session) {
    return redirect('/')
  }

  const signinWithMicrosoft = async () => {
    'use server'

    const response = await auth.api.signInSocial({
      body: {
        provider: 'microsoft',
      },
    })

    console.log(response)
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <SigninForm />
      <button onClick={signinWithMicrosoft}>Sign in with Microsoft</button>
    </div>
  )
}
