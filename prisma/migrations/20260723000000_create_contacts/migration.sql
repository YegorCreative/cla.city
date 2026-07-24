CREATE TABLE "contacts" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "message" VARCHAR(3000) NOT NULL,
    "category" VARCHAR(32) NOT NULL,
    "language" VARCHAR(2) NOT NULL,
    "page" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "contacts_created_at_idx" ON "contacts"("created_at");
CREATE INDEX "contacts_category_idx" ON "contacts"("category");
