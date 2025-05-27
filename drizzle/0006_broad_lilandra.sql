ALTER TABLE "users" RENAME COLUMN "entra_id" TO "microsoft_id";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_entra_id_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_microsoft_id_unique" UNIQUE("microsoft_id");