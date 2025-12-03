# Step 05 — Documentation & CI

Timestamp: 2025-12-02T14:55:38.673Z

Changes:
- Added docs/SERVER_SETUP.md documenting server layout and run instructions.
- Added scripts/smoke.js and package.json script "smoke" to run basic HTTP checks.
- Added GitHub Actions workflow .github/workflows/ci.yml to install, start server, and run smoke tests on main branch.

Local verification:
- Run server (`npm run dev`) and then `npm run smoke` to run smoke checks locally.

Next: run the local smoke script now to confirm it exits 0.
