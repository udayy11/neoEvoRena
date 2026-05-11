# MongoDB & Database Setup Guide

## Quick Reference

This guide helps you set up MongoDB for Neo-Evolution Project.

---

## Option 1: MongoDB Atlas (Cloud - RECOMMENDED)

### Why Atlas?
- Free tier with 10GB storage
- Automatic backups
- Easy to scale
- Accessible from anywhere
- Perfect for production

### Setup Steps

#### 1. Create Account (5 min)
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or GitHub
4. Create Organization: "Neo-Evolution"
5. Create Project: "Development"
```

#### 2. Create Cluster (5 min)
```
1. Click "Create Deployment"
2. Select "Free M0 Cluster"
3. Cloud Provider: AWS (default)
4. Region: Choose your region
5. Cluster Name: "neo-evolution"
6. Click "Create"
7. Wait 3-5 minutes...
```

#### 3. Set Up Security (5 min)

**Create Database User:**
```
1. Go to Security → Database Access
2. Click "Add New Database User"
3. username: admin
4. password: Click "Generate Secure Password"
5. COPY THE PASSWORD SOMEWHERE SAFE
6. Click "Add User"
```

**Whitelist IP Address:**
```
1. Go to Security → Network Access
2. Click "Add IP Address"
3. Choose "Add Current IP Address"
4. For development: OK to add your IP
5. For production: Only add server IP
6. Click "Confirm"
```

#### 4. Get Connection String (2 min)

```
1. Go to "Databases" in left menu
2. Click "Connect" on your cluster
3. Choose "Drivers" tab
4. Select "Node.js"
5. Copy connection string
6. Should look like: mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/database?retryWrites=true&w=majority
```

#### 5. Update Environment Variables

In `backend/.env`:
```
MONGO_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority
```

**Replace:**
- `YOUR_PASSWORD` - Your generated password
- `cluster0` - Your cluster name
- `xxxxx` - Your unique cluster ID

---

## Option 2: Local MongoDB (Development Only)

### Why Local?
- No internet required
- Fast testing
- No account needed
- Good for offline development

### Setup Steps

#### Windows Installation

```powershell
1. Download: https://www.mongodb.com/try/download/community
2. Run installer (version 7.0 or later)
3. Choose "Run Service as Network Service"
4. Skip Compass (optional)
5. Finish
```

MongoDB starts automatically as a Windows service.

#### Verify Installation

```powershell
mongosh
show databases
exit
```

#### Update Environment Variables

In `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/neo-evolution
```

---

## Comparison: Atlas vs Local

| Feature | Atlas | Local |
|---------|-------|-------|
| Setup Time | 10 min | 5 min |
| Internet Required | Yes | No |
| Local Testing | Yes | Yes |
| Remote Access | Yes | No |
| Backups | Automatic | Manual |
| Scalability | Built-in | Limited |
| Production Ready | ✅ Yes | ❌ No |
| Free | ✅ 10GB/mo | ✅ Free |
| Learning Curve | Medium | Low |

**Recommendation:** Start with Local for testing, then move to Atlas.

---

## Connection String Explained

```
mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority
                 ↑     ↑       ↑        ↑          ↑         ↑ 
            username password cluster  host      database  options
```

**Important flags:**
- `retryWrites=true` - Retry failed operations
- `w=majority` - Wait for replication before confirming

---

## Testing Connection

### Using Node.js

Create `test-connection.js`:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    # List all databases
    const databases = await mongoose.connection.db.admin().listDatabases();
    console.log('📦 Databases:', databases.databases.map(db => db.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

require('dotenv').config();
connectDB();
```

Run:
```powershell
cd backend
node test-connection.js
```

### Using MongoDB Shell

```powershell
# For Atlas
mongosh "mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net"

# For Local
mongosh

# Show current database
db

# List all databases
show databases

# Exit
exit
```

---

## Common Issues

### "Cannot connect to MongoDB"
```
1. ❌ Wrong password in MONGO_URI
   → Copy again from Atlas
   
2. ❌ IP not whitelisted (Atlas)
   → Go to Security → Network Access → Add Current IP
   
3. ❌ Cluster starting/paused (Atlas)
   → Wait for "Active" status
   
4. ❌ Typo in connection string
   → Copy directly from Atlas interface
```

### "Authentication failed"
```
1. ❌ Wrong username/password
   → Reset in Database Access
   
2. ❌ Special characters not URL encoded
   → If password has @, !, %, etc., must be escaped
   → Use Atlas auto-generated password
```

### "Local MongoDB not running" (Windows)
```powershell
# Check service
Get-Service MongoDB

# Start service
Start-Service MongoDB

# Or use MongoDB as app (not service):
mongod
```

---

## Environment Variables Template

### Development (.env)
```env
# MongoDB Atlas
MONGO_URI=mongodb+srv://admin:password@cluster0.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority

# OR Local MongoDB
# MONGO_URI=mongodb://localhost:27017/neo-evolution

JWT_SECRET=your-dev-secret-key-min-32-chars
PORT=5001
NODE_ENV=development
```

### Production (.env.production)
```env
MONGO_URI=mongodb+srv://admin:PROD_PASSWORD@cluster0-prod.xxxxx.mongodb.net/neo-evolution?retryWrites=true&w=majority
JWT_SECRET=your-prod-secret-key-very-long-and-random-min-32-chars
PORT=5001
NODE_ENV=production
```

⚠️ **NEVER commit `.env` files!**

---

## Database Backup

### MongoDB Atlas Automatic
```
Dashboard → Deployment → Cloud Backups
→ Automatic daily backups (free tier: 7 days)
```

### Manual Export

```powershell
# Export to JSON
mongoexport --uri="connection-string" --collection=users --out=users.json

# Export to binary
mongodump --uri="connection-string" --out=./backup
```

### Restore

```powershell
# From JSON
mongoimport --uri="connection-string" --collection=users --file=users.json

# From binary
mongorestore --uri="connection-string" --dir=./backup
```

---

## Performance Tips

1. **Add Indexes** (for frequently queried fields)
   ```javascript
   userSchema.index({ email: 1 });
   userSchema.index({ createdAt: -1 });
   ```

2. **Connection Pooling** (Atlas default: 10-100)
   ```javascript
   mongoose.connect(uri, { maxPoolSize: 50 });
   ```

3. **Query Projection** (fetch only needed fields)
   ```javascript
   User.findById(id).select('name email');
   ```

4. **Pagination** (don't load all at once)
   ```javascript
   const limit = 10;
   const skip = (page - 1) * limit;
   Users.find().skip(skip).limit(limit);
   ```

---

## Production Checklist

- [ ] MongoDB Atlas cluster created and verified
- [ ] Network access configured (only production server IP)
- [ ] Database user created with strong password
- [ ] Automatic backups enabled
- [ ] Connection string stored securely (not in git)
- [ ] Tested connection before deploying
- [ ] Database indices created
- [ ] Connection pooling configured

---

## Need Help?

**Official Docs:**
- MongoDB Atlas: https://docs.mongodb.com/atlas/
- Mongoose: https://mongoosejs.com/docs/
- MongoDB Shell: https://www.mongodb.com/docs/mongodb-shell/

**Common Commands:**
```powershell
# Test connection
cd backend && node test-db.js

# Start server (uses MongoDB in .env)
npm start

# Upload seed data
npm run seed
```
