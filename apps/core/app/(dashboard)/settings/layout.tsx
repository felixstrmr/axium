import SettingsSidebar from '@/components/settings-sidebar'

type Props = {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className='flex size-full gap-1'>
      <SettingsSidebar />
      <div className='flex-1 rounded-lg bg-zinc-900/50'>{children}</div>
    </div>
  )
}
