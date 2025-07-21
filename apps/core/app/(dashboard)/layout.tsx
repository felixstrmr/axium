import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import EnvironmentProvider from '@/components/providers/environment-provider'
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'
import DashboardSidebarSkeleton from '@/components/skeletons/dashboard-sidebar-skeleton'
import { getEnvironments } from '@/queries/environments'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const environments = await getEnvironments()

  return (
    <Suspense
      fallback={
        <div className='size-full flex bg-background rounded-xl items-center justify-center'>
          <Loader2 className='size-4 animate-spin' />
        </div>
      }
    >
      <EnvironmentProvider environments={environments}>
        <div className='size-full flex bg-zinc-50'>
          <Suspense fallback={<DashboardSidebarSkeleton />}>
            <DashboardSidebar />
          </Suspense>
          <div className='flex-1 py-1 pr-1'>{children}</div>
        </div>
      </EnvironmentProvider>
    </Suspense>
  )
}
