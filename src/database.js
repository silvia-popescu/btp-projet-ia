const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../data');
const DB_FILES = {
    users: path.join(DATA_DIR, 'users.json'),
    classes: path.join(DATA_DIR, 'classes.json'),
    enrollments: path.join(DATA_DIR, 'enrollments.json'),
    parentChild: path.join(DATA_DIR, 'parent_child.json'),
    homework: path.join(DATA_DIR, 'homework.json'),
    submissions: path.join(DATA_DIR, 'homework_submissions.json'),
    messages: path.join(DATA_DIR, 'messages.json'),
    attendance: path.join(DATA_DIR, 'attendance.json'),
    grades: path.join(DATA_DIR, 'grades.json'),
    payments: path.join(DATA_DIR, 'payments.json'),
    announcements: path.join(DATA_DIR, 'announcements.json'),
    lessons: path.join(DATA_DIR, 'lessons.json')
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize all JSON files
function initializeDatabase() {
    // Initialize users
    if (!fs.existsSync(DB_FILES.users)) {
        console.log('🌱 Seeding demo data...');
        seedDemoUsers();
    } else {
        const users = JSON.parse(fs.readFileSync(DB_FILES.users, 'utf8'));
        if (!users || users.length === 0) {
            seedDemoUsers();
        } else {
            console.log('✅ Database initialized');
        }
    }

    // Initialize other files
    const emptyFiles = [
        'classes', 'enrollments', 'parentChild', 'homework', 'submissions',
        'messages', 'attendance', 'grades', 'payments', 'announcements', 'lessons'
    ];

    emptyFiles.forEach(file => {
        if (!fs.existsSync(DB_FILES[file])) {
            fs.writeFileSync(DB_FILES[file], JSON.stringify([], null, 2), 'utf8');
        }
    });
}

function seedDemoUsers() {
    const demoUsers = [
        // Students (IDs: 1, 2, 3)
        {
            id: 1,
            name: 'Jean Dupont',
            email: 'student1@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'student',
            phone: '+33612345678',
            city: 'Paris',
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Sophie Martin',
            email: 'student2@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'student',
            phone: '+33687654321',
            city: 'Lyon',
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            name: 'Luc Petit',
            email: 'student3@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'student',
            phone: '+33698765432',
            city: 'Marseille',
            created_at: new Date().toISOString()
        },
        // Parents (IDs: 4, 5)
        {
            id: 4,
            name: 'Marie Dupont',
            email: 'parent1@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'parent',
            phone: '+33612111111',
            city: 'Paris',
            created_at: new Date().toISOString()
        },
        {
            id: 5,
            name: 'Pierre Martin',
            email: 'parent2@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'parent',
            phone: '+33687222222',
            city: 'Lyon',
            created_at: new Date().toISOString()
        },
        // Teachers (IDs: 6, 7)
        {
            id: 6,
            name: 'Prof. Pierre Leclerc',
            email: 'teacher1@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'teacher',
            phone: '+33612333333',
            city: 'Paris',
            created_at: new Date().toISOString()
        },
        {
            id: 7,
            name: 'Prof. Carole Dubois',
            email: 'teacher2@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'teacher',
            phone: '+33687444444',
            city: 'Lyon',
            created_at: new Date().toISOString()
        },
        // Admin (ID: 8)
        {
            id: 8,
            name: 'Admin User',
            email: 'admin@example.com',
            password: bcrypt.hashSync('password123', 10),
            role: 'admin',
            phone: '+33600000000',
            city: 'Paris',
            created_at: new Date().toISOString()
        }
    ];

    fs.writeFileSync(DB_FILES.users, JSON.stringify(demoUsers, null, 2), 'utf8');

    // Seed parent-child relationships
    const parentChild = [
        { id: 1, parent_id: 4, child_id: 1 },  // Marie has Jean
        { id: 2, parent_id: 4, child_id: 2 },  // Marie has Sophie
        { id: 3, parent_id: 5, child_id: 3 }   // Pierre has Luc
    ];
    fs.writeFileSync(DB_FILES.parentChild, JSON.stringify(parentChild, null, 2), 'utf8');

    // Seed demo classes
    const classes = [
        {
            id: 1,
            name: 'Mathématiques Avancées',
            description: 'Algèbre et Géométrie pour lycée',
            teacher_id: 6,
            level: 'Lycée',
            subject: 'Mathématiques',
            schedule: 'Lundi, Mercredi, Vendredi 10h00',
            max_students: 30,
            is_active: true,
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            name: 'Français Littéraire',
            description: 'Étude des textes classiques',
            teacher_id: 7,
            level: 'Lycée',
            subject: 'Français',
            schedule: 'Mardi, Jeudi 14h00',
            max_students: 25,
            is_active: true,
            created_at: new Date().toISOString()
        }
    ];
    fs.writeFileSync(DB_FILES.classes, JSON.stringify(classes, null, 2), 'utf8');

    // Seed enrollments
    const enrollments = [
        { id: 1, student_id: 1, class_id: 1, enrollment_date: new Date().toISOString(), status: 'active', grade: 'A' },
        { id: 2, student_id: 2, class_id: 1, enrollment_date: new Date().toISOString(), status: 'active', grade: 'B' },
        { id: 3, student_id: 3, class_id: 2, enrollment_date: new Date().toISOString(), status: 'active', grade: 'A-' }
    ];
    fs.writeFileSync(DB_FILES.enrollments, JSON.stringify(enrollments, null, 2), 'utf8');

    console.log('✅ Demo data seeded successfully');
}

// Generic file read/write helpers
function readFile(filename) {
    try {
        if (!fs.existsSync(filename)) {
            fs.writeFileSync(filename, JSON.stringify([], null, 2), 'utf8');
            return [];
        }
        const content = fs.readFileSync(filename, 'utf8');
        return JSON.parse(content) || [];
    } catch (e) {
        console.error(`Error reading ${filename}:`, e);
        return [];
    }
}

function writeFile(filename, data) {
    try {
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error(`Error writing ${filename}:`, e);
        return false;
    }
}

function getNextId(filename) {
    const data = readFile(filename);
    if (data.length === 0) return 1;
    return Math.max(...data.map(item => item.id || 0)) + 1;
}

// User operations
function findUserByEmail(email) {
    const users = readFile(DB_FILES.users);
    return users.find(u => u.email === email) || null;
}

function findUserById(id) {
    const users = readFile(DB_FILES.users);
    return users.find(u => u.id === id) || null;
}

function getAllUsers() {
    return readFile(DB_FILES.users);
}

function createUser(name, email, password, role = 'student') {
    const users = readFile(DB_FILES.users);
    if (users.find(u => u.email === email)) {
        throw new Error('Email already exists');
    }
    const id = getNextId(DB_FILES.users);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id,
        name,
        email,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString()
    };
    users.push(newUser);
    writeFile(DB_FILES.users, users);
    return { id, name, email, role };
}

