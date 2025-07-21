import { cn } from '@axium/ui/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import type * as React from 'react'

const buttonVariants = cva(
  "inline-flex cursor-pointer overflow-hidden items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/25 px-3 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'relative border border-primary bg-primary text-primary-foreground shadow-xs inset-shadow-2xs inset-shadow-blue-400 before:absolute before:inset-0 before:bg-linear-to-b before:from-white/25 before:to-transparent hover:bg-blue-700 active:bg-blue-800 active:shadow-none active:inset-shadow-blue-800',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-8',
        xs: 'h-6',
        sm: 'h-7',
        lg: 'h-9',
        xl: 'h-10',
        icon: 'size-8',
        iconXs: 'size-4',
        iconSm: 'size-6',
        iconLg: 'size-9',
        iconXl: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className='animate-spin' />}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
