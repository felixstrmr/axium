import z from 'zod'

export const deleteEnvironmentSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, 'Name is required'),
})
