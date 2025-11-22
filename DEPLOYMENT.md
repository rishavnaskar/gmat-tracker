# 🚀 Deployment Guide: GitHub Pages

This guide will walk you through publishing your GMAT Study Tracker to GitHub and hosting it for free on GitHub Pages.

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Git installed on your computer (already done ✅)
- Your project files committed to git (already done ✅)

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `gmat-tracker` (or any name you prefer)
   - **Description**: "A beautiful GMAT study hours tracker with calendar, progress tracking, and achievements"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
5. Click **"Create repository"**

### Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
# Navigate to your project directory (if not already there)
cd "d:\Web_Development\Gmat Tracker"

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gmat-tracker.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note**: You'll be prompted for your GitHub username and password. For password, use a **Personal Access Token** (see Step 3 below).

### Step 3: Create a Personal Access Token (for authentication)

GitHub no longer accepts passwords for git operations. You need a Personal Access Token:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name like "GMAT Tracker Deployment"
4. Select scopes: Check **"repo"** (this gives full repository access)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. When pushing code, use this token as your password

### Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** (top menu)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **"Save"**

### Step 5: Access Your Live Website

1. GitHub will provide you with a URL like:
   ```
   https://YOUR_USERNAME.github.io/gmat-tracker/
   ```
2. It may take 1-2 minutes for the site to be available
3. You can find the URL in the repository Settings → Pages section

## Updating Your Website

Whenever you make changes to your project:

```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically update your website within 1-2 minutes!

## Troubleshooting

### Issue: "Repository not found" error
- Check that you've added the correct remote URL
- Verify your GitHub username is correct
- Make sure the repository exists on GitHub

### Issue: Authentication failed
- Use a Personal Access Token instead of password
- Make sure the token has "repo" scope

### Issue: Website shows 404
- Wait 1-2 minutes after enabling Pages
- Check that you selected the correct branch (main) and folder (/)
- Verify your `index.html` is in the root directory

### Issue: Website not updating
- Clear your browser cache
- Wait a few minutes for GitHub to rebuild
- Check repository Settings → Pages for any errors

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add a file named `CNAME` in your repository root with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Security Note

⚠️ **Important**: Since your repository is public, anyone can see your code. The reset password (`ihavecrackedgmat@123`) is visible in the code. Consider:
- Making the repository private (but this requires GitHub Pro for private Pages)
- Or changing the password to something more secure if you're concerned

---

**Congratulations!** Your GMAT Study Tracker is now live on the web! 🎉

