import { buttonVariants } from '@axium/ui/components/button'
import { Separator } from '@axium/ui/components/separator'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import UserDropdown from '@/components/dropdowns/user-dropdown'
import DashboardSidebarNav from '@/components/sidebars/dashboard-sidebar-nav'
import { auth } from '@/lib/auth'

export default async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/signin')

  return (
    <aside className='px-4 py-5 flex flex-col'>
      <Link
        href='/'
        className={buttonVariants({ variant: 'default', size: 'icon' })}
      >
        <AxiumIcon className='size-4' />
      </Link>
      <Separator className='my-4 mx-auto max-w-4' />
      <DashboardSidebarNav />
      <Separator className='my-4 mx-auto max-w-4' />
      <UserDropdown user={session.user} />
    </aside>
  )
}
