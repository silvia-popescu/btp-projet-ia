# 📚 EduHOUSE API Reference

**Base URL:** `http://localhost:5000/api`  
**Version:** 1.0  
**Authentication:** JWT Bearer Token

---

## 🔑 Authentication Endpoints

### 1. Register User
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
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "student" }
}
```

### 2. Login
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
  "user": { "id": 1, "name": "Jean Dupont", "email": "student1@example.com", "role": "student" }
}
```

### 3. Verify Token
```http
POST /auth/verify
Authorization: Bearer YOUR_TOKEN
```
**Response:** `200 OK`
```json
{
  "valid": true,
  "user": { "id": 1, "email": "student1@example.com", "role": "student" }
}
```

---

## 👤 User Profile Endpoints (All Authenticated Users)

### Get Profile
```http
GET /user/profile
Authorization: Bearer YOUR_TOKEN
```
**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "name": "Jean Dupont",
    "email": "student1@example.com",
    "role": "student",
    "phone": "+33612345678",
    "city": "Paris"
  }
}
```

### Update Profile
```http
PUT /user/profile
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "phone": "+33699999999",
  "city": "Lyon",
  "bio": "Updated bio"
}
```

---

## 🎓 Student Endpoints

### Get My Classes
```http
GET /student/classes
Authorization: Bearer STUDENT_TOKEN
```
**Response:**
```json
{
  "classes": [
    {
      "id": 1,
      "name": "Mathématiques Avancées",
      "description": "Algèbre et Géométrie",
      "subject": "Mathématiques",
      "level": "Lycée",
      "teacher": { "id": 6, "name": "Prof. Pierre Leclerc", "email": "teacher1@example.com" },
      "enrollment": { "status": "active", "grade": "A" }
    }
  ]
}
```

### Get My Homework
```http
GET /student/homework
Authorization: Bearer STUDENT_TOKEN
```

### Check Homework Submission
```http
GET /student/homework/:homeworkId/submission
Authorization: Bearer STUDENT_TOKEN
```

### Submit Homework
```http
POST /student/homework/:homeworkId/submit
Authorization: Bearer STUDENT_TOKEN
Content-Type: application/json

{
  "submission_text": "My solution here...",
  "submission_file_url": "https://example.com/file.pdf"
}
```

### Get My Grades
```http
GET /student/grades
Authorization: Bearer STUDENT_TOKEN
```

### Get My Attendance
```http
GET /student/attendance
Authorization: Bearer STUDENT_TOKEN
```

### Get My Messages
```http
GET /student/messages
Authorization: Bearer STUDENT_TOKEN
```

---

## 👨‍👩‍👧‍👦 Parent Endpoints

### Get My Children
```http
GET /parent/children
Authorization: Bearer PARENT_TOKEN
```
**Response:**
```json
{
  "children": [
    { "id": 1, "name": "Jean Dupont", "email": "student1@example.com", "city": "Paris" }
  ]
}
```

### Get Child's Classes
```http
GET /parent/child/:childId/classes
Authorization: Bearer PARENT_TOKEN
```

### Get Child's Grades
```http
GET /parent/child/:childId/grades
Authorization: Bearer PARENT_TOKEN
```

### Get Child's Attendance
```http
GET /parent/child/:childId/attendance
Authorization: Bearer PARENT_TOKEN
```

### Get Child's Homework
```http
GET /parent/child/:childId/homework
Authorization: Bearer PARENT_TOKEN
```

---

## 👨‍🏫 Teacher Endpoints

### Get My Classes
```http
GET /teacher/classes
Authorization: Bearer TEACHER_TOKEN
```
**Response:**
```json
{
  "classes": [
    {
      "id": 1,
      "name": "Mathématiques Avancées",
      "students": [
        { "id": 1, "name": "Jean Dupont", "email": "student1@example.com" }
      ]
    }
  ]
}
```

### Create New Class
```http
POST /teacher/class
Authorization: Bearer TEACHER_TOKEN
Content-Type: application/json

{
  "name": "Français Avancé",
  "description": "Advanced French course",
  "level": "Lycée",
  "subject": "Français"
}
```

### Get Class Students
```http
GET /teacher/class/:classId/students
Authorization: Bearer TEACHER_TOKEN
```

### Create Homework
```http
POST /teacher/homework
Authorization: Bearer TEACHER_TOKEN
Content-Type: application/json

{
  "class_id": 1,
  "title": "Exercices Chapitre 5",
  "description": "Résoudre les exercices 1-20",
  "due_date": "2025-12-10",
  "max_points": 100
}
```

### Get Class Homework
```http
GET /teacher/class/:classId/homework
Authorization: Bearer TEACHER_TOKEN
```

### Get Homework Submissions
```http
GET /teacher/homework/:homeworkId/submissions
Authorization: Bearer TEACHER_TOKEN
```
**Response:**
```json
{
  "submissions": [
    {
      "id": 1,
      "student": { "id": 1, "name": "Jean Dupont", "email": "student1@example.com" },
      "status": "submitted",
      "submitted_at": "2025-12-03T10:30:00Z",
      "grade": null
    }
  ]
}
```

### Grade Homework
```http
POST /teacher/homework/:homeworkId/grade
Authorization: Bearer TEACHER_TOKEN
Content-Type: application/json

{
  "student_id": 1,
  "grade": 85,
  "feedback": "Excellent work!"
}
```

### Record Attendance
```http
POST /teacher/attendance
Authorization: Bearer TEACHER_TOKEN
Content-Type: application/json

