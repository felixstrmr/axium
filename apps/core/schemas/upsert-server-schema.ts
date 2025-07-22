import z from 'zod'

export const upsertServerSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1),
  description: z.string().optional(),
  host: z.string().min(1),
  environmentId: z.uuid().optional(),
})
