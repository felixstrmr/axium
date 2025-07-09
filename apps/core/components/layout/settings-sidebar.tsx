import EnvironmentSelect from '@/components/features/environment/environment-select'
import SettingsSidebarNavigation from '@/components/layout/settings-sidebar-navigation'
import { Separator } from '@axium/ui/components/separator'

export default async function SettingsSidebar() {
  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect />
      <Separator className='my-4 bg-transparent' />
      <SettingsSidebarNavigation isAdmin={true} />
    </aside>
  )
}
