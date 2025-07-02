'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@axium/ui/components/breadcrumb'
import { cn } from '@axium/utils'
import { Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function DashboardHeaderBreadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)
  const currentSegment = segments[segments.length - 1]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>
            <Home className='size-3.5' />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment) => (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator className='mb-0.5'>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${segment}`}
                className={cn(
                  'capitalize',
                  currentSegment === segment && 'text-foreground',
                )}
              >
                {segment}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
