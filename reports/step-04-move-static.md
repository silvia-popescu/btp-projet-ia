# Step 04 — Move static assets into src/public

Timestamp: 2025-12-02T14:52:19.923Z

Actions:
- Copied assets/ -> src/public (static assets now served from src/public).
- Updated server to serve static from src/public.

Verification:
- GET / should serve index.html from project root (server still serves top-level index)
- GET /assets/js/main.js should now be available at /assets/js/main.js served from src/public/assets/js/main.js

Next: run smoke checks and update report with responses.
