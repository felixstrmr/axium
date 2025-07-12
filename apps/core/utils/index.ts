import env from '@/lib/env'
import { getCredential } from '@/queries/credentials'
import { ServerConnection } from '@axium/database/types'
import { decrypt } from '@axium/utils/encryption'

export async function getConnectionCredentials(connection: ServerConnection) {
  let username = connection.username
  let password = connection.password

  if (connection.credentialId) {
    const credential = await getCredential(connection.credentialId)

    if (credential) {
      username = credential.username
      password = credential.password
    }
  }

  if (password) {
    password = await decrypt(env.ENCRYPTION_KEY, password)
  }

  return { username, password }
}
