import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { environments } from './environments'
import { serverFolders } from './server-folders'
import { users } from './users'

export const servers = pgTable('servers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description'),
  host: text('host').notNull(),
  icon: text('icon').notNull().default('server'),
  environmentId: uuid('environment_id').references(() => environments.id),
  folderId: uuid('folder_id').references(() => serverFolders.id),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export const serversRelations = relations(servers, ({ one }) => ({
  environment: one(environments, {
    fields: [servers.environmentId],
    references: [environments.id],
  }),
  folder: one(serverFolders, {
    fields: [servers.folderId],
    references: [serverFolders.id],
  }),
  createdBy: one(users, {
    fields: [servers.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [servers.updatedBy],
    references: [users.id],
  }),
}))
