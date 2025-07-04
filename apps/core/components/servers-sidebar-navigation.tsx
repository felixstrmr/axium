'use client'

import { Environment, Server } from '@/db/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  servers: Server[]
  environments: Environment[]
}

export default function ServersSidebarNavigation({
  servers,
  environments,
}: Props) {
  const [selectedEnvironment, setSelectedEnvironment] = useQueryState(
    'environment',
    parseAsString.withDefault('all'),
  )

  return (
    <div>
      <Select
        value={selectedEnvironment}
        onValueChange={setSelectedEnvironment}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Environment' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Environments</SelectItem>
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
    </div>
  )
}
