import { cn } from '@axium/ui/lib/utils'
import type * as React from 'react'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded-md border bg-background px-3 text-sm shadow-xs transition-[color,box-shadow,border] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring hover:border-ring focus-visible:ring-ring/25 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }
