import { db } from '@/db'
import { servers } from '@/db/schema'

export default async function Page() {
  const createServer = async () => {
    'use server'

    await db.insert(servers).values({
      name: 'media',
      host: '10.10.100.109',
      port: 22,
      protocol: 'ssh',
      operatingSystem: 'linux',
      environmentId: 'env_X8CbDMlYqu81GqT5ZLsSFhDt',
      credentialId: 'cred_Y2RtEnWU8QqDV81wx5RafGz7',
    })
  }

  return (
    <div>
      <button onClick={createServer}>Create Server</button>
    </div>
  )
}
