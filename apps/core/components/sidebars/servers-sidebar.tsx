import { Separator } from '@axium/ui/components/separator'
import EnvironmentSelect from '@/components/selects/environment-select'
import ServersSidebarNav from '@/components/sidebars/servers-sidebar-nav'
import { getServerFolders } from '@/queries/server-folders'
import { getServers } from '@/queries/servers'

export default async function ServersSidebar() {
  const [server, serverFolders] = await Promise.all([
    getServers(),
    getServerFolders(),
  ])

  return (
    <aside className='bg-background p-4 rounded-xl border min-w-64 max-w-64 w-64 flex flex-col'>
      <EnvironmentSelect />
      <Separator className='my-4 bg-transparent' />
      <ServersSidebarNav folders={serverFolders} servers={server} />
    </aside>
  )
}
