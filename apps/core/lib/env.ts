import { defineEnv } from 'envin'
import { z } from 'zod'

export default defineEnv({
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  server: {
    ENCRYPTION_KEY: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
    DATABASE_URL: z.string().min(1),
  },
  envStrict: {
    NODE_ENV: process.env.NODE_ENV,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
})
