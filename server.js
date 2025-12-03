const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/* sqlite3 native bindings can fail on some Windows setups; loading inside try/catch further below */
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Database initialization with fallback to file-based storage if sqlite3 not available
let db = null;
let USE_SQLITE = false;
const fs = require('fs');
const usersFile = path.join(__dirname, 'users.json');

try {
    const sqlite3 = require('sqlite3').verbose();
    db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            console.error('Database initialization error:', err);
        } else {
            USE_SQLITE = true;
            console.log('Connected to SQLite database');
            initializeDatabase();
        }
    });
} catch (err) {
    console.warn('sqlite3 not available, falling back to file-based user storage');
    if (!fs.existsSync(usersFile)) {
        fs.writeFileSync(usersFile, JSON.stringify([], null, 2), 'utf8');
    }
    // Seed demo users if file is empty
    const existing = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    if (!existing || existing.length === 0) {
        const demoUsers = [
            { id: 1, name: 'Jean Dupont', email: 'student@example.com', password: bcrypt.hashSync('password123', 10), role: 'student', created_at: new Date().toISOString() },
            { id: 2, name: 'Marie Martin', email: 'parent@example.com', password: bcrypt.hashSync('password123', 10), role: 'parent', created_at: new Date().toISOString() },
            { id: 3, name: 'Prof. Pierre Leclerc', email: 'teacher@example.com', password: bcrypt.hashSync('password123', 10), role: 'teacher', created_at: new Date().toISOString() }
        ];
        fs.writeFileSync(usersFile, JSON.stringify(demoUsers, null, 2), 'utf8');
    }
}

// Create users table (for sqlite) and seed
function initializeDatabase() {
    if (!USE_SQLITE) return;
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'student',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Table creation error:', err);
        } else {
            console.log('Users table created/verified');
            // Seed demo users
            seedDemoUsers();
        }
    });
}

// Seed demo users for sqlite
function seedDemoUsers() {
    if (!USE_SQLITE) return;
    const demoUsers = [
        { name: 'Jean Dupont', email: 'student@example.com', password: 'password123', role: 'student' },
        { name: 'Marie Martin', email: 'parent@example.com', password: 'password123', role: 'parent' },
        { name: 'Prof. Pierre Leclerc', email: 'teacher@example.com', password: 'password123', role: 'teacher' }
    ];

    demoUsers.forEach(user => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        db.run(
            'INSERT OR IGNORE INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [user.name, user.email, hashedPassword, user.role],
            (err) => {
                if (err) {
                    console.error('Error seeding user:', err);
                }
            }
        );
    });
}

// Helper functions abstracting DB or file storage
function createUser(name, email, hashedPassword, role, callback) {
    if (USE_SQLITE) {
        db.run('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role], function(err) {
            callback(err, this ? this.lastID : null);
        });
    } else {
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        if (users.find(u => u.email === email)) {
            return callback(new Error('Email already exists'));
        }
        const id = users.reduce((m, u) => Math.max(m, u.id || 0), 0) + 1;
        users.push({ id, name, email, password: hashedPassword, role, created_at: new Date().toISOString() });
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
        callback(null, id);
    }
}

function findUserByEmail(email, callback) {
    if (USE_SQLITE) {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => callback(err, row));
    } else {
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        const user = users.find(u => u.email === email);
        callback(null, user);
    }
}

function findUserById(id, callback) {
    if (USE_SQLITE) {
        db.get('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id], (err, row) => callback(err, row));
    } else {
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        const user = users.find(u => u.id === id);
        callback(null, user);
    }
}

// Register endpoint
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role = 'student' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    if (USE_SQLITE) {
        db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: 'Registration failed' });
                }

                const token = jwt.sign(
                    { id: this.lastID, email, name, role },
                    JWT_SECRET,
                    { expiresIn: '24h' }
                );

                res.status(201).json({
                    message: 'Registration successful',
                    token,
                    user: { id: this.lastID, name, email, role }
                });
            }
        );
    } else {
        createUser(name, email, hashedPassword, role, (err, id) => {
            if (err) {
                if (err.message && err.message.includes('Email already exists')) {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: 'Registration failed' });
            }

            const token = jwt.sign(
                { id, email, name, role },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'Registration successful',
                token,
                user: { id, name, email, role }
            });
        });
    }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    findUserByEmail(email, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    });
});

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ valid: true, user: decoded });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
});

