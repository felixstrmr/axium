import { z } from 'zod'

export const upsertUserSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  email: z.email().min(1),
  role: z.enum(['admin', 'user']),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
})
