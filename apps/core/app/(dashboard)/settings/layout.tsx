import { Suspense } from 'react'
import SettingsSidebar from '@/components/sidebars/settings-sidebar'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='size-full flex gap-1'>
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsSidebar />
      </Suspense>
      {children}
    </div>
  )
}
