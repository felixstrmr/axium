'use server'

import { eq } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import { auth } from '@/lib/auth'
import { authActionClient } from '@/lib/clients/action-client'
import { upsertUserSchema } from '@/schemas/upsert-user-schema'

export const upsertUserAction = authActionClient
  .metadata({
    name: 'upsert-user-action',
  })
  .inputSchema(upsertUserSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { id, name, email, role, password, confirmPassword } = parsedInput
    const { user } = ctx

    if (user.role !== 'admin') {
      throw new Error('Unauthorized')
    }

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    if (id && existingUser) {
      await db
        .update(users)
        .set({
          name,
          email,
          updatedAt: new Date(),
        })
        .where(eq(users.id, id))

      if (role !== existingUser?.role) {
        await auth.api.setRole({
          body: {
            userId: existingUser?.id,
            role,
          },
          headers: await headers(),
        })
      }

      if (password && confirmPassword) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }

        await auth.api.setUserPassword({
          body: {
            userId: existingUser?.id,
            newPassword: password,
          },
          headers: await headers(),
        })
      }
    } else {
      await auth.api.createUser({
        body: {
          name,
          email,
          password,
          role,
        },
      })
    }

    revalidateTag('users')
  })
