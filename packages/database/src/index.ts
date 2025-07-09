import * as schema from '@axium/database/schema'
import { drizzle } from 'drizzle-orm/node-postgres'

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
})
