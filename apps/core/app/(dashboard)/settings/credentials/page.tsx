import UpsertCredentialDialog from '@/components/dialogs/upsert-credential-dialog'
import CredentialList from '@/components/features/settings/credentials/credential-list'
import { getCredentials } from '@/queries/credentials'

export default async function Page() {
  const credentials = await getCredentials()

  return (
    <div className='mx-auto w-full max-w-4xl space-y-8 py-8'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Credentials</h1>
          <p className='text-muted-foreground'>Manage your credentials</p>
        </div>
        <UpsertCredentialDialog />
      </div>
      <div className='bg-muted rounded-2xl p-1'>
        <CredentialList credentials={credentials} />
      </div>
    </div>
  )
}
