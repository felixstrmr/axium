import { db } from '@/db'

export default async function Page() {
  const credentials = await db.query.credentials.findMany({
    with: {
      createdBy: true,
    },
  })

  return (
    <div className='flex size-full flex-col'>
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
  )
}
