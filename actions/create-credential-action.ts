'use server'

import { db } from '@/db'
import { credentials } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { encrypt } from '@/lib/utils'
import { createCredentialSchema } from '@/schemas'
import { revalidateTag } from 'next/cache'

export const createCredentialAction = authActionClient
  .metadata({
    name: 'create-credential-action',
  })
  .schema(createCredentialSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { name, description, username, password, type, domain } = parsedInput
    const { session } = await ctx

    const encryptedPassword = password ? encrypt(password) : null

    await db.insert(credentials).values({
      name,
      description,
      username,
      type,
      domain,
      password: encryptedPassword,
      createdBy: session.user.id,
    })

    revalidateTag('credentials')
  })
