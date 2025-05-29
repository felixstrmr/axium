import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const upsertEnvironmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
})

export const deleteEnvironmentSchema = z.object({
  id: z.string().min(1),
})

export const upsertCredentialSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.enum(['ssh', 'vnc', 'rdp']),
  environmentId: z.string().min(1, 'Environment is required'),
  username: z.string(),
  password: z.string(),
  domain: z.string(),
})
