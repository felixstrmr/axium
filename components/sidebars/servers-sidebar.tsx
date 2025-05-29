import { db } from '@/db'
import Link from 'next/link'

export default async function ServersSidebar() {
  const servers = await db.query.servers.findMany()

  return (
    <aside className='flex w-64 max-w-64 min-w-64 flex-col border-r'>
      <div className='border-b p-4'>
        <div className='flex h-8 items-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        </div>
      </div>
      <div className='flex-1 overflow-y-auto'>
        <div className='space-y-2 p-4'>
          {servers.map((server) => (
            <Link key={server.id} href={`/servers/${server.id}`}>
              {server.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  )
}
