import DashboardSidebarNavigation from '@/src/components/layout/dashboard-sidebar-navigation'
import { Separator } from '@axium/ui/components/separator'
import AxiumIcon from '@axium/ui/icons/axium-icon'
import Link from 'next/link'

export default function DashboardSidebar() {
  return (
    <aside className='flex flex-col px-4 py-5'>
      <Link href='/'>
        <AxiumIcon />
      </Link>
      <Separator className='mx-auto my-4 max-w-4' />
      <DashboardSidebarNavigation />
    </aside>
  )
}
