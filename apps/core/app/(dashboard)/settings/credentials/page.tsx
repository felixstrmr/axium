import { getCredentials } from '@/queries/credentials'

export default async function Page() {
  const credentials = await getCredentials()

  return (
    <div className='mx-auto w-full max-w-4xl space-y-8 py-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Credentials</h1>
        <p className='text-muted-foreground'>Manage your credentials</p>
      </div>
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
  )
}
