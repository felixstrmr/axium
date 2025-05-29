import DashboardHeader from '@/components/headers/dashboard-header'
import SettingsSidebar from '@/components/sidebars/settings-sidebar'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <SettingsSidebar />
      <div className='flex flex-1 flex-col'>
        <DashboardHeader />
        <div className='mx-auto w-full max-w-5xl flex-1'>{children}</div>
      </div>
    </div>
  )
}
