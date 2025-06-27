import DashboardHeaderBreadcrumb from '@/src/components/headers/dashboard-header-breadcrumb'
import { auth } from '@axium/auth/auth'
import { headers } from 'next/headers'

export default async function DashboardHeader() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className='flex items-center justify-between border-b py-3 pr-4 pl-5'>
      <DashboardHeaderBreadcrumb />
      <div className='bg-muted flex size-7 items-center justify-center rounded-full'>
        {session?.user.name.charAt(0)}
      </div>
    </div>
  )
}
