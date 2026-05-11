# Quick Reference Guide

## 🚀 Start Here

**First time setup?**
```powershell
.\setup.ps1
```

**Then configure database:**
Edit `backend/.env` with your MongoDB URI

**Then run servers:**
```powershell
# Terminal 1
cd backend && npm start

# Terminal 2
cd frontend && npm run dev
```

Visit: http://localhost:3000

---

## 📦 Common Commands

### Development Servers
```powershell
cd backend && npm start           # Backend API (port 5001)
cd frontend && npm run dev        # Frontend (port 3000)
```

### Testing
```powershell
cd backend && node test-db.js     # Test database & CRUD
npm run seed                       # Seed sample data
```

### Building
```powershell
cd frontend && npm run build      # Build for production
npm run lint                       # Check code quality
```

### Git Workflow
```powershell
git status                        # See what changed
git add .                         # Stage all changes
git commit -m "message"           # Create snapshot
git push origin main              # Push to GitHub
git pull origin main              # Pull latest changes
```

---

## 🔐 Environment Files

### backend/.env
```env
MONGO_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/neo-evolution
JWT_SECRET=your-secret-key-at-least-32-chars
PORT=5001
```

### frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

⚠️ Never commit `.env` files!

---

## 🧪 Verify Setup

### Backend Health Check
```powershell
Invoke-WebRequest http://localhost:5001/api/health
```

### Database Test
```powershell
cd backend
node test-db.js
```

### Build Check
```powershell
cd frontend
npm run build
```

---

## 📚 Full Documentation

- **Setup Guide** → [SETUP.md](SETUP.md)
- **Database Guide** → [DATABASE.md](DATABASE.md)
- **GitHub Guide** → [GITHUB.md](GITHUB.md)
- **Deployment Guide** → [DEPLOYMENT.md](DEPLOYMENT.md)
- **Checklist** → [CHECKLIST.md](CHECKLIST.md)
- **Project Info** → [README.md](README.md)

---

## 🆘 Common Issues

**MongoDB Connection Error**
- Check `MONGO_URI` in `backend/.env`
- MongoDB Atlas? Add your IP to Network Access
- Local? Start MongoDB: `mongosh`

**Port Already in Use**
- Change PORT in `.env`
- Or find process: `netstat -ano | findstr :5001`

**Module Not Found**
- Install: `npm install`
- Clear cache: `npm cache clean --force`

**Frontend Can't Call Backend**
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Backend running on port 5001?

---

## 🚢 Deploy to Railway

1. Create account: https://railway.app
2. Connect GitHub repo
3. Set environment variables
4. Deploy!

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

---

## 📞 Quick Links

- GitHub Repo: https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Next.js Docs: https://nextjs.org/docs
- Express Docs: https://expressjs.com
- Railway: https://railway.app

---

**Status:** Ready to develop! 🚀
