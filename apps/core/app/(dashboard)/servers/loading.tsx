import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center bg-zinc-900/50'>
      <Loader className='size-4 animate-spin' />
    </div>
  )
}
