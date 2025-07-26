import dynamic from 'next/dynamic'
import { getEnvironments } from '@/queries/environments'
import { getSettings } from '@/queries/settings'

const EnvironmentsSetting = dynamic(
  () => import('@/components/settings/environments-setting')
)

const SmtpSetting = dynamic(() => import('@/components/settings/smtp-setting'))

export default async function Page() {
  const [environments, settings] = await Promise.all([
    getEnvironments(),
    getSettings(),
  ])

  const smtpSetting = settings.find((setting) => setting.key === 'smtp')

  return (
    <div className='size-full flex flex-col gap-8'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Workspace</h2>
        <p className='text-muted-foreground'>Manage your workspace settings.</p>
      </div>
      <EnvironmentsSetting environments={environments} />
      <SmtpSetting settings={smtpSetting} />
    </div>
  )
}
