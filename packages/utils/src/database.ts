export function generateId(prefix: string) {
  const ALPHABET =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

  let string = ''
  for (let i = 0; i < 24; i++) {
    string += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
  }

  return `${prefix}_${string}`
}
