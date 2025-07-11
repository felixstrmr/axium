import DashboardSidebarNavigation from '@/components/layout/dashboard-sidebar-navigation'
import { getCurrentUser } from '@/queries/user'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import Link from 'next/link'

export default async function DashboardSidebar() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  return (
    <aside className='flex flex-col gap-4 px-4 py-5'>
      <Link href='/'>
        <AxiumIcon />
      </Link>
      <DashboardSidebarNavigation user={user} />
    </aside>
  )
}
