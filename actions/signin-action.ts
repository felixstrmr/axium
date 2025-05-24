'use server'

import { auth } from '@/lib/auth'
import { actionClient } from '@/lib/clients/action-client'
import { signinSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

export const signinAction = actionClient
  .metadata({
    name: 'signin-action',
  })
  .schema(signinSchema)
  .action(async ({ parsedInput }) => {
    const { email, password } = parsedInput

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    })

    revalidatePath('/signin', 'page')
  })
