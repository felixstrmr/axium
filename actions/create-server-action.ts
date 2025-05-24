'use server'

import { db } from '@/db'
import { servers } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { createServerSchema } from '@/schemas'
import { revalidateTag } from 'next/cache'

export const createServerAction = authActionClient
  .metadata({
    name: 'create-server-action',
  })
  .schema(createServerSchema)
  .action(async ({ ctx, parsedInput }) => {
    const { name, host, port, protocol, username, password, os, credentialId } =
      parsedInput
    const { session } = ctx

    await db.insert(servers).values({
      name,
      host,
      port,
      protocol,
      username,
      password,
      os,
      credentialId,
      createdBy: session.user.id,
    })

    revalidateTag('servers')
  })
