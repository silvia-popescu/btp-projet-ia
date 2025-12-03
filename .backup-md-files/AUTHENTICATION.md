# EduHOUSE Authentication System

## Backend Setup

The application now includes a full backend authentication system with Express.js and SQLite.

### Starting the Server

1. Make sure Node.js is installed:
   ```bash
   node --version
   npm --version
   ```

2. Start the server:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

3. The server will run on `http://localhost:5000`

### Available Endpoints

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "student@example.com",
    "role": "student"
  }
}
```

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "securepassword",
  "role": "student" // or "parent", "teacher"
}

Response:
{
  "message": "Registration successful",
  "token": "JWT_TOKEN_HERE",
  "user": { ... }
}
```

#### Verify Token
```
POST /api/auth/verify
Authorization: Bearer JWT_TOKEN_HERE

Response:
{
  "valid": true,
  "user": { ... }
}
```

#### Get User Profile
```
GET /api/user/profile
Authorization: Bearer JWT_TOKEN_HERE

Response:
{
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "student@example.com",
    "role": "student",
    "created_at": "2025-10-30..."
  }
}
```

#### Logout
```
POST /api/auth/logout

Response:
{
  "message": "Logged out successfully"
}
```

## Demo Credentials

The system comes with pre-loaded demo users:

| Email | Password | First Name | Name | Role |
|-------|----------|------------|------|------|
| student@example.com | password123 | Jean | Jean Dupont | student |
| parent@example.com | password123 | Marie | Marie Martin | parent |
| teacher@example.com | password123 | Prof. | Prof. Pierre Leclerc | teacher |

**Security Feature**: The password is combined with the user's first name (prénom) during authentication. This means:
- To login with `student@example.com`, enter password: `password123`
- Behind the scenes, the system combines: `Jean` + `password123` = `Jeanpassword123`
- This combined password is hashed and stored securely

## Security Features

1. **Password + First Name Combination**: Passwords are combined with the user's first name (prénom) for added security
   - User provides: password
   - System uses: `firstName + password`
   - Example: `Jean` + `password123` = `Jeanpassword123`

2. **Password Hashing**: Combined password is hashed using bcryptjs with salt rounds = 10

3. **JWT Authentication**: Secure token-based authentication

4. **CORS Support**: Configured for cross-origin requests

5. **Token Expiration**: Tokens expire after 24 hours

## How Password + First Name Works

### During Registration
1. User enters: name and password
2. System extracts first name from full name: `Jean Dupont` → `Jean`
3. System combines: `Jean` + `password123` = `Jeanpassword123`
4. System hashes this combined password with bcryptjs
5. Hashed password is stored in database

### During Login
1. User enters: email and password
2. System fetches user record by email
3. System extracts first name from stored name: `Jean Dupont` → `Jean`
4. System combines: `Jean` + provided password = `Jeanpassword123`
5. System compares combined password with stored hash
6. If match → login successful, else → login failed

## Frontend Integration

### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('eduhouse_auth_token', data.token);
  localStorage.setItem('eduhouse_current_user', JSON.stringify(data.user));
}
```

### Protected API Calls
```javascript
const token = localStorage.getItem('eduhouse_auth_token');
const response = await fetch('http://localhost:5000/api/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Logout
```javascript
localStorage.removeItem('eduhouse_auth_token');
localStorage.removeItem('eduhouse_current_user');
```

## Production Deployment

For production, you should:

1. Change the JWT_SECRET in server.js or use environment variables:
   ```bash
   JWT_SECRET=your-secret-key npm start
   ```

2. Use a persistent database (PostgreSQL, MongoDB, etc.) instead of in-memory SQLite

3. Add HTTPS support

4. Configure CORS properly with your domain

5. Add rate limiting and input validation

6. Add email verification for new accounts

7. Add password reset functionality

## Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Make sure all dependencies are installed: `npm install`

### Login fails with "Connection error"
- Ensure the server is running: `npm start`
- Check if you're using the correct API URL in the frontend

### CORS errors
- The CORS middleware is configured in server.js
- Make sure frontend and backend are both running

### Database errors
- The system uses in-memory SQLite, data will be lost on server restart
- For persistence, modify server.js to use a file-based database
