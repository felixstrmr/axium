import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { servers } from '@/db/schema'

export default async function Page() {
  const createServer = async () => {
    'use server'

    await db.insert(servers).values({
      name: 'pve',
      host: '10.10.100.1',
      port: 22,
      environmentId: 'env_X8CbDMlYqu81GqT5ZLsSFhDt',
      credentialId: 'cred_Y2RtEnWU8QqDV81wx5RafGz7',
      protocol: 'ssh',
      operatingSystem: 'linux',
    })
  }

  return (
    <div>
      <Button onClick={createServer}>Create Server</Button>
    </div>
  )
}
