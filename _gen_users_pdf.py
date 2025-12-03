from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import json
from pathlib import Path

users_file = Path('users.json')
out_pdf = Path('users_with_passwords.pdf')

users = []
if users_file.exists():
    users = json.loads(users_file.read_text())

c = canvas.Canvas(str(out_pdf), pagesize=A4)
width, height = A4
c.setFont('Helvetica-Bold', 16)
c.drawString(40, height-50, 'EduHOUSE - User Credentials')

c.setFont('Helvetica', 11)
c.drawString(40, height-70, 'Generated: 2025-12-01T23:00:22.185Z')

y = height - 100
for u in users:
    if y < 80:
        c.showPage()
        c.setFont('Helvetica', 11)
        y = height - 50
    pwd = 'password123' if u.get('role') in ['student','parent','teacher'] else 'admin123' if u.get('role')=='admin' else 'password123'
    line = f"ID: {u.get('id')} | Role: {u.get('role')} | Name: {u.get('name')} | Email: {u.get('email')} | Password: {pwd}"
    c.drawString(40, y, line)
    y -= 18

c.save()
print('WROTE', out_pdf)
