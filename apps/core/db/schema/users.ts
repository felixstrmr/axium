import {
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
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
  lastLoginAt: timestamp('last_login_at'),
  settings: jsonb('settings').default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})
