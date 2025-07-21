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
  className?: string
}

export default function UserAvatar({ user, size = 'md', className }: Props) {
  const sizeClass = {
    xs: 'size-6 rounded-xs',
    sm: 'size-7 rounded-sm',
    md: 'size-8 rounded-md',
    lg: 'size-9 rounded-lg',
    xl: 'size-10 rounded-xl',
  }[size]

  const initials = user.name
    .split(' ')
    .map((name) => name[0])
    .join('')

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage src={user.image ?? undefined} />
      <AvatarFallback
        className={cn(
          'bg-blue-100 border-blue-200 text-primary border',
          sizeClass,
          className
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
