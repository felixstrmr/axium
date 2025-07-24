import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className='flex size-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='size-4 animate-spin' />
      </div>
    </div>
  )
}
