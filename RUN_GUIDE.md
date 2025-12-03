# 🚀 How to Run EduHOUSE

## Quick Start (3 Steps)

### Step 1: Open Terminal/Command Prompt
Navigate to the project directory:
```bash
cd C:\Users\mugir\OneDrive\Desktop\projet
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

### Step 3: Start the Server
```bash
node server.js
```

You should see:
```
✓ sqlite3 not available, falling back to file-based user storage
✓ EduHOUSE Server running on http://localhost:5000

Demo Credentials:
  Email: student@example.com | Password: password123
  Email: parent@example.com | Password: password123
  Email: teacher@example.com | Password: password123
```

---

## Access the Application

Open your web browser and go to:
```
http://localhost:5000
```

---

## Demo Accounts

### 🔴 Admin (Full Access)
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Features**: User management, system control

### 🟢 Teacher
- **Email**: `teacher@example.com`
- **Password**: `password123`
- **Features**: Course management, grading

### 🔵 Student
- **Email**: `student@example.com`
- **Password**: `password123`
- **Features**: View courses, submit assignments

### 🟠 Parent
- **Email**: `parent@example.com`
- **Password**: `password123`
- **Features**: Monitor children, view progress

---

## What Each Role Can Do

### Admin Panel
- ✅ Add new users
- ✅ Edit user information
- ✅ Delete users
- ✅ Assign roles
- ✅ Manage system

### Teacher Dashboard
- ✅ Manage courses
- ✅ Grade assignments
- ✅ Track student progress
- ✅ View attendance

### Student Dashboard
- ✅ View enrolled courses
- ✅ Submit assignments
- ✅ Track progress
- ✅ View messages

### Parent Dashboard
- ✅ Monitor children
- ✅ View children's courses
- ✅ Receive messages
- ✅ Track progress

---

## Troubleshooting

### Server Won't Start?
- Check if Node.js is installed: `node --version`
- Check if port 5000 is available
- Try: `npm install` first

### Can't Access http://localhost:5000?
- Make sure the server is running
- Check the terminal for error messages
- Try a different browser

### Login Fails?
- Check email and password exactly as shown
- Clear browser cache
- Try private/incognito window

### Can't Add Users (Admin)?
- Make sure you're logged in as admin
- Check that email is not already used
- Fill all required fields

---

## Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## Port Configuration

The server runs on port **5000** by default.

To use a different port, set the PORT environment variable:
```bash
set PORT=3000
node server.js
```

---

## Features Overview

✅ User Authentication (Login/Register)  
✅ Role-Based Access Control  
✅ Admin User Management  
✅ Student Dashboards  
✅ Teacher Dashboards  
✅ Parent Dashboards  
✅ Responsive Design  
✅ Secure Password Hashing  
✅ JWT Token Authentication  
✅ Real-time Data Storage  

---

## File Locations

- **Server**: `server.js`
- **Login**: `index.html`
- **Student Dashboard**: `dashboard.html`
- **Teacher Dashboard**: `teacher-dashboard.html`
- **Parent Dashboard**: `parent-dashboard.html`
- **Admin Panel**: `admin-panel.html`
- **Database**: `users.json`
- **Courses**: `courses.json`
- **Messages**: `messages.json`

---

## Documentation

For more information, see:
- `00_START_HERE.md` - Getting started guide
- `SYSTEM_STATUS.md` - System overview
- `ADMIN_PANEL_GUIDE.md` - Admin manual
- `PROJECT_COMPLETION_REPORT.md` - Full project report

---

## Need Help?

1. Check the documentation files
2. Review the troubleshooting section
3. Check browser console for errors (F12)
4. Check terminal output for server errors

---

**Enjoy using EduHOUSE!** 🎓
