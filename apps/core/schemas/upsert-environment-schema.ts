import { z } from 'zod'

export const upsertEnvironmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().min(1, 'Color is required'),
  isDefault: z.boolean().optional(),
})
