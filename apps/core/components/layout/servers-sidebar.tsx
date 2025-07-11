import EnvironmentSelect from '@/components/environment-select'
import ServersSidebarNavigation from '@/components/layout/servers-sidebar-navigation'
import { getFolders } from '@/queries/folders'
import { getServers } from '@/queries/server'
import { Separator } from '@axium/ui/components/separator'

export default async function ServersSidebar() {
  const [folders, servers] = await Promise.all([getFolders(), getServers()])

  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect />
      <Separator className='bg-background my-4' />
      <ServersSidebarNavigation folders={folders} servers={servers} />
    </aside>
  )
}
