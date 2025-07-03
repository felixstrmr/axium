import HomeNavbar from '@/components/home-navbar'

type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <div className='flex size-full flex-col'>
      <HomeNavbar />
      <div className='flex-1 pt-14'>{children}</div>
    </div>
  )
}
