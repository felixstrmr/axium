import EnvironmentSelect from '@/components/selects/environment-select'
import ServersSidebarNavigation from '@/components/sidebars/servers-sidebar-navigation'
import { db } from '@/db'

export default async function ServersSidebar() {
  const serversPromise = db.query.servers.findMany({
    orderBy: (servers, { asc }) => [asc(servers.name)],
    with: {
      environment: true,
    },
  })

  const foldersPromise = db.query.folders.findMany({
    orderBy: (folders, { asc }) => [asc(folders.name)],
    with: {
      parent: true,
    },
  })

  const environmentsPromise = db.query.environments.findMany({
    orderBy: (environments, { asc }) => [asc(environments.name)],
  })

  const [servers, folders, environments] = await Promise.all([
    serversPromise,
    foldersPromise,
    environmentsPromise,
  ])

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col border-r'>
      <div className='border-b p-4'>
        <div className='flex h-8 items-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        </div>
      </div>
      <div className='px-4 pt-4'>
        <EnvironmentSelect environments={environments} />
      </div>
      <ServersSidebarNavigation servers={servers} folders={folders} />
    </aside>
  )
}
