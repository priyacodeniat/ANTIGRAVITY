-- Enable necessary cryptographic extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables with cascade if recreating
DROP TABLE IF EXISTS public.advisory_logs CASCADE;
DROP TABLE IF EXISTS public.disease_diagnoses CASCADE;
DROP TABLE IF EXISTS public.irrigation_spray_schedules CASCADE;
DROP TABLE IF EXISTS public.crop_cycles CASCADE;
DROP TABLE IF EXISTS public.soil_tests CASCADE;
DROP TABLE IF EXISTS public.plots CASCADE;
DROP TABLE IF EXISTS public.farms CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop custom types if recreating
DROP TYPE IF EXISTS public.farming_method_type CASCADE;
DROP TYPE IF EXISTS public.irrigation_type CASCADE;
DROP TYPE IF EXISTS public.crop_stage_type CASCADE;
DROP TYPE IF EXISTS public.pathogen_type CASCADE;
DROP TYPE IF EXISTS public.spray_recommendation_type CASCADE;

-- 1. Create Custom Enums
CREATE TYPE public.farming_method_type AS ENUM ('CONVENTIONAL', 'ORGANIC', 'ZBNF', 'PRECISION_FERTIGATION');
CREATE TYPE public.irrigation_type AS ENUM ('DRIP', 'SPRINKLER', 'FLOOD', 'CANAL', 'RAIN_FED', 'BOREWELL');
CREATE TYPE public.crop_stage_type AS ENUM ('GERMINATION', 'VEGETATIVE', 'TILLERING', 'FLOWERING', 'FRUITING', 'GRAIN_FILLING', 'MATURITY', 'HARVESTED');
CREATE TYPE public.pathogen_type AS ENUM ('FUNGAL', 'BACTERIAL', 'VIRAL', 'PEST_INFESTATION', 'NUTRIENT_DEFICIENCY', 'PHYSIOLOGICAL_DISORDER', 'HEALTHY');
CREATE TYPE public.spray_recommendation_type AS ENUM ('OPTIMAL', 'ACCEPTABLE_WITH_CAUTION', 'STRICTLY_PROHIBITED');

