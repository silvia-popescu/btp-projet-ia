/**
 * COMPREHENSIVE SECURITY MODULE
 * Implements Enterprise-Grade Security (Level 5)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// ============================================
// SECURITY CONFIGURATION
// ============================================

const SECURITY_CONFIG = {
    // Password Security
    PASSWORD: {
        MIN_LENGTH: 12,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBERS: true,
        REQUIRE_SPECIAL: true,
        SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    },

    // JWT Security
    JWT: {
        EXPIRATION: '24h',
        REFRESH_EXPIRATION: '7d',
        ALGORITHM: 'HS256'
    },

    // Rate Limiting
    RATE_LIMIT: {
        LOGIN_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
        LOGIN_MAX_ATTEMPTS: 5,
        API_WINDOW_MS: 60 * 1000, // 1 minute
        API_MAX_REQUESTS: 100,
        FORGOT_PASSWORD_WINDOW_MS: 3600000, // 1 hour
        FORGOT_PASSWORD_MAX_ATTEMPTS: 3
    },

    // Session Security
    SESSION: {
        IDLE_TIMEOUT_MS: 30 * 60 * 1000, // 30 minutes
        ABSOLUTE_TIMEOUT_MS: 24 * 60 * 60 * 1000, // 24 hours
        REGENERATE_INTERVAL_MS: 30 * 60 * 1000 // 30 minutes
    },

    // Data Encryption
    ENCRYPTION: {
        ALGORITHM: 'aes-256-gcm',
        KEY_LENGTH: 32,
        IV_LENGTH: 16,
        AUTH_TAG_LENGTH: 16
    },

    // Security Headers
    HEADERS: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'",
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
};

// ============================================
// PASSWORD VALIDATION (LEVEL 5)
// ============================================

function validatePasswordStrength(password) {
    const issues = [];

    if (!password || password.length < SECURITY_CONFIG.PASSWORD.MIN_LENGTH) {
        issues.push(`Password must be at least ${SECURITY_CONFIG.PASSWORD.MIN_LENGTH} characters`);
    }

    if (SECURITY_CONFIG.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        issues.push('Password must contain at least one uppercase letter');
    }

    if (SECURITY_CONFIG.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        issues.push('Password must contain at least one lowercase letter');
    }

    if (SECURITY_CONFIG.PASSWORD.REQUIRE_NUMBERS && !/[0-9]/.test(password)) {
        issues.push('Password must contain at least one number');
    }

    if (SECURITY_CONFIG.PASSWORD.REQUIRE_SPECIAL && !new RegExp(`[${SECURITY_CONFIG.PASSWORD.SPECIAL_CHARS}]`).test(password)) {
        issues.push(`Password must contain at least one special character: ${SECURITY_CONFIG.PASSWORD.SPECIAL_CHARS}`);
    }

    // Check for common patterns
    const commonPatterns = [
        /password/i,
        /123456/,
        /qwerty/i,
        /abc123/i,
        /admin/i
    ];

    for (const pattern of commonPatterns) {
        if (pattern.test(password)) {
            issues.push('Password contains common patterns - please choose a stronger password');
            break;
        }
    }

    return {
        valid: issues.length === 0,
        errors: issues
    };
}

// ============================================
// INPUT SANITIZATION (LEVEL 5)
// ============================================

function sanitizeInput(input, type = 'text') {
    if (!input) return '';

    let sanitized = String(input).trim();

    switch (type) {
        case 'email':
            // Basic email validation
            sanitized = sanitized.toLowerCase();
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
                throw new Error('Invalid email format');
            }
            return sanitized;

        case 'username':
            // Allow only alphanumeric, underscore, hyphen
            if (!/^[a-zA-Z0-9_-]{3,20}$/.test(sanitized)) {
                throw new Error('Username must be 3-20 characters, alphanumeric with underscore/hyphen only');
            }
            return sanitized;

        case 'name':
            // Remove special characters but allow spaces
            sanitized = sanitized.replace(/[^a-zA-Z\s'-]/g, '');
            if (sanitized.length < 2 || sanitized.length > 100) {
                throw new Error('Name must be 2-100 characters');
            }
            return sanitized;

        case 'text':
            // Remove potentially harmful characters
            sanitized = sanitized.replace(/[<>\"'%;()&+]/g, '');
            return sanitized;

        case 'number':
            const num = parseInt(sanitized, 10);
            if (isNaN(num)) {
                throw new Error('Invalid number');
            }
            return num;

        default:
            return sanitized;
    }
}

// ============================================
// ENCRYPTION (LEVEL 5)
// ============================================

function generateEncryptionKey() {
    return crypto.randomBytes(SECURITY_CONFIG.ENCRYPTION.KEY_LENGTH);
}

function encryptData(data, key) {
    try {
        const iv = crypto.randomBytes(SECURITY_CONFIG.ENCRYPTION.IV_LENGTH);
        const cipher = crypto.createCipheriv(
            SECURITY_CONFIG.ENCRYPTION.ALGORITHM,
            key,
            iv
        );

        let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag();

        return {
            iv: iv.toString('hex'),
            encrypted: encrypted,
            authTag: authTag.toString('hex')
        };
    } catch (error) {
        throw new Error('Encryption failed: ' + error.message);
    }
}

function decryptData(encryptedData, key) {
    try {
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const authTag = Buffer.from(encryptedData.authTag, 'hex');

        const decipher = crypto.createDecipheriv(
            SECURITY_CONFIG.ENCRYPTION.ALGORITHM,
            key,
            iv
        );

        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
    } catch (error) {
        throw new Error('Decryption failed: ' + error.message);
    }
}

// ============================================
// AUDIT LOGGING (LEVEL 5)
// ============================================

const AUDIT_LOG_FILE = path.join(__dirname, '../logs/audit.log');

function ensureLogDirectory() {
    const logDir = path.dirname(AUDIT_LOG_FILE);
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }
}

function logAudit(action, userId, details = {}, severity = 'INFO') {
    ensureLogDirectory();

    const auditEntry = {
        timestamp: new Date().toISOString(),
        severity: severity,
        action: action,
        userId: userId,
        details: details,
        ipAddress: details.ipAddress || 'unknown'
    };

    const logEntry = JSON.stringify(auditEntry) + '\n';

    fs.appendFileSync(AUDIT_LOG_FILE, logEntry, 'utf8');

    // Console log for critical events
    if (severity === 'CRITICAL' || severity === 'WARNING') {
        console.warn(`🚨 [${severity}] ${action} - User: ${userId}`);
    }
}

// ============================================
// RATE LIMITING STORE (LEVEL 5)
// ============================================

const rateLimitStore = {};

function checkRateLimit(key, maxAttempts, windowMs) {
    const now = Date.now();

    if (!rateLimitStore[key]) {
        rateLimitStore[key] = {
            attempts: 1,
            firstAttempt: now,
            blocked: false,
            blockedUntil: null
        };
        return { allowed: true, remaining: maxAttempts - 1 };
    }

    const record = rateLimitStore[key];

    // Check if still in window
    if (now - record.firstAttempt > windowMs) {
        record.attempts = 1;
        record.firstAttempt = now;
        record.blocked = false;
        record.blockedUntil = null;
    }

    // Check if currently blocked
    if (record.blocked && now < record.blockedUntil) {
        return {
            allowed: false,
            remaining: 0,
            retryAfter: Math.ceil((record.blockedUntil - now) / 1000)
        };
    }

    record.blocked = false;

    if (record.attempts >= maxAttempts) {
        record.blocked = true;
        record.blockedUntil = now + windowMs;
        return {
            allowed: false,
            remaining: 0,
            retryAfter: Math.ceil(windowMs / 1000)
        };
    }

    record.attempts++;
    return { allowed: true, remaining: maxAttempts - record.attempts };
}

function resetRateLimit(key) {
    delete rateLimitStore[key];
}

// ============================================
// TOKEN BLACKLIST (LEVEL 5)
// ============================================

const tokenBlacklist = new Set();

function blacklistToken(token) {
    tokenBlacklist.add(token);
}

function isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    SECURITY_CONFIG,
    validatePasswordStrength,
    sanitizeInput,
    encryptData,
    decryptData,
    generateEncryptionKey,
    logAudit,
    checkRateLimit,
    resetRateLimit,
    blacklistToken,
    isTokenBlacklisted
};
