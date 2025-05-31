import { db } from '@/db'
import { servers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { Metadata } from 'next/types'
import React from 'react'

export const metadata: Metadata = {
  title: 'Axium • Server',
}

type Props = {
  params: Promise<{ serverId: string }>
  ssh: React.ReactNode
  vnc: React.ReactNode
  rdp: React.ReactNode
}

export default async function ServerLayout({ params, ssh, vnc, rdp }: Props) {
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

  const Page = {
    ssh: ssh,
    vnc: vnc,
    rdp: rdp,
  }[server.protocol]

  return Page
}
