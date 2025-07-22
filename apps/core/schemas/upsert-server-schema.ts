import z from 'zod'

export const upsertServerSchema = z.object({
  serverName: z.string().min(1, 'Name is required'),
  serverDescription: z.string().optional(),
  serverHost: z.string().min(1, 'Host is required'),
  serverPort: z.number().min(1, 'Port is required'),
  serverEnvironmentId: z.uuid().optional(),
  identityType: z.enum(['ssh', 'vnc', 'rdp']),
  identityName: z.string().optional(),
  identityUsername: z.string().optional(),
  identityPassword: z.string().min(1, 'Password is required'),
  identityDomain: z.string().optional(),
  identityDescription: z.string().optional(),
})
