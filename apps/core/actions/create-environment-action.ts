'use server'

import { db } from '@/db'
import { environments } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertEnvironmentSchema } from '@/schemas/create-environment-schema'
import { revalidatePath } from 'next/cache'

export const upsertEnvironmentAction = authActionClient
  .metadata({
    name: 'upsert-environment-action',
  })
  .inputSchema(upsertEnvironmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, description, color, isDefault } = parsedInput
    const { user } = ctx

    if (isDefault) {
      await db.update(environments).set({
        isDefault: false,
        updatedBy: user.id,
        updatedAt: new Date(),
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
      })
    }

    revalidatePath('/settings/general')
  })
