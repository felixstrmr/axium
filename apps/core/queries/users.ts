import { db } from '@/db'

export const getUsers = async () => {
  const users = await db.query.users.findMany()
  return users
}
