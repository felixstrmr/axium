'use server'

import { authActionClient } from '@/lib/clients/action-client'
import { upsertEnvironmentSchema } from '@/schemas/upsert-environment-schema'
import { db } from '@axium/database'
import { environments } from '@axium/database/schema'
import { revalidatePath } from 'next/cache'

export const upsertEnvironmentAction = authActionClient
  .metadata({
    name: 'upsert-environment-action',
  })
  .inputSchema(upsertEnvironmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, description, color, isDefault } = parsedInput
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
      await db.update(environments).set({
        name,
        description,
        color,
        isDefault,
        updatedBy: user.id,
        updatedAt: new Date(),
      })
    } else {
      await db.insert(environments).values({
        name,
        description,
        color,
        isDefault,
        createdBy: user.id,
        updatedBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    revalidatePath('/settings/environments')
  })
