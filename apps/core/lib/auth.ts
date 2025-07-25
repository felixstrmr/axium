import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin } from 'better-auth/plugins'
import { db } from '@/db'
import * as schema from '@/db/schema'
import { env } from '@/lib/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: env.ENCRYPTION_KEY,
  url: env.AXIUM_URL,
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: 'axium',
  },
  plugins: [nextCookies(), admin()],
})
