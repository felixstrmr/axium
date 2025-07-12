import { generateId } from '@axium/utils/database'
import { relations } from 'drizzle-orm'
import { AnyPgColumn, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './auth'
import { environments } from './environments'

export const folders = pgTable('folders', {
  id: text('id')
    .$defaultFn(() => generateId('fld'))
    .primaryKey(),
  name: text('name').notNull(),
  parentId: text('parent_id').references((): AnyPgColumn => folders.id, {
    onDelete: 'restrict',
  }),
  environmentId: text('environment_id').references(() => environments.id, {
    onDelete: 'restrict',
  }),
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

export const foldersRelations = relations(folders, ({ one }) => ({
  createdBy: one(users, {
    fields: [folders.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [folders.updatedBy],
    references: [users.id],
  }),
  parentFolder: one(folders, {
    fields: [folders.parentId],
    references: [folders.id],
  }),
  environment: one(environments, {
    fields: [folders.environmentId],
    references: [environments.id],
  }),
}))
