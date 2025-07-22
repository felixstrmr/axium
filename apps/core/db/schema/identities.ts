import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { users } from './users'

export const identities = pgTable('identities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  description: text('description'),
  username: text('username'),
  password: text('password'),
  domain: text('domain'),
  type: text('type', {
    enum: ['ssh', 'vnc', 'rdp'],
  }).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export const identitiesRelations = relations(identities, ({ one }) => ({
  createdBy: one(users, {
    fields: [identities.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [identities.updatedBy],
    references: [users.id],
  }),
}))
