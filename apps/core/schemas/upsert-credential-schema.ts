import { z } from 'zod'

export const upsertCredentialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  username: z.string().optional(),
  password: z.string().min(1, 'Password is required'),
  domain: z.string().optional(),
  type: z.enum(['rdp', 'ssh', 'vnc']),
  environmentId: z.string().optional(),
})
