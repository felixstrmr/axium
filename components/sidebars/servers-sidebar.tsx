import ServersSidebarNavigation from '@/components/sidebars/servers-sidebar-navigation'
import { db } from '@/db'

export default async function ServersSidebar() {
  const serversPromise = db.query.servers.findMany()
  const foldersPromise = db.query.folders.findMany()

  const [servers, folders] = await Promise.all([serversPromise, foldersPromise])

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col border-r'>
      <div className='border-b p-4'>
        <div className='flex h-8 items-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        </div>
      </div>
      <ServersSidebarNavigation servers={servers} folders={folders} />
    </aside>
  )
}
