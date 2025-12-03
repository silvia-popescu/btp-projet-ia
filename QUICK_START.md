# 🚀 Quick Start Guide

## In 30 Seconds

### 1. Start the Server
```bash
node server.js
```

### 2. Open Browser
Go to: `http://localhost:5000`

### 3. Login
- **Email**: `admin@example.com`
- **Password**: `admin123`

---

## What Can You Do?

### ✅ Admin Panel
- View all users
- Add new users (student, teacher, parent)
- Edit user information
- Change user roles
- Delete users

### ✅ User Accounts
- Update your profile
- Change your name/email
- View your information

### ✅ Dashboards
- **Students**: View assigned courses
- **Teachers**: Manage courses
- **Parents**: View child's progress
- **Admins**: Full system control

---

## Test Accounts

```
Admin:    admin@example.com / admin123
Teacher:  teacher@example.com / password123
Student:  student@example.com / password123
Parent:   parent@example.com / password123
```

---

## Troubleshooting

**Server won't start?**
- Check if Node.js is installed: `node --version`
- Make sure port 5000 is available
- Run: `npm install` first

**Can't login?**
- Clear browser cache
- Use exact email/password above
- Check CAPS LOCK is off

**Admin panel not loading?**
- Make sure you logged in as admin
- Server must be running on port 5000
- Check browser console for errors

---

## Admin Panel Features

### Add User
1. Click "➕ Ajouter" button
2. Fill in form
3. Click to create

### Edit User
1. Click "Éditer" button
2. Modify information
3. Save changes

### Delete User
1. Click "Supprimer" button
2. Confirm deletion

---

## Key Points

- ✅ All user data saved in `users.json`
- ✅ Passwords are encrypted
- ✅ Role-based access control active
- ✅ Tokens expire after 24 hours
- ✅ Admin can manage all users

---

## API Endpoints (if using programmatically)

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Get all users (need token)
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer <your-token>"

# Add user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pwd123","role":"student"}'

# Update user
curl -X PUT http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","role":"teacher"}'

# Delete user
curl -X DELETE http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer <token>"
```

---

## What's Working ✅

- User authentication (login/register)
- Admin panel with user management
- Create users with different roles
- Edit user information
- Delete users (admin only)
- Student/Teacher/Parent dashboards
- Role-based access control
- JWT token authentication
- Password encryption

---

## Next Steps

1. ✅ Login to see the system
2. ✅ Create a test user
3. ✅ Edit user information
4. ✅ Test different user roles
5. ✅ Explore admin features

---

**Everything is working perfectly!** 🎉
