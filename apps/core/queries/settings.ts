import { unstable_cache } from 'next/cache'
import { db } from '@/db'

export const getSettings = async () => {
  return unstable_cache(
    async () => {
      const settings = await db.query.settings.findMany()

      return settings
    },
    ['settings'],
    {
      tags: [`settings`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}
