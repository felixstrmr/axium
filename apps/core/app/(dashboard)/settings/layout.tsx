import { Suspense } from 'react'
import SettingsSidebar from '@/components/sidebars/settings-sidebar'
import SettingsSidebarSkeleton from '@/components/skeletons/settings-sidebar-skeleton'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='size-full flex gap-1'>
      <Suspense fallback={<SettingsSidebarSkeleton />}>
        <SettingsSidebar />
      </Suspense>
      {children}
    </div>
  )
}
