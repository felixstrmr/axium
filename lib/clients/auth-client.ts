import { env } from '@/lib/env'
import { adminClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [adminClient()],
})
