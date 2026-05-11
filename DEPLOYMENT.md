# Deployment Guide: Vercel (Frontend) + Railway (Backend) + MongoDB Atlas

## Architecture
- **Frontend**: Vercel (Next.js)
- **Backend**: Railway (Node.js)
- **Database**: MongoDB Atlas

---

## STEP 1: MongoDB Atlas Setup

### 1.1 Create Atlas Account & Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Log in
3. Click "Create a Project"
4. Click "Create Deployment" → Choose "Free" tier
5. Select Cloud Provider (AWS, Google Cloud, or Azure) and Region
6. Click "Create" (wait 5-10 minutes)

### 1.2 Get Connection String
1. In Atlas, go to "Database" → Click "Connect"
2. Click "Drivers"
3. Copy the connection string
4. **Replace** username and password:
   ```
   mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster.mongodb.net/neo-evolution?retryWrites=true&w=majority
   ```

### 1.3 Create Database User
1. In Atlas, go to "Security" → "Database Access"
2. Click "Add Database User"
3. Username: `admin`
4. Password: Generate strong password (save it!)
5. Click "Add User"

### 1.4 Allow All IPs (for ease - or specific Railway IP later)
1. Go to "Security" → "Network Access"
2. Click "Add IP Address" → "Allow access from anywhere" (0.0.0.0/0)
3. Click "Confirm"

---

## STEP 2: Deploy Frontend to Vercel

### 2.1 Connect Vercel to GitHub
1. Go to https://vercel.com
2. Click "New Project"
3. Select your GitHub repo
4. Click "Import"

### 2.2 Configure Project
1. **Root Directory**: Select `frontend`
2. **Framework Preset**: Next.js (auto-detected)
3. **Environment Variables**: 
   - Add `NEXT_PUBLIC_API_URL` = `https://your-backend-url/api`
   - *You'll get the backend URL in Step 3*

### 2.3 Deploy
Click "Deploy" button and wait for completion (~2-3 minutes)

**Your frontend URL will be**: `https://your-project-name.vercel.app`

---

## STEP 3: Deploy Backend to Railway

### 3.1 Connect Railway to GitHub
1. Go to https://railway.app
2. Sign up / Log in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository

### 3.2 Configure Backend Service
1. Select `backend` folder as root directory
2. Railway auto-starts deploying
3. Once deployed, click the `backend` service
4. Go to "Variables" tab
5. Add environment variables:

```
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster.mongodb.net/neo-evolution?retryWrites=true&w=majority
JWT_SECRET=generate-a-long-random-string-32-chars-minimum
FRONTEND_URL=https://your-project-name.vercel.app
PORT=5000
```

6. Click "Save"
7. Railway auto-redeploys

### 3.3 Get Backend URL
1. In Railway dashboard, go to "Deployments" or "Settings"
2. Find the public URL (e.g., `https://neo-evo-backend-production.railway.app`)
3. Copy this URL

---

## STEP 4: Connect Frontend to Backend

### 4.1 Update Vercel Environment Variable
1. Go to Vercel dashboard → Your project
2. Go to "Settings" → "Environment Variables"
3. Find `NEXT_PUBLIC_API_URL`
4. Update to: `https://your-backend-railway-url/api`
5. Redeploy: Click project → "Deployments" → Click the latest → "Redeploy"

---

## STEP 5: Verify Deployment

### Test Backend Health Check
```powershell
Invoke-WebRequest -Uri "https://your-backend-railway-url/api/health"
```

### Test Frontend
Visit `https://your-project-name.vercel.app` and test:
- [ ] Homepage loads
- [ ] Sign up works
- [ ] Login works
- [ ] Destinations load
- [ ] Can make a booking

---

## Auto-Deploy on Push

Both Vercel and Railway auto-deploy when you push to GitHub:

```powershell
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Wait 2-5 minutes for both to redeploy
```

---

## Troubleshooting

### CORS Error
**Problem**: Frontend gets CORS error from backend
**Solution**:
1. Check `FRONTEND_URL` env var in Railway matches your Vercel domain exactly
2. Redeploy backend: `railway up` or wait for auto-deploy

### MongoDB Connection Error
**Problem**: "MongooseError: Cannot connect to MongoDB"
**Solution**:
1. Verify `MONGO_URI` is correct in Railway Variables
2. Check MongoDB Atlas Network Access allows Railway IP (or 0.0.0.0/0)

### API 404 Error
**Problem**: "Cannot GET /api/health"
**Solution**:
1. Verify `NEXT_PUBLIC_API_URL` matches your Railway backend URL
2. Redeploy frontend on Vercel

---

## URLs Reference

| Service | URL |
|---------|-----|
| Frontend | https://your-project-name.vercel.app |
| Backend | https://your-backend-railway-url.railway.app |
| MongoDB Atlas | https://cloud.mongodb.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| Railway Dashboard | https://railway.app/dashboard |

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
