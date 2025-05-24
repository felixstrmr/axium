import { createSafeActionClient } from 'next-safe-action'
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
