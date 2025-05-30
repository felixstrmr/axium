'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Server } from '@/types'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  servers: Server[]
}

export default function DashboardHeaderBreadcrumb({ servers }: Props) {
  const pathname = usePathname()
  const path = pathname.split('/').filter(Boolean)

  const getDisplayName = (segment: string, index: number) => {
    if (path[index - 1] === 'servers') {
      const server = servers.find((server) => server.id === segment)
      return server ? server.name : segment
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1)
  }

  return (
    <Breadcrumb className='flex h-8 items-center'>
      <BreadcrumbList className='flex items-center gap-1'>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {path.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator className='mx-1'>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${path.slice(0, index + 1).join('/')}`}>
                {getDisplayName(item, index)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
