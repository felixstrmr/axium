'use server'

import { db } from '@/db'
import { environments } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { deleteEnvironmentSchema } from '@/schemas'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export const deleteEnvironmentAction = authActionClient
  .metadata({
    name: 'delete-environment-action',
  })
  .schema(deleteEnvironmentSchema)
  .action(async ({ parsedInput }) => {
    const { id } = parsedInput

    await db.delete(environments).where(eq(environments.id, id))

    revalidatePath('/settings/general')
  })
