Deploy Steps for Hostinger
# 1. Install PHP dependencies
composer install

# 2. Configure credentials
cp .env.example .env
# edit .env with your Gmail + app password

# 3. Build frontend
npm run build

# 4. Upload entire project to Hostinger
# Point document root to /dist (or project root with rewrites)
.env Example
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your@gmail.com
SMTP_PASSWORD=your-16-char-app-password
ADMIN_EMAIL=your@gmail.com
FROM_EMAIL=your@gmail.com
Notes
- The form generates RM-XXXXXX client-side, sends it to PHP, which includes it in both emails and returns it for the thank-you URL.
- Admin email: HTML table with all form fields + plain-text fallback.
- User email: branded HTML confirmation with reference code + plain-text fallback.
- thank-you.html reads ?ref= from URL and displays it.
- Works with Hostinger shared hosting (PHP 8.x, mail()/SMTP allowed).
Run composer install and you're ready to deploy.