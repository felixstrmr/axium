import { users } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

declare namespace NodeJS {
  interface ProcessEnv {
    ENCRYPTION_KEY: string
    DATABASE_URL: string
    BETTER_AUTH_SECRET: string
    BETTER_AUTH_URL: string
  }
}

export type User = InferSelectModel<typeof users>
