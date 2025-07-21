import EnvironmentsSetting from '@/components/settings/environments-setting'
import SmtpSetting from '@/components/settings/smtp-setting'
import { getEnvironments } from '@/queries/environments'
import { getSettings } from '@/queries/settings'

export default async function Page() {
  const [environments, settings] = await Promise.all([
    getEnvironments(),
    getSettings(),
  ])

  const smtpSetting = settings.find((setting) => setting.key === 'smtp')

  return (
    <div className='space-y-8 size-full'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Workspace</h2>
        <p className='text-muted-foreground'>Manage your workspace settings.</p>
      </div>
      <EnvironmentsSetting environments={environments} />
      <SmtpSetting settings={smtpSetting} />
    </div>
  )
}
