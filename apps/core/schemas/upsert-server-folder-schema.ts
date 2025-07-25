import { z } from 'zod'

export const upsertServerFolderSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  parentId: z.uuid().optional(),
  environmentId: z.uuid().optional(),
})
