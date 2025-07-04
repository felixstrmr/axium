import dynamic from 'next/dynamic'

const SSHTerminal = dynamic(() => import('@/components/ssh-terminal'), {
  loading: () => (
    <div className='flex size-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <div className='border-primary size-4 animate-spin rounded-full border-2 border-t-transparent' />
        <p className='text-muted-foreground text-sm'>Loading terminal...</p>
      </div>
    </div>
  ),
})

export default function Page() {
  return (
    <div className='flex size-full'>
      <SSHTerminal
        key={123}
        serverId={'123'}
        serverName={'server'}
        host={'10.20.20.1'}
        port={22}
        username={'root'}
        password={process.env.PW}
        credentialId={''}
      />
    </div>
  )
}
