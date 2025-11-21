#!/bin/bash

echo "🔍 Checking Google OAuth Configuration..."
echo ""

# Check frontend .env
echo "📱 Frontend Configuration (.env):"
echo "================================"
if [ -f ".env" ]; then
    FRONTEND_CLIENT_ID=$(grep "VITE_GOOGLE_CLIENT_ID" .env | cut -d '=' -f2)
    if [ -z "$FRONTEND_CLIENT_ID" ]; then
        echo "❌ VITE_GOOGLE_CLIENT_ID is NOT set"
    else
        echo "✅ VITE_GOOGLE_CLIENT_ID is set: ${FRONTEND_CLIENT_ID:0:20}..."
    fi
else
    echo "❌ Frontend .env file NOT found"
fi
echo ""

# Check backend .env
echo "🔙 Backend Configuration (backend/.env):"
echo "========================================"
if [ -f "backend/.env" ]; then
    BACKEND_CLIENT_ID=$(grep "GOOGLE_CLIENT_ID=" backend/.env | cut -d '=' -f2)
    BACKEND_CLIENT_SECRET=$(grep "GOOGLE_CLIENT_SECRET=" backend/.env | cut -d '=' -f2)
    BACKEND_REDIRECT_URI=$(grep "GOOGLE_REDIRECT_URI=" backend/.env | cut -d '=' -f2)
    
    if [ -z "$BACKEND_CLIENT_ID" ]; then
        echo "❌ GOOGLE_CLIENT_ID is NOT set"
    else
        echo "✅ GOOGLE_CLIENT_ID is set: ${BACKEND_CLIENT_ID:0:20}..."
    fi
    
    if [ -z "$BACKEND_CLIENT_SECRET" ]; then
        echo "❌ GOOGLE_CLIENT_SECRET is NOT set"
    else
        echo "✅ GOOGLE_CLIENT_SECRET is set: ${BACKEND_CLIENT_SECRET:0:10}..."
    fi
    
    if [ -z "$BACKEND_REDIRECT_URI" ]; then
        echo "❌ GOOGLE_REDIRECT_URI is NOT set"
    else
        echo "✅ GOOGLE_REDIRECT_URI is set: $BACKEND_REDIRECT_URI"
    fi
else
    echo "❌ Backend .env file NOT found"
fi
echo ""

# Check if Client IDs match
echo "🔄 Checking Consistency:"
echo "======================="
if [ "$FRONTEND_CLIENT_ID" = "$BACKEND_CLIENT_ID" ]; then
    echo "✅ Frontend and Backend Client IDs MATCH"
else
    echo "❌ WARNING: Frontend and Backend Client IDs DON'T MATCH!"
    echo "   Frontend: ${FRONTEND_CLIENT_ID:0:20}..."
    echo "   Backend:  ${BACKEND_CLIENT_ID:0:20}..."
fi
echo ""

# Provide action items
echo "📋 Action Items:"
echo "==============="
echo ""
echo "1. Go to Google Cloud Console:"
echo "   https://console.cloud.google.com/apis/credentials"
echo ""
echo "2. Add this Authorized Redirect URI:"
echo "   $BACKEND_REDIRECT_URI"
echo ""
echo "3. Add these Authorized JavaScript Origins:"
echo "   http://localhost:5173"
echo "   http://localhost:3000"
echo ""
echo "4. Wait 5-10 minutes for changes to propagate"
echo ""
echo "5. Restart your dev servers"
echo ""
echo "📖 For detailed instructions, see: GOOGLE_OAUTH_SETUP.md"

