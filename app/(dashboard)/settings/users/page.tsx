import { columns } from '@/components/tables/users/columns'
import { DataTable } from '@/components/tables/users/data-table'
import { db } from '@/db'

export default async function Page() {
  const users = await db.query.users.findMany()

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <div className='flex h-8 items-center justify-between'>
        <h1 className='text-2xl font-semibold tracking-tight'>Users</h1>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
