import { db } from '@/db'
import * as schema from '@/db/schema'
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
  advanced: {
    cookiePrefix: 'axium',
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      authorizationUrl: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID || 'common'}/oauth2/v2.0/authorize`,
      tokenUrl: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID || 'common'}/oauth2/v2.0/token`,
      scope: [
        'openid',
        'profile',
        'email',
        'User.Read',
        'GroupMember.Read.All',
      ],
    },
  },
  user: {
    additionalFields: {
      azureId: {
        type: 'string',
        required: false,
      },
      department: {
        type: 'string',
        required: false,
      },
      jobTitle: {
        type: 'string',
        required: false,
      },
    },
  },
  plugins: [nextCookies(), admin()],
})
