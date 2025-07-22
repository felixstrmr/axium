import { unstable_cache } from 'next/cache'
import { db } from '@/db'

export const getUsers = async () => {
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
}
