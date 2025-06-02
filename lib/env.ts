import { z } from 'zod'

const envSchema = z.object({
  ENCRYPTION_KEY: z.string(),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
})

export const env = envSchema.parse(process.env)
