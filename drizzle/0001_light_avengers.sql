ALTER TABLE "servers" ADD COLUMN "os" text NOT NULL;--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "servers" ADD CONSTRAINT "servers_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;