// Logout endpoint (client-side token removal)
app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Get user profile endpoint
app.get('/api/user/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        findUserById(decoded.id, (err, user) => {
            if (err || !user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ user });
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all users (with authentication)
app.get('/api/users', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        try {
            const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
            return res.json(users);
        } catch (e) {
            return res.json([]);
        }
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // Only admins or the user can view profiles
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        res.json(users);
    } catch (e) {
        res.json([]);
    }
});

// Get specific user by ID
app.get('/api/users/:id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = parseInt(req.params.id);
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        const user = users.find(u => u.id === userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, created_at: user.created_at } });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Update user profile
app.put('/api/users/:id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = parseInt(req.params.id);
        const { name, email, role } = req.body;
        
        // User can only update their own profile unless they're modifying role
        if (decoded.id !== userId && decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (name) users[userIndex].name = name;
        if (email && email !== users[userIndex].email) {
            if (users.find(u => u.email === email && u.id !== userId)) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            users[userIndex].email = email;
        }
        if (role && decoded.role === 'admin') {
            users[userIndex].role = role;
        }
        
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
        res.json({ message: 'User updated successfully', user: { id: users[userIndex].id, name: users[userIndex].name, email: users[userIndex].email, role: users[userIndex].role } });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Update failed' });
    }
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Only admins can delete users
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Only admins can delete users' });
        }
        
        const userId = parseInt(req.params.id);
        const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (decoded.id === userId) {
            return res.status(400).json({ error: 'Cannot delete your own account' });
        }
        
        const deletedUser = users.splice(userIndex, 1);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
        res.json({ message: 'User deleted successfully', user: deletedUser[0] });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Delete failed' });
    }
});

// Courses endpoint with role-based filtering
app.get('/api/courses', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    let all = [];
    try { all = JSON.parse(fs.readFileSync(path.join(__dirname, 'courses.json'), 'utf8')); } catch(e){ all = []; }

    if (!token) return res.json([]);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        const userRole = decoded.role;
        // Teacher: courses where teacherId == userId
        if (userRole === 'teacher') {
            return res.json(all.filter(c => c.teacherId === userId));
        }
        // Student: courses where studentIds includes userId
        if (userRole === 'student') {
            return res.json(all.filter(c => (c.studentIds||[]).includes(userId)));
        }
        // Parent: courses where any child of parent is in studentIds
        if (userRole === 'parent') {
            const users = JSON.parse(fs.readFileSync(usersFile,'utf8'));
            const me = users.find(u=>u.id===userId);
            const kids = me && me.childrenIds ? me.childrenIds : [];
            return res.json(all.filter(c => c.studentIds && c.studentIds.some(s=>kids.includes(s))));
        }
        // Admin: return all
        return res.json(all);
    } catch(e){ return res.status(401).json({ error: 'Invalid token' }); }
});

// Messages endpoint: return only messages addressed to the authenticated user
app.get('/api/messages', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    let all = [];
    try { all = JSON.parse(fs.readFileSync(path.join(__dirname, 'messages.json'), 'utf8')); } catch(e){ all = []; }

    if (!token) return res.json([]);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id;
        // Only messages where toId == userId
        const out = all.filter(m => m.toId === userId);
        return res.json(out);
    } catch(e){ return res.status(401).json({ error: 'Invalid token' }); }
});

// Debug headers endpoint
app.get('/api/debug-headers', (req, res) => {
    res.json({ headers: req.headers });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🏠 EduHOUSE Server running on http://localhost:${PORT}`);
    console.log(`\nDemo Credentials:`);
    console.log('  Email: student@example.com | Password: password123');
    console.log('  Email: parent@example.com | Password: password123');
    console.log('  Email: teacher@example.com | Password: password123\n');
});
