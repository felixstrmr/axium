import type { InferSelectModel } from 'drizzle-orm'
import type {
  accounts,
  environments,
  identities,
  serverIdentities,
  servers,
  sessions,
  settings,
  users,
  verifications,
} from '@/db/schema'

export type Account = InferSelectModel<typeof accounts>
export type Environment = InferSelectModel<typeof environments>
export type Identity = InferSelectModel<typeof identities>
export type ServerIdentity = InferSelectModel<typeof serverIdentities>
export type Server = InferSelectModel<typeof servers>
export type Session = InferSelectModel<typeof sessions>
export type Setting = InferSelectModel<typeof settings>
export type User = InferSelectModel<typeof users>
export type Verification = InferSelectModel<typeof verifications>
