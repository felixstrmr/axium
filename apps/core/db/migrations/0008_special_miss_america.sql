CREATE TABLE "server_folders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"parent_id" uuid,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "identities" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "folder_id" uuid;--> statement-breakpoint
ALTER TABLE "server_identities" ADD COLUMN "created_by" uuid;--> statement-breakpoint
ALTER TABLE "server_identities" ADD COLUMN "updated_by" uuid;--> statement-breakpoint
ALTER TABLE "server_folders" ADD CONSTRAINT "server_folders_parent_id_server_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."server_folders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_folders" ADD CONSTRAINT "server_folders_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_folders" ADD CONSTRAINT "server_folders_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "servers" ADD CONSTRAINT "servers_folder_id_server_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."server_folders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_identities" ADD CONSTRAINT "server_identities_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_identities" ADD CONSTRAINT "server_identities_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;