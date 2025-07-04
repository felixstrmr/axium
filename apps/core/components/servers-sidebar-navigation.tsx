'use client'

import ServersSidebarTree from '@/components/servers-sidebar-tree'
import { Environment, Folder, Server } from '@/db/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@axium/ui/components/select'
import { Separator } from '@axium/ui/components/separator'
import { parseAsString, useQueryState } from 'nuqs'

type Props = {
  folders: Folder[]
  servers: Server[]
  environments: Environment[]
}

export default function ServersSidebarNavigation({
  folders,
  servers,
  environments,
}: Props) {
  const [selectedEnvironment, setSelectedEnvironment] = useQueryState(
    'environment',
    parseAsString.withDefault('all').withOptions({ shallow: false }),
  )

  return (
    <div className='flex flex-col'>
      <Select
        value={selectedEnvironment}
        onValueChange={setSelectedEnvironment}
      >
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select Environment' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All environments</SelectItem>
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
      <Separator className='my-4 bg-transparent' />
      <ServersSidebarTree folders={folders} servers={servers} />
    </div>
  )
}
