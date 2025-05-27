import { db } from '@/db'
import { users } from '@/db/schema'
import { ClientSecretCredential } from '@azure/identity'
import { Client } from '@microsoft/microsoft-graph-client'
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials'
import { eq } from 'drizzle-orm'

interface GraphUser {
  id: string
  displayName: string
  mail: string
  userPrincipalName: string
  jobTitle?: string
  department?: string
  accountEnabled: boolean
}

interface SyncResult {
  created: number
  updated: number
  disabled: number
  errors: string[]
}

export function createGraphClient() {
  const credential = new ClientSecretCredential(
    process.env.MICROSOFT_TENANT_ID!,
    process.env.MICROSOFT_CLIENT_ID!,
    process.env.MICROSOFT_CLIENT_SECRET!,
  )

  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: ['https://graph.microsoft.com/.default'],
  })

  return Client.initWithMiddleware({ authProvider })
}

export async function fetchEntraUsers(
  graphClient: Client,
): Promise<GraphUser[]> {
  try {
    const users: GraphUser[] = []
    let nextLink: string | undefined

    do {
      const response = nextLink
        ? await graphClient.api(nextLink).get()
        : await graphClient
            .api('/users')
            .select(
              'id,displayName,mail,userPrincipalName,jobTitle,department,accountEnabled',
            )
            .top(999) // Maximum page size
            .get()

      users.push(...response.value)
      nextLink = response['@odata.nextLink']
    } while (nextLink)

    return users
  } catch (error) {
    console.error('Error fetching Entra users:', error)
    throw new Error('Failed to fetch users from Entra ID')
  }
}

export async function syncUsers(entraUsers: GraphUser[]): Promise<SyncResult> {
  const result: SyncResult = {
    created: 0,
    updated: 0,
    disabled: 0,
    errors: [],
  }

  const existingUsers = await db.query.users.findMany()
  const existingUserMap = new Map(
    existingUsers.map((user) => [user.email, user]),
  )

  const activeEntraEmails = new Set<string>()

  for (const entraUser of entraUsers) {
    try {
      const email = entraUser.mail || entraUser.userPrincipalName

      if (!email) {
        result.errors.push(`User ${entraUser.displayName} has no email address`)
        continue
      }

      activeEntraEmails.add(email.toLowerCase())

      const existingUser = existingUserMap.get(email.toLowerCase())

      if (existingUser) {
        const shouldUpdate =
          existingUser.name !== entraUser.displayName ||
          existingUser.banned === true // Re-enable if was banned/disabled

        if (shouldUpdate) {
          await db
            .update(users)
            .set({
              name: entraUser.displayName,
              banned: !entraUser.accountEnabled,
              banReason: !entraUser.accountEnabled ? 'Disabled in Entra' : null,
              updatedAt: new Date(),
            })
            .where(eq(users.id, existingUser.id))

          result.updated++
        }
      } else {
        await db.insert(users).values({
          name: entraUser.displayName,
          email: email.toLowerCase(),
          emailVerified: true,
          banned: !entraUser.accountEnabled,
          banReason: !entraUser.accountEnabled ? 'Disabled in Entra' : null,
          microsoftId: entraUser.id,
          role: 'user',
        })

        result.created++
      }
    } catch (error) {
      console.error(`Error syncing user ${entraUser.displayName}:`, error)
      result.errors.push(`Failed to sync ${entraUser.displayName}: ${error}`)
    }
  }

  /*
  // Disable users that no longer exist in Entra ID
  const usersToDisable = existingUsers.filter(
    (user) => !activeEntraEmails.has(user.email.toLowerCase()) && !user.banned,
  )

  for (const user of usersToDisable) {
    try {
      await db
        .update(users)
        .set({
          banned: true,
          banReason: 'User not found in Entra ID',
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id))

      result.disabled++
    } catch (error) {
      console.error(`Error disabling user ${user.email}:`, error)
      result.errors.push(`Failed to disable ${user.email}: ${error}`)
    }
  }
  */

  return result
}
