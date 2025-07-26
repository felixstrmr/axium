import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { servers } from '@/db/schema'

export const getServers = async () => {
  const serversResult = await db.query.servers.findMany()
  return serversResult
}

export const getServer = async (serverId: string) => {
  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: {
      environment: true,
    },
  })
  return server
}
