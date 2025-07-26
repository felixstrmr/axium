'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@axium/ui/components/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@axium/ui/components/tooltip'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeDropdown() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              type='button'
              className='flex cursor-pointer size-8 items-center text-muted-foreground justify-center rounded-md border border-transparent hover:border-border hover:bg-background'
            >
              <Sun className='size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
              <Moon className='absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>Theme</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align='end' side='right'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
