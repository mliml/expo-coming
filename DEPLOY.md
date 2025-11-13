# Deployment Guide

## Zeabur Deployment

### Prerequisites
1. PostgreSQL database created on Zeabur
2. DATABASE_URL environment variable set in your service

### Configuration Steps

#### 1. Set Environment Variables

In your Zeabur service settings, add:

```
DATABASE_URL=postgresql://user:password@host:5432/database
```

#### 2. Configure Start Command (Important!)

In Zeabur service settings:
- Go to "Settings" → "Start Command"
- Set the start command to:
  ```
  npm run start:migrate
  ```

This ensures the database is migrated and seeded before the app starts.

#### 3. Deploy

Push your code to GitHub, and Zeabur will automatically deploy.

### Manual Database Setup (if needed)

If automatic migration doesn't work, you can manually run:

```bash
# SSH into your Zeabur service or use the console
npm run db:migrate
```

### Verify Deployment

After deployment, check:
- Main page: https://your-app.zeabur.app
- API: https://your-app.zeabur.app/api/features

If the API returns 5 features, everything is working correctly!

## Vercel Deployment

Similar steps apply for Vercel:

1. Set `DATABASE_URL` environment variable
2. No need to change start command (Vercel uses automatic detection)
3. After first deploy, run migration via Vercel CLI:
   ```bash
   vercel env pull .env.local
   npm run db:migrate
   ```
