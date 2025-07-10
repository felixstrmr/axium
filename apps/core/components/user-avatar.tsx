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
}

export default function UserAvatar({ user, size = 'md' }: Props) {
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
    <Avatar className={cn(sizeClass)}>
      <AvatarImage className={cn(sizeClass)} src={user.image ?? undefined} />
      <AvatarFallback
        className={cn(
          'from-primary border-primary text-primary-foreground shadow-[inset_0_1px_0_0_theme(colors.primary-foreground/25%)] border bg-gradient-to-t to-zinc-600',
          sizeClass,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
