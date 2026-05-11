# GitHub Setup Guide for Neo-Evolution Project

## Overview

This guide walks you through:
1. Creating a new GitHub repository
2. Connecting your local project
3. Pushing code
4. Setting up GitHub Secrets for deployments

---

## Step 1: Create GitHub Repository

### 1.1 Go to GitHub

Visit: https://github.com/new

### 1.2 Fill Repository Details

| Field | Value |
|-------|-------|
| Repository name | `Neo-Evo-Project-RENA` |
| Description | Space travel booking platform with Next.js and Express |
| Visibility | **Private** (or Public if you prefer) |
| Initialize with README | ❌ Uncheck (we have our own) |
| Add .gitignore | ❌ Uncheck (we have our own) |
| Add license | ❌ Skip for now |

### 1.3 Click "Create repository"

GitHub shows you the repository URL. Copy it for the next step.

---

## Step 2: Connect Local Project to GitHub

### 2.1 Open PowerShell

```powershell
cd c:\Coding\WebD\Neo_Evo_Project_RENA
```

### 2.2 Add Remote Repository

```powershell
git remote add origin https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git
```

**Replace `YOUR_USERNAME`** with your actual GitHub username.

### 2.3 Verify Remote

```powershell
git remote -v
```

Expected output:
```
origin  https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git (fetch)
origin  https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git (push)
```

---

## Step 3: Push Code to GitHub

### 3.1 Rename Default Branch (if needed)

```powershell
git branch -M main
```

### 3.2 Push to GitHub

```powershell
git push -u origin main
```

This:
- `-u` = Sets `origin/main` as upstream
- `origin` = Remote (GitHub)
- `main` = Branch name

### 3.3 Verify on GitHub

1. Go to https://github.com/YOUR_USERNAME/Neo-Evo-Project-RENA
2. You should see all your files!
3. Check recent commits in "Commits" tab

---

## Step 4: Daily Git Workflow

### Making Changes

```powershell
# Make changes to files...

# Check what changed
git status

# Add changes
git add .

# Or add specific files
git add backend/server.js frontend/src/app/page.tsx

# Commit
git commit -m "Feature: Add user authentication"

# Push to GitHub
git push origin main
```

### Good Commit Messages

```powershell
# ✅ Good
git commit -m "Feature: Add user profile page"
git commit -m "Fix: Resolve database connection timeout"
git commit -m "Docs: Update README with setup steps"

# ❌ Avoid
git commit -m "update"
git commit -m "changes"
git commit -m "asdf"
```

---

## Step 5: GitHub Secrets for Deployment

When deploying to Railway or similar platforms, you need to store secrets securely.

### 5.1 Go to Repository Settings

1. GitHub repo → **Settings** tab (top)
2. Left sidebar → **Secrets and variables** → **Actions**

### 5.2 Add Secrets

Click **"New repository secret"** for each:

| Secret | Example Value |
|--------|---------------|
| `MONGO_URI` | `mongodb+srv://admin:password@cluster.xxxxx.mongodb.net/neo-evolution` |
| `JWT_SECRET` | Your random 32+ char string |
| `RAILWAY_TOKEN` | Your Railway API token (get from Railway account) |

### 5.3 Using in GitHub Actions

Workflows can access secrets:

```yaml
# In .github/workflows/ci-cd.yml
env:
  MONGO_URI: ${{ secrets.MONGO_URI }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

---

## Step 6: Protect Your Main Branch

Prevent accidental breaking of production:

### 6.1 Enable Branch Protection

1. **Settings** → **Branches**
2. Click **"Add rule"** under "Branch protection rules"
3. Pattern: `main`

### 6.2 Check Settings

- ✅ Require a pull request before merging
- ✅ Dismiss stale reviews
- ✅ Require code review
- ✅ Require passing checks
- ✅ Require branches to be up to date

This ensures:
- Can't push directly to main
- Must create Pull Requests
- Reviews before merging

---

## Step 7: Using Branches for Development

### Create Feature Branch

```powershell
# Create and switch to new branch
git checkout -b feature/add-booking-form

