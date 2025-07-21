'use client'

import { cn } from '@axium/ui/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'
import type * as React from 'react'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'peer cursor-pointer relative border-input dark:bg-input/30 bg-background hover:border-ring focus-visible:border-ring focus-visible:ring-ring/25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-[shadow,border] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:text-primary-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:before:absolute data-[state=checked]:before:inset-0 data-[state=checked]:before:inset-shadow-2xs data-[state=checked]:before:inset-shadow-blue-400 data-[state=checked]:before:bg-linear-to-b data-[state=checked]:before:from-white/25 data-[state=checked]:before:to-transparent data-[state=checked]:before:rounded-[3px]',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
