'use server'

import { db } from '@/db'
import { environments } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertEnvironmentSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'

export const upsertEnvironmentAction = authActionClient
  .metadata({
    name: 'upsert-environment-action',
  })
  .schema(upsertEnvironmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name } = parsedInput
    const {
      session: { user },
    } = ctx

    await db
      .insert(environments)
      .values({
        ...(id ? { id } : {}),
        name,
        createdBy: user.id,
      })
      .onConflictDoUpdate({
        target: environments.id,
        set: {
          name,
        },
      })

    revalidatePath('/settings/general')
  })
