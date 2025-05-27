import { columns } from '@/components/tables/users/columns'
import { DataTable } from '@/components/tables/users/data-table'
import { Button } from '@/components/ui/button'
import { db } from '@/db'
import { RefreshCcw } from 'lucide-react'

export default async function Page() {
  const users = await db.query.users.findMany()

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold tracking-tight'>Users</h1>
        <Button variant={'outline'}>
          <RefreshCcw />
          Sync
        </Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  )
}
