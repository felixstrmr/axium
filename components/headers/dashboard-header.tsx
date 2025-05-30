import DashboardHeaderBreadcrumb from '@/components/headers/dashboard-header-breadcrumb'
import { db } from '@/db'

export default async function DashboardHeader() {
  const servers = await db.query.servers.findMany()

  return (
    <nav className='flex items-center border-b p-4'>
      <DashboardHeaderBreadcrumb servers={servers} />
    </nav>
  )
}
