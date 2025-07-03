import { auth } from '@axium/auth'
import { createSafeActionClient } from 'next-safe-action'
import { headers } from 'next/headers'
import { z } from 'zod'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message)

    return error.message
  },
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    throw new Error('Unauthorized')
  }

  return next({
    ctx: session,
  })
})
