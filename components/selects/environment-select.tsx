'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Environment } from '@/types'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  environments: Environment[]
}

export default function EnvironmentSelect({ environments }: Props) {
  const [environmentId, setEnvironmentId] = useQueryState(
    'environmentId',
    parseAsString.withDefault('all'),
  )

  return (
    <Select value={environmentId} onValueChange={setEnvironmentId}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Theme' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>
          <div
            className='size-2 rounded-full'
            style={{ backgroundColor: '#000' }}
          />
          All Environments
        </SelectItem>
        {environments.map((environment) => (
          <SelectItem key={environment.id} value={environment.id}>
            <div
              className='size-2 rounded-full'
              style={{ backgroundColor: environment.color }}
            />
            {environment.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
