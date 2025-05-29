import Environments from '@/components/settings/environments'
import { db } from '@/db'

export default async function Page() {
  const environments = await db.query.environments.findMany({
    orderBy: (environments, { asc }) => [asc(environments.name)],
  })

  return (
    <div className='flex flex-col gap-4 p-4'>
      <h1 className='text-xl font-semibold tracking-tight'>General</h1>
      <Environments environments={environments} />
    </div>
  )
}
