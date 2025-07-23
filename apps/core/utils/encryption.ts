import crypto from 'node:crypto'
import { env } from '@/lib/env'

export function generateEncryptionKey(): string {
  const key = crypto.randomBytes(32)
  return key.toString('base64')
}

function deriveKey(masterKey: string, salt: Buffer) {
  return crypto.pbkdf2Sync(masterKey, salt, 100000, 32, 'sha256')
}

export async function encrypt(value: string) {
  const salt = crypto.randomBytes(32)
  const iv = crypto.randomBytes(16)

  const key = deriveKey(env.BETTER_AUTH_SECRET, salt)
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

  const encrypted = Buffer.concat([
    cipher.update(value, 'utf8'),
    cipher.final(),
  ])

  const tag = cipher.getAuthTag()
  const combined = Buffer.concat([salt, iv, tag, encrypted])

  return combined.toString('base64')
}

export async function decrypt(value: string) {
  const combined = Buffer.from(value, 'base64')

  const salt = combined.subarray(0, 32)
  const iv = combined.subarray(32, 48)
  const tag = combined.subarray(48, 64)
  const encrypted = combined.subarray(64)

  const key = deriveKey(env.BETTER_AUTH_SECRET, salt)

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])

  return decrypted.toString('utf8')
}
