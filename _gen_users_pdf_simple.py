from pathlib import Path
import json
users = json.loads(Path('users.json').read_text())
lines = [f'User credentials - EduHOUSE', 'Generated: 2025-12-01T23:00:22.185Z', '']
for u in users:
    pwd = 'password123' if u.get('role') in ['student','parent','teacher'] else 'admin123' if u.get('role')=='admin' else 'password123'
    lines.append(f"ID: {u.get('id')} | Role: {u.get('role')} | Name: {u.get('name')} | Email: {u.get('email')} | Password: {pwd}")

# Build a tiny PDF (latin1-safe)
content = '\n'.join(lines)
content_bytes = content.encode('latin-1', errors='replace')
objs = []
objs.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
objs.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
objs.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n")
objs.append(b"4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
content_stream = b"BT\n/F1 10 Tf\n40 760 Td\n"
for ln in content_bytes.split(b'\n'):
    safe = ln.replace(b'(', b'\\(').replace(b')', b'\\)')
    content_stream += b'(' + safe + b') Tj\n0 -12 Td\n'
content_stream += b'ET\n'
objs.append(b"5 0 obj\n<< /Length %d >>\nstream\n" % len(content_stream) + content_stream + b"endstream\nendobj\n")
pdf = b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n"
offsets = []
for o in objs:
    offsets.append(len(pdf))
    pdf += o
startxref = len(pdf)
pdf += b"xref\n0 %d\n" % (len(objs)+1)
pdf += b"0000000000 65535 f \n"
for off in offsets:
    pdf += b"%010d 00000 n \n" % off
pdf += b"trailer\n<< /Size %d /Root 1 0 R >>\n" % (len(objs)+1)
pdf += b"startxref\n%d\n%%%%EOF\n" % startxref
Path('users_with_passwords.pdf').write_bytes(pdf)
print('WROTE users_with_passwords.pdf')
