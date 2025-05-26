import SettingsSidebar from '@/components/sidebars/settings-sidebar'
import { Separator } from '@/components/ui/separator'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col'>
      <div className='flex w-full items-center p-4'>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
      </div>
      <Separator />
      <div className='flex size-full'>
        <SettingsSidebar />
        {children}
      </div>
    </div>
  )
}
