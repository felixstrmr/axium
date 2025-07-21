import EnvironmentSelect from '@/components/selects/environment-select'

export default function SettingsSidebar() {
  return (
    <aside className='bg-background rounded-2xl min-w-64 max-w-64 w-64 flex flex-col p-4'>
      <EnvironmentSelect />
    </aside>
  )
}
