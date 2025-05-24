ALTER TABLE "servers" RENAME COLUMN "os" TO "operating_system";--> statement-breakpoint
ALTER TABLE "credentials" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "servers" ADD COLUMN "is_active" boolean NOT NULL;