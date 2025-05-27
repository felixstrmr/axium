ALTER TABLE "users" ADD COLUMN "azure_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "department" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_azure_id_unique" UNIQUE("azure_id");