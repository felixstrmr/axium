import { columns } from '@/components/tables/users/columns'
import { DataTable } from '@/components/tables/users/data-table'
import type { User } from '@/types'

type Props = {
  users: User[]
}

export default function UsersSetting({ users }: Props) {
  return <DataTable columns={columns} data={users} />
}
