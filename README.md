# 🌾 AgriAssist AI - Production-Grade Agriculture Crop Advisory Platform

> An intelligent, full-stack, mobile-first precision agriculture advisory assistant designed specifically for Indian farmers. Powered by **Google Gemini AI** (`@google/genai`), **Supabase** (PostgreSQL + Auth + Storage), **Express.js**, and **React 18 + Vite + Tailwind CSS**.

---

## 🌟 Key Features

1. **AI-Based Crop Recommendation**:
   - Location-aware, soil-aware, and season-aware suitability scoring.
   - Recommends top 5 crops, sowing periods, water requirements, and risk factors.
2. **Crop Disease & Pest Vision Lab**:
   - Multimodal image scan of damaged leaves, stems, and fruits using `gemini-2.5-flash`.
   - Dual-remedy approach: Biological/Organic solutions alongside Integrated Pest Management (IPM) chemical solutions with Pre-Harvest Intervals (PHI) and safety warnings.
3. **Fertilizer & Balanced Nutrition Advisory**:
   - NPK balance calculator tailored to crop growth stage and soil test results.
4. **Precision Irrigation Guidance**:
   - Water depletion evaluation, visual signs of moisture stress vs waterlogging, and water conservation practices.
5. **Kisan AI Copilot (Chat & Voice)**:
   - Multilingual conversational assistant supporting **7 Indian languages**: English, Hindi (हिन्दी), Kannada (ಕನ್ನಡ), Telugu (తెలుగు), Tamil (தமிழ்), Malayalam (മലയാളം), and Marathi (मराठी).
   - Web Speech API integration for speech-to-text input.
6. **Multi-Tenant Security & Advisory History**:
   - Supabase Auth integration with strict PostgreSQL Row Level Security (RLS) on 100% of tables.
   - Comprehensive historical advisory logs and printable report dossier view.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router v6, React Hook Form, Zod |
| **Backend** | Node.js 20+ LTS, Express.js, TypeScript, Helmet, CORS, Rate-Limiting, Multer |
| **AI Engine** | Google Gemini API via official `@google/genai` SDK (`gemini-2.5-flash`) |
| **Database & Auth** | Supabase (PostgreSQL 15+), Row Level Security (RLS), Supabase Storage |
| **Validation** | Zod (End-to-end typed schema validation for both request payloads and AI responses) |

---

## 📁 Repository Structure

```
agri-assist/
├── client/                     # Frontend Application (React 18 + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Common, Layout, Crop, Disease, Fertilizer, Irrigation, Chatbot
│   │   ├── context/            # AuthContext, LanguageContext
│   │   ├── hooks/              # useSpeechRecognition, useAuth
│   │   ├── i18n/               # Translations for en, hi, kn, te, ta, ml, mr
│   │   ├── pages/              # Landing, Auth, Dashboard, Advisory Modules, History, Profile
│   │   ├── services/           # Axios API client & Supabase
│   │   └── types/              # Full TypeScript contracts
│   └── package.json
│
├── server/                     # Backend API (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── config/             # Gemini SDK, Supabase Admin, Env validation
│   │   ├── controllers/        # Profile, Advisory, Chat, History, Crops
│   │   ├── middleware/         # Auth, Zod Validation, Rate Limiter, Multer Upload, Error
│   │   ├── prompts/            # System & structured prompts for all AI modules
│   │   ├── routes/             # Express API v1 routes
│   │   ├── schemas/            # Zod schemas for input validation & AI response parsing
│   │   ├── services/           # Gemini AI & Advisory domain business logic
│   │   └── server.ts           # Server bootstrap
│   └── package.json
│
├── supabase/
│   ├── migrations/             # Production PostgreSQL schema, indexes, RLS policies
│   └── seed.sql                # Comprehensive Indian crop catalog seed data
│
└── docs/                       # Architectural & operational documentation
    ├── API.md                  # RESTful API specification with sample payloads
    ├── DATABASE.md             # Entity relationships, schema tables, RLS policy audit
    ├── SETUP.md                # Local environment setup instructions
    └── DEPLOYMENT.md           # Production deployment instructions (Vercel + Render)
```

---

## 🚀 Quick Start Guide

### 1. Database Setup
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Execute `supabase/migrations/20261106000000_init_agriassist.sql` in your Supabase SQL Editor.
3. Execute `supabase/seed.sql` to populate the crop catalog.
4. Create a private storage bucket named `crop-images`.

### 2. Configure Environment Variables
- In `server/`: copy `.env.example` to `.env` and provide `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `GEMINI_API_KEY`.
- In `client/`: copy `.env.example` to `.env` and provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

### 3. Run Locally
```bash
# Terminal 1: Backend Server
cd server
npm install
npm run dev

# Terminal 2: Frontend Client
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

