import { asc } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { db } from '@/db'
import * as schema from '@/db/schema'

export const getEnvironments = cache(async () => {
  return unstable_cache(
    async () => {
      const environments = await db.query.environments.findMany({
        orderBy: [asc(schema.environments.name)],
      })

      return environments
    },
    ['environments'],
    {
      tags: [`environments`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
})
