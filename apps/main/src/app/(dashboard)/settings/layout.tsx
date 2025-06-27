import SettingsSidebar from '@/src/components/sidebars/settings-sidebar'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <SettingsSidebar />
      {children}
    </div>
  )
}
