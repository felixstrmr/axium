'use server'

import { actionClient } from '@/src/lib/clients/action-client'
import { credentialSigninSchema } from '@/src/schemas/credential-signin-schema'
import { auth } from '@axium/auth'

export const credentialSigninAction = actionClient
  .metadata({
    name: 'credential-signin-action',
  })
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
