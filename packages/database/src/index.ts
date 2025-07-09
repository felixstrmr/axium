import * as schema from '@axium/database/schema'
import { drizzle } from 'drizzle-orm/node-postgres'

export {
  and,
  asc,
  avg,
  count,
  desc,
  eq,
  ilike,
  inArray,
  isNotNull,
  isNull,
  like,
  max,
  min,
  not,
  notInArray,
  or,
  sum,
} from 'drizzle-orm'

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
})
