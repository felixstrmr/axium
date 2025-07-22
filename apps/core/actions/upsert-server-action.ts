'use server'

import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { identities, servers } from '@/db/schema'
import { serverIdentities } from '@/db/schema/server-identities'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'
import { encrypt } from '@/utils/encryption'

export const upsertServerAction = authActionClient
  .metadata({
    name: 'upsert-server-action',
  })
  .inputSchema(upsertServerSchema)
  .action(async ({ parsedInput, ctx }) => {
    const {
      serverName,
      serverDescription,
      serverHost,
      serverPort,
      serverEnvironmentId,
      identityType,
      identityName,
      identityUsername,
      identityPassword,
      identityDomain,
      identityDescription,
    } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    const [server] = await db
      .insert(servers)
      .values({
        name: serverName,
        description: serverDescription,
        host: serverHost,
        environmentId: serverEnvironmentId,
        createdBy: user.id,
      })
      .returning({ id: servers.id })

    const encryptedPassword = await encrypt(identityPassword)

    const [identity] = await db
      .insert(identities)
      .values({
        name: identityName ?? null,
        description: identityDescription ?? null,
        type: identityType,
        username: identityUsername ?? null,
        password: encryptedPassword,
        domain: identityDomain ?? null,
        createdBy: user.id,
      })
      .returning({ id: identities.id })

    if (server?.id && identity?.id) {
      await db.insert(serverIdentities).values({
        serverId: server.id,
        identityId: identity.id,
        port: serverPort,
      })
    }

    revalidateTag('servers')
  })
