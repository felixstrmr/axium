import { Suspense } from 'react'
import ServersSidebar from '@/components/sidebars/servers-sidebar'
import ServersSidebarSkeleton from '@/components/skeletons/servers-sidebar-skeleton'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='size-full flex gap-1'>
      <Suspense fallback={<ServersSidebarSkeleton />}>
        <ServersSidebar />
      </Suspense>
      <div className='flex-1 bg-background shadow-xs rounded-xl border'>
        {children}
      </div>
    </div>
  )
}
