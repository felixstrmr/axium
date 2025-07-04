import * as schema from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
export type Server = InferSelectModel<typeof schema.servers>
export type Folder = InferSelectModel<typeof schema.folders>
