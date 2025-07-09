import { auth } from '@axium/auth'
import { db, eq } from '@axium/database'
import * as schema from '@axium/database/schema'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) return null

  return unstable_cache(
    async () => {
      const user = await db.query.users.findFirst({
        where: eq(schema.users.id, session.user.id),
      })

      return user || null
    },
    ['user', session.user.id],
    {
      tags: [`user-${session.user.id}`],
      revalidate: 60 * 5, // 5 min
    },
  )()
})
