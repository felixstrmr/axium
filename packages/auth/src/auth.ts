import { db } from '@axium/database'
import * as schema from '@axium/database/schema'
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
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: 'axium',
  },
  plugins: [nextCookies(), admin()],
})
