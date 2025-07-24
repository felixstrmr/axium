import { eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { db } from '@/db'
import { servers } from '@/db/schema'

export const getServers = async () => {
  return unstable_cache(
    async () => {
      const servers = await db.query.servers.findMany()

      return servers
    },
    ['servers'],
    {
      tags: [`servers`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}

export const getServer = async (serverId: string) => {
  return unstable_cache(
    async () => {
      const server = await db.query.servers.findFirst({
        where: eq(servers.id, serverId),
      })

      return server
    },
    ['servers', serverId],
    {
      tags: [`servers`, `server-${serverId}`],
      revalidate: 60 * 60 * 24, // 1 day
    }
  )()
}
