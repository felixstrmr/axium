import { db } from '@/db'

export const getSettings = async () => {
  const settings = await db.query.settings.findMany()
  return settings
}
