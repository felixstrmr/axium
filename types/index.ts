import * as schema from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

declare namespace NodeJS {
  interface ProcessEnv {
    ENCRYPTION_KEY: string
    DATABASE_URL: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
    MICROSOFT_CLIENT_ID: string
    MICROSOFT_CLIENT_SECRET: string
    MICROSOFT_TENANT_ID: string | null
  }
}

export type User = InferSelectModel<typeof schema.users>
export type Environment = InferSelectModel<typeof schema.environments>
export type Server = InferSelectModel<typeof schema.servers>
export type Credential = InferSelectModel<typeof schema.credentials>
export type Folder = InferSelectModel<typeof schema.folders>
