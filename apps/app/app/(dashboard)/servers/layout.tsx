import ServersSidebar from '@/components/servers-sidebar'

type Props = {
  children: React.ReactNode
}

export default function ServersLayout({ children }: Props) {
  return (
    <div className='flex size-full'>
      <ServersSidebar />
      {children}
    </div>
  )
}
