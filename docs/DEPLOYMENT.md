# AgriAssist AI - Production Deployment Guide

This guide details deployment options for production hosting.

---

## 1. Architecture Overview

- **Frontend**: Single Page Application (React + Vite) deployed to **Vercel**, **Netlify**, or **Cloudflare Pages**.
- **Backend**: Containerized Node.js Express API deployed to **Render**, **Railway**, **Fly.io**, or **AWS ECS / App Runner**.
- **Database & Auth**: Managed **Supabase** instance (PostgreSQL 15+).
- **AI Intelligence**: **Google Gemini API** (`@google/genai`).

---

## 2. Deploying the Backend API (e.g. Render / Railway)

### Environment Variables to Configure in Hosting Provider:
```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-domain.vercel.app
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash
MAX_IMAGE_SIZE_MB=8
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=60
```

### Build & Start Commands:
- **Build Command**: `cd server && npm install && npm run build`
- **Start Command**: `node server/dist/server.js`

### Health Check Path:
- `/api/v1/health`

---

## 3. Deploying the Frontend (e.g. Vercel)

### Environment Variables:
```env
VITE_API_BASE_URL=https://your-backend-api.onrender.com/api/v1
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Build Settings:
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Single Page Application Rewrite Rule (for `vercel.json`):
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 4. Production Security Hardening Checklist
- [ ] Strict CORS origin set to production client domain only.
- [ ] Supabase Service Role Key kept strictly in backend secrets.
- [ ] RLS policies verified on all tables.
- [ ] Rate limiting active on AI endpoints.
- [ ] HTTPS enforced across client and server.

