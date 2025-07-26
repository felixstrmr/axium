import { asc } from 'drizzle-orm'
import { db } from '@/db'
import * as schema from '@/db/schema'

export const getEnvironments = async () => {
  const environments = await db.query.environments.findMany({
    orderBy: [asc(schema.environments.name)],
  })
  return environments
}
