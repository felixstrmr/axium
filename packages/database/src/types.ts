import { InferSelectModel } from 'drizzle-orm'
import * as schema from './schema'

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
export type Credential = InferSelectModel<typeof schema.credentials>
export type Folder = InferSelectModel<typeof schema.folders>
export type Server = InferSelectModel<typeof schema.servers>
