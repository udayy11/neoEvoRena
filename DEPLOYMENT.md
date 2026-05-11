# Deployment Guide for Neo-Evolution Project

## Quick Deploy to Railway (Recommended)

### Prerequisites
- GitHub account with this repo
- Railway account (free): https://railway.app
- MongoDB Atlas account with cluster created

### Step-by-Step

#### 1. Prepare Environment Variables

First, gather your values:
- **MONGO_URI**: From MongoDB Atlas connection string
- **JWT_SECRET**: Generate a secure random string (32+ characters)
- **NODE_ENV**: Set to `production`

#### 2. Deploy to Railway

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub
5. Choose `Neo-Evo-Project-RENA` repo
6. Railway auto-detects monorepo!

#### 3. Configure Backend Service

1. Railway creates services automatically
2. Click on `backend` service
3. Go to "Variables" tab
4. Add environment variables:

```
MONGO_URI=mongodb+srv://admin:PASSWORD@cluster.mongodb.net/neo-evolution?retryWrites=true&w=majority
JWT_SECRET=your-secure-random-string-here-at-least-32-chars
PORT=5001
NODE_ENV=production
```

5. **Copy the public URL** shown (e.g., `https://neo-evo-backend.railway.app`)

#### 4. Configure Frontend Service

1. Click on `frontend` service
2. Go to "Variables" tab
3. Add:

```
NEXT_PUBLIC_API_URL=https://neo-evo-backend.railway.app/api
```

(Replace with your actual backend URL from step 3)

#### 5. Deploy

Click "Deploy" or wait for auto-deployment.

Your app is now live!
- Frontend: `https://neo-evo-frontend.railway.app`
- Backend: `https://neo-evo-backend.railway.app`

---

## Verify Deployment

### Test Backend Health Check

```powershell
Invoke-WebRequest -Uri "https://neo-evo-backend.railway.app/api/health" | ConvertFrom-Json
```

Expected: `{ "status": "ok", ... }`

### Test Frontend

Visit `https://neo-evo-frontend.railway.app` in browser.

You should see your app loaded!

---

## Auto-Deploy on Push

Railway is configured to auto-deploy when you push to `main` branch:

```powershell
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Wait 2-5 minutes for Railway to build and deploy
```

Check deployment status in Railway dashboard under "Deployments" tab.

---

## Production Checklist

- [ ] Database backed up
- [ ] HTTPS enabled (Railway does this automatically)
- [ ] Environment variables set securely
- [ ] JWT_SECRET is 32+ characters and random
- [ ] API logs are being monitored
- [ ] Database whitelist includes Railway server IP
- [ ] Tested signup/login on production
- [ ] Tested database operations on production

---

## Environment Variables Reference

### Required

| Variable | Example | Purpose |
|----------|---------|---------|
| `MONGO_URI` | `mongodb+srv://...` | Database connection string |
| `JWT_SECRET` | `random-32-char-string` | Session token key |

### Optional

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `5001` | Backend server port |
| `NODE_ENV` | `development` | Set to `production` in production |
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001/api` | Frontend API endpoint |

---

## Rollback

If deployment fails:

1. Go to Railway dashboard
2. Click "Deployments" tab
3. Click previous successful deployment
4. Click "Redeploy"

**OR via GitHub:**
```powershell
git revert HEAD
git push origin main
```

---

## Monitoring

### View Logs

In Railway dashboard:
1. Click service
2. Click "Logs" tab
3. View real-time logs

### Check Status

```powershell
# Health check
curl https://neo-evo-backend.railway.app/api/health

# Or in PowerShell
Invoke-WebRequest -Uri "https://neo-evo-backend.railway.app/api/health"
```

---

## Troubleshooting

### "Build Failed"
- Check logs in Railway dashboard
- Ensure both backend & frontend have `package.json`
- Install dependencies locally first: `npm install`

### "Cannot connect to database"
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (add Railway IP or allow all)
- Test locally: `mongosh "your-mongo-uri"`

### "Frontend shows 404"
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Redeploy frontend after changing variables

### "Stuck in starting"
- Kill hanging build: Railway → Deployments → click build → stop
- Clear cache: Railway → Settings → Clear build cache
- Redeploy

---

## Database Backups

### MongoDB Atlas Automatic Backups

1. Go to MongoDB Atlas dashboard
2. Deployment → Backup
3. Backups are automatic (free tier 7-day retention)

### Manual Backup

```powershell
mongodump --uri="your-mongo-uri" --out=./backup
```

---

## Scaling Up

As users grow:

1. **Upgrade MongoDB Atlas tier** (if needed)
2. **Railway auto-scales** with pay-as-you-go
3. **Add caching layer** (Redis)
4. **Use CDN** for static assets (Railway/Vercel supports this)

---

## Need Help?

- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com
- Next.js Docs: https://nextjs.org/docs
- Express Docs: https://expressjs.com
