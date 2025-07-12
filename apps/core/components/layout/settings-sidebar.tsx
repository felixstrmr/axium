import EnvironmentSelect from '@/components/environment-select'
import SettingsSidebarNavigation from '@/components/layout/settings-sidebar-navigation'

export default async function SettingsSidebar() {
  return (
    <aside className='bg-background flex w-64 max-w-64 min-w-64 flex-col gap-4 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect />
      <SettingsSidebarNavigation isAdmin={true} />
    </aside>
  )
}
