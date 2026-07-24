CREATE TABLE "users" (
  "id" UUID NOT NULL,
  "email" VARCHAR(320) NOT NULL,
  "password_hash" TEXT NOT NULL,
  "role" VARCHAR(32) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "sessions" (
  "id" UUID NOT NULL,
  "token_hash" TEXT NOT NULL,
  "user_id" UUID NOT NULL,
  "expires_at" TIMESTAMP(3) NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "sessions_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX "sessions_token_hash_key" ON "sessions"("token_hash");
CREATE INDEX "sessions_expires_at_idx" ON "sessions"("expires_at");

CREATE TABLE "prayer_requests" (
  "id" UUID NOT NULL,
  "contact_id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(320) NOT NULL,
  "request" VARCHAR(3000) NOT NULL,
  "language" VARCHAR(2) NOT NULL,
  "status" VARCHAR(20) NOT NULL DEFAULT 'New',
  "assigned_to" UUID,
  "private" BOOLEAN NOT NULL DEFAULT true,
  "answered" BOOLEAN NOT NULL DEFAULT false,
  "answered_date" TIMESTAMP(3),
  "notes" VARCHAR(3000),
  CONSTRAINT "prayer_requests_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "prayer_requests_contact_id_key" UNIQUE ("contact_id"),
  CONSTRAINT "prayer_requests_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE
);
CREATE INDEX "prayer_requests_status_idx" ON "prayer_requests"("status");
CREATE INDEX "prayer_requests_created_at_idx" ON "prayer_requests"("created_at");
