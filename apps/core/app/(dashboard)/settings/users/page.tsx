import dynamic from 'next/dynamic'
import UpsertUserDialog from '@/components/dialogs/upsert-user-dialog'
import { getUsers } from '@/queries/users'

const UsersSetting = dynamic(
  () => import('@/components/settings/users-setting')
)

export default async function Page() {
  const users = await getUsers()

  return (
    <div className='space-y-8 size-full'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Users</h2>
          <p className='text-muted-foreground'>Manage your users.</p>
        </div>
        <UpsertUserDialog />
      </div>
      <UsersSetting users={users} />
    </div>
  )
}
