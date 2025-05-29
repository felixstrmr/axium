'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function DashboardHeader() {
  const pathname = usePathname()
  const path = pathname.split('/').filter(Boolean)

  return (
    <nav className='flex items-center border-b p-4'>
      <div className='flex h-8 items-center'>
        <Breadcrumb>
          <BreadcrumbList className='flex items-center gap-1'>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {path.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator className='mx-1'>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/${path.slice(0, index + 1).join('/')}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  )
}
