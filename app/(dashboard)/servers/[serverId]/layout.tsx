import { db } from '@/db'
import { servers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{ serverId: string }>
  ssh: React.ReactNode
}

export default async function ServerLayout({ params, ssh }: Props) {
  const { serverId } = await params

  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
    with: {
      credential: true,
      environment: true,
    },
  })

  if (!server) {
    return notFound()
  }

  if (server.protocol === 'ssh') {
    return ssh
  }
}
