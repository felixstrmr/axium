import { generateId } from '@axium/utils/database'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './auth'
import { environments } from './environments'

export const credentials = pgTable('credentials', {
  id: text('id')
    .$defaultFn(() => generateId('cred'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  username: text('username'),
  password: text('password').notNull(),
  domain: text('domain'),
  type: text('type').$type<'ssh' | 'vnc' | 'rdp'>().notNull(),
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
