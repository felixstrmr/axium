import z from 'zod'

export const upsertEnvironmentSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  isDefault: z.boolean().optional(),
})
