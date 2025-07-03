import EnvironmentsSettings from '@/components/settings/environments-settings'
import { db } from '@axium/db'

export default async function Page() {
  const environments = await db.query.environments.findMany()

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-8 py-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>General</h1>
        <p className='text-muted-foreground'>
          Manage your general settings here.
        </p>
      </div>
      <EnvironmentsSettings environments={environments} />
    </div>
  )
}
