import ServersSidebar from '@/components/layout/servers-sidebar'
import ServersSidebarSkeleton from '@/components/skeletons/servers-sidebar-skeleton'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='flex size-full gap-1'>
      <Suspense fallback={<ServersSidebarSkeleton />}>
        <ServersSidebar />
      </Suspense>
      <div className='bg-background d flex-1 rounded-xl shadow-xs'>
        {children}
      </div>
    </div>
  )
}
