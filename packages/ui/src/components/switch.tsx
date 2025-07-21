'use client'

import { cn } from '@axium/ui/lib/utils'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import type * as React from 'react'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'peer cursor-pointer relative data-[state=checked]:bg-primary data-[state=checked]:border data-[state=checked]:border-primary data-[state=checked]:inset-shadow-2xs data-[state=checked]:inset-shadow-blue-400 data-[state=checked]:before:bg-linear-to-b data-[state=checked]:before:from-white/25 data-[state=checked]:before:to-transparent data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/25 hover:border-ring dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
