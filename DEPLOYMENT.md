# Coolify Deployment Guide - APAR Management Demo

## Quick Deploy

### 1. Prerequisites

- Coolify instance running (v4+)
- Git repository connected to Coolify
- Domain name (optional for demo, can use IP)

### 2. Create Service in Coolify

1. **New → Service/Application**
2. **Source:**
   - Repository: `fanajib5/mis-apar-demo`
   - Branch: `main` (or your branch)
   - Build Provider: **Nixpacks** (auto-detects `nixpacks.toml`)
3. **Ports:**
   - Add port `80` (HTTP)
   - Optional: Add port `443` for HTTPS (Coolify auto-SSL)
4. **Environment:** Production

### 3. Environment Variables

Add these in **Environment Variables** tab:

| Key | Value | Required |
|-----|-------|----------|
| `APP_ENV` | `production` | Yes |
| `APP_DEBUG` | `false` | Yes |
| `APP_URL` | `http://your-domain.com` | Yes |
| `APP_KEY` | `base64:...` | Yes (generate locally) |
| `DB_CONNECTION` | `sqlite` | Yes |
| `DATABASE_URL` | `file:/app/database/database.sqlite` | Yes |
| `CACHE_STORE` | `file` | Yes |
| `QUEUE_CONNECTION` | `database` | Yes |
| `SESSION_DRIVER` | `database` | Yes |
| `SESSION_LIFETIME` | `120` | Optional |
| `MAIL_MAILER` | `log` | Yes |
| `LOG_CHANNEL` | `stack` | Yes |
| `LOG_LEVEL` | `info` | Optional |

**Generate APP_KEY locally:**
```bash
php artisan key:generate --show
```

**MySQL/PostgreSQL alternative:**
```
DB_CONNECTION=mysql
DB_HOST=<mysql-service-name>
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=<password>
```

### 4. Persistent Storage (SQLite)

If using SQLite, ensure database persistence:

- **Option A:** Set `DATABASE_URL=file:/app/database/database.sqlite` (directory auto-created)
- **Option B:** Add Persistent Storage in Coolify pointing to `/app/database`

### 5. Post-Deployment Hook

**Advanced → Post-deployment commands:**
```bash
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan storage:link
```

### 6. Scheduled Task - Daily Demo Reset

**Scheduled Tasks → "+ Create Scheduled Task":**

```
Name: Daily Demo Reset
Command: php /app/artisan demo:refresh --force
Schedule: 0 3 * * *  (Daily at 3:00 AM WIB / 19:00 UTC)
Working Directory: /app
```

**Alternative: Laravel Scheduler approach**
- Create one scheduled task to run scheduler every minute:
  ```
  * * * * * php /app/artisan schedule:run >> /dev/null 2>&1
  ```
- All schedules defined in `app/Console/Kernel.php`

### 7. Health Check

**Health Check tab:**
- Path: `/`
- Interval: `30s`
- Timeout: `5s`
- Expected Status: `200`

### 8. SSL / Domain (Optional)

1. **Settings → Domains** → Add your domain
2. Enable **Auto SSL** (Let's Encrypt)
3. Enable **HTTP → HTTPS redirect**

---

## Verification After Deploy

### 1. Check Application
```bash
# Visit
https://your-domain.com
https://your-domain.com/login
```

### 2. Login Credentials
```
Email: demo@aparmanagement.com
Password: password
```

### 3. Verify Roles & Permissions
- Login as admin (super-admin)
- Check that all permissions are granted
- 5 roles available: super-admin, manager, sales, technician, customer

### 4. Check Demo Reset Logs
```bash
# Via Coolify Terminal tab
cd /app/storage/logs
ls -la demo-refresh-*.log
tail -f demo-refresh-$(date +%Y-%m-%d).log
```

### 5. Monitor via Coolify
- **Logs tab:** Real-time application logs
- **Metrics tab:** CPU, memory usage
- **Terminal tab:** SSH access to container

---

## Files Structure

```
project/
├── nixpacks.toml          # Coolify build configuration
├── composer.json          # PHP dependencies
├── package.json           # Node dependencies
├── .env.example           # Environment template
├── app/
│   ├── Console/
│   │   ├── Commands/
│   │   │   └── DemoRefresh.php      # Demo reset command
│   │   └── Kernel.php                # Scheduler (dailyAt 3AM)
│   ├── Models/
│   │   └── User.php                  # HasRoles trait added
│   └── ...
├── database/
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── DemoDataSeeder.php        # Demo data
│       └── RolePermissionSeeder.php  # Roles & permissions
├── config/
│   └── logging.php                   # demo-refresh log channel
└── storage/
    └── logs/
        └── demo-refresh-*.log        # Daily logs
```

---

## Troubleshooting

### Build Fails
- Check build logs in Coolify → Logs tab
- Ensure `nixpacks.toml` syntax correct
- PHP version: 8.3 (compatible with phpoffice 1.30.4)

### Database Connection Error
- SQLite: Check `DATABASE_URL` and directory writable
- MySQL/PostgreSQL: Verify credentials and service running

### 403 Permission Denied (Storage)
```bash
# Via Coolify terminal
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache  # or nginx:nginx
```

### Queue Worker Not Running
If using separate queue worker service (not all-in-one):
- Create separate service for queue worker
- Command: `php /app/artisan queue:work --sleep=3 --tries=3 --daemon`

### Demo Reset Not Running
- Check scheduled task exists and enabled
- Verify cron expression: `0 3 * * *`
- Check permissions: `storage/logs/` writable
- View logs: `storage/logs/demo-refresh-*.log`

---

## Notes

- **PHP Version:** 8.3 (from nixpacks.toml) - compatible with all dependencies
- **Node Version:** 20 (for Vite 8, React 19)
- **Supervisor:** Manages nginx, php-fpm, and queue worker
- **Demo Reset:** Daily at 3 AM WIB (fresh database, reseed demo data)
- **Roles:** Spatie Permission with 63 permissions, 5 roles
- **Logging:** Separate `demo-refresh` channel with daily rotation (14 days retention)

---

## Support

For issues:
- Coolify Docs: https://coolify.io/docs
- Laravel Docs: https://laravel.com/docs
- Spatie Permission: https://spatie.be/docs/laravel-permission
