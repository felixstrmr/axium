import * as schema from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
