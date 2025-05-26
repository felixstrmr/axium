import { columns } from '@/components/tables/users/columns'
import { DataTable } from '@/components/tables/users/data-table'
import { db } from '@/db'

export default async function Page() {
  const users = await db.query.users.findMany()

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <h1 className='text-xl font-semibold tracking-tight'>Users</h1>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
