import SettingsSidebar from '@/components/layout/settings-sidebar'
import SettingsSidebarSkeleton from '@/components/skeletons/settings-sidebar-skeleton'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full gap-1'>
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar />
      </Suspense>
      <div className='bg-background flex-1 rounded-xl shadow-xs'>
        {children}
      </div>
    </div>
  )
}
