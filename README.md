# InnovatePitch - AI-Powered Pitch Practice Platform

An intelligent pitch practice platform that helps entrepreneurs refine their startup presentations through AI-powered feedback from virtual judges.

## ⚡ Quick Start

### Prerequisites

**Node.js 20.19+ or 22.12+ is required** (Vite requirement)

#### Using nvm (Recommended):
```bash
# Install the correct Node.js version
nvm install

# Use the version (automatic with shell integration)
nvm use
```

#### Check your Node.js version:
```bash
node --version
# Should show v20.19.5 or higher
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/310511/INNOVATE.git
   cd INNOVATE
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend
   cp .example.env .env
   # Edit .env and add your credentials
   
   # Backend
   cp backend/.example.env backend/.env
   # Edit backend/.env and add your credentials
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Frontend (runs on http://localhost:5173)
   npm run dev
   
   # Terminal 2 - Backend (runs on http://localhost:3000)
   cd backend && npm start
   ```

## 🚀 Features

- **AI Virtual Judges**: Practice pitches with AI-powered judges using ElevenLabs voice technology
- **Real-time Feedback**: Get instant feedback on your pitch performance
- **OAuth Integration**: Sign in with Google or LinkedIn
- **Pitch Recording**: Record and review your pitch sessions
- **Performance Tracking**: Track your progress over time
- **Startup Management**: Manage multiple startup profiles

## 🛠 Tech Stack

### Frontend
- React 19 + TypeScript
- Vite (with Rolldown)
- TailwindCSS + Radix UI
- React Router v7
- Axios for API calls

### Backend
- Node.js + Express
- PostgreSQL database
- JWT authentication
- AWS S3 for file storage
- ElevenLabs AI for voice synthesis

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_HOST=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_ELEVENLABS_AGENT_ID=your_elevenlabs_agent_id
```

### Backend (backend/.env)
```env
# Database
DB_USER=your_db_username
DB_HOST=localhost
DB=your_database_name
DB_PASSWORD=your_db_password
DB_PORT=5432

# SMTP/Email
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASSWORD=your_smtp_password
EMAIL_FROM=noreply@yourdomain.com

# JWT
JWT_SECRET=your_jwt_secret_key

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin/callback

# AWS S3
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=us-east-1

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🔧 Troubleshooting

### Node.js Version Error

If you see: `You are using Node.js 18.x. Vite requires Node.js version 20.19+ or 22.12+`

**Solution:**
```bash
# Switch to Node.js 20
nvm use 20

# Or install it first if needed
nvm install 20
nvm use 20
```

The `.nvmrc` file ensures the correct version is used automatically.

### Automatic Version Switching

Add this to your `~/.zshrc` or `~/.bashrc` for automatic version switching:

```bash
# Automatically use Node.js version from .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

## 📜 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start server
- `npm run dev` - Start with nodemon (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- Repository: [https://github.com/310511/INNOVATE](https://github.com/310511/INNOVATE)
- Issues: [https://github.com/310511/INNOVATE/issues](https://github.com/310511/INNOVATE/issues)

## 👥 Team

Built with ❤️ by the InnovatePitch team

---

**Note:** Make sure to never commit your `.env` files to version control. They are already included in `.gitignore`.
