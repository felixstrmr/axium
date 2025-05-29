import UpsertCredentialDialog from '@/components/dialogs/upsert-crendetial-dialog'
import { db } from '@/db'

export default async function Page() {
  const environmentsPromise = db.query.environments.findMany({
    orderBy: (environments, { asc }) => [asc(environments.name)],
  })

  const credentialsPromise = db.query.credentials.findMany({
    orderBy: (credentials, { asc }) => [asc(credentials.name)],
  })

  const serversPromise = db.query.servers.findMany({
    orderBy: (servers, { asc }) => [asc(servers.name)],
  })

  const [environments, credentials, servers] = await Promise.all([
    environmentsPromise,
    credentialsPromise,
    serversPromise,
  ])

  const getServersByCredential = (credential: Credential) => {
    return servers.filter((server) => server.credentialId === credential.id)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Credentials</h1>
        <UpsertCredentialDialog environments={environments} />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {credentials.map((credential) => (
          <div
            key={credential.id}
            className='w-full rounded-lg border p-4 shadow-xs'
          >
            <h2>{credential.name}</h2>
            <p>{getServersByCredential(credential).length} servers</p>
          </div>
        ))}
      </div>
    </div>
  )
}
