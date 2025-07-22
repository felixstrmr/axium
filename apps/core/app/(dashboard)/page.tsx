import { generateEncryptionKey } from '@/utils/encryption'

export default function Page() {
  return (
    <div className='bg-background rounded-2xl size-full flex shadow-xs'>
      <pre>{JSON.stringify(generateEncryptionKey(), null, 2)}</pre>
    </div>
  )
}
