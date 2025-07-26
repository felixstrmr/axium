import z from 'zod'

export const upsertServerSchema = z.object({
  server: z.object({
    id: z.uuid().optional(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    host: z.string().min(1, 'Host is required'),
    environmentId: z.string().optional(),
    folderId: z.string().optional(),
    icon: z.string().optional(),
  }),
  identityId: z.uuid().optional(),
  identity: z
    .object({
      name: z.string().optional(),
      type: z.enum(['ssh', 'vnc', 'rdp']),
      port: z.number().min(1, 'Port is required'),
      username: z.string().optional(),
      password: z.string().optional(),
      domain: z.string().optional(),
    })
    .optional(),
})
