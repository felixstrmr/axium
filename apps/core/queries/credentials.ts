import { db, desc, eq } from '@axium/database'
import * as schema from '@axium/database/schema'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getCredentials = cache(async (environmentId?: string) => {
  return unstable_cache(
    async () => {
      if (environmentId && environmentId !== 'all') {
        const credentials = await db.query.credentials.findMany({
          where: eq(schema.credentials.environmentId, environmentId),
          orderBy: [desc(schema.credentials.createdAt)],
        })

        return credentials
      }

      const credentials = await db.query.credentials.findMany({
        orderBy: [desc(schema.credentials.createdAt)],
      })

      return credentials
    },
    ['credentials', environmentId ?? 'all'],
    {
      tags: [`credentials`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})

export const getCredential = cache(async (credentialId: string) => {
  return unstable_cache(
    async () => {
      const credential = await db.query.credentials.findFirst({
        where: eq(schema.credentials.id, credentialId),
      })

      return credential
    },
    ['credential', credentialId],
    {
      tags: [`credential-${credentialId}`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})
