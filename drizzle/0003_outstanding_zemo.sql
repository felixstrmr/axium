ALTER TABLE "credentials" DROP CONSTRAINT "credentials_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "servers" DROP CONSTRAINT "servers_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "credentials" DROP COLUMN "created_by";--> statement-breakpoint
ALTER TABLE "servers" DROP COLUMN "created_by";