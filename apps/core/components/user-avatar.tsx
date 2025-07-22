import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@axium/ui/components/avatar'
import { cn } from '@axium/ui/lib/utils'
import type { User as AuthUser } from 'better-auth'
import type { User } from '@/types'

type Props = {
  user: AuthUser | User
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'outline'
  className?: string
}

export default function UserAvatar({
  user,
  size = 'md',
  variant = 'default',
  className,
}: Props) {
  const sizeClass = {
    xs: 'size-6 rounded-sm text-xs',
    sm: 'size-7 rounded-sm',
    md: 'size-8 rounded-md',
    lg: 'size-9 rounded-lg',
    xl: 'size-10 rounded-xl',
  }[size]

  const variantClass = {
    default: 'bg-blue-100 border-blue-200 text-primary border',
    outline: 'bg-muted text-muted-foreground border',
  }[variant]

  const initials = user.name
    .split(' ')
    .map((name) => name[0])
    .join('')

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage src={user.image ?? undefined} />
      <AvatarFallback className={cn(sizeClass, variantClass, className)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
