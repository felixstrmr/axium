'use server'

import { APIError } from 'loops'
import { actionClient } from '@/lib/clients/action-client'
import { loopsClient } from '@/lib/clients/loops-client'
import { waitlistJoinSchema } from '@/schemas/waitlist-join-schema'

export const waitlistJoinAction = actionClient
  .metadata({
    name: 'waitlist-join-action',
  })
  .inputSchema(waitlistJoinSchema)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput
    try {
      await loopsClient.createContact(
        email,
        {},
        {
          clyxx0n6j00q40mjreo2v8koj: true,
        }
      )
    } catch (error) {
      if (error instanceof APIError && error.statusCode === 409) {
        throw new Error('You are already on the waitlist')
      }

      throw error
    }
  })
