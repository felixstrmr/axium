import { InferSelectModel } from 'drizzle-orm'
import * as schema from './schema'

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
export type Credential = InferSelectModel<typeof schema.credentials>
