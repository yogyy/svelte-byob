import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import 'dotenv/config';

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

const main = async () => {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: 'drizzle'
    }).then(() => {
      console.log('Migrations completed');
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
