ALTER TABLE "environments" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "environments" ADD CONSTRAINT "environments_name_unique" UNIQUE("name");