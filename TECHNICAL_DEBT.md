# CLA Platform Technical Debt Report

## Critical
- Resolved in Phase 8: Cloudflare routing requirements, production CORS allowlisting, and KV rate limiting are documented and configured.
- Configure a verified Resend sender domain and production database connection before launch.

## Medium
- Add integration tests with a disposable PostgreSQL database for contact, login, prayer, and visitor workflows.
- Move admin page JavaScript into shared UI modules to reduce repeated list/detail rendering patterns.
- Add automated migration and deployment checks to CI.
- Tighten CORS to the exact production frontend origin instead of the development wildcard.

## Low
- Add structured log export and retention policy.
- Add stronger email validation and abuse monitoring.
- Add visual regression checks for responsive admin layouts.
