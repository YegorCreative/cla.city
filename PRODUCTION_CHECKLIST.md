# CLA Production Readiness Checklist

| Item | Status | Evidence / notes |
|---|---|---|
| Cloudflare DNS authoritative for `cla.city` and `www.cla.city` | FAIL | Cloudflare account is not authenticated locally; DNS cannot be verified. |
| Worker routes cover `cla.city/*` and `www.cla.city/*` | FAIL | Deployment has not occurred; route is not confirmed active. |
| `/admin/*` and `/api/admin/*` pass through Worker protection | FAIL | Requires active production Worker routing; direct GitHub Pages origin still requires DNS/access restriction. |
| GitHub Pages cannot expose protected admin content | FAIL | Requires production DNS/proxy enforcement and origin restriction. |
| Production KV namespace bound to `RATE_LIMIT_KV` | FAIL | `wrangler.toml` contains placeholder namespace IDs. |
| Production CORS restricted to approved origins | PASS (configuration) | `ALLOWED_ORIGINS` defaults to `https://cla.city,https://www.cla.city`; staging must override it. |
| `DATABASE_URL` configured | FAIL | Secret availability cannot be verified without authenticated Wrangler/deployment environment. |
| `RESEND_API_KEY` configured | FAIL | Secret availability cannot be verified. |
| Verified production `RESEND_FROM` sender domain | FAIL | Current default remains a Resend testing sender until replaced with a verified CLA domain. |
| `ADMIN_EMAIL` configured | FAIL | Secret availability cannot be verified. |
| `ADMIN_PASSWORD` configured | FAIL | Secret availability cannot be verified. |
| Prisma migrations applied | FAIL | Production database connection is unavailable in this environment. |
| Production Worker deployed | FAIL | `wrangler whoami` reports no authentication. |
| Integration tests all pass | FAIL | Eight integration tests remain skipped until a deployed test Worker/database is configured. |
| English homepage form verified | NOT APPLICABLE | Requires deployed environment. |
| Russian homepage form verified | NOT APPLICABLE | Requires deployed environment. |
| General/prayer/visit/connection flows verified | NOT APPLICABLE | Requires deployed environment. |
| Email delivery verified | NOT APPLICABLE | Requires verified sender and deployed Resend configuration. |
| Contact/prayer/visitor records verified | NOT APPLICABLE | Requires deployed database. |
| Admin login/logout verified | NOT APPLICABLE | Requires deployed Worker and secrets. |
| Inbox, prayer, and visitor updates verified | NOT APPLICABLE | Requires deployed Worker and database. |
| Unauthorized admin access verified | NOT APPLICABLE | Requires active Worker route. |
| Rate limiting verified | NOT APPLICABLE | Requires production KV binding. |
| Health endpoint verified | NOT APPLICABLE | Requires deployed Worker URL. |

## Launch decision

**FAIL — production launch blocked.** Authentication to Cloudflare, DNS/Worker routing, KV IDs, production secrets, verified Resend sender, migrations, and deployed integration tests are still required.
