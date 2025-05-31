import { buttonVariants } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { Plus, Server, Settings } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='bg-muted w-fit rounded-full p-6'>
          <Server className='text-muted-foreground size-8' />
        </div>
        <h1 className='max-w-64 text-center text-2xl font-semibold tracking-tight'>
          Connect to a server by clicking on a server in the sidebar.
        </h1>
        {isAdmin && (
          <div className='flex items-center gap-2'>
            <Link
              href={'/settings/servers'}
              className={buttonVariants({ variant: 'outline' })}
            >
              <Settings />
              Manage
            </Link>
            <Link
              href={'/settings/servers/create'}
              className={buttonVariants({ variant: 'default' })}
            >
              <Plus />
              Create
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
