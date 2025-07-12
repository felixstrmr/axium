import { users } from '@/schema/auth'
import { environments } from '@/schema/environments'
import { generateId } from '@axium/utils/database'
import { relations } from 'drizzle-orm'
import { AnyPgColumn, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const groups = pgTable('groups', {
  id: text('id')
    .$defaultFn(() => generateId('grp'))
    .primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  parentId: text('parent_id').references((): AnyPgColumn => groups.id, {
    onDelete: 'restrict',
  }),
  environmentId: text('environment_id').references(() => environments.id, {
    onDelete: 'restrict',
  }),
  createdBy: text('created_by').references(() => users.id, {
    onDelete: 'restrict',
  }),
  updatedBy: text('updated_by').references(() => users.id, {
    onDelete: 'restrict',
  }),
  createdAt: timestamp('created_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const groupsRelations = relations(groups, ({ one }) => ({
  createdBy: one(users, {
    fields: [groups.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [groups.updatedBy],
    references: [users.id],
  }),
  environment: one(environments, {
    fields: [groups.environmentId],
    references: [environments.id],
  }),
}))

export const groupUsers = pgTable('group_users', {
  id: text('id')
    .$defaultFn(() => generateId('gru'))
    .primaryKey(),
  groupId: text('group_id')
    .references(() => groups.id, {
      onDelete: 'restrict',
    })
    .notNull(),
  userId: text('user_id')
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

export const groupUsersRelations = relations(groupUsers, ({ one }) => ({
  group: one(groups, {
    fields: [groupUsers.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [groupUsers.userId],
    references: [users.id],
  }),
}))
