type Props = {
  children: React.ReactNode
}

export default function HomeLayout({ children }: Props) {
  return <div className='size-full flex flex-col'>{children}</div>
}
