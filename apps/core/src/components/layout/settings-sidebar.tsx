import SettingsSidebarNavigation from '@/src/components/layout/settings-sidebar-navigation'
import { Separator } from '@axium/ui/components/separator'

export default function SettingsSidebar() {
  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <div className='flex h-8 items-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Settings</h1>
      </div>
      <Separator className='my-4 bg-transparent' />
      <SettingsSidebarNavigation isAdmin={true} />
    </aside>
  )
}