function updateUser(id, updates) {
    const users = readFile(DB_FILES.users);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('User not found');
    users[idx] = { ...users[idx], ...updates, updated_at: new Date().toISOString() };
    writeFile(DB_FILES.users, users);
    return users[idx];
}

// Class operations
function getAllClasses() {
    return readFile(DB_FILES.classes);
}

function getClassesByTeacher(teacherId) {
    const classes = readFile(DB_FILES.classes);
    return classes.filter(c => c.teacher_id === teacherId);
}

function getClassById(classId) {
    const classes = readFile(DB_FILES.classes);
    return classes.find(c => c.id === classId) || null;
}

function createClass(name, description, teacherId, level, subject) {
    const classes = readFile(DB_FILES.classes);
    const id = getNextId(DB_FILES.classes);
    const newClass = {
        id,
        name,
        description,
        teacher_id: teacherId,
        level,
        subject,
        is_active: true,
        created_at: new Date().toISOString()
    };
    classes.push(newClass);
    writeFile(DB_FILES.classes, classes);
    return newClass;
}

// Enrollment operations
function getEnrollmentsByStudent(studentId) {
    const enrollments = readFile(DB_FILES.enrollments);
    return enrollments.filter(e => e.student_id === studentId);
}

function getEnrollmentsByClass(classId) {
    const enrollments = readFile(DB_FILES.enrollments);
    return enrollments.filter(e => e.class_id === classId);
}

