import { defineEnv } from 'envin'
import { z } from 'zod'

export default defineEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  clientPrefix: 'NEXT_PUBLIC_',
  client: {
    NEXT_PUBLIC_APP_PORT: z.number().default(3000),
    NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
  },
  server: {
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().optional(),
    DATABASE_URL: z.string(),
    ENCRYPTION_KEY: z
      .string()
      .min(32, 'Encryption key must be at least 32 characters')
      .refine(
        (key) => Buffer.from(key, 'base64').length >= 32,
        'Encryption key must be a valid base64 string of at least 32 bytes',
      ),

    MICROSOFT_CLIENT_ID: z.string(),
    MICROSOFT_CLIENT_SECRET: z.string(),
    MICROSOFT_TENANT_ID: z.string(),
  },
  envStrict: {
    NEXT_PUBLIC_APP_PORT: process.env.NEXT_PUBLIC_APP_PORT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,

    MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
    MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
    MICROSOFT_TENANT_ID: process.env.MICROSOFT_TENANT_ID,
  },
})
