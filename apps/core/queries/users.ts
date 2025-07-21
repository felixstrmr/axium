import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { db } from '@/db'

export const getUsers = cache(async () => {
  return unstable_cache(
    async () => {
      const users = await db.query.users.findMany()

      return users
    },
    ['users'],
    {
      tags: [`users`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
})
