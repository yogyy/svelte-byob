import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/db';
import { GitHub } from 'arctic';
import { Lucia } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { sessionTable, userTable } from '$lib/db/schema';
import { dev } from '$app/environment';

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev
    }
  },
  getUserAttributes: (data) => {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
  }
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}
