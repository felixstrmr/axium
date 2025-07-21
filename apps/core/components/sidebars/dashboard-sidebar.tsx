import { buttonVariants } from '@axium/ui/components/button'
import { Separator } from '@axium/ui/components/separator'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import DashboardSidebarNav from '@/components/sidebars/dashboard-sidebar-nav'
import { auth } from '@/lib/auth'

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/signin')

  return (
    <aside className='p-4 flex flex-col'>
      <Link
        href='/'
        className={buttonVariants({ variant: 'default', size: 'icon' })}
      >
        <AxiumIcon className='size-4' />
      </Link>
      <Separator className='my-4 mx-auto max-w-4' />
      <DashboardSidebarNav />
      <Separator className='my-4 mx-auto max-w-4' />
      <div className='size-8 bg-primary rounded-md aspect-square text-primary-foreground flex items-center justify-center uppercase'>
        {session.user.name[0]}
      </div>
    </aside>
  )
}
