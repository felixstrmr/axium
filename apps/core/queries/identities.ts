import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { db } from '@/db'
import { identities } from '@/db/schema'

export const getIdentities = async () => {
  return unstable_cache(
    async () => {
      const identities = await db.query.identities.findMany()

      return identities
    },
    ['identities'],
    {
      tags: [`identities`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}

export const getIdentity = async (identityId: string) => {
  return unstable_cache(
    async () => {
      const identity = await db.query.identities.findFirst({
        where: eq(identities.id, identityId),
      })

      return identity
    },
    ['identities', identityId],
    {
      tags: [`identities`, `identity-${identityId}`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}
