'use client'

import { useEnvironment } from '@/components/providers/environment-provider'

export default function Page() {
  const { environments } = useEnvironment()

  return (
    <div>
      <pre>{JSON.stringify(environments, null, 2)}</pre>
    </div>
  )
}
