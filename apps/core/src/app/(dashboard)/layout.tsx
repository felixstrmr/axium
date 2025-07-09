import DashboardSidebar from '@/src/components/layout/dashboard-sidebar'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className='bg-muted flex size-full'>
      <Suspense>
        <DashboardSidebar />
      </Suspense>
      <div className='flex-1 overflow-y-auto py-1 pr-1'>
        <div className='flex size-full'>{children}</div>
      </div>
    </div>
  )
}
