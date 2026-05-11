# Neo-Evolution Project 🚀

> A modern space travel booking platform built with Next.js, Express.js, MongoDB, and TypeScript.

![Neo-Evolution](https://img.shields.io/badge/Status-In%20Development-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-black)
![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## 🌟 Features

- ✈️ Browse space destinations
- 📅 Book travel with dates
- 👤 User authentication with JWT
- 🎯 Personalized onboarding
- 💾 Real data persistence with MongoDB
- 🔐 Secure password hashing with bcrypt
- 📱 Responsive design with Tailwind CSS
- 🎬 Smooth animations with Framer Motion
- 🍃 Zustand for state management

---

## 📊 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
- **Node.js 18+** - https://nodejs.org/
- **Git** - https://git-scm.com/
- **MongoDB Account** - Free at https://www.mongodb.com/cloud/atlas

### 1. Automated Setup

```powershell
cd c:\Coding\WebD\Neo_Evo_Project_RENA

# Run setup script
.\setup.ps1
```

The script handles:
- ✅ Checking Node.js & Git
- ✅ Installing all dependencies
- ✅ Creating environment files
- ✅ Configuring Git

### 2. Configure Database

Edit `backend/.env`:
```env
# Get this from MongoDB Atlas: https://www.mongodb.com/cloud/atlas
MONGO_URI=mongodb+srv://admin:PASSWORD@cluster0.xxxxx.mongodb.net/neo-evolution

# Generate a random secure string (32+ characters)
JWT_SECRET=your-very-secret-jwt-key-here

PORT=5001
```

**Help:** See [DATABASE.md](DATABASE.md) for complete MongoDB setup.

### 3. Start Servers

```powershell
# Terminal 1: Backend
cd backend
npm start
# → API running on http://localhost:5001

# Terminal 2: Frontend
cd frontend
npm run dev
# → Open http://localhost:3000
```

✅ **You're running!**

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP.md](SETUP.md) | Complete setup guide with all options |
| [DATABASE.md](DATABASE.md) | MongoDB Atlas & local setup detailed guide |
| [GITHUB.md](GITHUB.md) | GitHub repository and workflow guide |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Deploy to Railway, Vercel, or Render |

---

## 📁 Project Structure

```
Neo-Evo-Project-RENA/
├── backend/                          # Express API
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # User schema
│   │   ├── Destination.js           # Travel destinations
│   │   └── Booking.js               # Bookings
│   ├── routes/
│   │   ├── auth.js                  # Authentication
│   │   ├── bookings.js              # Booking operations
│   │   └── destinations.js          # Destination listing
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── server.js                    # Entry point
│   ├── test-db.js                   # Database testing
│   ├── seed.js                      # Seed data
│   ├── package.json
│   └── .env (gitignored)            # Secrets
│
├── frontend/                         # Next.js App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Home
│   │   │   ├── layout.tsx           # Root layout
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── dashboard/           # User dashboard
│   │   │   ├── destinations/        # Browse destinations
│   │   │   ├── booking/[id]/        # Booking page
│   │   │   └── onboarding/          # User onboarding
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── hero/
│   │   │   ├── dashboard/
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   └── api.ts               # API client setup
│   │   ├── store/
│   │   │   └── useAuthStore.ts      # Auth state
│   │   └── types/
│   │       └── index.ts             # TypeScript types
│   ├── public/                      # Static assets
│   ├── package.json
│   └── .env.local (gitignored)      # Frontend settings
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml                # GitHub Actions
├── .gitignore                       # Git ignore rules
├── SETUP.md                         # Setup guide
├── DATABASE.md                      # Database guide
├── GITHUB.md                        # GitHub guide
├── DEPLOYMENT.md                    # Deployment guide
└── setup.ps1                        # Auto setup script
```

---

## 🔧 Available Commands

### Backend

```bash
cd backend

npm start          # Run server (production mode)
npm run dev        # Run server (development mode)
npm run seed       # Seed sample data
npm install        # Install dependencies
node test-db.js    # Test database connection & CRUD
```

### Frontend

```bash
cd frontend

npm run dev        # Start development server
npm run build      # Build for production
npm start          # Run production build
npm run lint       # Run ESLint
npm install        # Install dependencies
```

---

## 🧪 Testing

### Test Database Connection

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
✅ User fetched: { ... }
✏️ UPDATE: Updating user...
✅ User updated: explorer
🗑️ DELETE: Removing user...
✅ User deleted: Yes

✨ All CRUD operations successful!
```

### Test API Signup

```powershell
$body = @{
    name = "Test User"
    email = "testuser@example.com"
    password = "SecurePassword123"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5001/api/auth/signup" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | ConvertTo-Json
```

### Health Check

```powershell
# Backend
Invoke-WebRequest -Uri "http://localhost:5001/api/health" | ConvertTo-Json

# Frontend (if running)
# Just visit http://localhost:3000
```

---

## 🔐 Security Features

- ✅ JWT token-based authentication
- ✅ bcrypt password hashing (12 salt rounds)
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ Input validation
- ✅ MongoDB Atlas IP whitelisting
- ✅ Password min-length requirements
- ✅ Email validation

---

## 🌐 Environment Variables

### Backend (.env)

```env
# Required
MONGO_URI=mongodb+srv://...              # Database connection
JWT_SECRET=your-secret-key-32-chars-min  # Authentication

# Optional
PORT=5001                                # Server port
NODE_ENV=development                     # development|production
```

### Frontend (.env.local)

```env
# Optional
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

⚠️ **NEVER commit `.env` files!** Already in `.gitignore`

---

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Destinations
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/:id` - Get destination details

### Bookings
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### System
- `GET /api/health` - Health check

---

## 🚢 Deployment

### Option 1: Railway.app (Recommended)

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step:

1. Create Railway account
2. Connect GitHub repo
3. Set environment variables
4. Deploy with one click!

**Free tier:** 500 hours/month runtime

### Option 2: Vercel (Frontend) + Render (Backend)

- **Frontend:** Vercel (built for Next.js)
- **Backend:** Render or Railway
- **Database:** MongoDB Atlas (free)

### Option 3: Docker

Convert to containers for advanced deployments.

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```
→ Check MONGO_URI in .env
→ MongoDB Atlas: Add your IP to Network Access
→ Local Mongolia: Start MongoDB service
→ See DATABASE.md for detailed help
```

### "Port 5001 already in use"
```
→ Change PORT in .env
→ Or kill process using: netstat -ano | findstr :5001
```

### "Module not found"
```
→ Install dependencies: npm install
→ Clear cache: npm cache clean --force
→ Reinstall: rm node_modules && npm install
```

### "Cannot import types" (Frontend)
```
→ Check TypeScript compilation
→ Run: npm run build
```

See [SETUP.md](SETUP.md) for more troubleshooting.

---

## 📈 Project Roadmap

- [ ] Email verification
- [ ] Password reset flow
- [ ] User profile customization
- [ ] Booking history & receipts
- [ ] Payment integration (Stripe)
- [ ] Reviews & ratings
- [ ] Admin dashboard
- [ ] Analytics
- [ ] Mobile app (React Native)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m "Add amazing feature"`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

See [GITHUB.md](GITHUB.md) for detailed workflow.

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

Created as a full-stack development project.

---

## 🆘 Need Help?

### Quick Links
- [Setup Guide](SETUP.md) - Complete setup
- [Database Guide](DATABASE.md) - MongoDB Atlas
- [GitHub Guide](GITHUB.md) - Version control
- [Deployment Guide](DEPLOYMENT.md) - Go live
- [API Documentation](backend/routes/) - API reference

### External Resources
- Node.js Docs: https://nodejs.org/docs/
- Express.js: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Next.js: https://nextjs.org/docs/
- TypeScript: https://www.typescriptlang.org/docs/

---

## ✨ Status

- **Version:** 1.0.0
- **Last Updated:** March 2026
- **Maintenance:** Active Development
- **Node Version:** 18+
- **MongoDB:** 6+

---

**Ready to get started? See [SETUP.md](SETUP.md) →**

```bash
.\setup.ps1
```

**Enjoy building with Neo-Evolution! 🚀**