function getStudentClasses(studentId) {
    const enrollments = getEnrollmentsByStudent(studentId);
    const classes = readFile(DB_FILES.classes);
    return enrollments.map(e => {
        const cls = classes.find(c => c.id === e.class_id);
        return { ...cls, enrollment: e };
    });
}

function enrollStudent(studentId, classId) {
    const enrollments = readFile(DB_FILES.enrollments);
    if (enrollments.find(e => e.student_id === studentId && e.class_id === classId)) {
        throw new Error('Student already enrolled');
    }
    const id = getNextId(DB_FILES.enrollments);
    const enrollment = {
        id,
        student_id: studentId,
        class_id: classId,
        enrollment_date: new Date().toISOString(),
        status: 'active'
    };
    enrollments.push(enrollment);
    writeFile(DB_FILES.enrollments, enrollments);
    return enrollment;
}

// Parent-Child operations
function getChildrenOfParent(parentId) {
    const parentChild = readFile(DB_FILES.parentChild);
    const childIds = parentChild.filter(pc => pc.parent_id === parentId).map(pc => pc.child_id);
    const users = readFile(DB_FILES.users);
    return users.filter(u => childIds.includes(u.id));
}

function getParentsOfStudent(studentId) {
    const parentChild = readFile(DB_FILES.parentChild);
    const parentIds = parentChild.filter(pc => pc.child_id === studentId).map(pc => pc.parent_id);
    const users = readFile(DB_FILES.users);
    return users.filter(u => parentIds.includes(u.id));
}

// Homework operations
function getHomeworkByClass(classId) {
    const homework = readFile(DB_FILES.homework);
    return homework.filter(h => h.class_id === classId);
}

function createHomework(classId, title, description, dueDate, createdBy, maxPoints = 100) {
    const homework = readFile(DB_FILES.homework);
    const id = getNextId(DB_FILES.homework);
    const newHw = {
        id,
        class_id: classId,
        title,
        description,
        due_date: dueDate,
        max_points: maxPoints,
        created_by: createdBy,
        created_at: new Date().toISOString()
    };
    homework.push(newHw);
    writeFile(DB_FILES.homework, homework);
    return newHw;
}

// Homework submission operations
function submitHomework(homeworkId, studentId, submissionText = '', submissionFileUrl = '') {
    const submissions = readFile(DB_FILES.submissions);
    let submission = submissions.find(s => s.homework_id === homeworkId && s.student_id === studentId);
    
    if (!submission) {
        const id = getNextId(DB_FILES.submissions);
        submission = {
            id,
            homework_id: homeworkId,
            student_id: studentId,
            submission_text: submissionText,
            submission_file_url: submissionFileUrl,
            submitted_at: new Date().toISOString(),
            status: 'submitted'
        };
        submissions.push(submission);
    } else {
        submission.submission_text = submissionText;
        submission.submission_file_url = submissionFileUrl;
        submission.submitted_at = new Date().toISOString();
        submission.status = 'submitted';
    }
    writeFile(DB_FILES.submissions, submissions);
    return submission;
}

function gradeHomework(homeworkId, studentId, grade, feedback, gradedBy) {
    const submissions = readFile(DB_FILES.submissions);
    const submission = submissions.find(s => s.homework_id === homeworkId && s.student_id === studentId);
    if (!submission) throw new Error('Submission not found');
    
    submission.grade = grade;
    submission.feedback = feedback;
    submission.graded_by = gradedBy;
    submission.graded_at = new Date().toISOString();
    submission.status = 'graded';
    writeFile(DB_FILES.submissions, submissions);
    return submission;
}

function getHomeworkSubmissions(homeworkId) {
    const submissions = readFile(DB_FILES.submissions);
    return submissions.filter(s => s.homework_id === homeworkId);
}

// Message operations
function sendMessage(senderId, receiverId, subject, content) {
    const messages = readFile(DB_FILES.messages);
    const id = getNextId(DB_FILES.messages);
    const message = {
        id,
        sender_id: senderId,
        receiver_id: receiverId,
        subject,
        content,
        is_read: false,
        sent_at: new Date().toISOString()
    };
    messages.push(message);
    writeFile(DB_FILES.messages, messages);
    return message;
}

