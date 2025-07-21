import { cookies } from 'next/headers'
import { Suspense } from 'react'
import EnvironmentProvider from '@/components/providers/environment-provider'
import DashboardSidebar from '@/components/sidebars/dashboard-sidebar'
import { getEnvironments } from '@/queries/environments'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const cookieStore = await cookies()
  const environments = await getEnvironments()

  const currentEnvironmentId = cookieStore.get('axium.environmentId')?.value

  return (
    <EnvironmentProvider
      environments={environments}
      currentEnvironmentId={currentEnvironmentId}
    >
      <div className='size-full flex bg-zinc-50'>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardSidebar />
        </Suspense>
        <div className='flex-1 py-1 pr-1'>{children}</div>
      </div>
    </EnvironmentProvider>
  )
}
