# Vercel Environment Variables Setup

## Problem
The booking form shows "Network error" because the API on Vercel is missing required environment variables.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com
2. Log in to your account
3. Find your project: **re** (or search for `re-nine-theta.vercel.app`)
4. Click on the project

### Step 2: Add Environment Variables
1. Click on **Settings** tab
2. Click on **Environment Variables** in the left sidebar
3. Add these variables one by one:

#### Required Variables (for Gmail email service):

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `GMAIL_USER` | `mudetorenee@gmail.com` | Production, Preview, Development |
| `GMAIL_APP_PASSWORD` | `renee10v3` | Production, Preview, Development |
| `SALON_EMAIL` | `mudetorenee@gmail.com` | Production, Preview, Development |

#### How to Add Each Variable:
1. Click **Add New** button
2. Enter the **Name** (e.g., `GMAIL_USER`)
3. Enter the **Value** (e.g., `mudetorenee@gmail.com`)
4. Select all environments: ✅ Production ✅ Preview ✅ Development
5. Click **Save**
6. Repeat for all three variables

### Step 3: Redeploy Your Site
After adding the environment variables:

1. Go to the **Deployments** tab
2. Find the most recent deployment
3. Click the three dots menu (...) on the right
4. Click **Redeploy**
5. Confirm the redeployment

**OR** Simply push a new commit to trigger automatic redeployment:
```bash
git add .
git commit -m "Update environment variables"
git push
```

### Step 4: Test the Booking Form
1. Go to https://re-nine-theta.vercel.app
2. Scroll to the booking form
3. Fill in all fields
4. Click "Book Appointment"
5. You should see a success message!

## Alternative: Use Vercel CLI (if installed)

```bash
# Add environment variables via CLI
vercel env add GMAIL_USER production
# Enter: mudetorenee@gmail.com

vercel env add GMAIL_APP_PASSWORD production
# Enter: renee10v3

vercel env add SALON_EMAIL production
# Enter: mudetorenee@gmail.com

# Pull the environment variables locally
vercel env pull

# Redeploy
vercel --prod
```

## Why This Happened
- The API code expects these environment variables to send emails
- Without them, the API fails and returns an error
- The error is caught by the frontend, showing "Network error"

## Notes on Gmail App Password
⚠️ **Important**: The password `renee10v3` appears to be a regular Gmail password. For security and functionality, you should:

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Create a new App Password specifically for "Mail"
5. Use that 16-character password instead

This is more secure and works better with automated systems.
