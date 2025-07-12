import { getUsers } from '@/queries/user'

export default async function Page() {
  const users = await getUsers()

  return (
    <div className='mx-auto w-full max-w-4xl space-y-8 p-8'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Users </h1>
        <p className='text-muted-foreground'>Manage your users</p>
      </div>
    </div>
  )
}
