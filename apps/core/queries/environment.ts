import { db, eq } from '@axium/database'
import { environments } from '@axium/database/schema'
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

export const getEnvironment = cache(async (id: string) => {
  return unstable_cache(
    async () => {
      const environment = await db.query.environments.findFirst({
        where: eq(environments.id, id),
      })

      return environment
    },
    ['environment', id],
    {
      tags: [`environment-${id}`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})
