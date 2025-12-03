# Admin Panel - Complete Guide

## Overview
The Admin Panel is now fully functional with complete user management capabilities. All CRUD operations (Create, Read, Update, Delete) are fully implemented with proper role-based access control.

## Accessing the Admin Panel

### Step 1: Start the Server
The server should already be running on `http://localhost:5000`. If not:
```bash
node server.js
```

### Step 2: Login as Admin
1. Open `http://localhost:5000` in your browser
2. Login with admin credentials:
   - **Email**: `admin@example.com`
   - **Password**: `admin123`
3. You will be redirected to the Admin Panel

### Step 3: Access User Management
Click on "👥 Utilisateurs" (Users) in the sidebar to view all users.

## Features

### View All Users
The Users tab displays a table of all users with:
- User name and avatar
- Email address
- Role (Enseignant/Teacher, Élève/Student, Parent, Admin)
- Status (Actif/Active)
- Registration date
- Action buttons (Edit, Delete)

### Add New User
1. Click "➕ Ajouter" (Add) button
2. Fill in the form:
   - **Nom Complet** (Full Name): User's full name
   - **Email**: Unique email address
   - **Rôle** (Role): Select teacher, student, or parent
   - **Mot de Passe Temporaire** (Password): Set a password
3. Click "Créer l'Utilisateur" (Create User)

**Available Roles:**
- `teacher` - Enseignant (Teacher)
- `student` - Élève (Student)
- `parent` - Parent
- `admin` - Administrator

### Edit User
1. Click "Éditer" (Edit) button next to a user
2. Modify the fields:
   - Name
   - Email
   - Role (admin only can change roles)
3. Click "Créer l'Utilisateur" to save changes

**Permissions:**
- Users can only edit their own profile (except role)
- Admins can edit any user including changing roles

### Delete User
1. Click "Supprimer" (Delete) button next to a user
2. Confirm the deletion
3. User will be removed from the system

**Restrictions:**
- Only admins can delete users
- You cannot delete your own account

## API Endpoints (For Developers)

All endpoints require authentication with a valid JWT token in the Authorization header.

### Authentication
```bash
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}

POST /api/auth/register
{
  "name": "New User",
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}
```

### User Management
```bash
# Get all users
GET /api/users
Headers: Authorization: Bearer <token>

# Get specific user
GET /api/users/:id
Headers: Authorization: Bearer <token>

# Update user
PUT /api/users/:id
Headers: Authorization: Bearer <token>
Body: {
  "name": "Updated Name",
  "email": "newemail@example.com",
  "role": "teacher"
}

# Delete user
DELETE /api/users/:id
Headers: Authorization: Bearer <token>
```

## Demo Users

Test the system with these pre-configured accounts:

| Email | Password | Role | Purpose |
|-------|----------|------|---------|
| admin@example.com | admin123 | Admin | Administrator access |
| teacher@example.com | password123 | Teacher | Teacher account |
| student@example.com | password123 | Student | Student account |
| parent@example.com | password123 | Parent | Parent account |

## Troubleshooting

### "Cannot access admin panel"
- Ensure you're logged in as admin
- Check that the admin password is `admin123`
- Clear browser cache and try again

### "Failed to load users"
- Check that server is running: `node server.js`
- Verify token is valid
- Check browser console for error messages

### "Email already exists"
- The email is already used by another account
- Use a different email address

### "Unauthorized" error
- Your token may have expired
- Log out and log back in
- Check that you have permission for the action

## Data Persistence

All user data is stored in `users.json` file in the project root. 

**Note:** On Windows, always use backslash in file paths.

## Security Notes

1. **Token Expiration**: Auth tokens expire after 24 hours
2. **Password Hashing**: All passwords are hashed with bcryptjs
3. **Role-Based Access**: Only admins can modify roles and delete users
4. **Token Storage**: Tokens are stored in localStorage (use HTTPS in production)

## Next Steps

- ✅ User management fully implemented
- ✅ All CRUD operations working
- ✅ Role-based access control active
- 📋 Coming: Course management
- 📋 Coming: Class scheduling
- 📋 Coming: Analytics dashboard
