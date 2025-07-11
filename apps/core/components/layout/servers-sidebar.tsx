import EnvironmentSelect from '@/components/environment-select'
import ServersSidebarNavigation from '@/components/layout/servers-sidebar-navigation'
import { getFolders } from '@/queries/folders'
import { getServers } from '@/queries/server'

export default async function ServersSidebar() {
  const [folders, servers] = await Promise.all([getFolders(), getServers()])

  return (
    <aside className='bg-background flex w-64 max-w-64 min-w-64 flex-col gap-4 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect />
      <ServersSidebarNavigation folders={folders} servers={servers} />
    </aside>
  )
}
