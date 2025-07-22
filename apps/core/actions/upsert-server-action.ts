'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { servers } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'

export const upsertServerAction = authActionClient
  .metadata({
    name: 'upsert-server-action',
  })
  .inputSchema(upsertServerSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, description, host, environmentId } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    if (id) {
      await db
        .update(servers)
        .set({
          name,
          description,
          host,
          environmentId,
          updatedBy: user.id,
          updatedAt: new Date(),
        })
        .where(eq(servers.id, id))
    } else {
      await db.insert(servers).values({
        name,
        description,
        host,
        environmentId,
        createdBy: user.id,
      })
    }

    revalidateTag('servers')
  })
