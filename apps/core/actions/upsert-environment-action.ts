'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { environments } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertEnvironmentSchema } from '@/schemas/upsert-environment-schema'

export const upsertEnvironmentAction = authActionClient
  .metadata({
    name: 'upsert-environment-action',
  })
  .inputSchema(upsertEnvironmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, color, isDefault } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    if (isDefault) {
      await db.update(environments).set({
        isDefault: false,
      })
    }

    if (id) {
      await db
        .update(environments)
        .set({
          name,
          color,
          isDefault,
          updatedBy: user.id,
          updatedAt: new Date(),
        })
        .where(eq(environments.id, id))
    } else {
      await db.insert(environments).values({
        name,
        color,
        isDefault,
        createdBy: user.id,
        createdAt: new Date(),
      })
    }

    revalidateTag('environments')
  })
