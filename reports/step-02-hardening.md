# Step 02 — Server hardening and admin endpoint

Timestamp: 2025-12-02T14:49:10.311Z

Changes made:
- Added src/server.js with dotenv support (reads .env), writes a server.pid file, and graceful shutdown handlers for SIGINT/SIGTERM.
- Implemented requireRole(role) middleware and an admin-only endpoint: GET /api/admin/users which returns users.json only to users with role 'admin'.
- Added a /healthz endpoint for basic liveness checks.

Notes:
- The running server instance may still be the original root server.js; restart using `npm run dev` after stopping the old process to use src/server.js.
- Copy .env.example -> .env and set JWT_SECRET before deploying.

Next steps:
1) Add role management endpoints (assign children to parent, promote user to admin).
2) Move static assets into src/public and update static serving.
3) Add tests and CI workflow.

Test plan:
- Stop existing server, run `npm run dev`, verify /healthz, register a user with role 'admin' in users.json and call /api/admin/users with its token.
