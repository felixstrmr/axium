import * as schema from '@axium/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
