# Dashboard User Information Display

## Overview

The dashboard now displays the authenticated user's information in the header section with the following features:

## Features

### 1. **User Authentication Check**
- When visiting `/dashboard.html`, the system checks if a user is logged in
- If not authenticated, redirects to login page (`index.html`)
- Requires valid JWT token and user data in localStorage

### 2. **Header Display**

The dashboard header now shows:

```
┌─────────────────────────────────────────────────────┐
│ Bienvenue, Jean! 👋                        Jean D.   │
│ Rôle: student | Date: mercredi 30 octobre 2025  JD  │
│                                                       │
│                      Jean Dupont                     │
│                      student@example.com            │
└─────────────────────────────────────────────────────┘
```

#### Components:
1. **Welcome Message**: "Bienvenue, [FirstName]! 👋"
2. **User Full Name**: Displayed in header
3. **User Email**: Displayed in header
4. **User Avatar**: Shows initials (e.g., "JD" for Jean Dupont)
5. **User Role**: Shows the role (student, parent, teacher)
6. **Current Date**: Displays the current date in French

### 3. **Logout Button**

Located in the sidebar footer:
- Click "← Déconnexion" to logout
- Clears authentication tokens
- Redirects to login page

## How It Works

### Step 1: User Logs In
```
User fills login form with:
- Email: student@example.com
- Password: password123

System:
1. Sends credentials to backend API
2. Backend validates (firstName + password)
3. Backend returns JWT token and user data
4. Frontend stores token and user info in localStorage
```

### Step 2: Dashboard Access
```
User navigates to dashboard.html

JavaScript:
1. Checks for authentication token and user data
2. If missing → redirects to login
3. If present → displays user information
```

### Step 3: Display User Data
```
The displayUserInfo() function:
1. Extracts first name from full name
2. Updates welcome message
3. Shows full name and email
4. Creates avatar with initials
5. Shows user role and date
```

## Demo Credentials

| Email | Password | Name |
|-------|----------|------|
| student@example.com | password123 | Jean Dupont |
| parent@example.com | password123 | Marie Martin |
| teacher@example.com | password123 | Prof. Pierre Leclerc |

## How to Test

1. **Open the application**: http://localhost:5000
2. **Click "Connexion"** (Login)
3. **Enter credentials**:
   - Email: `student@example.com`
   - Password: `password123`
4. **Click "Se connecter"**
5. **Wait for redirect** to dashboard (2 seconds)
6. **Observe the header** showing:
   - "Bienvenue, Jean! 👋"
   - Full name: "Jean Dupont"
   - Email: "student@example.com"
   - Avatar: "JD"
   - Role: "student"

## Code Components

### Authentication Check (JavaScript)
```javascript
function checkAuthentication() {
    const token = localStorage.getItem('eduhouse_auth_token');
    const currentUser = localStorage.getItem('eduhouse_current_user');

    if (!token || !currentUser) {
        window.location.href = 'index.html';
        return false;
    }

    displayUserInfo(JSON.parse(currentUser));
    return true;
}
```

### Display User Info (JavaScript)
```javascript
function displayUserInfo(user) {
    const firstName = user.name.split(' ')[0];
    document.getElementById('welcome-message').textContent =
        `Bienvenue, ${firstName}! 👋`;
    document.getElementById('header-name').innerHTML =
        `<strong>${user.name}</strong>`;
    document.getElementById('header-email').textContent = user.email;
}
```

### Logout (JavaScript)
```javascript
function handleLogout() {
    localStorage.removeItem('eduhouse_auth_token');
    localStorage.removeItem('eduhouse_current_user');
    alert('Vous avez été déconnecté.');
    window.location.href = 'index.html';
}
```

## Security Features

✅ Authentication required to access dashboard
✅ JWT tokens stored securely in localStorage
✅ Automatic redirect if not authenticated
✅ Logout clears all authentication data
✅ User email displayed for verification
✅ User role displayed for context

## Browser Storage

### localStorage Keys:
1. **`eduhouse_auth_token`**: JWT token (24-hour expiration)
2. **`eduhouse_current_user`**: User object (JSON)

### Stored User Data:
```json
{
  "id": 1,
  "name": "Jean Dupont",
  "email": "student@example.com",
  "role": "student"
}
```

## Files Modified

1. **dashboard.html**
   - Updated header to display dynamic user information
   - Added authentication check function
   - Added logout functionality
   - Updated DOMContentLoaded event to check authentication

2. **index.html** (previously updated)
   - Login/signup functions store user data in localStorage
   - Redirect to dashboard after successful login

3. **server.js** (backend)
   - Login endpoint returns user data
   - Registration endpoint returns user data

## Troubleshooting

### "Vous avez été déconnecté" (Redirected to login)
- localStorage data was cleared
- Token expired (24 hours)
- Session was cleared in another tab

### User info not displaying
- Check browser console for errors
- Verify localStorage has authentication data
- Clear browser cache and try again

### Avatar showing default "U"
- Check user name format in localStorage
- Name should have first and last name separated by space
