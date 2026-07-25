CREATE TABLE "volunteers" (
  "id" UUID NOT NULL,
  "contact_id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "first_name" VARCHAR(100) NOT NULL,
  "last_name" VARCHAR(100),
  "email" VARCHAR(320) NOT NULL,
  "phone" VARCHAR(32),
  "language" VARCHAR(2) NOT NULL,
  "ministry" VARCHAR(40) NOT NULL,
  "status" VARCHAR(32) NOT NULL DEFAULT 'Applied',
  "experience" VARCHAR(3000),
  "availability" VARCHAR(1000),
  "background_check" BOOLEAN NOT NULL DEFAULT false,
  "notes" VARCHAR(3000),
  "assigned_leader" VARCHAR(100),
  CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "volunteers_contact_id_key" UNIQUE ("contact_id"),
  CONSTRAINT "volunteers_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE
);
CREATE INDEX "volunteers_status_idx" ON "volunteers"("status");
CREATE INDEX "volunteers_ministry_idx" ON "volunteers"("ministry");
CREATE INDEX "volunteers_language_idx" ON "volunteers"("language");
CREATE INDEX "volunteers_created_at_idx" ON "volunteers"("created_at");
