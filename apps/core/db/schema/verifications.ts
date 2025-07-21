import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const verifications = pgTable('verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at'),
})
