import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

import { identities } from './identities'
import { servers } from './servers'

export const serverIdentities = pgTable('server_identities', {
  id: uuid('id').primaryKey().defaultRandom(),
  serverId: uuid('server_id')
    .references(() => servers.id)
    .notNull(),
  identityId: uuid('identity_id')
    .references(() => identities.id)
    .notNull(),
  port: integer('port').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
})

export const serverIdentitiesRelations = relations(
  serverIdentities,
  ({ one }) => ({
    server: one(servers, {
      fields: [serverIdentities.serverId],
      references: [servers.id],
    }),
    identity: one(identities, {
      fields: [serverIdentities.identityId],
      references: [identities.id],
    }),
  })
)
