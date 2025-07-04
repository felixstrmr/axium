import ServersCard from '@/components/settings/servers/servers-card'
import { db } from '@/db'

export default async function Page() {
  const servers = await db.query.servers.findMany()

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-8 py-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Servers</h1>
        <p className='text-muted-foreground'>Manage your servers here.</p>
      </div>
      <ServersCard servers={servers} />
    </div>
  )
}