-- 2. Profiles Table (Extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(25),
    preferred_language VARCHAR(10) DEFAULT 'en',
    state_province VARCHAR(100) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Farms Table
CREATE TABLE public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    total_area_acres NUMERIC(8, 2) NOT NULL CHECK (total_area_acres > 0),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    village_locality VARCHAR(150),
    district VARCHAR(100),
    farming_method public.farming_method_type DEFAULT 'CONVENTIONAL' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. Plots Table (Sub-parcels within a farm)
CREATE TABLE public.plots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    area_acres NUMERIC(8, 2) NOT NULL CHECK (area_acres > 0),
    soil_type VARCHAR(100) NOT NULL,
    primary_irrigation public.irrigation_type DEFAULT 'DRIP' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. Soil Tests Table
CREATE TABLE public.soil_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plot_id UUID NOT NULL REFERENCES public.plots(id) ON DELETE CASCADE,
    sample_date DATE NOT NULL,
    ph NUMERIC(4, 2) NOT NULL CHECK (ph BETWEEN 3.0 AND 11.0),
    ec_ds_m NUMERIC(5, 2) NOT NULL CHECK (ec_ds_m >= 0),
    organic_carbon_percent NUMERIC(4, 2) NOT NULL CHECK (organic_carbon_percent >= 0),
    nitrogen_kg_ha NUMERIC(6, 2) NOT NULL CHECK (nitrogen_kg_ha >= 0),
    phosphorus_kg_ha NUMERIC(6, 2) NOT NULL CHECK (phosphorus_kg_ha >= 0),
    potassium_kg_ha NUMERIC(6, 2) NOT NULL CHECK (potassium_kg_ha >= 0),
    sulfur_ppm NUMERIC(6, 2) DEFAULT 0 CHECK (sulfur_ppm >= 0),
    zinc_ppm NUMERIC(6, 2) DEFAULT 0 CHECK (zinc_ppm >= 0),
    boron_ppm NUMERIC(6, 2) DEFAULT 0 CHECK (boron_ppm >= 0),
    iron_ppm NUMERIC(6, 2) DEFAULT 0 CHECK (iron_ppm >= 0),
    ai_interpretation JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. Crop Cycles Table
CREATE TABLE public.crop_cycles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plot_id UUID NOT NULL REFERENCES public.plots(id) ON DELETE CASCADE,
    crop_name VARCHAR(100) NOT NULL,
    crop_variety VARCHAR(100),
    sowing_date DATE NOT NULL,
    expected_harvest_date DATE,
    current_stage public.crop_stage_type DEFAULT 'GERMINATION' NOT NULL,
    target_yield_quintals NUMERIC(8, 2),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. Disease Diagnoses Table (Multimodal Visual Scans)
CREATE TABLE public.disease_diagnoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_cycle_id UUID NOT NULL REFERENCES public.crop_cycles(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    symptoms_observed TEXT,
    diagnosis_name VARCHAR(200) NOT NULL,
    pathogen_type public.pathogen_type NOT NULL,
    confidence_score NUMERIC(5, 4) NOT NULL CHECK (confidence_score BETWEEN 0.0 AND 1.0),
    organic_remedies JSONB NOT NULL,
    chemical_remedies JSONB NOT NULL,
    preventive_actions JSONB NOT NULL,
    raw_ai_response JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 8. Irrigation & Spraying Schedules Table
CREATE TABLE public.irrigation_spray_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crop_cycle_id UUID NOT NULL REFERENCES public.crop_cycles(id) ON DELETE CASCADE,
    forecast_date DATE NOT NULL,
    temperature_celsius NUMERIC(4, 1) NOT NULL,
    humidity_percent NUMERIC(4, 1) NOT NULL,
    rain_probability_percent NUMERIC(4, 1) NOT NULL,
    wind_speed_kmh NUMERIC(4, 1) NOT NULL,
    spray_recommendation public.spray_recommendation_type NOT NULL,
    spray_window_reasoning TEXT NOT NULL,
    irrigation_volume_liters_per_acre NUMERIC(10, 2) DEFAULT 0 NOT NULL,
    irrigation_runtime_minutes INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 9. Advisory Logs (Chat & Conversational Inferences)
CREATE TABLE public.advisory_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    crop_cycle_id UUID REFERENCES public.crop_cycles(id) ON DELETE SET NULL,
    query_text TEXT NOT NULL,
    response_text TEXT NOT NULL,
    query_mode VARCHAR(20) DEFAULT 'TEXT' CHECK (query_mode IN ('TEXT', 'VOICE')),
    tokens_consumed INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 10. Performance Indexes
CREATE INDEX idx_farms_user_id ON public.farms(user_id);
CREATE INDEX idx_plots_farm_id ON public.plots(farm_id);
CREATE INDEX idx_soil_tests_plot_id ON public.soil_tests(plot_id);
CREATE INDEX idx_crop_cycles_plot_id ON public.crop_cycles(plot_id);
CREATE INDEX idx_crop_cycles_active ON public.crop_cycles(is_active);
CREATE INDEX idx_disease_diagnoses_crop_id ON public.disease_diagnoses(crop_cycle_id);
CREATE INDEX idx_schedules_crop_id_date ON public.irrigation_spray_schedules(crop_cycle_id, forecast_date);
CREATE INDEX idx_advisory_logs_user_id ON public.advisory_logs(user_id);

-- 11. Automatic Updated_at Timestamp Triggers
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_farms_timestamp BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_plots_timestamp BEFORE UPDATE ON public.plots FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_crop_cycles_timestamp BEFORE UPDATE ON public.crop_cycles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 12. Enable Row Level Security (RLS) across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.irrigation_spray_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisory_logs ENABLE ROW LEVEL SECURITY;

-- 13. RLS Security Policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users manage own farms"
    ON public.farms FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own plots"
    ON public.plots FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.farms
            WHERE farms.id = plots.farm_id
            AND farms.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.farms
            WHERE farms.id = plots.farm_id
            AND farms.user_id = auth.uid()
        )
    );

CREATE POLICY "Users manage own soil tests"
    ON public.soil_tests FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.plots
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE plots.id = soil_tests.plot_id
            AND farms.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.plots
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE plots.id = soil_tests.plot_id
            AND farms.user_id = auth.uid()
        )
    );

CREATE POLICY "Users manage own crop cycles"
    ON public.crop_cycles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.plots
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE plots.id = crop_cycles.plot_id
            AND farms.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.plots
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE plots.id = crop_cycles.plot_id
            AND farms.user_id = auth.uid()
        )
    );

CREATE POLICY "Users manage own diagnoses"
    ON public.disease_diagnoses FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.crop_cycles
            JOIN public.plots ON plots.id = crop_cycles.plot_id
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE crop_cycles.id = disease_diagnoses.crop_cycle_id
            AND farms.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.crop_cycles
            JOIN public.plots ON plots.id = crop_cycles.plot_id
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE crop_cycles.id = disease_diagnoses.crop_cycle_id
            AND farms.user_id = auth.uid()
        )
    );

CREATE POLICY "Users manage own schedules"
    ON public.irrigation_spray_schedules FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.crop_cycles
            JOIN public.plots ON plots.id = crop_cycles.plot_id
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE crop_cycles.id = irrigation_spray_schedules.crop_cycle_id
            AND farms.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.crop_cycles
            JOIN public.plots ON plots.id = crop_cycles.plot_id
            JOIN public.farms ON farms.id = plots.farm_id
            WHERE crop_cycles.id = irrigation_spray_schedules.crop_cycle_id
            AND farms.user_id = auth.uid()
        )
    );

CREATE POLICY "Users manage own advisory logs"
    ON public.advisory_logs FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
