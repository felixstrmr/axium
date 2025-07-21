import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users'

export const environments = pgTable('environments', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  color: text('color').notNull().default('#2563eb'),
  isDefault: boolean('is_default').notNull().default(false),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at'),
})

export const environmentsRelations = relations(environments, ({ one }) => ({
  createdBy: one(users, {
    fields: [environments.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [environments.updatedBy],
    references: [users.id],
  }),
}))
