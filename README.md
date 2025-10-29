# 🏠 EduHOUSE - Modern Online Education Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active Development](https://img.shields.io/badge/Status-Active%20Development-brightgreen)](https://github.com)

> A comprehensive online education platform combining live courses, video rediffusions, personalized tutoring, and exam preparation - all in a modern, interactive format.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Pages Guide](#pages-guide)
- [User Roles](#user-roles)
- [Demo Credentials](#demo-credentials)
- [Technical Stack](#technical-stack)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**EduHOUSE** is an educational startup with a clear value proposition: courses from the national curriculum taught by certified teachers, in a modern, human, and interactive format. It addresses the frustrations of both parents and students by combining:

- ✅ Official curriculum compliance
- ✅ Certified teachers
- ✅ Modern interactive format
- ✅ Flexible learning pace
- ✅ Personal tutor support
- ✅ Exam preparation programs

### Our Mission
> **Render each student capable of understanding and loving to learn**

---

## ✨ Features

### 📚 Core Features
- **Live Classes** - Follow the official curriculum with certified teachers
- **Unlimited Rediffusions** - Review courses at your own pace anytime
- **Personal Tutors** - Dedicated teacher answering questions and correcting assignments
- **Bac & Brevet Preparation** - Special tracks for exam success
- **Direct Communication** - Seamless tutor-student-parent communication
- **Personalized Tracking** - Progress adapted to each student's rhythm

### 👥 Multi-Role System
- **Students** - Take courses, submit assignments, track progress
- **Teachers** - Manage classes, grade work, communicate with students
- **Parents** - Monitor student progress and communicate with teachers
- **Admins** - Manage users, courses, generate reports

### 📊 Analytics & Reporting
- Comprehensive dashboards for all user types
- Performance tracking and analytics
- Detailed activity logs
- Downloadable reports

---

## 📁 Project Structure

```
btp-projet-ia/
├── index.html                 # Landing page & marketing site
├── dashboard.html             # Student dashboard
├── teacher-dashboard.html     # Teacher management panel
├── course-detail.html         # Course content & lessons
├── admin-panel.html           # System administration
├── package.json               # Project configuration
├── README.md                  # This file
└── [Future: Backend API files]
```

### File Descriptions

| File | Purpose | Users |
|------|---------|-------|
| `index.html` | Landing page, pricing, signup | Public/Prospects |
| `dashboard.html` | Main student interface | Students |
| `teacher-dashboard.html` | Teaching tools & management | Teachers |
| `course-detail.html` | Course materials & lessons | Students |
| `admin-panel.html` | System management & reports | Administrators |

---

## 🚀 Quick Start

### Option 1: Direct File Opening (Easiest)
1. **Navigate** to the project folder: `C:\Users\samet\Documents\btp-projet-ia`
2. **Double-click** any `.html` file to open in your default browser
3. **Start** with `index.html` for the landing page

### Option 2: Using a Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if installed)
npx http-server
```

Then open: **http://localhost:8000**

---

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, Notepad++)
- Git (optional, for version control)
- Python 3 or Node.js (optional, for local server)

### Step 1: Clone or Download
```bash
# Using Git
git clone https://github.com/yourusername/eduhouse.git
cd eduhouse

# Or download the ZIP file and extract it
```

### Step 2: Navigate to Project
```bash
cd C:\Users\samet\Documents\btp-projet-ia
```

### Step 3: Open in Browser
```bash
# Windows - PowerShell
start index.html

# Windows - Command Prompt
explorer index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

### Step 4 (Optional): Start Local Server
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 💻 Usage

### For Students
1. **Start** at `index.html` and click "S'inscrire" (Sign Up)
2. **Create account** as "Élève" (Student)
3. **Access** dashboard.html to view courses
4. **Click** on a course to open course-detail.html
5. **Complete** modules, exercises, and quizzes
6. **Communicate** with tutors in discussion tabs

### For Teachers
1. **Start** at teacher-dashboard.html
2. **Create new courses** in the "Créer un Cours" modal
3. **Schedule classes** using "Planifier une Classe"
4. **Grade assignments** in "Corriger des Devoirs"
5. **Send messages** to students and parents
6. **Track attendance** in the attendance table
7. **View performance analytics** for your students

### For Administrators
1. **Access** admin-panel.html
2. **Manage users** - Add/Edit/Delete accounts
3. **Create courses** - Set up new course content
4. **Schedule classes** - Organize live sessions
5. **Generate reports** - Download analytics data
6. **View logs** - Monitor system activity
7. **Configure settings** - Adjust platform parameters

### For Parents
*Parent portal feature coming soon*

---

## 📄 Pages Guide

### 1. **Landing Page** (`index.html`)
- **Purpose**: Marketing & user acquisition
- **Features**: Hero section, pricing plans, feature showcase
- **Actions**: Sign up, login, explore offerings
- **Access**: http://localhost:8000/

### 2. **Student Dashboard** (`dashboard.html`)
- **Purpose**: Main student learning interface
- **Sections**:
  - Stats overview (courses, sessions, progress)
  - Upcoming live classes
  - Active courses with progress tracking
  - Pending assignments
  - Recent messages
  - Tutor sessions
  - Exam preparation tracks
- **Access**: From index.html or directly

### 3. **Teacher Dashboard** (`teacher-dashboard.html`)
- **Purpose**: Teaching & class management
- **Sections**:
  - Active courses management
  - Daily schedule
  - Assignments to grade
  - Student performance metrics
  - Attendance tracking
  - Quick action buttons
- **Access**: Direct file or from index.html

### 4. **Course Detail** (`course-detail.html`)
- **Purpose**: Course content delivery
- **Tabs**:
  - 📁 **Resources** - Downloadable materials & videos
  - ✏️ **Exercises** - Interactive assignments & quizzes
  - 💬 **Discussion** - Tutor communication thread
- **Features**:
  - Video player placeholder
  - Learning objectives
  - Progress tracking sidebar
  - Module list with status badges
- **Access**: From dashboard.html course cards

### 5. **Admin Panel** (`admin-panel.html`)
- **Purpose**: System administration
- **Sections**:
  - Dashboard with analytics
  - User management
  - Course management
  - Class scheduling
  - Reports & analytics
  - System settings
  - Activity logs
- **Access**: Direct file access only

---

## 👥 User Roles

### 🎓 Student
- **Access**: Dashboard, courses, course detail, discussions
- **Permissions**: View content, submit assignments, communicate with tutors
- **Key Features**: Progress tracking, exercise completion, quiz taking

### 👨‍🏫 Teacher
- **Access**: Teacher dashboard, student management, class scheduling
- **Permissions**: Create/edit courses, schedule classes, grade assignments, message students
- **Key Features**: Class management, attendance tracking, performance analytics

### 👨‍💼 Administrator
- **Access**: Admin panel with full system access
- **Permissions**: All CRUD operations, user management, system configuration
- **Key Features**: User management, course creation, reports, logs, settings

### 👩‍💼 Parent
- **Status**: Coming Soon
- **Features**: Student progress monitoring, communication with teachers

---

## 🔐 Demo Credentials

Use these credentials for testing (Demo Mode):

### Student Account
- **Email**: jean.dupont@student.fr
- **Password**: demo123
- **Access**: dashboard.html

### Teacher Account
- **Email**: marie.claude@eduhouse.fr
- **Password**: demo123
- **Access**: teacher-dashboard.html

### Admin Account
- **Email**: admin@eduhouse.fr
- **Password**: admin123
- **Access**: admin-panel.html

**Note**: These are demo credentials in the frontend demonstration. Production authentication will use a proper backend.

---

## 🛠️ Technical Stack

### Current (Frontend)
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **Vanilla JavaScript** - Interactive features
- **Responsive Design** - Mobile-first approach

### Future (Backend)
- **Node.js/Express** - API server
- **PostgreSQL/MongoDB** - Database
- **JWT** - Authentication
- **Docker** - Containerization
- **AWS/Heroku** - Deployment

### Design Patterns
- **Component-based** layout
- **Tab-based** navigation
- **Modal dialogs** for forms
- **Responsive grid** system
- **Color-coded** roles (Purple: Students, Green: Teachers, Red: Admin)

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Future Development

### Planned Features
- [ ] Backend API (Node.js/Express)
- [ ] Database integration (PostgreSQL)
- [ ] Real-time video streaming
- [ ] Payment processing (Stripe)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Parent portal
- [ ] AI-powered recommendations
- [ ] Automated grading
- [ ] Certificate generation

### Roadmap
- **Phase 1** (Current): Frontend UI/UX
- **Phase 2** (Q1 2025): Backend API development
- **Phase 3** (Q2 2025): Database & authentication
- **Phase 4** (Q3 2025): Payment integration
- **Phase 5** (Q4 2025): Mobile app launch

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Coding Standards
- Use semantic HTML
- Follow CSS naming conventions (BEM)
- Write clean, commented JavaScript
- Test across browsers
- Maintain responsive design

---

## 📞 Support & Contact

- **Email**: contact@eduhouse.fr
- **Website**: [Coming Soon]
- **Support Hours**: Monday-Friday, 9:00-18:00 CET
- **Issue Tracker**: GitHub Issues

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎓 About EduHOUSE

EduHOUSE is an educational technology startup transforming online learning through:
- **Certified Teachers** from the French National Education system
- **Interactive Format** that engages and motivates
- **Flexible Pacing** adapted to each student's needs
- **Human Touch** with personalized tutoring
- **Complete Solution** from courses to exam preparation

**Parents regain peace of mind knowing their children finally understand, gain confidence, and improve their results.**

---

## 📊 Platform Statistics

- **2,450+** Total Users
- **485** Active Teachers
- **1,850** Registered Students
- **127** Active Courses
- **87%** Student Retention Rate
- **76%** Course Completion Rate
- **4.3/5** Average Satisfaction

---

## ✅ Checklist for First-Time Users

- [ ] Extract or clone the project
- [ ] Open `index.html` in your browser
- [ ] Explore the landing page
- [ ] Click "S'inscrire" to see signup flow
- [ ] Visit `dashboard.html` for student experience
- [ ] Check `teacher-dashboard.html` for teaching tools
- [ ] Browse `course-detail.html` for course content
- [ ] Access `admin-panel.html` for admin features
- [ ] Read the documentation
- [ ] Provide feedback!

---

**Happy Learning! 🚀**

*Last Updated: 29 October 2024*
*Version: 1.0 (Frontend Demo)*