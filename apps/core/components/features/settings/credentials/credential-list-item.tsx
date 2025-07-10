import { Credential } from '@axium/database/types'
import WindowsIcon from '@axium/ui/icons/windows-icon'
import { Eye, Terminal } from 'lucide-react'

type Props = {
  credential: Credential
  isOnlyItem?: boolean
}

export default function CredentialListItem({
  credential,
  isOnlyItem = false,
}: Props) {
  const Icon = {
    rdp: WindowsIcon,
    ssh: Terminal,
    vnc: Eye,
  }[credential.type]

  return (
    <div
      className={`bg-background border-x border-b p-4 shadow-xs ${
        isOnlyItem
          ? 'rounded-xl border-t'
          : 'rounded-xl first:rounded-b-none first:border-t last:rounded-t-none'
      }`}
    >
      <div className='flex items-center gap-3'>
        <div className='bg-muted flex size-8 items-center justify-center rounded-md border shadow-xs'>
          <Icon className='size-4' />
        </div>
        <h3 className='font-semibold tracking-tight'>{credential.name}</h3>
      </div>
    </div>
  )
}
