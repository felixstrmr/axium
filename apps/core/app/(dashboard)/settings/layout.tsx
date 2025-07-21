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
      <div className='flex-1 bg-background shadow-xs rounded-xl'>
        <div className='max-w-5xl mx-auto w-full p-8 size-full flex'>
          {children}
        </div>
      </div>
    </div>
  )
}
