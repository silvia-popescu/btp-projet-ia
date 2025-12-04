# 🔄 Quick Workflow Examples

## Real-World Scenarios

### Scenario 1: Parent Adding Child

**Current Process:**

```
STEP 1: Parent registers account
  └─ Goes to index.html
  └─ Clicks "Sign Up"
  └─ Selects "Parent" role
  └─ Email: parent@example.com
  └─ Creates password
  └─ Clicks "Sign Up"
  └─ Account created ✓

STEP 2: Admin adds child relationship
  └─ Logs into Admin Panel
  └─ Admin → "Users" section
  └─ Finds parent and child accounts
  └─ Links them together
  └─ Child ID: 1, Parent ID: 4
  └─ Saved to: data/parent_child.json
  └─ Relationship created ✓

STEP 3: Parent sees child in dashboard
  └─ Parent logs in
  └─ Parent Dashboard → "Mes Enfants"
  └─ Sees child's name
  └─ Can view child's grades, classes, attendance ✓
```

**Who Approves:** ✅ **ADMIN** (must create the link)

---

### Scenario 2: Teacher Creating Lesson

**Process:**

```
STEP 1: Teacher creates class
  └─ Logs into Teacher Dashboard
  └─ Menu → "Mes Cours"
  └─ Clicks "➕ Créer un Nouveau Cours"
  └─ Enters:
      • Name: "Mathematics Level 1"
      • Level: "Grade 6"
      • Description: "Basic algebra"
  └─ Clicks "Create"
  └─ Saved to: data/classes.json
  └─ Class created ✓

STEP 2: Admin enrolls students
  └─ Logs into Admin Panel
  └─ Admin → "Classes"
  └─ Selects the class
  └─ Clicks "Add Students"
  └─ Selects: Jean, Sophie, Luc
  └─ Clicks "Enroll"
  └─ Saved to: data/enrollments.json
  └─ Students enrolled ✓

STEP 3: Students see class
  └─ Student logs in
  └─ Student Dashboard → "Classes"
  └─ Shows: "Mathematics Level 1"
  └─ Can view assignments
  └─ Can submit work ✓

STEP 4: Teacher sees students
  └─ Teacher Dashboard → "Mes Élèves"
  └─ Shows: Jean, Sophie, Luc
  └─ Can assign homework
  └─ Can grade work ✓
```

**Who Approves:** ✅ **TEACHER** (creates) + ✅ **ADMIN** (enrolls students)

---

### Scenario 3: Homework Submission

**Process:**

```
STEP 1: Teacher creates homework
  └─ Teacher Dashboard → "Devoirs & Évaluations"
  └─ Clicks "➕ Créer un Devoir"
  └─ Enters:
      • Title: "Algebra Exercise 5"
      • Description: "Solve equations"
      • Due Date: Dec 15, 2025
      • Class: Mathematics Level 1
  └─ Clicks "Create"
  └─ Saved to: data/homework.json
  └─ Homework assigned ✓

STEP 2: Student receives homework
  └─ Student logs in
  └─ Student Dashboard → "Classes"
  └─ Shows: "New homework: Algebra Exercise 5"
  └─ Opens homework details

STEP 3: Student submits work
  └─ Clicks "Submit Homework"
  └─ Uploads file OR types answer
  └─ Clicks "Submit"
  └─ Saved to: data/homework_submissions.json
  └─ Work submitted ✓

STEP 4: Teacher grades work
  └─ Teacher Dashboard → "Devoirs & Évaluations"
  └─ Reviews student submission
  └─ Enters grade (A, B, C, etc.)
  └─ Adds feedback/comments
  └─ Clicks "Grade"
  └─ Saved to: data/grades.json
  └─ Grade recorded ✓

STEP 5: Student sees grade
  └─ Student Dashboard → "Grades"
  └─ Shows: "Algebra Exercise 5: A"
  └─ Can see teacher's feedback
  └─ Grade visible ✓

STEP 6: Parent sees grade
  └─ Parent Dashboard → "Mes Enfants" → Child Name
  └─ Shows: "Algebra Exercise 5: A"
  └─ Can monitor progress ✓
```

**Who Approves:** ✅ **TEACHER** (creates homework & grades)

---

### Scenario 4: Payment Processing

**Process:**

```
STEP 1: Payment needed
  └─ Lesson fee: €50
  └─ Parent needs to pay

STEP 2: Admin creates payment request
  └─ Admin logs in
  └─ Admin Panel → "Payments"
  └─ Clicks "Create Payment"
  └─ Selects: Parent, Amount €50, Description
  └─ Clicks "Create"
  └─ Saved to: data/payments.json
  └─ Payment created ✓

STEP 3: Parent sees payment request
  └─ Parent logs in
  └─ Parent Dashboard → (Gets notification)
  └─ OR can check messages
  └─ OR Admin Panel shows pending

STEP 4: Parent makes payment
  └─ Parent confirms payment
  └─ Selects payment method
  └─ Completes transaction
  └─ Status: "Paid"

STEP 5: Admin confirms
  └─ Admin checks payment status
  └─ Verifies transaction
  └─ Marks as "Approved"
  └─ Status updated in data/payments.json

STEP 6: Teacher receives payment
  └─ Teacher sees payment received
  └─ Payment status: "Completed"
  └─ Lesson can proceed ✓
```

