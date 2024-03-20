import { relations } from 'drizzle-orm';
import { pgTableCreator, text, varchar, timestamp } from 'drizzle-orm/pg-core';

const pgTable = pgTableCreator((name) => `svelte_${name}`);

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  provider: text('provider', { enum: ['google', 'github'] }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull()
});

export const userRelations = relations(userTable, ({ many }) => ({
  sessions: many(sessionTable),
  todos: many(todoTable)
}));

export const sessionTable = pgTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at').notNull()
});

export const sessionRelations = relations(sessionTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionTable.userId],
    references: [userTable.id]
  })
}));

export const todoTable = pgTable('todo', {
  id: varchar('id', { length: 100 }).primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull(),
  completed: timestamp('completed', { mode: 'date' }),
  userId: varchar('user_id', { length: 100 })
    .references(() => userTable.id)
    .notNull()
});

export const todoRelations = relations(todoTable, ({ one }) => ({
  user: one(userTable, {
    fields: [todoTable.userId],
    references: [userTable.id]
  })
}));
