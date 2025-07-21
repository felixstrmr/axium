'use client'

import { Switch } from '@axium/ui/components/switch'
import { cn } from '@axium/ui/lib/utils'
import { useState } from 'react'
import type { Setting } from '@/types'

type Props = {
  settings: Setting | undefined
}

export default function SmtpSetting({ settings }: Props) {
  const [isChecked, setIsChecked] = useState(settings !== undefined)

  return (
    <div className='bg-muted p-1 rounded-2xl w-full'>
      <div className='p-4 flex  gap-4'>
        <Switch
          checked={isChecked}
          onCheckedChange={setIsChecked}
          className='mt-1'
        />
        <div>
          <h3 className='text-lg font-semibold tracking-tight'>Custom SMTP</h3>
          <p className='text-sm text-muted-foreground'>
            Add your custom SMTP server.
          </p>
        </div>
      </div>
      <div
        className={cn(
          'bg-background p-4 border rounded-xl',
          isChecked ? 'block' : 'hidden'
        )}
      ></div>
    </div>
  )
}
