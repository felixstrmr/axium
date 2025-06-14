import { db } from '@/db'
import * as schema from '@/db/schema'
import env from '@/lib/env'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema,
  }),
  socialProviders: {
    microsoft: {
      clientId: env.MICROSOFT_CLIENT_ID,
      clientSecret: env.MICROSOFT_CLIENT_SECRET,
      tenantId: env.MICROSOFT_TENANT_ID,
      prompt: 'select_account',
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  logger: {
    level: 'error',
  },
  plugins: [nextCookies(), admin()],
})
