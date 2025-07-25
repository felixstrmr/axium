import { relations } from 'drizzle-orm'
import {
  type AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

import { environments } from './environments'
import { users } from './users'

export const serverFolders = pgTable('server_folders', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  parentId: uuid('parent_id').references((): AnyPgColumn => serverFolders.id),
  environmentId: uuid('environment_id').references(() => environments.id),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export const serverFoldersRelations = relations(serverFolders, ({ one }) => ({
  parent: one(serverFolders, {
    fields: [serverFolders.parentId],
    references: [serverFolders.id],
  }),
  environment: one(environments, {
    fields: [serverFolders.environmentId],
    references: [environments.id],
  }),
  createdBy: one(users, {
    fields: [serverFolders.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [serverFolders.updatedBy],
    references: [users.id],
  }),
}))
