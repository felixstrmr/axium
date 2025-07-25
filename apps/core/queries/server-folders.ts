import { unstable_cache } from 'next/cache'
import { db } from '@/db'

export const getServerFolders = async () => {
  return unstable_cache(
    async () => {
      const serverFolders = await db.query.serverFolders.findMany()

      return serverFolders
    },
    ['server-folders'],
    {
      tags: [`server-folders`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}
