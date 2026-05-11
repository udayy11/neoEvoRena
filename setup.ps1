# Neo-Evolution Project - Automated Setup Script
# Run this script to set up the project locally

param(
    [switch]$SkipNodeCheck,
    [switch]$SkipInstall
)

Write-Host "🚀 Neo-Evolution Project Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js installation
if (-not $SkipNodeCheck) {
    Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
    $nodeVersion = node --version 2>$null
    
    if (-not $nodeVersion) {
        Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
        Write-Host "Download from: https://nodejs.org/" -ForegroundColor White
        exit 1
    }
    
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
}

# Check Git installation
Write-Host ""
Write-Host "🔧 Checking Git installation..." -ForegroundColor Yellow
$gitVersion = git --version 2>$null

if (-not $gitVersion) {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/" -ForegroundColor White
    exit 1
}

Write-Host "✅ Git $gitVersion found" -ForegroundColor Green

# Install dependencies
if (-not $SkipInstall) {
    Write-Host ""
    Write-Host "📚 Installing dependencies..." -ForegroundColor Yellow
    
    Write-Host ""
    Write-Host "→ Backend dependencies..." -ForegroundColor Cyan
    Push-Location backend
    npm install
    Pop-Location
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Backend dependencies installed" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "→ Frontend dependencies..." -ForegroundColor Cyan
    Push-Location frontend
    npm install
    Pop-Location
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Frontend dependencies installed" -ForegroundColor Green
}

# Setup environment files
Write-Host ""
Write-Host "🔐 Setting up environment variables..." -ForegroundColor Yellow

if (-not (Test-Path "backend\.env")) {
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "✅ Created backend\.env from template" -ForegroundColor Green
        Write-Host "   ⚠️  Edit backend\.env with your MongoDB URI and JWT_SECRET" -ForegroundColor Yellow
    }
}

if (-not (Test-Path "frontend\.env.local")) {
    if (Test-Path "frontend\.env.local.example") {
        Copy-Item "frontend\.env.local.example" "frontend\.env.local"
        Write-Host "✅ Created frontend\.env.local from template" -ForegroundColor Green
    }
}

# Git configuration
Write-Host ""
Write-Host "📝 Configuring Git..." -ForegroundColor Yellow

if ($null -eq (git config user.name)) {
    Write-Host "Enter your Git name:" -ForegroundColor Cyan
    $name = Read-Host
    git config user.name "$name"
}

if ($null -eq (git config user.email)) {
    Write-Host "Enter your Git email:" -ForegroundColor Cyan
    $email = Read-Host
    git config user.email "$email"
}

Write-Host "✅ Git configured" -ForegroundColor Green

# Show next steps
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Configure database:" -ForegroundColor White
Write-Host "   → Edit 'backend\.env'" -ForegroundColor Gray
Write-Host "   → Add your MongoDB Atlas connection string" -ForegroundColor Gray
Write-Host "   → Add a secure JWT_SECRET" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Start backend server:" -ForegroundColor White
Write-Host "   → cd backend && npm start" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Start frontend (new terminal):" -ForegroundColor White
Write-Host "   → cd frontend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Open browser:" -ForegroundColor White
Write-Host "   → http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   → SETUP.md - Full setup guide" -ForegroundColor Gray
Write-Host "   → DEPLOYMENT.md - Deployment guide" -ForegroundColor Gray
Write-Host ""
