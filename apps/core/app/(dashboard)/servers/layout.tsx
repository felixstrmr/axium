import ServersSidebar from '@/components/servers-sidebar'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='flex size-full gap-1'>
      <ServersSidebar />
      <div className='flex-1 rounded-lg bg-zinc-900/50'>{children}</div>
    </div>
  )
}
