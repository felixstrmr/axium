CREATE TABLE "environments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"color" text DEFAULT '#2563eb' NOT NULL,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "environments" ADD CONSTRAINT "environments_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "environments" ADD CONSTRAINT "environments_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;