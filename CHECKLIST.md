# Neo-Evolution Project - Complete Setup Checklist

Use this checklist to track your progress through setting up and deploying the project.

---

## ✅ Phase 1: Local Setup (15-20 minutes)

### Prerequisites
- [ ] Node.js 18+ installed - Check: `node --version`
- [ ] Git installed - Check: `git --version`
- [ ] GitHub account created - https://github.com
- [ ] MongoDB Atlas account created - https://www.mongodb.com/cloud/atlas

### Project Setup
- [ ] Navigate to project folder
  ```powershell
  cd c:\Coding\WebD\Neo_Evo_Project_RENA
  ```
- [ ] Run setup script
  ```powershell
  .\setup.ps1
  ```
- [ ] Script completes without errors
- [ ] `backend/.env` file created
- [ ] `frontend/.env.local` file created
- [ ] `node_modules` installed in both folders
- [ ] Git configured with your name and email

---

## ✅ Phase 2: Database Setup (20-30 minutes)

### MongoDB Atlas Cloud Setup (Recommended)

- [ ] Log in to MongoDB Atlas
- [ ] Create new project: "Neo-Evolution"
- [ ] Create new cluster: "neo-evolution"
- [ ] Wait for cluster to initialize (3-5 minutes)
- [ ] Create database user
  - [ ] Username: `admin`
  - [ ] Password: Generated & saved
- [ ] Add IP whitelist
  - [ ] Network Access → Add Current IP Address
- [ ] Get connection string
  - [ ] Go to Connect → Drivers → Node.js
  - [ ] Copy connection string
- [ ] Update `backend/.env`
  - [ ] Paste `MONGO_URI` with your connection string
  - [ ] Replace `<password>` with your password
  - [ ] **Test:** `node test-db.js` (should show ✅ Connected)

### OR MongoDB Local Setup

- [ ] Download MongoDB Community: https://www.mongodb.com/try/download/community
- [ ] Install MongoDB (run installer)
- [ ] Verify installation
  ```powershell
  mongosh
  show databases
  exit
  ```
- [ ] Update `backend/.env`
  ```
  MONGO_URI=mongodb://localhost:27017/neo-evolution
  ```
- [ ] **Test:** `node test-db.js` (should show ✅ Connected)

---

## ✅ Phase 3: Test Local Application (10 minutes)

### Backend Testing
- [ ] Navigate to backend folder: `cd backend`
- [ ] Start backend server: `npm start`
- [ ] Server starts without errors
- [ ] Verify output shows: `✅ MongoDB Connected`
- [ ] Verify output shows: `🚀 Neo-Evolution API running on http://localhost:5001`
- [ ] Test health endpoint
  ```powershell
  Invoke-WebRequest http://localhost:5001/api/health
  ```

### Database Testing
- [ ] Open new PowerShell terminal
- [ ] Navigate to backend: `cd backend`
- [ ] Run database test: `node test-db.js`
- [ ] All CRUD operations pass (CREATE, READ, UPDATE, DELETE)
- [ ] See ✨ message at end

### Frontend Testing
- [ ] Open new PowerShell terminal
- [ ] Navigate to frontend: `cd frontend`
- [ ] Start frontend: `npm run dev`
- [ ] Frontend starts without errors
- [ ] Open http://localhost:3000 in browser
- [ ] Page loads successfully
- [ ] No console errors

### Test Signup (API)
- [ ] Keep both servers running
- [ ] Test signup endpoint
  ```powershell
  $body = @{
      name = "Test User"
      email = "test@example.com"
      password = "Password123"
  } | ConvertTo-Json
  
  Invoke-WebRequest -Uri "http://localhost:5001/api/auth/signup" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body
  ```
- [ ] Receive JWT token and user data
- [ ] Data is stored in MongoDB

---

## ✅ Phase 4: GitHub Setup & Push (15-20 minutes)

### Create GitHub Repository
- [ ] Go to https://github.com/new
- [ ] Repository name: `Neo-Evo-Project-RENA`
- [ ] Description: "Space travel booking platform"
- [ ] Visibility: **Private** (or Public)
- [ ] Do NOT initialize with files
- [ ] Click "Create repository"
- [ ] Copy repository URL

### Connect Local Git to GitHub
- [ ] Open PowerShell in project root
- [ ] Add remote: 
  ```powershell
  git remote add origin https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git
  ```
- [ ] Verify remote:
  ```powershell
  git remote -v
  ```

### Push Code to GitHub
- [ ] Rename branch to main (if needed):
  ```powershell
  git branch -M main
  ```
- [ ] Push code:
  ```powershell
  git push -u origin main
  ```
- [ ] Visit GitHub repo in browser
- [ ] All files are visible on GitHub
- [ ] Recent commits show in history

### Verify .env Protection
- [ ] Confirm `.env` files are NOT on GitHub
  ```powershell
  git log --all --source --full-history -- backend/.env
  ```
  (Should return nothing)

---

## ✅ Phase 5: Environment Variables Setup

### Backend Environment
- [ ] `backend/.env` contains:
  - [ ] `MONGO_URI` - Your MongoDB connection string
  - [ ] `JWT_SECRET` - Random 32+ character string
  - [ ] `PORT` - Set to 5001
- [ ] `backend/.env.example` exists with template values
- [ ] `.env` is in `.gitignore` (never committed)

