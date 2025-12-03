# 🏠 EduHOUSE - Modern Online Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active Development](https://img.shields.io/badge/Status-Fully%20Operational-brightgreen)](https://github.com)

> A comprehensive online education platform combining live courses, video rediffusions, personalized tutoring, and exam preparation - all in a modern, interactive format.

**Version:** 1.0  
**Last Updated:** December 2025  
**Status:** ✅ Fully Operational

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Quick Start](#-quick-start)
3. [Features](#-features)
4. [User Roles & Dashboards](#-user-roles--dashboards)
5. [Demo Credentials](#-demo-credentials)
6. [Installation](#-installation)
7. [How to Run](#-how-to-run)
8. [API Reference](#-api-reference)
9. [Authentication](#-authentication)
10. [Admin Panel Guide](#-admin-panel-guide)
11. [Technical Stack](#-technical-stack)
12. [Project Structure](#-project-structure)
13. [Security](#-security)
14. [Troubleshooting](#-troubleshooting)
15. [Contributing](#-contributing)
16. [License](#-license)

---

## 🎯 Overview

**EduHOUSE** is an educational startup with a clear value proposition: courses from the national curriculum taught by certified teachers, in a modern, human, and interactive format. It addresses the frustrations of both parents and students by combining:

- ✅ Official curriculum compliance
- ✅ Certified teachers
- ✅ Modern interactive format
- ✅ Flexible learning pace
- ✅ Personal tutor support
- ✅ Exam preparation programs

### Our Mission

> **Render each student capable of understanding and loving to learn**

---

## 🚀 Quick Start

### In 30 Seconds

#### 1. Start the Server
```bash
npm start
# or
node src/server.js
```

#### 2. Open Browser
```
http://localhost:5000
```

#### 3. Login
Use any of the demo credentials below

#### 4. Explore
- View your role-specific dashboard
- Navigate using the sidebar
- Manage users (admin only)

---

## ✨ Features

### 📚 Core Features
- **Live Classes** - Follow the official curriculum with certified teachers
- **Unlimited Rediffusions** - Review courses at your own pace anytime
- **Personal Tutors** - Dedicated teacher answering questions and correcting assignments
- **Bac & Brevet Preparation** - Special tracks for exam success
- **Direct Communication** - Seamless tutor-student-parent communication
- **Personalized Tracking** - Progress adapted to each student's rhythm

### 👥 User Management
- **Role-Based Access** - Student, Teacher, Parent, Admin roles
- **User Registration** - Create new accounts with specific roles
- **Admin Dashboard** - Manage all users (add, edit, delete)
- **Profile Management** - Update personal information
- **Access Control** - Automatic redirection to role-specific dashboard

### 🔐 Security Features
- **Password Encryption** - bcryptjs with salt (10 rounds)
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Different permissions per role
- **Admin-Only Endpoints** - Protected admin operations
- **Email Validation** - Unique email enforcement
- **Token Expiration** - Tokens expire after 24 hours

### 📊 Dashboards
- **Student Dashboard** - View courses, assignments, grades, attendance
- **Teacher Dashboard** - Manage classes, students, grades, messages
- **Parent Dashboard** - Monitor child's progress, courses, attendance
- **Admin Dashboard** - Full system management and user administration

---

## 👥 User Roles & Dashboards

### Student (👨‍🎓)
- View enrolled courses
- Submit assignments
- Check grades and attendance
- Message teachers
- Track personal progress

### Teacher (👨‍🏫)
- Create and manage courses
- View enrolled students
- Create and grade assignments
- Track attendance
- Communicate with students and parents

### Parent (👨‍👩‍👧‍👦)
- Monitor child's progress
- View child's courses and grades
- Track attendance
- Communicate with teachers
- View assignments and scores

### Admin (👨‍💼)
- Manage all users (add, edit, delete)
- Assign roles to users
- View system statistics
- Access all courses and classes
- System configuration

---

## 🧪 Demo Credentials

All test accounts use password: **`password123`**

| Role | Email | Password | Status |
|------|-------|----------|--------|
| Admin | `admin@example.com` | `password123` | ✅ Working |
| Teacher | `teacher1@example.com` | `password123` | ✅ Working |
| Parent | `parent1@example.com` | `password123` | ✅ Working |
| Student 1 | `student1@example.com` | `password123` | ✅ Working |
| Student 2 | `student2@example.com` | `password123` | ✅ Working |
| Student 3 | `student3@example.com` | `password123` | ✅ Working |

**Demo Data Included:**
- 1 Admin
- 1 Teacher
- 1 Parent
- 3 Students
- 1 Course/Class
- Parent-Child relationships

---

## 📥 Installation

### Prerequisites
- Node.js 14+ ([Download](https://nodejs.org/))
- npm or yarn
- A modern web browser

### Setup Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd projet
```

2. **Install Dependencies**
```bash
npm install
```

3. **Verify Installation**
```bash
npm start
# You should see: "EduHOUSE Backend Server running on http://localhost:5000"
```

---

## ⚙️ How to Run

### Start the Server

```bash
npm start
```

**Output:**
```
✅ Database initialized

🏠 EduHOUSE Backend Server running on http://localhost:5000

📋 Demo Credentials:
  Student: student1@example.com | password: password123
  Parent: parent1@example.com | password: password123
  Teacher: teacher1@example.com | password: password123
  Admin: admin@example.com | password: password123
```

### Access the Application

1. Open your browser
2. Go to: `http://localhost:5000`
3. Click "Se connecter" (Login)
4. Use demo credentials from above
5. You'll be redirected to your role-specific dashboard

---

## 📚 API Reference

**Base URL:** `http://localhost:5000/api`  
**Version:** 1.0  
**Authentication:** JWT Bearer Token

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "role": "student"
}
```
**Response:** `201 Created`

#### 2. Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "student1@example.com",
  "password": "password123"
}
```
**Response:** `200 OK`
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "student1@example.com",
    "role": "student"
  }
}
```

#### 3. Verify Token
```http
POST /auth/verify
Authorization: Bearer YOUR_TOKEN
```
**Response:** `200 OK`

#### 4. Logout
```http
POST /api/auth/logout
```
**Response:** `200 OK`

### User Profile Endpoints (Authenticated Users)

#### Get Profile
```http
GET /user/profile
Authorization: Bearer YOUR_TOKEN
```

#### Update Profile
```http
PUT /user/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+33612345678"
}
```

### Student Endpoints

#### Get Classes
```http
GET /student/classes
Authorization: Bearer YOUR_TOKEN
```

#### Get Homework
```http
GET /student/homework
Authorization: Bearer YOUR_TOKEN
```

#### Get Grades
```http
GET /student/grades
Authorization: Bearer YOUR_TOKEN
```

#### Get Attendance
```http
GET /student/attendance
Authorization: Bearer YOUR_TOKEN
```

### Teacher Endpoints

#### Get Classes
```http
GET /teacher/classes
Authorization: Bearer YOUR_TOKEN
```

#### Create Class
```http
POST /teacher/class
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Mathématiques 2nde",
  "description": "Course description",
  "level": "2nde",
  "subject": "Mathématiques"
}
```

#### Get Class Students
```http
GET /teacher/class/:classId/students
Authorization: Bearer YOUR_TOKEN
```

### Parent Endpoints

#### Get Children
```http
GET /parent/children
Authorization: Bearer YOUR_TOKEN
```

#### Get Child's Classes
```http
GET /parent/child/:childId/classes
Authorization: Bearer YOUR_TOKEN
```

#### Get Child's Grades
```http
GET /parent/child/:childId/grades
Authorization: Bearer YOUR_TOKEN
```

### Admin Endpoints

#### Get All Users
```http
GET /admin/users
Authorization: Bearer YOUR_TOKEN
```

#### Get Specific User
```http
GET /admin/user/:userId
Authorization: Bearer YOUR_TOKEN
```

#### Update User
```http
PUT /admin/user/:userId
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "new@email.com",
  "role": "teacher"
}
```

#### Delete User
```http
DELETE /admin/user/:userId
Authorization: Bearer YOUR_TOKEN
```

#### Get All Classes
```http
GET /admin/classes
Authorization: Bearer YOUR_TOKEN
```

#### Get Statistics
```http
GET /admin/statistics
Authorization: Bearer YOUR_TOKEN
```

---

## 🔐 Authentication

### How It Works

1. **User Registration/Login**
   - User provides email and password
   - System validates credentials
   - Returns JWT token on success

2. **Token Storage**
   - Token stored in localStorage as `eduhouse_auth_token`
   - User data stored as `eduhouse_current_user`

3. **API Requests**
   - Include token in Authorization header: `Bearer TOKEN`
   - System validates token for each request

4. **Token Expiration**
   - Tokens expire after 24 hours
   - User must login again after expiration

### Frontend Integration Example

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
if (response.ok) {
  localStorage.setItem('eduhouse_auth_token', data.token);
  localStorage.setItem('eduhouse_current_user', JSON.stringify(data.user));
  // Redirect to dashboard based on role
}

// Protected API Call
const token = localStorage.getItem('eduhouse_auth_token');
const apiResponse = await fetch('http://localhost:5000/api/user/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Logout
localStorage.removeItem('eduhouse_auth_token');
localStorage.removeItem('eduhouse_current_user');
```

---

## 👨‍💼 Admin Panel Guide

### Adding a User

1. **Login as Admin**
   - Email: `admin@example.com`
   - Password: `password123`

2. **Go to Users Section**
   - Click on "👥 Utilisateurs" in sidebar

3. **Click Add Button**
   - Click "➕ Ajouter" button

4. **Fill the Form**
   - **Name**: User's full name
   - **Email**: Unique email address
   - **Role**: Select teacher/student/parent/admin
   - **Password**: Set initial password

5. **Create User**
   - Click "Créer l'Utilisateur"
   - User can now login

### Editing a User

1. Find user in the table
2. Click "Éditer" button
3. Modify the fields
4. Click save to update

### Deleting a User

1. Find user in the table
2. Click "Supprimer" button
3. Confirm deletion
4. User is removed permanently

### Viewing Statistics

- Go to "📊 Analytique" (Analytics) section
- View user distribution
- View enrollment statistics
- View payment information

---

## 🛠️ Technical Stack

### Backend
- **Runtime**: Node.js 14+
- **Framework**: Express.js 5.x
- **Database**: JSON file-based (file stored in `/data/users.json`)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **CORS**: Express CORS middleware

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design, flexbox, grid
- **JavaScript**: Vanilla ES6+
- **Storage**: Browser localStorage for authentication
- **No build process**: Ready to run as-is

### Dependencies
```json
{
  "express": "^5.1.0",
  "cors": "^2.8.5",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "dotenv": "^17.2.3"
}
```

---

## 📁 Project Structure

```
projet/
├── src/
│   ├── server.js          # Main Express server
│   ├── database.js        # Database operations
│   └── public/            # Static files served
├── data/
│   ├── users.json         # User database
│   ├── classes.json       # Classes database
│   ├── messages.json      # Messages database
│   └── ...
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── dashboard.html         # Student dashboard
├── teacher-dashboard.html # Teacher dashboard
├── parent-dashboard.html  # Parent dashboard
├── admin-panel.html       # Admin panel
├── index.html            # Homepage/Login page
├── package.json          # Node dependencies
├── README.md             # This file
└── LICENSE               # MIT License
```

---

## 🔒 Security

### Password Security
- Passwords hashed using bcryptjs with 10 salt rounds
- Passwords never stored in plain text
- Passwords never returned in API responses

### Authentication Security
- JWT tokens with 24-hour expiration
- Tokens must be included for protected endpoints
- Invalid/expired tokens rejected with 401 Unauthorized

### Authorization Security
- Role-based access control (RBAC)
- Each endpoint validates user role
- Admin-only operations protected
- Users can only access their own data (except admins)

### Data Security
- CORS enabled for cross-origin requests
- Input validation on all endpoints
- Email uniqueness enforced
- Duplicate prevention for user creation

### Best Practices
- Use HTTPS in production
- Change JWT_SECRET for production
- Use environment variables for sensitive data
- Implement rate limiting
- Add request logging
- Regular security audits

---

## 🐛 Troubleshooting

### Server Issues

#### "Server won't start" / "Port 5000 already in use"
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use a different port:
PORT=3000 npm start
```

#### "Cannot find module" error
```bash
# Reinstall dependencies
npm install

# Clear npm cache
npm cache clean --force
npm install
```

#### "Database not initialized"
- Check that `/data` directory exists
- Verify `users.json` is readable
- Check file permissions

### Login Issues

#### "Invalid email or password"
- Verify email is exactly correct
- Check CAPS LOCK is off
- Use demo credentials to test: `student1@example.com` / `password123`
- Clear browser cache: Ctrl+Shift+Delete

#### "Login page keeps redirecting"
- If logged in, you'll be redirected to dashboard
- Logout first (clear localStorage) to see login page
- Open browser DevTools (F12) → Application → Storage → Clear All

#### "Token expired, please login again"
- Tokens last 24 hours
- Login again with your credentials
- New token will be issued

### Dashboard Issues

#### "Dashboard not loading" / "Blank page"
- Open DevTools (F12) to check console for errors
- Verify server is running: `npm start`
- Check http://localhost:5000 responds
- Try hard refresh: Ctrl+Shift+R

#### "Sidebar links not clickable"
- Refresh page (F5)
- Clear browser cache
- Check browser console for JavaScript errors
- Try different browser

#### "Data not loading" (students, teachers, messages)
- Check server is running and responding
- Verify you have proper role permissions
- Check network tab in DevTools (F12)
- Look for 401 Unauthorized (token issue) or 403 Forbidden (permission issue)

### Admin Panel Issues

#### "Can't add/edit/delete users"
- Must be logged in as admin
- All form fields must be filled
- Email must be unique for new users
- Check browser console for error messages

#### "Users table showing errors"
- Verify API endpoint: GET /admin/users
- Check token is valid and not expired
- Verify you have admin role

#### "Can't see role dropdown"
- Clear browser cache
- Refresh page
- Try different browser

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone <your-fork-url>
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Describe your changes
   - Reference any related issues
   - Request review

### Contribution Guidelines
- Code should be clean and well-commented
- Test all new features before submitting
- Don't break existing functionality
- Update documentation as needed
- Follow the existing code structure

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 🎓 Educational Resources

### For Students
- **Dashboard**: View courses, assignments, grades
- **Messages**: Communicate with teachers
- **Progress**: Track your learning journey
- **Assignments**: Submit and track work

### For Teachers
- **Course Management**: Create and manage classes
- **Student Management**: View enrolled students
- **Grading**: Grade assignments and track progress
- **Communication**: Message students and parents

### For Parents
- **Progress Tracking**: Monitor child's performance
- **Communication**: Connect with teachers
- **Courses**: See what child is learning
- **Grades**: View child's scores and achievements

### For Admins
- **User Management**: Add, edit, delete users
- **Statistics**: View system analytics
- **Configuration**: Manage system settings
- **Support**: Help other users

---

## 🚀 Getting Started Checklist

- [ ] Install Node.js and npm
- [ ] Clone the repository
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Open http://localhost:5000
- [ ] Login with demo credentials
- [ ] Explore your dashboard
- [ ] Try different roles
- [ ] Test admin panel (if admin)
- [ ] Read API documentation
- [ ] Join the community!

---

## 📞 Support

For issues, questions, or feedback:

1. **Check Troubleshooting Section** - Most common issues covered
2. **Review Documentation** - Check API reference and guides
3. **Check Browser Console** - Open DevTools (F12) for error messages
4. **Verify Server Status** - Make sure `npm start` is running
5. **Clear Cache** - Ctrl+Shift+Delete in most browsers

---

## 🎉 Features Status

| Feature | Status | Notes |
|---------|--------|-------|
| User Registration | ✅ Working | All roles supported |
| User Login | ✅ Working | JWT authentication |
| User Management (Admin) | ✅ Working | Full CRUD operations |
| Student Dashboard | ✅ Working | View courses & grades |
| Teacher Dashboard | ✅ Working | Manage classes |
| Parent Dashboard | ✅ Working | Track child progress |
| Admin Dashboard | ✅ Working | System management |
| Role-Based Access | ✅ Working | Automatic routing |
| Password Encryption | ✅ Working | bcryptjs 10 rounds |
| JWT Authentication | ✅ Working | 24-hour expiration |
| API Endpoints | ✅ Working | All tested & documented |
| Database Persistence | ✅ Working | JSON file storage |
| Responsive Design | ✅ Working | Mobile & desktop |
| French Localization | ✅ Working | Full French UI |

---

## 🌟 What's New

### Latest Updates (December 2025)
- ✅ Fixed admin panel API endpoints (`/admin/users`, `/admin/user/:id`)
- ✅ Fixed teacher dashboard sidebar navigation
- ✅ Removed dead code from student dashboard
- ✅ Fixed parent dashboard API endpoint (`/parent/children`)
- ✅ Comprehensive API documentation
- ✅ Complete README consolidation
- ✅ Full system testing completed

---

## 💡 Tips & Tricks

1. **Use Demo Accounts First** - Test with provided credentials to understand the system
2. **Explore Each Role** - Login as student, teacher, parent, admin to see differences
3. **Check Console** - Open DevTools (F12) to debug any issues
4. **Test API Directly** - Use curl or Postman to test endpoints
5. **Read Code Comments** - Well-commented for learning
6. **Backup Data** - The `data/` folder contains your database
7. **Test on Different Browsers** - Chrome, Firefox, Safari, Edge

---

## 🏆 Best Practices

### For Development
- Always commit working code
- Write clear commit messages
- Test changes before committing
- Document new features
- Keep dependencies updated

### For Deployment
- Change JWT_SECRET in production
- Use environment variables for config
- Enable HTTPS/SSL
- Set up proper logging
- Configure firewalls
- Regular backups
- Monitor performance

---

## 📊 System Requirements

- **Node.js**: 14 or higher
- **npm**: 6 or higher
- **RAM**: 512 MB minimum
- **Disk Space**: 100 MB minimum
- **Browser**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **OS**: Windows, macOS, Linux

---

## 🎯 Next Steps

1. ✅ **Get Started** - Follow Quick Start section
2. ✅ **Explore** - Try all user roles
3. ✅ **Learn API** - Read API Reference
4. ✅ **Customize** - Modify for your needs
5. ✅ **Deploy** - Set up on production server
6. ✅ **Contribute** - Help improve the project

---

**Made with ❤️ by the EduHOUSE Team**

**Happy Learning! 🎓**

---

*For the latest updates and information, visit the project repository.*
