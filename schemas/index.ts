import { z } from 'zod'

export const signinSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export const createServerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  host: z.string().min(1, 'Host is required'),
  port: z.number().min(1, 'Port is required'),
  protocol: z.enum(['ssh', 'vnc', 'rdp']),
  username: z.string().optional(),
  password: z.string().optional(),
  credentialId: z.string().optional(),
  os: z.enum(['linux', 'windows', 'macos']),
})

export const createCredentialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  domain: z.string().optional(),
  type: z.enum(['ssh', 'vnc', 'rdp']),
})
