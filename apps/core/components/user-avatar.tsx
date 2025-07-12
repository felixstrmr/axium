import { User } from '@axium/database/types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@axium/ui/components/avatar'
import { cn } from '@axium/utils'

type Props = {
  user: User
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function UserAvatar({ user, size = 'md', className }: Props) {
  const sizeClass = {
    sm: 'size-7 rounded-md',
    md: 'size-8 rounded-md',
    lg: 'size-9 rounded-md',
  }[size]

  const initials = user.name
    .split(' ')
    .map((name) => name.charAt(0))
    .join('')

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage className={cn(sizeClass)} src={user.image ?? undefined} />
      <AvatarFallback
        className={cn(
          'rounded-md border border-zinc-300 bg-zinc-200 shadow-xs',
          sizeClass,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
