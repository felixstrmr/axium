import ServersSidebarNavigation from '@/components/servers-sidebar-navigation'
import { db } from '@/db'

export default async function ServersSidebar() {
  const [environments, servers, folders] = await Promise.all([
    db.query.environments.findMany(),
    db.query.servers.findMany(),
    db.query.folders.findMany(),
  ])

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col rounded-lg bg-zinc-900/50 p-4'>
      <ServersSidebarNavigation
        servers={servers}
        environments={environments}
        folders={folders}
      />
    </aside>
  )
}
