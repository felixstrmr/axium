'use server'

import { authActionClient } from '@/lib/clients/action-client'
import env from '@/lib/env'
import { upsertCredentialSchema } from '@/schemas/upsert-credential-schema'
import { db, eq } from '@axium/database'
import { credentials } from '@axium/database/schema'
import { encrypt } from '@axium/utils/encryption'
import { revalidateTag } from 'next/cache'

export const upsertCredentialAction = authActionClient
  .metadata({
    name: 'upsert-credential-action',
  })
  .inputSchema(upsertCredentialSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      id,
      name,
      description,
      username,
      domain,
      type,
      environmentId,
      password: unencryptedPassword,
    } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    const password = await encrypt(env.ENCRYPTION_KEY, unencryptedPassword)

    if (id) {
      await db
        .update(credentials)
        .set({
          name,
          description,
          username,
          password,
          domain,
          type,
          environmentId,
          updatedBy: user.id,
          updatedAt: new Date(),
        })
        .where(eq(credentials.id, id))
    } else {
      await db.insert(credentials).values({
        name,
        description,
        username,
        password,
        type,
        domain,
        environmentId,
        createdBy: user.id,
        updatedBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    revalidateTag('credentials')
  })
