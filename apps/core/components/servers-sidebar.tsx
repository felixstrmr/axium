import { db } from '@/db'

export default async function ServersSidebar() {
  const [environemnts, servers] = await Promise.all([
    db.query.environments.findMany(),
    db.query.servers.findMany(),
  ])

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col border-r p-4'>
      ServersSidebar
    </aside>
  )
}
