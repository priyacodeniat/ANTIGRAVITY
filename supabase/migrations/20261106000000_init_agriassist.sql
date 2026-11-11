-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if recreating in clean slate
DROP TABLE IF EXISTS public.uploaded_images CASCADE;
DROP TABLE IF EXISTS public.chat_messages CASCADE;
DROP TABLE IF EXISTS public.chat_conversations CASCADE;
DROP TABLE IF EXISTS public.advisory_history CASCADE;
DROP TABLE IF EXISTS public.crop_catalog CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    state TEXT,
    district TEXT,
    village TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    land_area NUMERIC(12,2),
    land_area_unit TEXT DEFAULT 'acre',
    soil_type TEXT,
    irrigation_availability TEXT,
    farming_experience TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_land_area CHECK (land_area IS NULL OR land_area > 0)
);

-- 2. Advisory History Table
CREATE TABLE public.advisory_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    advisory_type TEXT NOT NULL,
    request_data JSONB NOT NULL,
    response_data JSONB NOT NULL,
    ai_model TEXT,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_advisory_type CHECK (
        advisory_type IN (
            'crop_recommendation',
            'disease_detection',
            'fertilizer_advisory',
            'irrigation_advisory'
        )
    ),
    CONSTRAINT valid_advisory_status CHECK (status IN ('completed', 'failed'))
);

-- 3. Chat Conversations Table
CREATE TABLE public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'New Conversation',
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Chat Messages Table
CREATE TABLE public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_chat_role CHECK (role IN ('user', 'assistant'))
);

-- 5. Crop Catalog Table
CREATE TABLE public.crop_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_name TEXT NOT NULL,
    scientific_name TEXT,
    category TEXT NOT NULL,
    suitable_soil_types TEXT[],
    suitable_seasons TEXT[],
    water_requirement TEXT,
    growth_duration_days INTEGER,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Uploaded Images Table
CREATE TABLE public.uploaded_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    advisory_id UUID REFERENCES public.advisory_history(id) ON DELETE SET NULL,
    storage_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 8388608)
);

-- 7. Database Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(state, district);
CREATE INDEX IF NOT EXISTS idx_advisory_user_created ON public.advisory_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_advisory_type ON public.advisory_history(advisory_type);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user ON public.chat_conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conv_created ON public.chat_messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_uploaded_images_user ON public.uploaded_images(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crop_catalog_category_active ON public.crop_catalog(category, is_active);

-- 8. Updated_at Trigger Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_chat_conversations_timestamp
    BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 9. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_catalog ENABLE ROW LEVEL SECURITY;

-- 10. RLS Security Policies

-- Profiles Policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Advisory History Policies
CREATE POLICY "Users can view own advisories"
    ON public.advisory_history FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own advisories"
    ON public.advisory_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own advisories"
    ON public.advisory_history FOR DELETE
    USING (auth.uid() = user_id);

-- Chat Conversations Policies
CREATE POLICY "Users can view own conversations"
    ON public.chat_conversations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
    ON public.chat_conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations"
    ON public.chat_conversations FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations"
    ON public.chat_conversations FOR DELETE
    USING (auth.uid() = user_id);

-- Chat Messages Policies (Verifies message ownership AND conversation ownership)
CREATE POLICY "Users can view own conversation messages"
    ON public.chat_messages FOR SELECT
    USING (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.chat_conversations
            WHERE chat_conversations.id = chat_messages.conversation_id
            AND chat_conversations.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert own conversation messages"
    ON public.chat_messages FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.chat_conversations
            WHERE chat_conversations.id = chat_messages.conversation_id
            AND chat_conversations.user_id = auth.uid()
        )
    );

-- Uploaded Images Policies
CREATE POLICY "Users can view own uploaded images"
    ON public.uploaded_images FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own uploaded images"
    ON public.uploaded_images FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own uploaded images"
    ON public.uploaded_images FOR DELETE
    USING (auth.uid() = user_id);

-- Crop Catalog Policies (Public read for active crops, modifications restricted)
CREATE POLICY "Authenticated and anonymous users can read active crop catalog"
    ON public.crop_catalog FOR SELECT
    USING (is_active = TRUE);

