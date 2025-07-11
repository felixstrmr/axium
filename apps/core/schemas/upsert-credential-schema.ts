import { z } from 'zod'

export const upsertCredentialSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    username: z.string().optional(),
    password: z.string().optional(),
    domain: z.string().optional(),
    type: z.enum(['rdp', 'ssh', 'vnc']),
    environmentId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.type === 'ssh' &&
        (!data.username || data.username.trim() === '')
      ) {
        return false
      }
      return true
    },
    {
      message: 'Username is required',
      path: ['username'],
    },
  )
  .refine(
    (data) => {
      if (
        data.type === 'ssh' &&
        (!data.password || data.password.trim() === '')
      ) {
        return false
      }
      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (
        data.type === 'vnc' &&
        (!data.password || data.password.trim() === '')
      ) {
        return false
      }
      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      if (
        data.type === 'rdp' &&
        (!data.username || data.username.trim() === '')
      ) {
        return false
      }
      return true
    },
    {
      message: 'Username is required',
      path: ['username'],
    },
  )
  .refine(
    (data) => {
      if (
        data.type === 'rdp' &&
        (!data.password || data.password.trim() === '')
      ) {
        return false
      }
      return true
    },
    {
      message: 'Password is required',
      path: ['password'],
    },
  )
