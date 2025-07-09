import { generateId } from '@axium/utils/database'
import { relations } from 'drizzle-orm'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './auth'

export const environments = pgTable('environments', {
  id: text('id')
    .$defaultFn(() => generateId('env'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  isDefault: boolean('is_default')
    .$defaultFn(() => false)
    .notNull(),
  color: text('color').notNull(),
  createdBy: text('created_by')
    .references(() => users.id, {
      onDelete: 'restrict',
    })
    .notNull(),
  updatedBy: text('updated_by')
    .references(() => users.id, {
      onDelete: 'restrict',
    })
    .notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
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
