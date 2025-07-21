import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@axium/ui/components/avatar'
import { cn } from '@axium/ui/lib/utils'
import type { User } from 'better-auth'

type Props = {
  user: User
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function UserAvatar({ user, size = 'md', className }: Props) {
  const sizeClass = {
    xs: 'size-6',
    sm: 'size-7',
    md: 'size-8',
    lg: 'size-9',
    xl: 'size-10',
  }[size]

  const initials = user.name
    .split(' ')
    .map((name) => name[0])
    .join('')

  return (
    <Avatar className={cn(sizeClass, className, 'rounded-md')}>
      <AvatarImage src={user.image ?? undefined} />
      <AvatarFallback
        className={cn(
          sizeClass,
          className,
          'bg-blue-100 rounded-md border-blue-200 text-primary border'
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
