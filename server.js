const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Database initialization error:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Create users table
function initializeDatabase() {
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

// Seed demo users
function seedDemoUsers() {
    const demoUsers = [
        { name: 'Jean Dupont', email: 'student@example.com', password: 'password123', role: 'student' },
        { name: 'Marie Martin', email: 'parent@example.com', password: 'password123', role: 'parent' },
        { name: 'Prof. Pierre Leclerc', email: 'teacher@example.com', password: 'password123', role: 'teacher' }
    ];

    demoUsers.forEach(user => {
        // Extract first name (prenom)
        const prenom = user.name.split(' ')[0];
        // Combine prenom with password
        const combinedPassword = prenom + user.password;
        const hashedPassword = bcrypt.hashSync(combinedPassword, 10);

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

// Register endpoint
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role = 'student' } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    // Extract first name (prenom)
    const prenom = name.split(' ')[0];
    // Combine prenom with password
    const combinedPassword = prenom + password;
    const hashedPassword = bcrypt.hashSync(combinedPassword, 10);

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
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Extract first name (prenom) from user's full name
        const prenom = user.name.split(' ')[0];
        // Combine prenom with the provided password
        const combinedPassword = prenom + password;

        const passwordMatch = bcrypt.compareSync(combinedPassword, user.password);
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
        db.get('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [decoded.id], (err, user) => {
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

app.listen(PORT, () => {
    console.log(`\n🏠 EduHOUSE Server running on http://localhost:${PORT}`);
    console.log(`\nDemo Credentials:`);
    console.log('  Email: student@example.com | Password: password123');
    console.log('  Email: parent@example.com | Password: password123');
    console.log('  Email: teacher@example.com | Password: password123\n');
});
