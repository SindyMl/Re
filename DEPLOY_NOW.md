# 🚀 Deploy to Vercel - Step by Step

## Issue Fixed: Root Directory Error

The Vercel CLI had a configuration issue. Let's deploy through the dashboard instead (easier anyway!).

---

## 📝 DEPLOYMENT STEPS

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Production ready - optimized and cleaned"
git push origin main
```

### Step 2: Fix Vercel Project Settings

Since the project was already created, we need to fix the root directory setting:

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/sindiswa-mulondos-projects/re

2. **Go to Settings:**
   - Click "Settings" tab
   - Click "General" in sidebar

3. **Fix Root Directory:**
   - Find "Root Directory" field
   - **Leave it EMPTY (blank)** - just delete everything in that field
   - OR if it won't let you leave it empty, put: `.` (single dot, NO `./`)
   - Click "Save"

4. **Verify Build Settings:**
   - Framework Preset: **Create React App**
   - Build Command: **npm run build**
   - Output Directory: **build**
   - Install Command: **npm install**

### Step 3: Add Environment Variables

1. **Still in Settings, click "Environment Variables"**

2. **Add these 3 variables:**

   **Variable 1:**
   - Key: `GMAIL_USER`
   - Value: `mudetorenee@gmail.com`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Key: `GMAIL_APP_PASSWORD`
   - Value: [Your 16-character Gmail App Password]
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 3:**
   - Key: `SALON_EMAIL`
   - Value: `mudetorenee@gmail.com`
   - Environment: ✅ Production, ✅ Preview, ✅ Development

3. **Click "Save"**

### Step 4: Deploy

1. **Go to "Deployments" tab**

2. **Click "Redeploy"** on the latest deployment
   - OR push a new commit to GitHub (triggers auto-deploy)

3. **Wait for build** (~2-3 minutes)

4. **Click "Visit" when done**

---

## 🎯 Get Gmail App Password

If you don't have it yet:

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already)
3. Go to: https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Windows Computer**
5. Click **Generate**
6. Copy the 16-character password (remove spaces)

---

## ✅ After Deployment

### Test Your Live Site:

1. **Visit:** `https://re-[random].vercel.app`

2. **Test Navigation:**
   - Click all menu items
   - Scroll through sections
   - Check mobile view

3. **Test Gallery:**
   - All 13 images load
   - Prices show correctly
   - Lightbox works

4. **Test Contact Form:**
   - Fill out booking form
   - Submit
   - Check mudetorenee@gmail.com for email
   - Customer should get confirmation

### Check Logs (if issues):

1. Dashboard → Deployments → Latest
2. Click "Functions"
3. Click `/api/book-appointment`
4. View execution logs

---

## 🔧 If Deploy Fails

**Build Errors:**
- Check build logs in Vercel
- Ensure all files committed to GitHub
- Try: `npm run build` locally first

**API Errors:**
- Verify environment variables are set
- Check all 3 variables are in Production
- Gmail App Password is correct (16 chars, no spaces)

**Images Not Loading:**
- Ensure all images in `/public/images/`
- Filenames match exactly (case-sensitive)

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Live website at Vercel URL
- ✅ Working booking system
- ✅ Professional design
- ✅ Mobile responsive
- ✅ Fast loading
- ✅ SSL certificate (https)
- ✅ Global CDN

---

## 📞 Current Project URL

Dashboard: https://vercel.com/sindiswa-mulondos-projects/re

After fixing root directory and redeploying, your site will be live!

---

**Quick Fix Summary:**
1. Go to Vercel Dashboard → Settings → General
2. **Delete everything in "Root Directory" field (leave it BLANK)**
3. Add 3 environment variables
4. Redeploy

Then your site will be live! 🚀
