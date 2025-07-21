import { Separator } from '@axium/ui/components/separator'
import EnvironmentSelect from '@/components/selects/environment-select'
import SettingsSidebarNav from '@/components/sidebars/settings-sidebar-nav'

export default function SettingsSidebar() {
  return (
    <aside className='bg-background rounded-2xl min-w-64 max-w-64 w-64 flex flex-col p-4'>
      <EnvironmentSelect />
      <Separator className='my-4 bg-transparent' />
      <SettingsSidebarNav isAdmin={true} />
    </aside>
  )
}
