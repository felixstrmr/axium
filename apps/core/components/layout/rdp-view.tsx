import RDPViewHeader from '@/components/layout/rdp-view-header'
import { Environment, Server, ServerConnection } from '@axium/database/types'

type Props = {
  server: Server
  connection: ServerConnection
  environment: Environment | null
}

export default function RDPView({ server, connection, environment }: Props) {
  return (
    <div className='flex size-full flex-col'>
      <RDPViewHeader server={server} environment={environment} />
    </div>
  )
}
