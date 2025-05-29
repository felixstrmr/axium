import { db } from '@/db'
import { servers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    serverId: string
  }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params

  const server = await db.query.servers.findFirst({
    where: eq(servers.id, serverId),
  })

  if (!server) {
    return notFound()
  }

  return (
    <div>
      <pre>{JSON.stringify(server, null, 2)}</pre>
    </div>
  )
}
