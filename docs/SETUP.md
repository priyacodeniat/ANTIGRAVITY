# AgriAssist AI - Local Setup & Configuration Guide

Follow these step-by-step instructions to initialize and run AgriAssist AI locally.

---

## 1. Prerequisites

- **Node.js**: v20.x or higher LTS (`node -v`)
- **npm**: v10.x or higher (`npm -v`)
- **Google Gemini API Key**: Obtain from [Google AI Studio](https://aistudio.google.com/)
- **Supabase Account & Project**: Create a free project at [supabase.com](https://supabase.com/)

---

## 2. Supabase Configuration

### Step 2.1: Run Database Migration
1. Open your Supabase Project Dashboard.
2. Navigate to the **SQL Editor** on the left menu.
3. Open the file `supabase/migrations/20261106000000_init_agriassist.sql` from this repository.
4. Paste and click **Run** to provision the tables, triggers, and Row Level Security (RLS) policies.

### Step 2.2: Seed Crop Catalog
1. In the Supabase SQL Editor, open `supabase/seed.sql`.
2. Paste and click **Run** to populate standard Indian crops (Wheat, Rice, Cotton, Soybean, Tomato, etc.).

### Step 2.3: Storage Bucket (For Disease Scan Images)
1. Go to **Storage** in your Supabase dashboard.
2. Create a new bucket named: `crop-images`.
3. Set the bucket to **Private**.
4. In Storage Policies, add an RLS policy:
   - Allow authenticated users to upload and read files where the folder path starts with their `auth.uid()`.

---

## 3. Environment Variables Setup

### Backend: `server/.env`
Copy `server/.env.example` to `server/.env`:
```bash
cp server/.env.example server/.env
```
Fill in the values:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173

# From your Supabase Project Settings -> API
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1...

# From Google AI Studio
GEMINI_API_KEY=AIzaSy...
GEMINI_MODEL=gemini-2.5-flash

MAX_IMAGE_SIZE_MB=8
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=60
```

### Frontend: `client/.env`
Copy `client/.env.example` to `client/.env`:
```bash
cp client/.env.example client/.env
```
Fill in the values:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
```

---

## 4. Install Dependencies

In the root repository folder:
```bash
# Install root, server, and client dependencies
npm run install:all
```
Or manually in each directory:
```bash
cd server && npm install
cd ../client && npm install
```

---

## 5. Running the Application

### Development Mode (Concurrent)
Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
*Backend runs at `http://localhost:5000` (API: `http://localhost:5000/api/v1`)*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*Frontend runs at `http://localhost:5173`*

---

## 6. Verification Steps
1. Navigate to `http://localhost:5173`.
2. Click **"Explore Demo Account"** to test immediately without signing up, OR register a new account.
3. Test **Crop Recommendation**: Enter state, soil type, and season to see the top 5 crops.
4. Test **Crop Disease Lab**: Upload any plant leaf image to verify multimodal Gemini vision diagnosis.
5. Test **Kisan AI Copilot**: Type a question in Hindi or English, or click the mic button to speak.

