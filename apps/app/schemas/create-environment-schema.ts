import { z } from 'zod'

export const upsertEnvironmentSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, 'Environment name is required')
    .max(255, 'Name too long'),
  description: z.string().optional(),
  color: z
    .string()
    .min(1, 'Color is required')
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  isDefault: z.boolean(),
})
