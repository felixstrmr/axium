import z from 'zod'

export const waitlistJoinSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
})
