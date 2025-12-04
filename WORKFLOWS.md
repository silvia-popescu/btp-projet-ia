# 📋 EduHOUSE User Workflows & Permissions Guide

## Overview

The system has 4 main user roles with different permissions:
1. **Student** - Learners
2. **Parent** - Guardians of students
3. **Teacher** - Educators/Instructors
4. **Admin** - System administrator

---

## 📊 User Roles & Their Functions

### 👨‍🎓 STUDENT Role
**What they can do:**
- View their enrolled classes
- View homework assignments
- Submit homework
- View their grades
- View their attendance records
- Send/receive messages

**What they CANNOT do:**
- Create classes
- Grade other students
- Manage payments
- Access admin functions

---

### 👨‍👩‍👧 PARENT Role
**What they can do:**
- View their children's classes
- View children's grades
- View children's attendance
- View children's homework
- Send/receive messages
- Monitor children's progress

**What they CANNOT do:**
- Create classes
- Add new children (must be done by Admin)
- Accept lessons
- Manage payments

---

### 👨‍🏫 TEACHER Role
**What they can do:**
- Create new classes
- View their classes and students
- Create homework assignments
- Grade homework submissions
- Record attendance
- View payments
- Send/receive messages
- Create grades/evaluations

**What they CANNOT do:**
- Add students (Admin must enroll them)
- Process payments (Admin does this)
- Access other teacher's classes

---

### ⚙️ ADMIN Role
**What they can do:**
- Manage all users (create, edit, delete)
- View all classes
- Manage payments (create, approve, modify)
- View system statistics
- Accept/process lessons
- Manage parent-child relationships
- Send/receive messages

**What they CAN DO (exclusive):**
- Add children to parents (parent-child linking)
- Process payment requests
- Approve new lessons
- Create class enrollments
- Generate reports

---

## 🔄 Workflow Examples

### **WORKFLOW 1: New Student Enrollment**

```
1. PARENT/STUDENT registers
   └─ Creates account (student or parent role)

2. ADMIN receives registration
   └─ Reviews in Admin Panel (/admin-panel.html)
   └─ Approves account

3. ADMIN adds child to parent
   └─ Navigates to Admin Panel
   └─ Links parent_id with child_id in database
   └─ Stored in: parent_child.json

4. ADMIN enrolls student in class
   └─ Selects class from list
   └─ Adds student to enrollment
   └─ Stored in: enrollments.json

5. PARENT & STUDENT can see classes
   └─ Parent dashboard shows children's classes
   └─ Student dashboard shows their classes
```

---

### **WORKFLOW 2: Teacher Creates Lesson/Class**

```
1. TEACHER logs in
   └─ Goes to Teacher Dashboard > Mes Cours

2. TEACHER creates new course
   └─ Clicks "➕ Créer un Nouveau Cours"
   └─ Enters: Course name, level, description
   └─ Submitted to API: POST /api/teacher/class
   └─ Stored in: classes.json

3. ADMIN reviews (optional step)
   └─ Can view all classes in Admin Panel
   └─ Can edit/approve if needed

4. STUDENTS enroll (via Admin or automatically)
   └─ Admin enrolls them
   └─ Stored in: enrollments.json

5. TEACHER assigns homework
   └─ Teacher Dashboard > Devoirs & Évaluations
   └─ Creates assignment
   └─ Sent to: homework.json
   └─ Students can view and submit
```

---

### **WORKFLOW 3: Student Submits Homework**

```
1. STUDENT sees homework assignment
   └─ Student Dashboard > Classes > View Assignment

2. STUDENT submits work
   └─ Uploads file or enters text
   └─ Clicks "Soumettre"
   └─ Stored in: homework_submissions.json

3. TEACHER reviews submission
   └─ Teacher Dashboard > Devoirs & Évaluations
   └─ Views student submission
   └─ Grades and provides feedback

4. STUDENT sees grade
   └─ Student Dashboard > Grades
   └─ Can see teacher's feedback
   └─ Stored in: grades.json
```

---

### **WORKFLOW 4: Parent Makes Payment**

```
1. PARENT logs in
   └─ Sees payment request
   └─ Parent Dashboard > Payments or Messages

2. PARENT sends payment request
   └─ Can message teacher/admin about payment
   └─ Or payment is automatically created

3. ADMIN processes payment
   └─ Admin Dashboard > Payments
   └─ Reviews payment request
   └─ Approves and records payment
   └─ Stored in: payments.json

4. PAYMENT RECORDED
   └─ Teacher can see payment received
   └─ Parent gets confirmation
   └─ System updates payment status

WHO ACCEPTS: ✅ ADMIN (Only admin can approve/process payments)
```

---

### **WORKFLOW 5: Message Communication**

```
PARENT wants to contact TEACHER:

1. PARENT sends message
   └─ Parent Dashboard > Messages > New Message
   └─ Select recipient (teacher/admin)
   └─ Write message
   └─ Click Send
   └─ Stored in: messages.json

2. TEACHER receives message
   └─ Appears in Teacher Dashboard > Messages
   └─ Can view in Inbox

3. TEACHER replies
   └─ Clicks Reply
   └─ Writes response
   └─ Message saved

4. PARENT sees reply
   └─ Parent Dashboard > Messages
   └─ Can continue conversation

WHO ACCEPTS: No approval needed (direct communication)
```

---

## 📁 How Data is Managed

### Files Used for Each Feature:

