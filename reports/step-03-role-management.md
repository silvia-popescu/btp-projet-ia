# Step 03 — Role management endpoints

Timestamp: 2025-12-02T14:50:46.912Z

Changes made:
- Added POST /api/admin/promote to promote a user to admin (admin-only).
- Added POST /api/admin/assign-child to link a child user to a parent user (admin-only).

Usage examples (replace <TOKEN> with admin JWT):
- Promote: curl -X POST http://localhost:5000/api/admin/promote -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"userId":5}'
- Assign child: curl -X POST http://localhost:5000/api/admin/assign-child -H "Authorization: Bearer <TOKEN>" -H "Content-Type: application/json" -d '{"parentId":2, "childId":1}'

Notes:
- These endpoints modify users.json directly. Backup users.json before bulk operations.
- Next: move static assets to src/public and update server static path.
