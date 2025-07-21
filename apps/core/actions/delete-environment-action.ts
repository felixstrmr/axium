'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { environments } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { deleteEnvironmentSchema } from '@/schemas/delete-environment-schema'

export const deleteEnvironmentAction = authActionClient
  .metadata({
    name: 'delete-environment-action',
  })
  .inputSchema(deleteEnvironmentSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    await db.delete(environments).where(eq(environments.id, id))

    revalidateTag('environments')
  })
