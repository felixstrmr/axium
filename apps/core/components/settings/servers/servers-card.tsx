'use client'

import { Folder, Server } from '@/db/types'

type Props = {
  folders: Folder[]
  servers: Server[]
}

export default function ServersCard({ folders, servers }: Props) {
  return (
    <div className='rounded-2xl bg-zinc-800 p-1'>
      <div className='flex items-center justify-between p-4'>
        <div></div>
      </div>
      <div className='bg-background rounded-lg border p-4 shadow-xs'>
        {folders.map((folder) => (
          <div key={folder.id}>{folder.name}</div>
        ))}
      </div>
    </div>
  )
}
