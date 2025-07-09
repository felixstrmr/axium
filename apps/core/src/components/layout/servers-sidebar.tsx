import EnvironmentSelect from '@/src/components/features/environments/environment-select'
import { db } from '@axium/database'
import * as schema from '@axium/database/schema'

export default async function ServersSidebar() {
  const environments = await db.select().from(schema.environments)

  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect environments={environments} />
    </aside>
  )
}
