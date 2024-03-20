CREATE TABLE IF NOT EXISTS "svelte_session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "svelte_todo" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"completed" timestamp,
	"user_id" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "svelte_user" (
	"id" text PRIMARY KEY NOT NULL,
	"provider" text NOT NULL,
	"provider_id" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"created_at" timestamp NOT NULL,
	CONSTRAINT "svelte_user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "svelte_session" ADD CONSTRAINT "svelte_session_user_id_svelte_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "svelte_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "svelte_todo" ADD CONSTRAINT "svelte_todo_user_id_svelte_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "svelte_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
