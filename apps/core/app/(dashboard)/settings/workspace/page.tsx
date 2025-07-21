import EnvironmentsSetting from '@/components/settings/environments-setting'
import { getEnvironments } from '@/queries/environments'

export default async function Page() {
  const environments = await getEnvironments()

  return (
    <div className='space-y-8 size-full'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Workspace</h2>
        <p className='text-muted-foreground'>Manage your workspace settings.</p>
      </div>
      <EnvironmentsSetting environments={environments} />
    </div>
  )
}
