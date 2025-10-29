# GitHub Setup Guide for EduHOUSE

This guide will help you push your EduHOUSE project to GitHub.

## Prerequisites

- GitHub account (https://github.com)
- Git installed on your computer
- The project folder at `C:\Users\samet\Documents\btp-projet-ia`

---

## Step 1: Create a Repository on GitHub

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click** the "+" icon in the top right
4. **Select** "New repository"
5. **Name it**: `btp-projet-ia`
6. **Description**: "🏠 EduHOUSE - Modern Online Education Platform"
7. **Select**: "Public" (so others can see it)
8. **Check**: "Add a README file" (optional, we have one)
9. **Check**: "Add .gitignore" (optional, we have one)
10. **Choose License**: MIT License
11. **Click**: "Create repository"

---

## Step 2: Initialize Git Locally

Open Command Prompt or PowerShell in your project folder:

```bash
# Navigate to the project
cd C:\Users\samet\Documents\btp-projet-ia

# Initialize git (if not already done)
git init

# Add your name and email (one-time setup)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Add EduHOUSE frontend UI/UX"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/btp-projet-ia.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 3: Verify on GitHub

1. **Go to**: https://github.com/YOUR_USERNAME/btp-projet-ia
2. **You should see** all your files uploaded
3. **Check** the README displays correctly
4. **Confirm** all 5 HTML files are there

---

## Step 4: GitHub Pages Setup (Optional - Makes it live!)

1. **On GitHub**: Go to your repository
2. **Click**: "Settings" (top right)
3. **Left menu**: Click "Pages"
4. **Source**: Select "Deploy from a branch"
5. **Branch**: Select "main"
6. **Folder**: Select "/" (root)
7. **Click**: "Save"
8. **Wait** 1-2 minutes for deployment
9. **Your site**: https://YOUR_USERNAME.github.io/btp-projet-ia

---

## Step 5: Update Your Local Git Config (First Time Only)

If you haven't set up Git globally before:

```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify
git config --global user.name
git config --global user.email
```

---

## Common Git Commands

After your initial setup, use these for future updates:

```bash
# Check status
git status

# Add specific files
git add filename.html

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/new-feature
```

---

## Troubleshooting

### "fatal: not a git repository"
```bash
# Solution: Initialize git first
git init
```

### "fatal: 'origin' does not appear to be a 'git' repository"
```bash
# Solution: Add remote
git remote add origin https://github.com/YOUR_USERNAME/btp-projet-ia.git
```

### "Permission denied (publickey)"
```bash
# Solution: Setup SSH key or use HTTPS with personal access token
# Create token: GitHub Settings > Developer settings > Personal access tokens
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/btp-projet-ia.git
```

### Changes not pushing
```bash
# Solution: Pull before push
git pull origin main
git push origin main
```

---

## File Checklist Before Pushing

✅ `index.html` - Landing page
✅ `dashboard.html` - Student dashboard
✅ `teacher-dashboard.html` - Teacher dashboard
✅ `course-detail.html` - Course content
✅ `admin-panel.html` - Admin panel
✅ `package.json` - Project metadata
✅ `README.md` - Documentation
✅ `.gitignore` - Git ignore rules
✅ LICENSE (optional) - MIT License

---

## After Pushing - Share Your Project

Share your GitHub link:
```
https://github.com/YOUR_USERNAME/btp-projet-ia
```

Or live website (if GitHub Pages enabled):
```
https://YOUR_USERNAME.github.io/btp-projet-ia
```

---

## Next Steps

1. ✅ Push to GitHub
2. ⬜ Enable GitHub Pages
3. ⬜ Add collaborators (if team project)
4. ⬜ Create GitHub Issues for tracking
5. ⬜ Set up project board
6. ⬜ Add GitHub Actions for CI/CD (later)

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/doc
- GitHub Issues: Use the Issues tab on your repo

---

**Good luck with your EduHOUSE project! 🚀**
