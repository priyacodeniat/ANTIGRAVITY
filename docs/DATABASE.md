# AgriAssist AI - Database Architecture & Schema Specification

The database engine is PostgreSQL 15+ hosted on Supabase.
All user tables enforce Row Level Security (RLS) to guarantee strict multi-tenant isolation.

---

## 1. Entity Relationship Overview

```
auth.users (Supabase Managed)
    │
    ├── 1:1 ──> public.profiles (Farmer Personal & Land Details)
    │
    ├── 1:N ──> public.advisory_history (Crop, Disease, Fertilizer, Irrigation Reports)
    │                │
    │                └── 1:N ──> public.uploaded_images (Scanned Leaf Photos)
    │
    └── 1:N ──> public.chat_conversations (Chatbot Session Threads)
                     │
                     └── 1:N ──> public.chat_messages (Turn-by-turn Messages)

public.crop_catalog (Public Read-only Knowledge Base)
```

---

## 2. Table Definitions

### 2.1 `public.profiles`
Stores agricultural profile and regional preferences of the registered farmer.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE` | Matches Supabase Auth User UUID |
| `full_name` | `TEXT` | `NOT NULL` | Farmer full name |
| `phone` | `TEXT` | `NULLABLE` | Contact phone number |
| `state` | `TEXT` | `NULLABLE` | State (e.g. Maharashtra, Punjab) |
| `district` | `TEXT` | `NULLABLE` | District (e.g. Nashik, Ludhiana) |
| `village` | `TEXT` | `NULLABLE` | Village or locality |
| `preferred_language` | `TEXT` | `NOT NULL DEFAULT 'en'` | Regional language code (`en`, `hi`, `kn`, `te`, `ta`, `ml`, `mr`) |
| `land_area` | `NUMERIC(12,2)` | `CHECK (land_area IS NULL OR land_area > 0)` | Total acreage / land size |
| `land_area_unit` | `TEXT` | `DEFAULT 'acre'` | `acre`, `hectare`, `bigha`, `guntha` |
| `soil_type` | `TEXT` | `NULLABLE` | Primary soil classification |
| `irrigation_availability` | `TEXT` | `NULLABLE` | Drip, Canal, Borewell, Rainfed |
| `farming_experience` | `TEXT` | `NULLABLE` | Years farming |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT NOW()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT NOW()` | Automatic update trigger timestamp |

### 2.2 `public.advisory_history`
Stores structured requests and responses for all agricultural AI advisory runs.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique report identifier |
| `user_id` | `UUID` | `NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE` | Owning farmer UUID |
| `advisory_type` | `TEXT` | `NOT NULL CHECK (advisory_type IN ('crop_recommendation', 'disease_detection', 'fertilizer_advisory', 'irrigation_advisory'))` | Advisory category |
| `request_data` | `JSONB` | `NOT NULL` | Input parameters supplied by farmer |
| `response_data` | `JSONB` | `NOT NULL` | Validated Gemini AI output payload |
| `ai_model` | `TEXT` | `NULLABLE` | Identifier of Gemini model used (`gemini-2.5-flash`) |
| `status` | `TEXT` | `NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'failed'))` | Execution status |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT NOW()` | Execution timestamp |

### 2.3 `public.chat_conversations` & `public.chat_messages`
Stores multi-turn conversational threads between the farmer and the Kisan AI Copilot.

- `chat_conversations`: Holds `id`, `user_id`, `title`, `language`, `created_at`, `updated_at`.
- `chat_messages`: Holds `id`, `conversation_id`, `user_id`, `role` (`user` | `assistant`), `content`, `created_at`.

### 2.4 `public.uploaded_images`
Maintains file storage references for crop leaves uploaded during disease detection runs.

- `id`: `UUID PRIMARY KEY`
- `user_id`: `UUID REFERENCES auth.users(id)`
- `advisory_id`: `UUID REFERENCES public.advisory_history(id)`
- `storage_path`: User-scoped path in Supabase Storage (`crop-images/<userId>/...`)
- `mime_type`: `image/jpeg`, `image/png`, `image/webp`
- `file_size`: Size in bytes (max 8,388,608 bytes)

### 2.5 `public.crop_catalog`
Reference catalog of Indian crops with botanical taxonomies, season alignments, and soil preferences.

---

## 3. Row Level Security (RLS) Policy Audit

| Table | Policy Name | Permitted Roles | Condition |
|---|---|---|---|
| `profiles` | Users can view own profile | `authenticated` | `auth.uid() = id` |
| `profiles` | Users can update own profile | `authenticated` | `auth.uid() = id` |
| `advisory_history` | Users can view own advisories | `authenticated` | `auth.uid() = user_id` |
| `advisory_history` | Users can delete own advisories | `authenticated` | `auth.uid() = user_id` |
| `chat_conversations` | Users can view own conversations | `authenticated` | `auth.uid() = user_id` |
| `chat_messages` | Users can view own messages | `authenticated` | `auth.uid() = user_id AND conversation belongs to user` |
| `uploaded_images` | Users can view own uploaded images | `authenticated` | `auth.uid() = user_id` |
| `crop_catalog` | Public read active crops | `public, authenticated` | `is_active = TRUE` |

