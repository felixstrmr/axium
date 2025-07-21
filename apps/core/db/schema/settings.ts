import { relations } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { users } from './users'

export const settings = pgTable('settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: text('key').notNull().unique(),
  valueText: text('value_text'),
  valueInteger: integer('value_integer'),
  valueBoolean: boolean('value_boolean'),
  valueJson: jsonb('value_json'),
  createdBy: uuid('created_by').references(() => users.id),
  updatedBy: uuid('updated_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export const settingsRelations = relations(settings, ({ one }) => ({
  createdBy: one(users, {
    fields: [settings.createdBy],
    references: [users.id],
  }),
  updatedBy: one(users, {
    fields: [settings.updatedBy],
    references: [users.id],
  }),
}))
