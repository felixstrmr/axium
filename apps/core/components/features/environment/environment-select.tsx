'use client'

import { useEnvironment } from '@/components/providers/environment-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'

export default function EnvironmentSelect() {
  const { environments, currentEnvironmentId, setCurrentEnvironmentId } =
    useEnvironment()

  return (
    <Select
      value={currentEnvironmentId}
      onValueChange={setCurrentEnvironmentId}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select an environment' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>
          <div className='bg-primary size-2 rounded-full' />
          All environments
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
