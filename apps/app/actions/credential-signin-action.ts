'use server'

import { actionClient } from '@/lib/clients/action-client'
import { credentialSigninSchema } from '@/schemas/credential-signin-schema'
import { auth } from '@axium/auth'

export const credentialSigninAction = actionClient
  .inputSchema(credentialSigninSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })
  })
