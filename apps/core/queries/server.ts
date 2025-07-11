import { db, eq } from '@axium/database'
import * as schema from '@axium/database/schema'
import { unstable_cache } from 'next/cache'
import { cache } from 'react'

export const getServers = cache(async () => {
  return unstable_cache(
    async () => {
      const servers = await db.query.servers.findMany()

      return servers
    },
    ['servers'],
    {
      tags: [`servers`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})

export const getServer = cache(async (serverId: string) => {
  return unstable_cache(
    async () => {
      const server = await db.query.servers.findFirst({
        where: eq(schema.servers.id, serverId),
      })

      return server
    },
    ['server', serverId],
    {
      tags: [`server`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})

export const getServerConnections = cache(async (serverId: string) => {
  return unstable_cache(
    async () => {
      const connections = await db.query.serverConnections.findMany({
        where: eq(schema.serverConnections.serverId, serverId),
      })

      return connections
    },
    ['server-connections', serverId],
    {
      tags: [`server-connections`],
      revalidate: 60 * 60 * 24, // 1 day
    },
  )()
})
