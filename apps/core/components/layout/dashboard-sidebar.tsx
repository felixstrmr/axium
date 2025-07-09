import DashboardSidebarNavigation from '@/components/layout/dashboard-sidebar-navigation'
import { getCurrentUser } from '@/queries/user'
import { Separator } from '@axium/ui/components/separator'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import Link from 'next/link'

export default async function DashboardSidebar() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <aside className='flex flex-col px-4 py-5'>
      <Link href='/'>
        <AxiumIcon />
      </Link>
      <Separator className='mx-auto my-4 max-w-4' />
      <DashboardSidebarNavigation user={user} />
    </aside>
  )
}
