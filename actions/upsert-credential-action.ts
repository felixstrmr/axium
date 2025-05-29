'use server'

import { db } from '@/db'
import { credentials } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertCredentialSchema } from '@/schemas'
import { encrypt } from '@/utils/encryption'
import { revalidatePath } from 'next/cache'

export const upsertCredentialAction = authActionClient
  .metadata({
    name: 'upsert-credential-action',
  })
  .schema(upsertCredentialSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      id,
      name,
      description,
      type,
      environmentId,
      username,
      password: passwordInput,
      domain,
    } = parsedInput
    const {
      session: { user },
    } = ctx

    const password = encrypt(passwordInput)

    await db
      .insert(credentials)
      .values({
        ...(id ? { id } : {}),
        name,
        description,
        type,
        environmentId,
        username,
        password,
        domain,
        createdBy: user.id,
      })
      .onConflictDoUpdate({
        target: credentials.id,
        set: {
          name,
          description,
          type,
          environmentId,
          username,
          password,
          domain,
        },
      })

    revalidatePath('/settings/credentials')
  })
