# ⚡ EduHOUSE Backend - Quick Start Guide

**Time to get running:** 2 minutes  
**Status:** ✅ Ready to use

---

## 🚀 Start the Backend

```bash
cd C:\Users\mugir\OneDrive\Desktop\projet
npm start
```

**Expected output:**
```
✅ Database initialized

🏠 EduHOUSE Backend Server running on http://localhost:5000

📋 Demo Credentials:
  Student: student1@example.com | password: password123
  Parent: parent1@example.com | password: password123
  Teacher: teacher1@example.com | password: password123
  Admin: admin@example.com | password: password123
```

---

## 📝 Demo Test Sequence

### 1. Login as Student
```bash
# In PowerShell or terminal
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email":"student1@example.com",
    "password":"password123"
  }'
```

**Keep the returned token for next requests**

### 2. View Student Classes
```bash
# Replace TOKEN with actual token from login
curl -X GET http://localhost:5000/api/student/classes `
  -H "Authorization: Bearer TOKEN"
```

### 3. View Student Homework
```bash
curl -X GET http://localhost:5000/api/student/homework `
  -H "Authorization: Bearer TOKEN"
```

### 4. Login as Teacher
```bash
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email":"teacher1@example.com",
    "password":"password123"
  }'
```

### 5. Teacher Creates Homework
```bash
# Use teacher token from login above
curl -X POST http://localhost:5000/api/teacher/homework `
  -H "Authorization: Bearer TEACHER_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "class_id": 1,
    "title": "Math Exercises",
    "description": "Chapter 5 problems",
    "due_date": "2025-12-10",
    "max_points": 100
  }'
```

### 6. Student Submits Homework
```bash
# Use student token
curl -X POST http://localhost:5000/api/student/homework/1/submit `
  -H "Authorization: Bearer STUDENT_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "submission_text": "My answer...",
    "submission_file_url": "https://example.com/homework.pdf"
  }'
```

### 7. Teacher Grades Homework
```bash
# Use teacher token
curl -X POST http://localhost:5000/api/teacher/homework/1/grade `
  -H "Authorization: Bearer TEACHER_TOKEN" `
  -H "Content-Type: application/json" `
  -d '{
    "student_id": 1,
    "grade": 85,
    "feedback": "Good work!"
  }'
```

### 8. Parent Monitors Child
```bash
# Login as parent first
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email":"parent1@example.com",
    "password":"password123"
  }'

# Then view children
curl -X GET http://localhost:5000/api/parent/children `
  -H "Authorization: Bearer PARENT_TOKEN"
```

### 9. Admin Views Statistics
```bash
# Login as admin first
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email":"admin@example.com",
    "password":"password123"
  }'

# View system stats
curl -X GET http://localhost:5000/api/admin/statistics `
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## 🎯 What Each Role Can Do

### 🎓 Student
- ✅ View my classes
- ✅ View homework assignments
- ✅ Submit homework
- ✅ View my grades
- ✅ Check attendance
- ✅ Receive messages

### 👨‍👩‍👧 Parent
- ✅ View my children
- ✅ Monitor child's classes
- ✅ Check child's grades
- ✅ Track attendance
- ✅ View homework assignments

### 👨‍🏫 Teacher
- ✅ View my classes and students
- ✅ Create homework assignments
- ✅ View student submissions
- ✅ Grade work and provide feedback
- ✅ Record attendance
- ✅ View earnings/payments

### 🔧 Admin
- ✅ Manage all users
- ✅ View all classes
- ✅ Record payments
- ✅ View system statistics
- ✅ Full control over everything

---

## 📁 Project Structure

```
projeto/
├── src/
│   ├── database.js          ← Data layer (users, classes, homework, etc.)
│   └── server.js            ← Express API server
│
├── data/                    ← Auto-generated data files
│   ├── users.json
│   ├── classes.json
│   ├── homework.json
│   └── [other data]
│
├── API_REFERENCE.md         ← Full API documentation
├── BACKEND_IMPLEMENTATION_REPORT.md
└── BACKEND_QUICK_START.md   ← This file
```

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
```bash
# Use different port
$env:PORT=3000; npm start
```

### "Cannot find module"
```bash
# Reinstall dependencies
npm install
```

### "Data not persisting"
- Data is stored in JSON files in `/data` folder
- Delete the folder to reset all data
- On restart, demo data will be recreated

### "Token expired"
- Tokens last 24 hours
- Login again to get new token
- Include token in `Authorization: Bearer TOKEN` header

---

## 🔗 API Base URL

**Local:** `http://localhost:5000/api`

**All requests must include:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Exception:** `/auth/login` and `/auth/register` don't need token

---

## 📊 Demo Data

**8 Users Pre-created:**
- 3 Students
- 2 Parents
- 2 Teachers
- 1 Admin

**2 Classes Pre-created:**
- Mathématiques Avancées (Teacher: Prof. Pierre Leclerc)
- Français Littéraire (Teacher: Prof. Carole Dubois)

**3 Enrollments:**
- Student 1 & 2 → Math class
- Student 3 → French class

---

## ✨ Key Features Working

✅ User registration & login  
✅ JWT authentication  
✅ Role-based access control  
✅ Student can submit homework  
✅ Teacher can grade homework  
✅ Parent can monitor children  
✅ Admin can manage everything  
✅ Messaging system  
✅ Attendance tracking  
✅ Grade recording  
✅ Payment tracking  

---

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT tokens with 24-hour expiration
- Role-based authorization
- No sensitive data in responses
- HTTPS-ready configuration

---

## 📞 Next Steps

1. **Test the API** using examples above
2. **Read API_REFERENCE.md** for complete endpoint list
3. **Check BACKEND_IMPLEMENTATION_REPORT.md** for details
4. **Connect frontend** when ready
5. **Deploy to production** when tested

---

## 💡 Tips

- Keep the server running while testing
- Always include the `Authorization` header (except login)
- Test with all 4 roles to understand permissions
- Check `/data` folder to see stored data
- Restart server to reset data to demo state

---

**Status:** ✅ Ready for Use  
**Version:** 1.0  
**Last Updated:** 2025-12-02
