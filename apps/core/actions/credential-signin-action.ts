'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@/lib/auth'
import { actionClient } from '@/lib/clients/action-client'
import { credentialSigninSchema } from '@/schemas/credential-signin-schema'

export const credentialSigninAction = actionClient
  .metadata({
    name: 'credential-signin-action',
  })
  .inputSchema(credentialSigninSchema)
  .action(async ({ parsedInput }) => {
    const { email, password, rememberMe } = parsedInput

    const { user } = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
    })

    await db
      .update(users)
      .set({
        lastLoginAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))
  })
