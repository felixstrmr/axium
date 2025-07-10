import { db } from '@axium/database'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getEnvironments = cache(async () => {
  return unstable_cache(
    async () => {
      const environments = await db.query.environments.findMany()

      return environments
    },
    ['environments'],
    {
      tags: [`environments`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})
