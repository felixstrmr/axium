'use server'

import { actionClient } from '@/lib/clients/action-client'
import { credentialSigninSchema } from '@/schemas/credential-signin-schema'
import { auth } from '@axium/auth'
import { headers } from 'next/headers'

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
      headers: await headers(),
    })
  })
