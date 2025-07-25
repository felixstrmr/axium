import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'
import z from 'zod'
import { WHITELISTED_ERROR_MESSAGES } from '@/lib/constants'

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
    })
  },
  handleServerError(error, { metadata }) {
    console.error(metadata.name, error.message)

    if (WHITELISTED_ERROR_MESSAGES.includes(error.message)) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})
