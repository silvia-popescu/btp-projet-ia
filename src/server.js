const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Middleware: Authenticate token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}

// Middleware: Check user role
function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
}

// ============================================
// AUTH ENDPOINTS
// ============================================

app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, password, role = 'student' } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }
        const user = db.createUser(name, email, password, role);
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: 'Registration successful', token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = db.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/auth/verify', verifyToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});

// ============================================
// USER PROFILE ENDPOINTS
// ============================================

app.get('/api/user/profile', verifyToken, (req, res) => {
    try {
        const user = db.findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/user/profile', verifyToken, (req, res) => {
    try {
        const updates = { ...req.body };
        delete updates.password;
        delete updates.role;
        const user = db.updateUser(req.user.id, updates);
        const { password, ...userWithoutPassword } = user;
        res.json({ message: 'Profile updated', user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// STUDENT ENDPOINTS
// ============================================

app.get('/api/student/classes', verifyToken, requireRole('student'), (req, res) => {
    try {
        const classes = db.getStudentClasses(req.user.id);
        const classesWithTeacher = classes.map(cls => {
            const teacher = db.findUserById(cls.teacher_id);
            return { ...cls, teacher: { id: teacher.id, name: teacher.name, email: teacher.email } };
        });
        res.json({ classes: classesWithTeacher });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/student/homework', verifyToken, requireRole('student'), (req, res) => {
    try {
        const classes = db.getStudentClasses(req.user.id);
        let allHomework = [];
        classes.forEach(cls => {
            const hw = db.getHomeworkByClass(cls.id);
            allHomework.push(...hw.map(h => ({ ...h, class_name: cls.name })));
        });
        res.json({ homework: allHomework });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/student/homework/:homeworkId/submission', verifyToken, requireRole('student'), (req, res) => {
    try {
        const submissions = db.getHomeworkSubmissions(parseInt(req.params.homeworkId));
        const submission = submissions.find(s => s.student_id === req.user.id);
        res.json({ submission: submission || null });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/student/homework/:homeworkId/submit', verifyToken, requireRole('student'), (req, res) => {
    try {
        const { submission_text, submission_file_url } = req.body;
        const submission = db.submitHomework(parseInt(req.params.homeworkId), req.user.id, submission_text, submission_file_url);
        res.json({ message: 'Homework submitted', submission });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/student/grades', verifyToken, requireRole('student'), (req, res) => {
    try {
        const grades = db.getGradesByStudent(req.user.id);
        res.json({ grades });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/student/attendance', verifyToken, requireRole('student'), (req, res) => {
    try {
        const attendance = db.getAttendanceByStudent(req.user.id);
        res.json({ attendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/student/messages', verifyToken, requireRole('student'), (req, res) => {
    try {
        const messages = db.getMessagesByReceiver(req.user.id);
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// PARENT ENDPOINTS
// ============================================

app.get('/api/parent/children', verifyToken, requireRole('parent'), (req, res) => {
    try {
        const children = db.getChildrenOfParent(req.user.id);
        const childrenWithoutPasswords = children.map(c => {
            const { password, ...child } = c;
            return child;
        });
        res.json({ children: childrenWithoutPasswords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/parent/child/:childId/classes', verifyToken, requireRole('parent'), (req, res) => {
    try {
        const childId = parseInt(req.params.childId);
        const children = db.getChildrenOfParent(req.user.id);
        if (!children.find(c => c.id === childId)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const classes = db.getStudentClasses(childId);
        res.json({ classes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/parent/child/:childId/grades', verifyToken, requireRole('parent'), (req, res) => {
    try {
        const childId = parseInt(req.params.childId);
        const children = db.getChildrenOfParent(req.user.id);
        if (!children.find(c => c.id === childId)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const grades = db.getGradesByStudent(childId);
        res.json({ grades });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/parent/child/:childId/attendance', verifyToken, requireRole('parent'), (req, res) => {
    try {
        const childId = parseInt(req.params.childId);
        const children = db.getChildrenOfParent(req.user.id);
        if (!children.find(c => c.id === childId)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const attendance = db.getAttendanceByStudent(childId);
        res.json({ attendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/parent/child/:childId/homework', verifyToken, requireRole('parent'), (req, res) => {
    try {
        const childId = parseInt(req.params.childId);
        const children = db.getChildrenOfParent(req.user.id);
        if (!children.find(c => c.id === childId)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const classes = db.getStudentClasses(childId);
        let allHomework = [];
        classes.forEach(cls => {
            const hw = db.getHomeworkByClass(cls.id);
            allHomework.push(...hw);
        });
        res.json({ homework: allHomework });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// TEACHER ENDPOINTS
// ============================================

app.get('/api/teacher/classes', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const classes = db.getClassesByTeacher(req.user.id);
        const classesWithStudents = classes.map(cls => {
            const enrollments = db.getEnrollmentsByClass(cls.id);
            const students = enrollments.map(e => {
                const student = db.findUserById(e.student_id);
                return { ...e, student: { id: student.id, name: student.name, email: student.email } };
            });
            return { ...cls, students };
        });
        res.json({ classes: classesWithStudents });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/teacher/class', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const { name, description, level, subject } = req.body;
        const newClass = db.createClass(name, description, req.user.id, level, subject);
        res.status(201).json({ message: 'Class created', class: newClass });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/teacher/class/:classId/students', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        const cls = db.getClassById(classId);
        if (cls.teacher_id !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const enrollments = db.getEnrollmentsByClass(classId);
        const students = enrollments.map(e => {
            const student = db.findUserById(e.student_id);
            return { ...e, student: { id: student.id, name: student.name, email: student.email } };
        });
        res.json({ students });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/teacher/homework', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const { class_id, title, description, due_date, max_points } = req.body;
        const homework = db.createHomework(class_id, title, description, due_date, req.user.id, max_points);
        res.status(201).json({ message: 'Homework created', homework });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/teacher/class/:classId/homework', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        const cls = db.getClassById(classId);
        if (cls.teacher_id !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const homework = db.getHomeworkByClass(classId);
        res.json({ homework });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/teacher/homework/:homeworkId/submissions', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const homeworkId = parseInt(req.params.homeworkId);
        const submissions = db.getHomeworkSubmissions(homeworkId);
        const submissionsWithStudent = submissions.map(s => {
            const student = db.findUserById(s.student_id);
            return { ...s, student: { id: student.id, name: student.name, email: student.email } };
        });
        res.json({ submissions: submissionsWithStudent });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/teacher/homework/:homeworkId/grade', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const { student_id, grade, feedback } = req.body;
        const submission = db.gradeHomework(parseInt(req.params.homeworkId), student_id, grade, feedback, req.user.id);
        res.json({ message: 'Homework graded', submission });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/teacher/attendance', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const { student_id, class_id, lesson_id, date, status, notes } = req.body;
        const attendance = db.recordAttendance(student_id, class_id, lesson_id, date, status, req.user.id, notes);
        res.status(201).json({ message: 'Attendance recorded', attendance });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/teacher/class/:classId/attendance', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const classId = parseInt(req.params.classId);
        const cls = db.getClassById(classId);
        if (cls.teacher_id !== req.user.id) {
            return res.status(403).json({ error: 'Access denied' });
        }
        const enrollments = db.getEnrollmentsByClass(classId);
        const attendance = {};
        enrollments.forEach(e => {
            attendance[e.student_id] = db.getAttendanceByStudent(e.student_id, classId);
        });
        res.json({ attendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/teacher/grade', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const { student_id, class_id, assignment_id, grade, max_grade, notes } = req.body;
        const gradeRecord = db.recordGrade(student_id, class_id, assignment_id, grade, max_grade, req.user.id, notes);
        res.status(201).json({ message: 'Grade recorded', grade: gradeRecord });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/teacher/payments', verifyToken, requireRole('teacher'), (req, res) => {
    try {
        const payments = db.getPaymentsByTeacher(req.user.id);
        res.json({ payments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// ADMIN ENDPOINTS
// ============================================

app.get('/api/admin/users', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const users = db.getAllUsers();
        const usersWithoutPasswords = users.map(u => {
            const { password, ...user } = u;
            return user;
        });
        res.json({ users: usersWithoutPasswords });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/user/:userId', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const user = db.findUserById(parseInt(req.params.userId));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/admin/user/:userId', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const user = db.updateUser(parseInt(req.params.userId), req.body);
        const { password, ...userWithoutPassword } = user;
        res.json({ message: 'User updated', user: userWithoutPassword });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/admin/classes', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const classes = db.getAllClasses();
        const classesWithTeacher = classes.map(cls => {
            const teacher = db.findUserById(cls.teacher_id);
            const enrollments = db.getEnrollmentsByClass(cls.id);
            return { ...cls, teacher: { id: teacher.id, name: teacher.name }, student_count: enrollments.length };
        });
        res.json({ classes: classesWithTeacher });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/admin/payments', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const allPayments = [];
        const users = db.getAllUsers();
        users.filter(u => u.role === 'teacher').forEach(teacher => {
            allPayments.push(...db.getPaymentsByTeacher(teacher.id));
        });
        res.json({ payments: allPayments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/admin/payment', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const { student_id, teacher_id, class_id, amount, payment_date, status, description } = req.body;
        const payment = db.recordPayment(student_id, teacher_id, class_id, amount, payment_date, status, description);
        res.status(201).json({ message: 'Payment recorded', payment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/admin/statistics', verifyToken, requireRole('admin'), (req, res) => {
    try {
        const users = db.getAllUsers();
        const classes = db.getAllClasses();
        const payments = [];
        users.filter(u => u.role === 'teacher').forEach(t => {
            payments.push(...db.getPaymentsByTeacher(t.id));
        });
        
        const stats = {
            total_users: users.length,
            total_students: users.filter(u => u.role === 'student').length,
            total_teachers: users.filter(u => u.role === 'teacher').length,
            total_parents: users.filter(u => u.role === 'parent').length,
            total_classes: classes.length,
            total_revenue: payments.reduce((sum, p) => sum + (p.amount || 0), 0)
        };
        res.json({ stats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// MESSAGING ENDPOINTS (All authenticated users)
// ============================================

app.post('/api/message/send', verifyToken, (req, res) => {
    try {
        const { receiver_id, subject, content } = req.body;
        if (!receiver_id || !content) {
            return res.status(400).json({ error: 'Receiver ID and content are required' });
        }
        const message = db.sendMessage(req.user.id, receiver_id, subject, content);
        res.status(201).json({ message: 'Message sent', data: message });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/message/inbox', verifyToken, (req, res) => {
    try {
        const messages = db.getMessagesByReceiver(req.user.id);
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/message/:messageId/read', verifyToken, (req, res) => {
    try {
        const message = db.markMessageAsRead(parseInt(req.params.messageId));
        res.json({ message: 'Message marked as read', data: message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ============================================
// STATIC FILES & FALLBACK
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🏠 EduHOUSE Backend Server running on http://localhost:${PORT}`);
    console.log(`\n📋 Demo Credentials:`);
    console.log('  Student: student1@example.com | password: password123');
    console.log('  Parent: parent1@example.com | password: password123');
    console.log('  Teacher: teacher1@example.com | password: password123');
    console.log('  Admin: admin@example.com | password: password123\n');
});
