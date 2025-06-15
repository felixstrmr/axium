'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/utils'
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
        {pathname
          .split('/')
          .filter(Boolean)
          .map((segment, index, array) => {
            const href = `/${array.slice(0, index + 1).join('/')}`
            const label = segment.charAt(0).toUpperCase() + segment.slice(1)

            const isActive = index === array.length - 1

            return (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbItem
                  className={cn(
                    'rounded-md px-2 py-0.5',
                    isActive ? 'text-foreground bg-muted' : 'bg-transparent',
                  )}
                >
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