{
  "student_id": 1,
  "class_id": 1,
  "lesson_id": null,
  "date": "2025-12-02",
  "status": "present",
  "notes": ""
}
```
**Status values:** `present`, `absent`, `late`, `excused`

### Get Class Attendance
```http
GET /teacher/class/:classId/attendance
Authorization: Bearer TEACHER_TOKEN
```

### Record Grade
```http
POST /teacher/grade
Authorization: Bearer TEACHER_TOKEN
Content-Type: application/json

{
  "student_id": 1,
  "class_id": 1,
  "assignment_id": null,
  "grade": 92,
  "max_grade": 100,
  "notes": "Great improvement"
}
```

### Get My Payments
```http
GET /teacher/payments
Authorization: Bearer TEACHER_TOKEN
```

---

## 🔧 Admin Endpoints

### Get All Users
```http
GET /admin/users
Authorization: Bearer ADMIN_TOKEN
```

### Get User Details
```http
GET /admin/user/:userId
Authorization: Bearer ADMIN_TOKEN
```

### Update User
```http
PUT /admin/user/:userId
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Updated Name",
  "phone": "+33699999999",
  "role": "student"
}
```

### Get All Classes
```http
GET /admin/classes
Authorization: Bearer ADMIN_TOKEN
```

### Get All Payments
```http
GET /admin/payments
Authorization: Bearer ADMIN_TOKEN
```

### Record Payment
```http
POST /admin/payment
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json

{
  "student_id": 1,
  "teacher_id": 6,
  "class_id": 1,
  "amount": 50.00,
  "payment_date": "2025-12-02",
  "status": "completed",
  "description": "Class payment for November"
}
```
**Status values:** `pending`, `completed`, `failed`, `refunded`

### Get System Statistics
```http
GET /admin/statistics
Authorization: Bearer ADMIN_TOKEN
```
**Response:**
```json
{
  "stats": {
    "total_users": 8,
    "total_students": 3,
    "total_teachers": 2,
    "total_parents": 2,
    "total_classes": 2,
    "total_revenue": 0
  }
}
```

---

## 💬 Messaging Endpoints (All Authenticated Users)

### Send Message
```http
POST /message/send
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "receiver_id": 1,
  "subject": "Homework feedback",
  "content": "Great work on the homework!"
}
```

### Get Inbox
```http
GET /message/inbox
Authorization: Bearer YOUR_TOKEN
```
**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "sender_id": 6,
      "subject": "Homework feedback",
      "content": "Great work!",
      "is_read": false,
      "sent_at": "2025-12-02T15:30:00Z"
    }
  ]
}
```

### Mark Message as Read
```http
PUT /message/:messageId/read
Authorization: Bearer YOUR_TOKEN
```

---

## 🔐 Security Notes

1. **All requests** (except login/register) require `Authorization: Bearer TOKEN`
2. **Token expiration:** 24 hours
3. **Password requirements:**
   - Minimum 6 characters
   - Hashed with bcryptjs
   - Never returned in API responses

4. **Role-based access:**
   - Student can only access own data
   - Parent can only access children's data
   - Teacher can only manage own classes
   - Admin has full access

---

## ❌ Error Responses

### 400 Bad Request
```json
{
  "error": "Email and password are required"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database error message"
}
```

---

## 🎯 Quick Test Commands

### Start Server
```bash
npm start
```

### Login as Student
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student1@example.com","password":"password123"}'
```

### Get Student Classes
```bash
curl -X GET http://localhost:5000/api/student/classes \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Login as Teacher
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teacher1@example.com","password":"password123"}'
```

### Create Homework
```bash
curl -X POST http://localhost:5000/api/teacher/homework \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "class_id": 1,
    "title": "Homework 1",
    "description": "Complete exercises",
    "due_date": "2025-12-10",
    "max_points": 100
  }'
```

---

## 📊 Data Structures

### User Roles
- `student` - Can view classes, submit homework, check grades
- `parent` - Can monitor children's progress
- `teacher` - Can manage classes and grade work
- `admin` - Full system access

### Homework Statuses
- `pending` - Not yet submitted
- `submitted` - Submitted, awaiting grading
- `graded` - Graded with feedback

### Attendance Statuses
- `present` - Student attended
- `absent` - Student did not attend
- `late` - Student arrived late
- `excused` - Absence was excused

### Payment Statuses
- `pending` - Payment awaited
- `completed` - Payment received
- `failed` - Payment failed
- `refunded` - Payment refunded

---

## 🔄 Common Workflows

### Student Workflow
1. Login → Get Token
2. GET /student/classes → View classes
3. GET /student/homework → View assignments
4. POST /student/homework/:id/submit → Submit work
5. GET /student/grades → Check grades

### Parent Workflow
1. Login → Get Token
2. GET /parent/children → View children
3. GET /parent/child/:id/grades → Check child's grades
4. GET /parent/child/:id/attendance → Check attendance

### Teacher Workflow
1. Login → Get Token
2. GET /teacher/classes → View classes
3. POST /teacher/homework → Create assignment
4. GET /teacher/homework/:id/submissions → View submissions
5. POST /teacher/homework/:id/grade → Grade work

### Admin Workflow
1. Login → Get Token
2. GET /admin/users → List users
3. GET /admin/classes → View classes
4. POST /admin/payment → Record payment
5. GET /admin/statistics → View stats

---

**Last Updated:** 2025-12-02  
**Version:** 1.0  
**Status:** Production Ready ✅
