import { getServer } from '@/queries/server'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ serverId: string }>
}

export default async function Page({ params }: Props) {
  const { serverId } = await params
  const server = await getServer(serverId)

  if (!server) {
    notFound()
  }

  return (
    <div>
      <pre>{JSON.stringify(server, null, 2)}</pre>
    </div>
  )
}
