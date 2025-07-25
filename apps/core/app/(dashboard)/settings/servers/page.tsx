import UpsertServerFolderDialog from '@/components/dialogs/upsert-server-folder-dialog'
import ServersSetting from '@/components/settings/servers-setting'
import { getServerFolders } from '@/queries/server-folders'
import { getServers } from '@/queries/servers'

export default async function Page() {
  const [servers, folders] = await Promise.all([
    getServers(),
    getServerFolders(),
  ])

  return (
    <div className='size-full flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Servers</h2>
          <p className='text-muted-foreground'>Manage your servers.</p>
        </div>
        <UpsertServerFolderDialog />
      </div>
      <ServersSetting servers={servers} folders={folders} />
    </div>
  )
}
