import { randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16
const SALT_LENGTH = 32
const TAG_LENGTH = 16
const KEY_LENGTH = 32

export function generateEncryptionKey() {
  return randomBytes(KEY_LENGTH).toString('base64')
}
