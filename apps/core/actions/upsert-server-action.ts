'use server'

import { revalidateTag } from 'next/cache'
import { db } from '@/db'
import { identities, serverIdentities, servers } from '@/db/schema'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertServerSchema } from '@/schemas/upsert-server-schema'
import { encrypt } from '@/utils/encryption'

export const upsertServerAction = authActionClient
  .metadata({
    name: 'upsert-server-action',
  })
  .inputSchema(upsertServerSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { server, identity, identityId } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    if (server.id) {
      // TODO
    } else {
      const [newServer] = await db
        .insert(servers)
        .values({
          name: server.name,
          description: server.description,
          host: server.host,
          environmentId: server.environmentId,
          folderId: server.folderId,
          icon: server.icon,
          createdBy: user.id,
          createdAt: new Date(),
        })
        .returning()

      if (identityId && newServer && identity?.port) {
        await db.insert(serverIdentities).values({
          serverId: newServer.id,
          identityId,
          port: identity.port,
          createdBy: user.id,
          createdAt: new Date(),
        })
      } else if (identity?.password) {
        const encryptedPassword = await encrypt(identity.password)

        const [newIdentity] = await db
          .insert(identities)
          .values({
            name: identity.name ?? `Auto generated ${new Date().toISOString()}`,
            type: identity.type,
            username: identity.username,
            password: encryptedPassword,
            domain: identity.domain,
            createdBy: user.id,
            createdAt: new Date(),
          })
          .returning()

        if (!newIdentity || !newServer) {
          throw new Error('Failed to create identity')
        }

        await db.insert(serverIdentities).values({
          serverId: newServer.id,
          identityId: newIdentity.id,
          port: identity.port,
          createdBy: user.id,
          createdAt: new Date(),
        })
      }
    }

    revalidateTag('servers')
    revalidateTag('server-folders')
    revalidateTag('identities')
    revalidateTag('server-identities')
  })
