import { columns } from '@/components/tables/credentials/columns'
import { DataTable } from '@/components/tables/credentials/data-table'
import { buttonVariants } from '@/components/ui/button'
import { db } from '@/db'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export default async function Page() {
  const credentials = await db.query.credentials.findMany({
    with: {
      createdBy: true,
    },
  })

  return (
    <div className='flex size-full flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>Credentials</h1>
          <p className='text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 text-sm'>
            {credentials.length}
          </p>
        </div>
        <Link
          href={'/settings/credentials/create'}
          className={buttonVariants({ variant: 'default' })}
        >
          <Plus />
          Create
        </Link>
      </div>
      <DataTable columns={columns} data={credentials} />
    </div>
  )
}
