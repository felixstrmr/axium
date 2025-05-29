import Environments from '@/components/settings/environments'
import { db } from '@/db'

export default async function Page() {
  const environmentsPromise = db.query.environments.findMany({
    orderBy: (environments, { asc }) => [asc(environments.name)],
  })

  const serversPromise = db.query.servers.findMany({
    orderBy: (servers, { asc }) => [asc(servers.name)],
  })

  const [environments, servers] = await Promise.all([
    environmentsPromise,
    serversPromise,
  ])

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-2xl font-semibold tracking-tight'>General</h1>
      <Environments environments={environments} servers={servers} />
    </div>
  )
}
