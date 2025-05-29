import CredentialCard from '@/components/cards/credential-card'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/db'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const credentialsPromise = db.query.credentials.findMany({
    orderBy: (credentials, { asc }) => [asc(credentials.name)],
    with: {
      environment: true,
    },
  })

  const serversPromise = db.query.servers.findMany({
    orderBy: (servers, { asc }) => [asc(servers.name)],
  })

  const [credentials, servers] = await Promise.all([
    credentialsPromise,
    serversPromise,
  ])

  const getServersByCredential = (credential: Credential) => {
    return servers.filter((server) => server.credentialId === credential.id)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex h-8 items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Credentials</h1>
        <Link
          href='/settings/credentials/create'
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          Create
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {credentials.map((credential) => (
          <CredentialCard
            key={credential.id}
            credential={credential}
            servers={getServersByCredential(credential)}
          />
        ))}
      </div>
    </div>
  )
}
