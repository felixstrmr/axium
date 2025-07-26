import dynamic from 'next/dynamic'
import UpsertServerDialog from '@/components/dialogs/upsert-server-dialog'
import UpsertServerFolderDialog from '@/components/dialogs/upsert-server-folder-dialog'
import { getIdentities } from '@/queries/identities'
import { getServerFolders } from '@/queries/server-folders'
import { getServers } from '@/queries/servers'

const ServersSetting = dynamic(
  () => import('@/components/settings/servers-setting')
)

export default async function Page() {
  const [servers, folders, identities] = await Promise.all([
    getServers(),
    getServerFolders(),
    getIdentities(),
  ])

  return (
    <div className='size-full flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Servers</h2>
          <p className='text-muted-foreground'>Manage your servers.</p>
        </div>
        <div className='flex items-center gap-2'>
          <UpsertServerFolderDialog />
          <UpsertServerDialog identities={identities} />
        </div>
      </div>
      <ServersSetting servers={servers} folders={folders} />
    </div>
  )
}
