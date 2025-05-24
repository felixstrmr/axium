import CreateServerForm from '@/components/forms/create-server-form'
import { db } from '@/db'

export default async function Page() {
  const credentials = await db.query.credentials.findMany()

  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-12 p-24'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Create server</h1>
        <p className='text-muted-foreground text-sm'>
          Enter the details of the server you want to create.
        </p>
      </div>
      <CreateServerForm credentials={credentials} />
    </div>
  )
}
