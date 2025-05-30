import { generateId } from '@/utils/database'

export default async function Page() {
  const folderId = generateId('fld')

  return <div>{folderId}</div>
}
