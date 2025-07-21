'use server'

import { cookies } from 'next/headers'
import z from 'zod'
import { actionClient } from '@/lib/clients/action-client'

export const setEnvironmentAction = actionClient
  .inputSchema(
    z.object({
      environmentId: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { environmentId } = parsedInput

    const cookieStore = await cookies()
    cookieStore.set('axium.environmentId', environmentId)
  })
