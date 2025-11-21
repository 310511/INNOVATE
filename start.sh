#!/bin/bash

# InnovatePitch Development Server Startup Script
# This script ensures the correct Node.js version is used

echo "🚀 Starting InnovatePitch..."
echo ""

# Check if nvm is available
if ! command -v nvm &> /dev/null; then
    echo "⚠️  nvm is not available in this shell session"
    echo "Loading nvm..."
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Switch to the correct Node.js version
echo "📦 Switching to Node.js 20..."
nvm use 20

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to switch to Node.js 20"
    echo "Installing Node.js 20..."
    nvm install 20
    nvm use 20
fi

echo ""
echo "✅ Using Node.js $(node --version)"
echo ""
echo "🌐 Starting development server..."
echo "   Frontend will be available at: http://localhost:5173"
echo ""

# Start the dev server
npm run dev

