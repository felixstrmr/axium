import { Separator } from '@axium/ui/components/separator'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import EnvironmentSelect from '@/components/selects/environment-select'
import SettingsSidebarNav from '@/components/sidebars/settings-sidebar-nav'
import { auth } from '@/lib/auth'

export default async function SettingsSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/signin')

  return (
    <aside className='bg-background rounded-xl border min-w-64 max-w-64 w-64 flex flex-col p-4'>
      <EnvironmentSelect />
      <Separator className='my-4 bg-transparent' />
      <SettingsSidebarNav isAdmin={session.user.role === 'admin'} />
    </aside>
  )
}
