import HomeNavbar from '@/components/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col'>
      <HomeNavbar />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
