# 🚀 Quick GitHub Push Guide

**Complete these steps to upload your EduHOUSE project to GitHub:**

---

## ⚡ 5-Minute Quick Start

### Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. **Repository name**: `btp-projet-ia`
3. **Description**: "🏠 EduHOUSE - Modern Online Education Platform"
4. **Public**: ☑️ Yes
5. **Initialize**: ☐ Add README (we have one)
6. **License**: MIT License
7. Click **"Create repository"**

### Step 2: Copy Your Repository URL
After creation, you'll see a URL like:
```
https://github.com/YOUR_USERNAME/btp-projet-ia.git
```
**Copy this - you'll need it next**

### Step 3: Open Command Prompt in Project Folder
```
Windows: Hold Shift + Right-click in folder → "Open PowerShell here"
Mac: Cmd + Space → "Terminal"
Linux: Right-click → "Open Terminal"
```

### Step 4: Run These Commands (One by One)

```bash
# Go to project folder
cd C:\Users\samet\Documents\btp-projet-ia

# Initialize git
git init

# Configure git (one-time)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Add EduHOUSE frontend"

# Add remote (replace with YOUR URL)
git remote add origin https://github.com/YOUR_USERNAME/btp-projet-ia.git

# Change branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 5: Verify
- Go to https://github.com/YOUR_USERNAME/btp-projet-ia
- You should see all your files!

---

## 📋 Files That Will Be Uploaded

✅ `index.html` - Landing page
✅ `dashboard.html` - Student dashboard  
✅ `teacher-dashboard.html` - Teacher tools
✅ `course-detail.html` - Course content
✅ `admin-panel.html` - Admin system
✅ `package.json` - Project info
✅ `README.md` - Documentation
✅ `.gitignore` - Git settings
✅ `LICENSE` - MIT License
✅ `CONTRIBUTING.md` - Contribution guide
✅ `GITHUB_SETUP.md` - Detailed setup

---

## 🔑 Important Notes

**Before running commands:**
- Replace `YOUR_USERNAME` with your actual GitHub username
- Replace `your.name@email.com` with your real email
- If you see errors, see Troubleshooting below

**First time with Git?**
- The `git config` commands only need to run once
- After that, you can reuse them for any project

---

## 🌐 Make Your Project Live (Optional)

### Enable GitHub Pages (Free Hosting!)

1. Go to your repository: https://github.com/YOUR_USERNAME/btp-projet-ia
2. Click **Settings** (top right)
3. Left menu → **Pages**
4. **Source**: "Deploy from a branch"
5. **Branch**: "main" → "/" → **Save**
6. Wait 2 minutes...
7. Your site: https://YOUR_USERNAME.github.io/btp-projet-ia

That's it! Your project is now live online! 🎉

---

## ❌ Troubleshooting

### Error: "fatal: not a git repository"
```bash
# Solution:
git init
```

### Error: "fatal: 'origin' does not appear to be a 'git' repository"
```bash
# Solution:
git remote add origin https://github.com/YOUR_USERNAME/btp-projet-ia.git
```

### Error: "Changes not staged for commit"
```bash
# Solution:
git add .
git commit -m "Your message"
```

### Error: "Permission denied"
- Use HTTPS URL instead of SSH
- Or create a Personal Access Token on GitHub

### Still not working?
- Check git is installed: `git --version`
- Check folder: `cd` to project folder
- Check URL: Copy exact URL from GitHub
- Try again carefully, step by step

---

## 📝 After Pushing - Update Your Project

When you make changes:

```bash
# Make your changes to files...

# Then run:
git add .
git commit -m "Description of changes"
git push
```

That's it! Your changes appear on GitHub instantly.

---

## 🎯 Next Steps After Pushing

✅ Project is on GitHub
⬜ Enable GitHub Pages (optional, but cool!)
⬜ Invite collaborators (if team project)
⬜ Create GitHub Issues for tasks
⬜ Start a discussions forum
⬜ Add CI/CD workflows (later)

---

## 📚 Resources

- GitHub Docs: https://docs.github.com
- Git Tutorial: https://git-scm.com/doc
- Markdown Guide: https://www.markdownguide.org/

---

## ✨ You're All Set!

Your EduHOUSE project will be available at:

```
Repository: https://github.com/YOUR_USERNAME/btp-projet-ia
Website: https://YOUR_USERNAME.github.io/btp-projet-ia (if Pages enabled)
```

**Share these links with others to showcase your work!** 🚀

---

**Questions? Check GITHUB_SETUP.md or CONTRIBUTING.md**
