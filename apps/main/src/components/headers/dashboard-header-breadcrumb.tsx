'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@axium/ui/components/breadcrumb'
import { House } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function DashboardHeaderBreadcrumb() {
  const pathname = usePathname()

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>
            <House className='size-3.5' />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.split('/').map((segment, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${segment}`} className='capitalize'>
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