| Feature | File | Created By | Approved By |
|---------|------|-----------|------------|
| **Users/Profiles** | users.json | Admin (registration) | - |
| **Classes** | classes.json | Teacher | Admin (optional) |
| **Enrollments** | enrollments.json | Admin | Admin |
| **Parent-Child Links** | parent_child.json | Admin | Admin |
| **Homework** | homework.json | Teacher | - |
| **Submissions** | homework_submissions.json | Student | - |
| **Grades** | grades.json | Teacher | - |
| **Attendance** | attendance.json | Teacher | - |
| **Payments** | payments.json | Admin | Admin |
| **Messages** | messages.json | Any role | - |
| **Lessons** | lessons.json | Teacher | Admin |

---

## 🎯 Who Approves What?

### ✅ ADMIN Approves:
- **New user registrations** (creates profiles)
- **Payment requests** (processes payments)
- **Student enrollments in classes**
- **Parent-child relationships**
- **New lessons/courses** (optional)

### ✅ TEACHER Approves:
- **Homework submissions** (grades them)
- **Attendance** (records it)
- **Evaluations** (creates grades)

### ✅ NO APPROVAL NEEDED:
- **Messages** (sent directly)
- **Student views own grades** (once teacher grades)
- **Parent views children's data** (automatic access)

---

## 🔐 Permission Levels by Role

```
ADMIN (Full Access)
├─ Can view: Everything
├─ Can create: Users, Payments, Enrollments
├─ Can edit: All user data
├─ Can delete: Any record
└─ Can approve: Payments, Enrollments, Lessons

TEACHER (Class Management)
├─ Can view: Their own classes, students
├─ Can create: Classes, Homework, Grades
├─ Can edit: Their own content
├─ Can delete: Their own content
└─ Can approve: Homework (grade it)

PARENT (Children Monitoring)
├─ Can view: Children's classes, grades, attendance
├─ Can create: Messages
├─ Can edit: Their profile
├─ Can delete: Their messages
└─ Can approve: Nothing (monitoring only)

STUDENT (Learning)
├─ Can view: Their classes, homework, grades
├─ Can create: Homework submissions, Messages
├─ Can edit: Their profile
├─ Can delete: Their messages
└─ Can approve: Nothing
```

---

## 📝 Adding New Features - How It Works

### Example: Parent wants to add child

**Current System:**
```
Parent registers → Admin must manually link child
(Stored in parent_child.json)
```

**API Endpoint:**
```
Parent Dashboard currently doesn't have "Add Child" button
Only Admin can add via Admin Panel
```

**To Implement "Parent can add child":**
```
1. Create new API endpoint: POST /api/parent/child/add
2. Add validation: Check if child account exists
3. Add permission: requireRole('parent')
4. Store in: parent_child.json
5. Add button in: Parent Dashboard > Mes Enfants
```

---

### Example: Parent wants to book lesson

**Current System:**
```
Messages only → Teacher responds → Admin confirms
No formal "booking" system yet
```

**To Implement Lesson Booking:**
```
1. Create lessons.json file ✓ (already exists)
2. Create new API: POST /api/parent/book-lesson
3. Stores in: lessons.json
4. Admin Dashboard shows pending lessons
5. Admin approves → Both parties notified
6. Payment processed after approval
```

---

## 🚀 How to Add a New Feature

### Steps:
1. **Identify who uses it** (student, parent, teacher, admin?)
2. **Check if file exists** (users.json, classes.json, etc.)
3. **Create API endpoint** in src/server.js
4. **Add permission check** with requireRole()
5. **Add button/form** in frontend HTML
6. **Call API** from JavaScript
7. **Display result** in dashboard

### Example: Add "Request Lesson" feature for Parents

**Step 1:** Create API endpoint
```javascript
app.post('/api/parent/request-lesson', verifyToken, requireRole('parent'), (req, res) => {
    const { childId, subjectId, date, time } = req.body;
    // Create lesson request
    // Store in lessons.json
});
```

**Step 2:** Add to parent dashboard
```html
<button onclick="requestLesson()">📅 Request Lesson</button>
```

**Step 3:** Call API from JavaScript
```javascript
async function requestLesson() {
    const response = await fetch('/api/parent/request-lesson', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({...})
    });
}
```

**Step 4:** Admin reviews and approves
```
Admin Dashboard > Requests > Lesson Requests
Approve → Payment created → Lesson scheduled
```

---

## 📞 Communication Flow

```
PARENT → MESSAGE → TEACHER
                  ↓
           TEACHER REVIEWS
                  ↓
         TEACHER REPLIES
                  ↓
         PARENT SEES REPLY

PARENT → PAYMENT REQUEST → ADMIN
                          ↓
                   ADMIN REVIEWS
                          ↓
                  ADMIN APPROVES
                          ↓
              PAYMENT PROCESSED
                          ↓
    PARENT & TEACHER NOTIFIED
```

---

## ✅ Summary

| Action | Who Initiates | Who Approves | Where |
|--------|---------------|--------------|-------|
| Add Child | Admin | - | Admin Panel |
| Create Class | Teacher | - | Teacher DB |
| Enroll Student | Admin | - | Admin Panel |
| Create Homework | Teacher | - | Teacher DB |
| Submit Homework | Student | - | Student DB |
| Grade Work | Teacher | - | Teacher DB |
| Message | Any | - | Direct |
| Book Lesson | Parent* | Admin | Lesson Request |
| Payment | Admin/Parent | Admin | Admin Panel |

*Coming soon - currently via messages

---

**Last Updated:** 2025-12-04  
**System Version:** 1.0 with Level 5 Security
