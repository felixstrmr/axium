import { db } from '@/db'

export const getServerFolders = async () => {
  const serverFolders = await db.query.serverFolders.findMany()
  return serverFolders
}
