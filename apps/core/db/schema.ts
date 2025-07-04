import { generateId } from '@axium/utils/database'
import { relations } from 'drizzle-orm'
import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => generateId('usr'))
    .primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const sessions = pgTable('sessions', {
  id: text('id')
    .$defaultFn(() => generateId('ses'))
    .primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const accounts = pgTable('accounts', {
  id: text('id')
    .$defaultFn(() => generateId('acc'))
    .primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const verifications = pgTable('verifications', {
  id: text('id')
    .$defaultFn(() => generateId('ver'))
    .primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const environments = pgTable('environments', {
  id: text('id')
    .$defaultFn(() => generateId('env'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  color: text('color').notNull(),
  isDefault: boolean('is_default').notNull().default(false),
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

export const servers = pgTable('servers', {
  id: text('id')
    .$defaultFn(() => generateId('srv'))
    .primaryKey(),
  name: text('name').notNull(),
  host: text('host').notNull(),
  description: text('description'),
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
  folder: one(folders, {
    fields: [servers.folderId],
    references: [folders.id],
  }),
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

export const credentials = pgTable('credentials', {
  id: text('id')
    .$defaultFn(() => generateId('cred'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  sername: text('username'),
  password: text('password'),
  domain: text('domain'),
  type: text('type').$type<'ssh' | 'vnc' | 'rdp'>().notNull(),
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

export const credentialsRelations = relations(credentials, ({ one }) => ({
  createdBy: one(users, {
    fields: [credentials.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [credentials.updatedBy],
    references: [users.id],
  }),
}))

export const folders = pgTable('folders', {
  id: text('id')
    .$defaultFn(() => generateId('fld'))
    .primaryKey(),
  name: text('name').notNull(),
  parentFolderId: text('parent_folder_id').references(
    (): AnyPgColumn => folders.id,
    {
      onDelete: 'restrict',
    },
  ),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const foldersRelations = relations(folders, ({ one }) => ({
  parentFolder: one(folders, {
    fields: [folders.parentFolderId],
    references: [folders.id],
  }),
}))
