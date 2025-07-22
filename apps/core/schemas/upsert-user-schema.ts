import { z } from 'zod'

export const upsertUserSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  email: z.email().min(1),
  role: z.enum(['admin', 'user']),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
})
