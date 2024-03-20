// src/lib/server/db.ts
import postgres from 'postgres';
import {
  drizzle,
  type PostgresJsQueryResultHKT
} from 'drizzle-orm/postgres-js';
import type { ExtractTablesWithRelations } from 'drizzle-orm';
import type { PgTransaction } from 'drizzle-orm/pg-core';

import * as schema from './schema';

const client = postgres({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'svelte_drzl'
});

export type Transaction = PgTransaction<
  PostgresJsQueryResultHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;
export const db = drizzle(client, { schema });
