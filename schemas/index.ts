import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const upsertEnvironmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
})
