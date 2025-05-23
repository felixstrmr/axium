import { generateId } from '@/lib/utils'
import { relations } from 'drizzle-orm'
import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

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
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
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

export const servers = pgTable('servers', {
  id: text('id')
    .$defaultFn(() => generateId('srv'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  host: text('host').notNull(),
  port: integer('port').notNull(),
  protocol: text('protocol').$type<'ssh' | 'vnc' | 'rdp'>().notNull(),
  username: text('username'),
  password: text('password'),
  credentialId: text('credential_id').references(() => credentials.id, {
    onDelete: 'restrict',
  }),
  environmentId: text('environment_id').references(() => environments.id, {
    onDelete: 'restrict',
  }),
  operatingSystem: text('operating_system')
    .$type<'linux' | 'windows' | 'macos'>()
    .notNull(),
  isActive: boolean('is_active')
    .$defaultFn(() => true)
    .notNull(),
  createdBy: text('created_by').references(() => users.id, {
    onDelete: 'set null',
  }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const serversRelations = relations(servers, ({ one }) => ({
  createdBy: one(users, {
    fields: [servers.createdBy],
    references: [users.id],
  }),
  credential: one(credentials, {
    fields: [servers.credentialId],
    references: [credentials.id],
  }),
  environment: one(environments, {
    fields: [servers.environmentId],
    references: [environments.id],
  }),
}))

export const credentials = pgTable('credentials', {
  id: text('id')
    .$defaultFn(() => generateId('crd'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  username: text('username'),
  password: text('password'),
  domain: text('domain'),
  type: text('type').$type<'ssh' | 'vnc' | 'rdp'>().notNull(),
  createdBy: text('created_by').references(() => users.id, {
    onDelete: 'set null',
  }),
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
}))

export const environments = pgTable('environments', {
  id: text('id')
    .$defaultFn(() => generateId('env'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdBy: text('created_by').references(() => users.id, {
    onDelete: 'set null',
  }),
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
}))
