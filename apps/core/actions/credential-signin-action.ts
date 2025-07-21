'use server'

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

    await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
      },
    })
  })
