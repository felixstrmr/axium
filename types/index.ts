import { credentials, servers } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string
    ENCRYPTION_KEY: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
  }
}

export type Credential = InferSelectModel<typeof credentials>
export type Server = InferSelectModel<typeof servers>
