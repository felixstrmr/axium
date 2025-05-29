import UpsertCredentialForm from '@/components/forms/upsert-credential-form'
import { db } from '@/db'

export default async function Page() {
  const environments = await db.query.environments.findMany({
    orderBy: (environments, { asc }) => [asc(environments.name)],
  })

  return (
    <div className='mx-auto mt-8 flex max-w-2xl flex-col space-y-12'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Create Credential
        </h1>
        <p className='text-muted-foreground'>
          Create a new credential to use with your servers.
        </p>
      </div>
      <UpsertCredentialForm credential={null} environments={environments} />
    </div>
  )
}
