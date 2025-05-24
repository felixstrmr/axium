import { clsx, type ClassValue } from 'clsx'
import crypto from 'crypto'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEncryptionKey() {
  return crypto.randomBytes(32).toString('hex')
}

export function generateId(prefix: string) {
  const ALPHABET =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let string = ''
  for (let i = 0; i < 24; i++) {
    string += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }

  return `${prefix}_${string}`
}

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12) // GCM mode requires 12 bytes IV
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex')

  if (key.length !== 32) {
    throw new Error(
      'Invalid encryption key length. Must be 32 bytes (64 hex characters)',
    )
  }

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  const authTag = cipher.getAuthTag()

  return iv.toString('hex') + ':' + encrypted + ':' + authTag.toString('hex')
}

export function decrypt(text: string): string {
  const [ivHex, encryptedText, authTagHex] = text.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const authTag = Buffer.from(authTagHex, 'hex')
  const key = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex')

  if (key.length !== 32) {
    throw new Error(
      'Invalid encryption key length. Must be 32 bytes (64 hex characters)',
    )
  }

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(authTag)

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
