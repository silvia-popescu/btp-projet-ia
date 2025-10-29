# Contributing to EduHOUSE

Thank you for your interest in contributing to EduHOUSE! We welcome contributions from the community.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please be respectful and professional in all interactions.

## How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on GitHub
- This creates your own copy of the project

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/btp-projet-ia.git
cd btp-projet-ia
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

Use descriptive branch names:
- `feature/add-parent-portal`
- `fix/login-issue`
- `docs/update-readme`
- `style/improve-dashboard-css`

### 4. Make Your Changes

#### For Frontend Changes:
- Edit HTML, CSS, or JavaScript files
- Test in multiple browsers
- Keep code clean and commented
- Follow existing code style

#### Coding Standards:
- **HTML**: Use semantic markup (header, nav, section, article, etc.)
- **CSS**: Use BEM naming convention (Block__Element--Modifier)
- **JavaScript**: Use meaningful variable names, add comments for complex logic

### 5. Test Your Changes

```bash
# Using Python
python -m http.server 8000

# Then test in browser: http://localhost:8000
```

Test on:
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

### 6. Commit Your Changes

```bash
git add .
git commit -m "Type: Brief description

More detailed explanation if needed.

Fixes #123 (if related to an issue)
"
```

Commit message format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Test updates
- `chore:` Maintenance tasks

### 7. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 8. Create a Pull Request
1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Add description of changes
5. Click "Create Pull Request"

### 9. Wait for Review
Maintainers will review your PR and may request changes. Be patient and collaborative!

---

## What We're Looking For

### High Priority
- 🎨 UI/UX improvements
- 🐛 Bug fixes
- 📖 Documentation
- ♿ Accessibility improvements

### Features
- Parent portal implementation
- Backend API structure
- Database schema
- Authentication system
- Real-time notifications

### Documentation
- Updated tutorials
- Better code comments
- API documentation
- Video guides

---

## Pull Request Guidelines

✅ **Do:**
- Keep PRs focused on one feature/fix
- Write clear, descriptive titles
- Add details about what changed and why
- Reference related issues
- Test across browsers
- Update README if needed

❌ **Don't:**
- Include unrelated changes
- Break existing functionality
- Remove features without discussion
- Add large dependencies without discussion
- Commit sensitive data

---

## Issues

### Reporting Bugs
1. Check if the issue already exists
2. Provide a clear description
3. Include steps to reproduce
4. Specify browser and OS
5. Add screenshots if visual

### Requesting Features
1. Check if similar requests exist
2. Describe the use case
3. Explain the benefit
4. Provide mockups if design-related

---

## Development Setup

### Prerequisites
- Modern web browser
- Text editor (VS Code recommended)
- Git
- Python 3 (for local server)

### Local Setup
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/btp-projet-ia.git
cd btp-projet-ia

# Start local server
python -m http.server 8000

# Open browser
# http://localhost:8000
```

---

## File Structure

```
btp-projet-ia/
├── index.html              # Landing page
├── dashboard.html          # Student dashboard
├── teacher-dashboard.html  # Teacher panel
├── course-detail.html      # Course content
├── admin-panel.html        # Admin panel
├── package.json
├── README.md
├── LICENSE
├── CONTRIBUTING.md         # This file
└── GITHUB_SETUP.md
```

---

## Communication

- **Issues**: For bug reports and features
- **Discussions**: For questions and ideas
- **Email**: contact@eduhouse.fr

---

## Review Process

1. **Automated Checks**: Code quality and formatting
2. **Maintainer Review**: One or more maintainers review
3. **Testing**: Changes are tested
4. **Merge**: Upon approval, your PR is merged!

Typical timeline: 2-5 days

---

## Becoming a Maintainer

Outstanding contributors may be invited to become maintainers! This includes:
- Code review privileges
- Merge rights
- Repository management
- Community leadership

---

## Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Credited in project README

---

## Questions?

- Open a GitHub Discussion
- Check existing issues and PRs
- Email: contact@eduhouse.fr
- Check documentation in README.md

---

## License

By contributing, you agree your code will be licensed under the MIT License.

---

**Thank you for making EduHOUSE better! 🙏**
