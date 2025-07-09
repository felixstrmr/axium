'use client'

import { Environment } from '@axium/database/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { useQueryState } from 'nuqs'

type Props = {
  environments: Environment[]
}

export default function EnvironmentSelect({ environments }: Props) {
  const [environmentId, setEnvironmentId] = useQueryState('environmentId', {
    defaultValue: 'all',
  })

  return (
    <Select value={environmentId} onValueChange={setEnvironmentId}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select an environment' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>All environments</SelectItem>
        {environments.map((environment) => (
          <SelectItem key={environment.id} value={environment.id}>
            {environment.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