**Who Approves:** ✅ **ADMIN** (creates, verifies, approves payments)

---

### Scenario 5: Message Communication

**Process:**

```
STEP 1: Parent wants to contact teacher
  └─ Parent logs in
  └─ Parent Dashboard → "Messages"
  └─ Clicks "New Message"
  └─ Selects recipient: Teacher (Pierre Leclerc)
  └─ Types message: "Can we schedule extra lessons?"
  └─ Clicks "Send"
  └─ Saved to: data/messages.json
  └─ Message sent ✓

STEP 2: Teacher receives message
  └─ Teacher logs in
  └─ Teacher Dashboard → "Messages"
  └─ Shows new message from Parent
  └─ Notification: "1 New Message"
  └─ Opens inbox

STEP 3: Teacher reads message
  └─ Views: "Can we schedule extra lessons?"
  └─ Marks as Read
  └─ Updated in data/messages.json

STEP 4: Teacher replies
  └─ Clicks "Reply"
  └─ Types: "Yes, available Wednesdays 4pm"
  └─ Clicks "Send"
  └─ Message saved

STEP 5: Parent sees reply
  └─ Parent logs in
  └─ Parent Dashboard → "Messages"
  └─ Shows teacher's reply
  └─ Can continue conversation ✓

STEP 6: Booking happens
  └─ Parent and teacher agree on schedule
  └─ Admin can see conversation
  └─ Admin creates lesson in data/lessons.json
  └─ Payment processed
```

**Who Approves:** ✅ **NONE** (direct communication) - But ✅ **ADMIN** processes payment after

---

## Data Files Explained

### parent_child.json
```json
[
  {
    "id": 1,
    "parent_id": 4,      // Marie (parent)
    "child_id": 1        // Jean (student)
  }
]
```
**Who can create:** ✅ ADMIN only  
**Used for:** Parent can see child's data

---

### classes.json
```json
[
  {
    "id": 1,
    "name": "Mathematics Level 1",
    "teacher_id": 6,     // Teacher Pierre
    "level": "Grade 6",
    "description": "Basic algebra"
  }
]
```
**Who can create:** ✅ TEACHER  
**Who can enroll students:** ✅ ADMIN

---

### enrollments.json
```json
[
  {
    "id": 1,
    "class_id": 1,       // Math class
    "student_id": 1      // Jean
  }
]
```
**Who can create:** ✅ ADMIN only

---

### homework.json
```json
[
  {
    "id": 1,
    "class_id": 1,
    "title": "Algebra Exercise 5",
    "due_date": "2025-12-15",
    "created_by": 6      // Teacher Pierre
  }
]
```
**Who can create:** ✅ TEACHER  
**Who can grade:** ✅ TEACHER

---

### payments.json
```json
[
  {
    "id": 1,
    "parent_id": 4,      // Marie (payer)
    "amount": 50,
    "description": "Lesson fee",
    "status": "pending", // pending, approved, rejected
    "created_by": 8      // Admin
  }
]
```
**Who can create:** ✅ ADMIN (or system auto-creates)  
**Who can approve:** ✅ ADMIN only

---

### messages.json
```json
[
  {
    "id": 1,
    "from_id": 4,        // Parent Marie
    "to_id": 6,          // Teacher Pierre
    "subject": "Extra lessons",
    "message": "Can we schedule extra lessons?",
    "read": true
  }
]
```
**Who can create:** ✅ ANY ROLE  
**Who can receive:** ✅ ANY ROLE  
**Approval needed:** ❌ NONE

---

## Permission Matrix

| Action | Student | Parent | Teacher | Admin |
|--------|---------|--------|---------|-------|
| Add child | ❌ | ❌ | ❌ | ✅ |
| Create class | ❌ | ❌ | ✅ | ✅ |
| Enroll student | ❌ | ❌ | ❌ | ✅ |
| Create homework | ❌ | ❌ | ✅ | ✅ |
| Grade work | ❌ | ❌ | ✅ | ✅ |
| Record attendance | ❌ | ❌ | ✅ | ✅ |
| Process payment | ❌ | ❌ | ❌ | ✅ |
| Send message | ✅ | ✅ | ✅ | ✅ |
| View child data | ❌ | ✅ | ❌ | ✅ |
| View class data | ✅* | ✅* | ✅ | ✅ |

*Student/Parent can only see if enrolled/linked

---

## Summary: Who Approves What?

```
ADMIN Approves:
  ✓ Add children to parents
  ✓ Enroll students in classes  
  ✓ Process payments
  ✓ Create system accounts

TEACHER Approves:
  ✓ Grade homework
  ✓ Record attendance
  ✓ Create evaluations

PARENT/STUDENT:
  ✓ No approval power
  ✓ View only their data

MESSAGES:
  ✓ No approval needed (direct messaging)
```
