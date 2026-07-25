# CLA Platform Deployment

## Required architecture

Point `cla.city` and `www.cla.city` DNS through Cloudflare. Route the Worker to `cla.city/*` and `www.cla.city/*`; do not expose the GitHub Pages origin publicly. GitHub Pages is staging-only and must not be used as the production DNS origin. The Worker must serve or proxy `/admin/*` and `/api/*`, so admin requests cannot bypass session middleware.

## Setup

```bash
npm install
npm run prisma:generate
npx wrangler kv namespace create RATE_LIMIT_KV
npx wrangler secret put DATABASE_URL
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD
```

Replace the KV IDs in `wrangler.toml`, then run migrations against the production database:

```bash
npx prisma migrate deploy
```

## Deploy

Staging should use a separate Worker, database, KV namespace, and `ALLOWED_ORIGINS` containing the approved GitHub Pages staging origin. Production uses only `https://cla.city,https://www.cla.city`.

```bash
npx wrangler deploy --env staging
npx wrangler deploy --env production
```

## Rollback

Deploy the previous Worker version from the Cloudflare dashboard or `wrangler versions deploy <version-id>`. Roll back the Worker first; do not roll back a database migration unless its down-migration has been reviewed and tested.
