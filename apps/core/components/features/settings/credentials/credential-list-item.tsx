import { Credential } from '@axium/database/types'
import WindowsIcon from '@axium/ui/icons/windows-icon'
import { Eye, Terminal } from 'lucide-react'

type Props = {
  credential: Credential
}

export default function CredentialListItem({ credential }: Props) {
  const Icon =
    {
      rdp: WindowsIcon,
      ssh: Terminal,
      vnc: Eye,
    }[credential.type] ?? Terminal

  return (
    <div className='bg-background rounded-xl border-x border-b p-4 shadow-xs first:rounded-b-none first:border-t last:rounded-t-none'>
      <div className='flex items-center gap-3'>
        <div className='bg-muted flex size-8 items-center justify-center rounded-md border shadow-xs'>
          <Icon className='size-4' />
        </div>
        <h3 className='font-semibold tracking-tight'>{credential.name}</h3>
      </div>
    </div>
  )
}
