CREATE TABLE "follow_up_tasks" (
  "id" UUID NOT NULL,
  "contact_id" UUID NOT NULL,
  "assigned_user_id" UUID,
  "title" VARCHAR(160) NOT NULL,
  "description" VARCHAR(3000),
  "due_date" TIMESTAMP(3) NOT NULL,
  "priority" VARCHAR(16) NOT NULL DEFAULT 'Normal',
  "status" VARCHAR(20) NOT NULL DEFAULT 'Open',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "completed_at" TIMESTAMP(3),
  CONSTRAINT "follow_up_tasks_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "follow_up_tasks_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE,
  CONSTRAINT "follow_up_tasks_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE SET NULL
);
CREATE INDEX "follow_up_tasks_contact_id_idx" ON "follow_up_tasks"("contact_id");
CREATE INDEX "follow_up_tasks_assigned_user_id_idx" ON "follow_up_tasks"("assigned_user_id");
CREATE INDEX "follow_up_tasks_status_idx" ON "follow_up_tasks"("status");
CREATE INDEX "follow_up_tasks_due_date_idx" ON "follow_up_tasks"("due_date");
