'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { useEnvironment } from '@/components/providers/environment-provider'

export default function EnvironmentSelect() {
  const { environments, selectedEnvironmentId, setCurrentEnvironmentId } =
    useEnvironment()

  const handleEnvironmentChange = (value: string) => {
    if (value === 'all') {
      setCurrentEnvironmentId(null)
    } else {
      setCurrentEnvironmentId(value)
    }
  }

  return (
    <Select
      value={selectedEnvironmentId ? selectedEnvironmentId : 'all'}
      onValueChange={handleEnvironmentChange}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Environment' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>
          <div className='size-2 rounded-full bg-primary' />
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
