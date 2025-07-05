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
import React from 'react'

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
    parseAsString.withDefault('all'),
  )

  const filteredServers = React.useMemo(() => {
    if (selectedEnvironment === 'all') return servers
    return servers.filter(
      (server) => server.environmentId === selectedEnvironment,
    )
  }, [selectedEnvironment, servers])

  const filteredFolders = React.useMemo(() => {
    if (selectedEnvironment === 'all') return folders
    return folders.filter(
      (folder) => folder.environmentId === selectedEnvironment,
    )
  }, [selectedEnvironment, folders])

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
      <ServersSidebarTree folders={filteredFolders} servers={filteredServers} />
    </div>
  )
}
