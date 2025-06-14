import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default function Page() {
  const signinWithMicrosoft = async () => {
    'use server'

    const { url } = await auth.api.signInSocial({
      body: {
        provider: 'microsoft',
      },
    })

    if (url) {
      redirect(url)
    }
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <Button onClick={signinWithMicrosoft}>Sign in with Microsoft</Button>
    </div>
  )
}
