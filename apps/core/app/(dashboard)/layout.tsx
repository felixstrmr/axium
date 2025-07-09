import DashboardSidebar from '@/components/layout/dashboard-sidebar'
import EnvironmentProvider from '@/components/providers/environment-provider'
import DashboardSidebarSkeleton from '@/components/skeletons/dashboard-sidebar-skeleton'
import { db } from '@axium/database'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const environments = await db.query.environments.findMany()

  return (
    <EnvironmentProvider environments={environments}>
      <div className='bg-muted flex size-full'>
        <Suspense fallback={<DashboardSidebarSkeleton />}>
          <DashboardSidebar />
        </Suspense>
        <div className='flex-1 overflow-y-auto py-1 pr-1'>
          <div className='flex size-full'>{children}</div>
        </div>
      </div>
    </EnvironmentProvider>
  )
}
