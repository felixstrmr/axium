'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { serverFolders } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertServerFolderSchema } from '@/schemas/upsert-server-folder-schema'

export const upsertServerFolderAction = authActionClient
  .metadata({
    name: 'upsert-server-folder-action',
  })
  .inputSchema(upsertServerFolderSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, parentId, environmentId } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    if (id) {
      await db
        .update(serverFolders)
        .set({
          name,
          parentId,
          environmentId,
          updatedBy: user.id,
          updatedAt: new Date(),
        })
        .where(eq(serverFolders.id, id))
    } else {
      await db.insert(serverFolders).values({
        name,
        parentId,
        environmentId,
        createdBy: user.id,
        createdAt: new Date(),
      })
    }

    revalidateTag('server-folders')
  })