# Make changes...
git add .
git commit -m "Feature: Add booking form component"

# Push branch to GitHub
git push origin feature/add-booking-form
```

### Create Pull Request (PR)

1. Go to GitHub repo
2. You'll see a yellow banner suggesting "Compare & pull request"
3. Click it
4. Add description
5. Click "Create pull request"

### Merge Pull Request

1. Get approval from team (if configured)
2. Click "Merge pull request"
3. Optionally "Squash and merge" to keep history clean

---

## Important: Protect Secrets

### ❌ Never Commit

```
.env           ← Local environment
.env.local     ← User-specific config
.env.production ← Production secrets
node_modules/  ← Dependencies
.git/          ← Git metadata
```

### ✅ Already Protected

These are in `.gitignore`:
```
# From root .gitignore
.env
.env.local
.env.*.local
node_modules/
```

### Verify

```powershell
# Check what would be committed
git status

# Check ignored files
git check-ignore -v .env
git check-ignore -v node_modules/
```

---

## Troubleshooting GitHub

### "Authentication failed" when pushing

```powershell
# Create authentication token
# 1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# 2. Generate new token with: repo, admin:repo_hook
# 3. Copy token

# Update remote to use token
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/Neo-Evo-Project-RENA.git

# Try push again
git push origin main
```

### "fatal: not a git repository"

```powershell
# You're not in the project directory?
cd c:\Coding\WebD\Neo_Evo_Project_RENA

# Reinitialize if needed
git init
git remote add origin https://...
```

### "Your branch is ahead of origin/main"

```powershell
# Push your commits
git push origin main
```

### "Rejected: fast-forward is not possible"

```powershell
# Pull latest changes first
git pull origin main

# Fix conflicts if any
# Then push
git push origin main
```

### Want to delete a branch?

```powershell
# Local
git branch -d feature/old-branch

# Remote
git push origin --delete feature/old-branch
```

---

## GitHub Features

### Issues

Use to track:
- Bugs
- Feature requests
- Tasks

```
GitHub repo → Issues → New issue
```

### Pull Requests

Review code before merging:
```
GitHub repo → Pull requests
```

### Discussions

Chat with team about features:
```
GitHub repo → Discussions
```

### Wiki

Document your project:
```
GitHub repo → Wiki
```

### Releases

Tag versions:
```powershell
git tag v1.0.0
git push origin v1.0.0

# Then create Release on GitHub UI
```

---

## Quick Command Reference

```powershell
# Basic workflow
git add .                           # Stage changes
git commit -m "message"             # Create snapshot
git push origin main                # Upload to GitHub

# Branches
git checkout -b feature/name        # Create branch
git checkout main                   # Switch branch
git branch -d feature/name          # Delete branch

# Sync with GitHub
git pull origin main                # Download latest
git fetch origin                    # Check for updates

# Undo changes
git restore filename                # Discard local changes
git reset HEAD~1                    # Undo last commit

# View history
git log --oneline -10               # Last 10 commits
git diff                            # See all changes
git status                          # Current state
```

---

## Production Deployment Checklist

- [ ] All code pushed to main branch on GitHub
- [ ] No secrets in committed files (.env in .gitignore)
- [ ] Branch protection rules enabled
- [ ] GitHub Actions workflow running successfully
- [ ] Secrets configured in GitHub Settings
- [ ] Railway connected to GitHub repo
- [ ] Auto-deploy on push enabled

---

## Next Steps

1. ✅ Create GitHub repo (Done!)
2. ✅ Push code (Done!)
3. Configure deployment (see DEPLOYMENT.md)
4. Set up CI/CD with GitHub Actions (see .github/workflows/ci-cd.yml)
5. Enable branch protection
6. Start using Issues and PRs

---

## Resources

- GitHub Docs: https://docs.github.com
- Git Commands: https://git-scm.com/docs
- GitHub Actions: https://docs.github.com/en/actions
- Commits Best Practices: https://www.conventional-commits.org/
