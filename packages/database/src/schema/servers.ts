import { generateId } from '@axium/utils/database'
import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './auth'
import { credentials } from './credentials'
import { environments } from './environments'
import { folders } from './folders'

export const servers = pgTable('servers', {
  id: text('id')
    .$defaultFn(() => generateId('srv'))
    .primaryKey(),
  name: text('name').notNull(),
  host: text('host').notNull(),
  description: text('description'),
  operatingSystem: text('operating_system'),
  folderId: text('folder_id').references(() => folders.id, {
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

export const serversRelations = relations(servers, ({ one }) => ({
  environment: one(environments, {
    fields: [servers.environmentId],
    references: [environments.id],
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

export const serverConnections = pgTable('server_connections', {
  id: text('id')
    .$defaultFn(() => generateId('conn'))
    .primaryKey(),
  port: integer('port').notNull(),
  username: text('username'),
  password: text('password'),
  domain: text('domain'),
  type: text('type').$type<'ssh' | 'vnc' | 'rdp'>().notNull(),
  serverId: text('server_id')
    .notNull()
    .references(() => servers.id, { onDelete: 'cascade' }),
  isDefault: boolean('is_default').notNull().default(false),
  credentialId: text('credential_id').references(() => credentials.id, {
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

export const serverConnectionsRelations = relations(
  serverConnections,
  ({ one }) => ({
    server: one(servers, {
      fields: [serverConnections.serverId],
      references: [servers.id],
    }),
    credential: one(credentials, {
      fields: [serverConnections.credentialId],
      references: [credentials.id],
    }),
    createdBy: one(users, {
      fields: [serverConnections.createdBy],
      references: [users.id],
    }),
    updatedBy: one(users, {
      fields: [serverConnections.updatedBy],
      references: [users.id],
    }),
  }),
)
