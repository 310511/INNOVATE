# Google OAuth Setup Guide

## 🔴 Error: redirect_uri_mismatch

This error occurs when the redirect URI in your Google Cloud Console doesn't match the one being used by your application.

## ✅ Step-by-Step Fix

### 1. Go to Google Cloud Console

Navigate to: [https://console.cloud.google.com/](https://console.cloud.google.com/)

### 2. Select Your Project

Click on the project dropdown at the top and select your project (or create a new one if needed).

### 3. Navigate to OAuth Consent Screen (First Time Setup)

If you haven't set this up yet:

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have a Google Workspace)
3. Fill in the required fields:
   - App name: `InnovatePitch`
   - User support email: Your email
   - Developer contact email: Your email
4. Click **Save and Continue**
5. Skip the Scopes section (click **Save and Continue**)
6. Add test users (add `utsavgautam0000@gmail.com` and any other emails you want to test with)
7. Click **Save and Continue**

### 4. Create or Edit OAuth 2.0 Client ID

1. Go to **APIs & Services** → **Credentials**
2. If you already have a Client ID:
   - Click on your **OAuth 2.0 Client ID** name
3. If you don't have one:
   - Click **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Choose **Web application**
   - Name it: `InnovatePitch Web Client`

### 5. Configure Authorized Redirect URIs

**CRITICAL:** Add these exact URIs in the **Authorized redirect URIs** section:

For Development:
```
http://localhost:5173
```

For Production (add these later):
```
https://yourdomain.com
https://www.yourdomain.com
```

### 6. Configure Authorized JavaScript Origins

Add these in the **Authorized JavaScript origins** section:

For Development:
```
http://localhost:5173
http://localhost:3000
```

For Production (add later):
```
https://yourdomain.com
https://www.yourdomain.com
```

### 7. Save and Copy Credentials

1. Click **Save**
2. Copy your **Client ID**
3. Copy your **Client Secret**

### 8. Update Your Environment Variables

#### Frontend (.env)
```env
VITE_HOST=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_client_id_here
VITE_ELEVENLABS_AGENT_ID=your_agent_id_here
```

#### Backend (backend/.env)
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5173
```

**⚠️ IMPORTANT:** The `GOOGLE_CLIENT_ID` must be the SAME in both frontend and backend!

### 9. Restart Your Servers

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd backend && npm start
```

### 10. Test the OAuth Flow

1. Go to `http://localhost:5173`
2. Click "Sign in with Google"
3. You should see the Google consent screen
4. Sign in and authorize the app

## 🔍 Troubleshooting

### Error: "Access blocked: This app's request is invalid"

**Cause:** The redirect URI in Google Cloud Console doesn't match.

**Solution:** 
- Make sure `http://localhost:5173` is added EXACTLY as shown (no trailing slash)
- Wait 5-10 minutes after saving changes in Google Cloud Console

### Error: "The redirect URI in the request did not match a registered redirect URI"

**Cause:** Mismatch between environment variable and Google Cloud Console.

**Solution:**
- Check that `GOOGLE_REDIRECT_URI=http://localhost:5173` in backend/.env
- Verify the same URI is in Google Cloud Console
- Make sure there are no extra spaces or characters

### Error: "This app isn't verified"

**Solution:** This is normal for development. Click "Advanced" → "Go to InnovatePitch (unsafe)"
- In production, you'll need to verify your app with Google

### Error: "Access blocked: Authorization Error"

**Solution:** 
- Go to OAuth consent screen in Google Cloud Console
- Add your email as a test user
- Make sure the OAuth consent screen is configured properly

## 📝 Current Configuration

Your app is configured with:
- **Frontend URL:** `http://localhost:5173`
- **Backend URL:** `http://localhost:3000`
- **OAuth Flow:** Authorization Code Flow
- **Redirect URI:** `http://localhost:5173` (where Google redirects the user)

The flow works like this:
1. User clicks "Sign in with Google" on frontend
2. Google authenticates the user
3. Google redirects back to `http://localhost:5173` with an authorization code
4. Frontend sends the code to backend (`POST /api/auth/google`)
5. Backend exchanges code for tokens and creates/authenticates user
6. User is logged in

## 🚀 Production Setup

When deploying to production, you'll need to:

1. Add your production domain to Google Cloud Console:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com`

2. Update your production environment variables:
   ```env
   GOOGLE_REDIRECT_URI=https://yourdomain.com
   FRONTEND_URL=https://yourdomain.com
   ```

3. Submit your app for verification (if you want to remove the "unverified app" warning)

## 📞 Need Help?

If you're still having issues:
1. Check that the Client ID is the same in both frontend and backend
2. Make sure you've added `http://localhost:5173` to Authorized redirect URIs
3. Wait 5-10 minutes after making changes in Google Cloud Console
4. Clear your browser cache and try again
5. Try in an incognito window

---

**Last Updated:** November 2024

