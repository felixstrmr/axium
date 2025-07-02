import SettingsSidebar from '@/components/settings-sidebar'
import { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsSidebar />
      </Suspense>
      {children}
    </div>
  )
}
