import { db } from '@axium/database'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getFolders = cache(async () => {
  return unstable_cache(
    async () => {
      const folders = await db.query.folders.findMany()

      return folders
    },
    ['folders'],
    {
      tags: [`folders`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})