### Frontend Environment
- [ ] `frontend/.env.local` exists with:
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:5001/api`
- [ ] `frontend/.env.local.example` exists with template
- [ ] `.env.local` is in `.gitignore`

---

## ✅ Phase 6: Deployment Preparation (30-45 minutes)

### Prepare for Deployment
- [ ] All code committed and pushed to GitHub
- [ ] `.env` files are NOT in git (verify gitignore)
- [ ] Database connection tested locally
- [ ] Both backends still run without errors
- [ ] Frontend still builds: `npm run build`

### Create Production Environment Variables
- [ ] Copy `backend/.env` to `backend/.env.production`
- [ ] Update values for production:
  - [ ] `MONGO_URI` - Production MongoDB connection string
  - [ ] `JWT_SECRET` - Different, longer random string
  - [ ] `NODE_ENV=production`
- [ ] DO NOT commit `.env.production`

### Choose Deployment Platform
- [ ] [ ] Railway.app (Recommended - easiest)
- [ ] [ ] Vercel (Frontend) + Render (Backend)
- [ ] [ ] Heroku
- [ ] [ ] AWS / Azure / Google Cloud

---

## ✅ Phase 7: Deploy to Railway (if chosen)

### Set Up Railway Account
- [ ] Create Railway account: https://railway.app
- [ ] Sign in with GitHub
- [ ] Create new project
- [ ] Select "Deploy from GitHub repo"
- [ ] Authorize GitHub
- [ ] Select `Neo-Evo-Project-RENA` repository

### Deploy Backend
- [ ] Railway creates backend service
- [ ] Go to backend service → Variables
- [ ] Add environment variables:
  - [ ] `MONGO_URI` - Production MongoDB URI
  - [ ] `JWT_SECRET` - Production secret (32+ chars, random)
  - [ ] `NODE_ENV=production`
- [ ] Note backend URL (e.g., `https://neo-evo-backend.railway.app`)
- [ ] Click Deploy

### Deploy Frontend
- [ ] Railway creates frontend service
- [ ] Go to frontend service → Variables
- [ ] Add:
  - [ ] `NEXT_PUBLIC_API_URL=https://neo-evo-backend.railway.app/api`
- [ ] Replace with your actual backend URL
- [ ] Click Deploy

### Verify Deployments
- [ ] Wait 5-10 minutes for builds
- [ ] Check Deployments tab
- [ ] Both show "Success"
- [ ] Backend URL works: `https://...railway.app/api/health`
- [ ] Frontend URL loads in browser: `https://...railway.app`
- [ ] Test signup on production

---

## ✅ Phase 8: Post-Deployment

### Enable Auto-Deploy
- [ ] Go to Railway → Settings
- [ ] Enable "Auto-deploy on push"
- [ ] Now pushes to GitHub = automatic deployment

### Configure GitHub Secrets (Optional)
- [ ] GitHub repo → Settings → Secrets
- [ ] Add `MONGO_URI` secret
- [ ] Add `JWT_SECRET` secret
- [ ] Add `RAILWAY_TOKEN` if using GitHub Actions

### Set Up Branch Protection (Recommended)
- [ ] GitHub repo → Settings → Branches
- [ ] Add rule for `main` branch:
  - [ ] Require pull request reviews
  - [ ] Require passing checks
  - [ ] Dismiss stale reviews

### Test Production Thoroughly
- [ ] Sign up with test account (production)
- [ ] Verify email saved in production database
- [ ] Login with test credentials
- [ ] Check user appears in MongoDB Atlas
- [ ] Test booking creation (if endpoint exists)

---

## ✅ Final Checklist

### Development Complete
- [ ] Local app runs without errors
- [ ] Database connections work
- [ ] All CRUD operations tested
- [ ] Signup/login works
- [ ] Frontend loads successfully

### Code Quality
- [ ] All files committed to git
- [ ] No sensitive data in repository
- [ ] `.gitignore` properly configured
- [ ] Code follows project structure

### Deployment Complete
- [ ] Code on GitHub
- [ ] Deployed to production
- [ ] Production URL accessible
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Monitoring enabled (if available)

### Security Check
- [ ] No `.env` files committed
- [ ] Production `JWT_SECRET` is random & long
- [ ] MongoDB Atlas IP whitelist configured
- [ ] HTTPS enabled (Railway provides this)
- [ ] Passwords securely hashed (bcrypt)

### Documentation
- [ ] README.md reviewed
- [ ] SETUP.md read and understood
- [ ] DATABASE.md references saved
- [ ] DEPLOYMENT.md bookmarked
- [ ] GITHUB.md reviewed

---

## 🎉 Success!

If all checkboxes above are marked, **your project is:**
- ✅ Locally running
- ✅ Version controlled on GitHub
- ✅ Deployed to production
- ✅ Using real database
- ✅ Ready for collaboration

---

## 📞 Troubleshooting Quick Links

**During Setup:**
- MongoDB won't connect → See [DATABASE.md](DATABASE.md)
- Git errors → See [GITHUB.md](GITHUB.md)
- Node modules issues → See [SETUP.md](SETUP.md) Troubleshooting

**During Deployment:**
- Railway build fails → See [DEPLOYMENT.md](DEPLOYMENT.md)
- Frontend can't reach backend → Check `NEXT_PUBLIC_API_URL`
- Database errors → Verify MongoDB Atlas IP whitelist

**General Help:**
- See [SETUP.md](SETUP.md) full documentation
- Check project README.md
- Review API documentation in code

---

## 📝 Notes

Use this space to track personal notes:

```
[Add your notes here]
- MongoDB Atlas cluster name: _________________
- Backend production URL: _________________
- Frontend production URL: _________________
- GitHub repo URL: _________________
```

---

**Last Updated:** March 2026
**Project:** Neo-Evolution
**Status:** Fully Documented ✨
