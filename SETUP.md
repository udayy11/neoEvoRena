# Neo-Evolution Project - Complete Setup Guide

> **Last Updated:** March 30, 2026

## Overview

This is a full-stack web application for space travel bookings:
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Frontend:** Next.js + React + TypeScript + Tailwind
- **Authentication:** JWT with bcrypt password hashing

---

## 📋 Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [GitHub Setup](#github-setup)
3. [Database Setup (MongoDB Atlas)](#database-setup)
4. [Local Development](#local-development)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- **Node.js 18+** - Download from https://nodejs.org/
- **Git** - https://git-scm.com/
- **MongoDB Atlas Account** - Free at https://www.mongodb.com/cloud/atlas

### 1. Clone the repo (if starting fresh)
```powershell
git clone https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git
cd Neo-Evo-Project-RENA
```

### 2. Install dependencies
```powershell
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables
```powershell
# backend/.env (copy from .env.example and fill in)
copy backend\.env.example backend\.env

# frontend/.env.local (copy from .env.local.example)
copy frontend\.env.local.example frontend\.env.local
```

### 4. Start development servers
```powershell
# Terminal 1: Backend (port 5001)
cd backend
npm start

# Terminal 2: Frontend (port 3000)
cd frontend
npm run dev
```

Visit http://localhost:3000 in your browser!

---

## GitHub Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `Neo-Evo-Project-RENA`
3. Description: "Space travel booking platform with Next.js and Express"
4. Choose **Private** (optional)
5. Skip "Initialize this repository with" options
6. Click **Create repository**

### Step 2: Connect Local to GitHub

After creating repo, GitHub shows you these commands. Copy and run:

```powershell
cd Neo-Evo-Project-RENA

# Set remote URL
git remote add origin https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

### Step 3: Verify

Go to your GitHub repo in browser. You should see all files!

---

## Database Setup

### Option 1: MongoDB Atlas (Recommended - Cloud)

#### Create Free Account

1. Visit https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with GitHub or email
4. Create organization

#### Create Cluster

1. Click "Create" in left sidebar
2. Choose **"Cloud Provider & Region"**:
   - Provider: AWS (default is fine)
   - Region: Choose closest to you
3. Click **"Create"** (free tier M0 selected)
4. Wait 3-5 minutes for cluster to initialize

#### Add Database User

1. Go to **Security** → **Database Access**
2. Click **"Add New Database User"**
3. Enter:
   - **Username:** `admin`
   - **Password:** Click "Generate Secure Password"
   - **Copy the password** - you'll need it
4. Click **"Add User"**

#### Whitelist Your IP

1. Go to **Security** → **Network Access**
2. Click **"Add IP Address"**
3. Choose **"Add Current IP Address"**
4. Click **"Confirm"**

(This allows you to connect from your machine. In production, only allow production server IP)

#### Get Connection String

1. Click **"Databases"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"** → **"Node.js"** → **"3.12 or later"**
4. Copy the connection string looking like:
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority
```

#### Update `.env`

Replace `<password>` with your password:

```env
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
PORT=5001
```

**⚠️ NEVER commit this file!** It's in `.gitignore`

---

### Option 2: Local MongoDB (Development Only)

#### Windows Installation

1. Download: https://www.mongodb.com/try/download/community
2. Run installer | Accept defaults
3. Skip Compass installation (optional)
4. MongoDB starts automatically as service

#### Connect

MongoDB runs on `mongodb://localhost:27017` by default.

Update `.env`:
```env
MONGO_URI=mongodb://localhost:27017/neo-evolution
JWT_SECRET=your-super-secret-jwt-key
PORT=5001
```

#### Verify Connection

```powershell
mongosh
show databases
exit
```

---

## Local Development

### 1. Backend Server

```powershell
cd backend
npm install    # First time only
npm start      # or: npm run dev
```

Expected output:
```
✅ MongoDB Connected: atlas-cloud-host
🚀 Neo-Evolution API running on http://localhost:5001
```

### 2. Frontend Server

```powershell
cd frontend
npm install    # First time only
npm run dev
```

Open http://localhost:3000 in browser.

### 3. API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/health` | Health check |
| GET | `/api/destinations` | List destinations |
| POST | `/api/bookings` | Create booking |

### 4. Test Signup (PowerShell)

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    password = "TestPass123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:5001/api/auth/signup" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json | Format-Table
```

You should get back user data and JWT token!

---

## Testing

### Unit Test Database

```powershell
cd backend
node test-db.js
```

Expected output:
```
✅ Connected to MongoDB
📝 CREATE: Adding test user...
✅ User created: test@example.com
📖 READ: Fetching user...
✅ User fetched: { name: 'Test User', ... }
✏️ UPDATE: Updating user...
✅ User updated: explorer
🗑️ DELETE: Removing user...
✅ User deleted: Yes

✨ All CRUD operations successful!
```

---

## Deployment

### Deploy to Railway.app (Easiest Option)

#### Step 1: GitHub Setup ✓ (Already done)

#### Step 2: Create Railway Account

1. Go to https://railway.app
2. Click "Start Project"
3. Sign in with GitHub

#### Step 3: Deploy Backend

1. New Project → From Git Repo
2. Select your `Neo-Evo-Project-RENA` repo
3. Railway auto-detects Node.js
4. Go to Variables tab
5. Add:
```
MONGO_URI=mongodb+srv://admin:PASSWORD@cluster.mongodb.net/neo-evolution?retryWrites=true&w=majority
JWT_SECRET=your-production-secret-key-at-least-32-chars
NODE_ENV=production
```
6. Service deploys automatically!

Your backend URL will be: `https://neo-evo-backend.railway.app`

#### Step 4: Deploy Frontend

1. Railway detects `frontend/` automatically
2. Add environment variable:
```
NEXT_PUBLIC_API_URL=https://neo-evo-backend.railway.app/api
```
3. Frontend deploys to: `https://neo-evo-frontend.railway.app`

#### Step 5: Enable Auto-Deploy

1. Go to Deployments
2. Any push to `main` branch auto-deploys!

---

## Troubleshooting

### MongoDB Connection Issues

**Error:** `connect ECONNREFUSED`
```powershell
# Check if MongoDB Atlas network access allows your IP
# Go to Security → Network Access → Add Current IP Address

# Or if using local MongoDB:
mongosh  # Should open MongoDB shell
exit
```

**Error:** `authSource authentication failed`
```
Wrong password in MONGO_URI
Check MongoDB Atlas Database Access credentials
Make sure password is URL encoded (% encoded special chars)
```

### Port Already in Use

**Error:** `Error: listen EADDRINUSE :::5001`
```powershell
# Find what's using port
netstat -ano | findstr :5001

# Kill by PID
taskkill /PID <PID> /F

# Or change PORT in .env
```

### Node Modules Issues

```powershell
# Clear and reinstall
rm -r node_modules
npm cache clean --force
npm install
```

### Git Push Errors

```powershell
# Wrong remote
git remote -v
git remote set-url origin https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git

# Check uncommitted changes
git status

# Push
git push -u origin main
```

---

## Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] Never commit `.env` with secrets
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] Production passwords different from development
- [ ] Force HTTPS in production (Railway handles this)

---

## Next Steps

1. **Add Features:**
   - [ ] Email verification
   - [ ] Password reset
   - [ ] User profile page
   - [ ] Booking history

2. **Improve Infrastructure:**
   - [ ] Set up GitHub Actions CI/CD
   - [ ] Add automated tests
   - [ ] Set up monitoring

3. **Scale:**
   - [ ] Add Redis cache
   - [ ] Implement rate limiting
   - [ ] Add file upload (avatar, docs)

---

## Support

For issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Check MongoDB Atlas documentation: https://docs.mongodb.com/atlas/
3. Check Express.js docs: https://expressjs.com/
4. Check Next.js docs: https://nextjs.org/docs

Good luck! 🚀
