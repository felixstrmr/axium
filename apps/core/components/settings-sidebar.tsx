import SettingsSidebarNavigation from '@/components/settings-sidebar-navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function SettingsSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/signin')
  }

  const isAdmin = session.user.role === 'admin'

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col gap-4 rounded-lg bg-zinc-900/50 p-4'>
      <SettingsSidebarNavigation isAdmin={isAdmin} />
    </aside>
  )
}
