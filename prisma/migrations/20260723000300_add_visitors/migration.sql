CREATE TABLE "visitors" (
  "id" UUID NOT NULL,
  "contact_id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(320) NOT NULL,
  "phone" VARCHAR(32),
  "language" VARCHAR(2) NOT NULL,
  "visit_date" TIMESTAMP(3),
  "status" VARCHAR(32) NOT NULL DEFAULT 'Planned',
  "welcome_assigned_to" VARCHAR(100),
  "follow_up_date" TIMESTAMP(3),
  "notes" VARCHAR(3000),
  CONSTRAINT "visitors_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "visitors_contact_id_key" UNIQUE ("contact_id"),
  CONSTRAINT "visitors_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE
);
CREATE INDEX "visitors_status_idx" ON "visitors"("status");
CREATE INDEX "visitors_created_at_idx" ON "visitors"("created_at");
