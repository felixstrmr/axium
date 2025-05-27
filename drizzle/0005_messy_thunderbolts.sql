ALTER TABLE "users" RENAME COLUMN "azure_id" TO "entra_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_azure_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_entra_id_unique" UNIQUE("entra_id");