function getMessagesByReceiver(receiverId, unreadOnly = false) {
    const messages = readFile(DB_FILES.messages);
    let result = messages.filter(m => m.receiver_id === receiverId);
    if (unreadOnly) {
        result = result.filter(m => !m.is_read);
    }
    return result.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at));
}

function markMessageAsRead(messageId) {
    const messages = readFile(DB_FILES.messages);
    const msg = messages.find(m => m.id === messageId);
    if (msg) {
        msg.is_read = true;
        writeFile(DB_FILES.messages, messages);
    }
    return msg;
}

// Attendance operations
function recordAttendance(studentId, classId, lessonId, date, status, recordedBy, notes = '') {
    const attendance = readFile(DB_FILES.attendance);
    const id = getNextId(DB_FILES.attendance);
    const record = {
        id,
        student_id: studentId,
        class_id: classId,
        lesson_id: lessonId,
        date,
        status,
        notes,
        recorded_by: recordedBy,
        recorded_at: new Date().toISOString()
    };
    attendance.push(record);
    writeFile(DB_FILES.attendance, attendance);
    return record;
}

function getAttendanceByStudent(studentId, classId = null) {
    const attendance = readFile(DB_FILES.attendance);
    let result = attendance.filter(a => a.student_id === studentId);
    if (classId) {
        result = result.filter(a => a.class_id === classId);
    }
    return result;
}

// Grades operations
function recordGrade(studentId, classId, assignmentId, grade, maxGrade, gradedBy, notes = '') {
    const grades = readFile(DB_FILES.grades);
    const id = getNextId(DB_FILES.grades);
    const record = {
        id,
        student_id: studentId,
        class_id: classId,
        assignment_id: assignmentId,
        grade,
        max_grade: maxGrade,
        grade_date: new Date().toISOString(),
        notes,
        graded_by: gradedBy
    };
    grades.push(record);
    writeFile(DB_FILES.grades, grades);
    return record;
}

function getGradesByStudent(studentId, classId = null) {
    const grades = readFile(DB_FILES.grades);
    let result = grades.filter(g => g.student_id === studentId);
    if (classId) {
        result = result.filter(g => g.class_id === classId);
    }
    return result;
}

// Payment operations
function recordPayment(studentId, teacherId, classId, amount, paymentDate, status = 'completed', description = '') {
    const payments = readFile(DB_FILES.payments);
    const id = getNextId(DB_FILES.payments);
    const payment = {
        id,
        student_id: studentId,
        teacher_id: teacherId,
        class_id: classId,
        amount,
        currency: 'EUR',
        payment_date: paymentDate,
        status,
        description,
        recorded_at: new Date().toISOString()
    };
    payments.push(payment);
    writeFile(DB_FILES.payments, payments);
    return payment;
}

function getPaymentsByTeacher(teacherId) {
    const payments = readFile(DB_FILES.payments);
    return payments.filter(p => p.teacher_id === teacherId);
}

function getPaymentsByStudent(studentId) {
    const payments = readFile(DB_FILES.payments);
    return payments.filter(p => p.student_id === studentId);
}

// Initialize on load
initializeDatabase();

module.exports = {
    // User operations
    findUserByEmail,
    findUserById,
    getAllUsers,
    createUser,
    updateUser,
    
    // Class operations
    getAllClasses,
    getClassesByTeacher,
    getClassById,
    createClass,
    
    // Enrollment operations
    getEnrollmentsByStudent,
    getEnrollmentsByClass,
    getStudentClasses,
    enrollStudent,
    
    // Parent-Child operations
    getChildrenOfParent,
    getParentsOfStudent,
    
    // Homework operations
    getHomeworkByClass,
    createHomework,
    submitHomework,
    gradeHomework,
    getHomeworkSubmissions,
    
    // Message operations
    sendMessage,
    getMessagesByReceiver,
    markMessageAsRead,
    
    // Attendance operations
    recordAttendance,
    getAttendanceByStudent,
    
    // Grades operations
    recordGrade,
    getGradesByStudent,
    
    // Payment operations
    recordPayment,
    getPaymentsByTeacher,
    getPaymentsByStudent
};
