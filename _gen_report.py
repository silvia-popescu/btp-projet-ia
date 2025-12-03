text = '''Rapport d\'analyse - EduHOUSE
Date: 2025-12-01T14:29:30.626Z

Özet (Türkçe):
1) Linkler ve varlıklar
- Proje içindeki yerel HTML sayfaları (index.html, dashboard.html, admin-panel.html, teacher-dashboard.html, course-detail.html) mevcut ve birbirlerine olan yerel href (ör. index.html, dashboard.html) referansları hedef dosyaları gösteriyor.
- Dashboard içindeki navigasyon id'leri (#dashboard, #courses, #exam-*, #settings vb.) karşılık gelen section id'lere sahip; iç anklar kırık görünmüyor.
- Birçok görsel dış kaynak (Unsplash) kullanıyor — offline durumda veya kısıtlı ağda yüklenmeyecektir; logo.svg yerel olarak mevcut.

2) Yapı ve "vibe coding" değerlendirmesi
- Proje kökünde çok sayıda tek-dosya HTML (inline CSS/JS) var; bu hızlı prototip için uygun ancak bakımı zorlaştırıyor.
- Yapılan iyileştirmeler: assets/css/styles.css ve assets/js/main.js eklendi; inline bazı stiller/behaviour dışarı taşındı; auth akışı düzeltildi (prenon+password birleşimi kaldırıldı) ve sqlite3 yoksa users.json fallback eklendi.

3) Bulunan sorunlar ve öneriler (öncelikli)
- sqlite3 kurulum/derleme Windows üzerinde native build nedeniyle zaman zaman takılabiliyor; paket kurulumu için sqlite3 atlanarak temel bağımlılıklar yüklenebilir veya sistemde gereken build araçları (node-gyp, Python, VS Build Tools) sağlanmalı.
- Tavsiye: tüm sayfalardaki inline CSS/JS tamamen assets klasörüne taşınsın, bir basit npm start script ve .env ile yapılandırma eklensin, ve basit CI link-checker (npm link-checker veya htmlproofer) konulsun.
- Güvenlik: JWT_SECRET env olarak tanımlanmalı ve demo shard parolalar geliştirme dışına çıkarılmalı.

4) Çalıştırma / Test talimatı (kısa)
- Terminal: npm install express cors bcryptjs jsonwebtoken && node server.js
- Tarayıcı: http://localhost:5000/ -> index.html, sonra kayıt/giriş modalı; demo: parent@example.com / password123

5) Ek notlar
- Model-rate-limit hatası (API sağlayıcı tarafı) proje dışı ve kullanıcı istek hızına bağlıdır; beklemek veya plan yükseltmesi gerekebilir.

Sonuç: Bağlantılar ve temel akışlar çoğunlukla çalışır hale getirildi; yapı daha modüler ve test edilebilir olması için assets/ ve backend konfigürasyonlarının daha da ayrıştırılması önerilir.
'''

from datetime import datetime
# Build minimal PDF
lines = text.splitlines()
objs = []
objs.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
objs.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
objs.append(b"3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>\nendobj\n")
objs.append(b"4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")
content_lines = ["BT","/F1 10 Tf","40 760 Td"]
for i, ln in enumerate(lines):
    safe = ln.replace('(', '\\(').replace(')', '\\)')
    content_lines.append(f'({safe}) Tj')
    if i != len(lines)-1:
        content_lines.append('0 -12 Td')
content = '\n'.join(content_lines) + '\n'
content_bytes = content.encode('latin-1')
objs.append((f"5 0 obj\n<< /Length {len(content_bytes)} >>\nstream\n").encode('latin-1') + content_bytes + b"endstream\nendobj\n")

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
out_path = r'C:\Users\mugir\OneDrive\Desktop\projet\rapport_fixed.pdf'
with open(out_path, 'wb') as f:
    f.write(pdf)
print('WROTE', out_path)
