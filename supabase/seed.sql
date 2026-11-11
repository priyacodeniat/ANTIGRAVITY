-- Seed Data for Crop Catalog
INSERT INTO public.crop_catalog (
    crop_name, scientific_name, category, suitable_soil_types, suitable_seasons, water_requirement, growth_duration_days, description, is_active
) VALUES
-- Cereals
(
    'Rice (Paddy)', 'Oryza sativa', 'Cereals',
    ARRAY['Clay soil', 'Clay loam', 'Alluvial soil', 'Silty soil'],
    ARRAY['kharif', 'zaid'],
    'high', 130,
    'Primary staple crop of India requiring high water availability and fertile clayey or alluvial soils with high water holding capacity.',
    TRUE
),
(
    'Wheat', 'Triticum aestivum', 'Cereals',
    ARRAY['Loamy soil', 'Clay loam', 'Alluvial soil', 'Black soil'],
    ARRAY['rabi'],
    'medium', 120,
    'Crucial rabi cereal crop thriving in cool winters and well-drained loamy soils. Requires 4-6 timely irrigations.',
    TRUE
),
(
    'Maize (Corn)', 'Zea mays', 'Cereals',
    ARRAY['Loamy soil', 'Red soil', 'Alluvial soil', 'Sandy loam'],
    ARRAY['kharif', 'rabi', 'zaid'],
    'medium', 100,
    'Versatile cereal crop requiring warm climate and fertile, well-drained soils. Highly sensitive to waterlogging.',
    TRUE
),
(
    'Finger Millet (Ragi)', 'Eleusine coracana', 'Cereals',
    ARRAY['Red soil', 'Sandy loam', 'Laterite soil', 'Loamy soil'],
    ARRAY['kharif'],
    'low', 110,
    'Hardy drought-tolerant nutritious millets popular in Southern India, thriving in red soils with low moisture.',
    TRUE
),

-- Pulses
(
    'Chickpea (Gram/Chana)', 'Cicer arietinum', 'Pulses',
    ARRAY['Black soil', 'Loamy soil', 'Clay loam'],
    ARRAY['rabi'],
    'low', 110,
    'Major winter pulse fixing atmospheric nitrogen, well adapted to deep black soils and conserved residual moisture.',
    TRUE
),
(
    'Pigeon Pea (Tur/Arhar)', 'Cajanus cajan', 'Pulses',
    ARRAY['Loamy soil', 'Alluvial soil', 'Red soil', 'Black soil'],
    ARRAY['kharif'],
    'medium', 180,
    'Deep-rooted legume suitable for intercropping, drought-resistant with high nutritional protein value.',
    TRUE
),
(
    'Soybean', 'Glycine max', 'Pulses',
    ARRAY['Black soil', 'Clay loam', 'Loamy soil'],
    ARRAY['kharif'],
    'medium', 95,
    'Dual-purpose pulse and oilseed crop widely cultivated in Central India during the monsoon season.',
    TRUE
),

-- Commercial / Cash Crops
(
    'Cotton', 'Gossypium hirsutum', 'Commercial crops',
    ARRAY['Black soil', 'Alluvial soil', 'Deep loam'],
    ARRAY['kharif'],
    'medium', 160,
    'High-value cash crop famously grown in the black cotton (regur) soils of Maharashtra, Gujarat, and Telangana.',
    TRUE
),
(
    'Sugarcane', 'Saccharum officinarum', 'Commercial crops',
    ARRAY['Alluvial soil', 'Black soil', 'Loamy soil'],
    ARRAY['kharif', 'rabi'],
    'high', 360,
    'Perennial cash crop requiring rich fertile soils, perennial irrigation, and prolonged warm humid conditions.',
    TRUE
),

-- Oilseeds
(
    'Groundnut (Peanut)', 'Arachis hypogaea', 'Oilseeds',
    ARRAY['Sandy loam', 'Red soil', 'Loamy soil'],
    ARRAY['kharif', 'zaid'],
    'low', 115,
    'Important oilseed legume requiring friable loose sandy loam to allow gynophore (peg) penetration and pod development.',
    TRUE
),
(
    'Mustard / Rapeseed', 'Brassica juncea', 'Oilseeds',
    ARRAY['Alluvial soil', 'Loamy soil', 'Sandy loam'],
    ARRAY['rabi'],
    'low', 110,
    'Major rabi oilseed crop cultivated extensively across Northern India requiring cool climate and light moisture.',
    TRUE
),

-- Vegetables & Horticulture
(
    'Tomato', 'Solanum lycopersicum', 'Vegetables',
    ARRAY['Loamy soil', 'Red soil', 'Sandy loam'],
    ARRAY['kharif', 'rabi', 'zaid'],
    'medium', 90,
    'High-demand vegetable crop yielding year-round across temperate and tropical zones with adequate fertigation.',
    TRUE
),
(
    'Onion', 'Allium cepa', 'Vegetables',
    ARRAY['Loamy soil', 'Alluvial soil', 'Clay loam'],
    ARRAY['kharif', 'rabi'],
    'medium', 120,
    'Crucial culinary vegetable needing well-pulverized, weed-free soils rich in organic matter and sulfur.',
    TRUE
),
(
    'Potato', 'Solanum tuberosum', 'Vegetables',
    ARRAY['Sandy loam', 'Alluvial soil', 'Loamy soil'],
    ARRAY['rabi'],
    'medium', 90,
    'Tuber crop requiring loose, well-aerated sandy loam soils with cool winter conditions for tuberization.',
    TRUE
),

-- Fruits
(
    'Banana', 'Musa acuminata', 'Fruits',
    ARRAY['Clay loam', 'Alluvial soil', 'Loamy soil'],
    ARRAY['kharif', 'zaid'],
    'high', 330,
    'Fast-growing fruit crop demanding heavy nutrients, organic amendments, and continuous soil moisture.',
    TRUE
),
(
    'Mango', 'Mangifera indica', 'Fruits',
    ARRAY['Alluvial soil', 'Red soil', 'Loamy soil', 'Laterite soil'],
    ARRAY['kharif', 'zaid'],
    'medium', 365,
    'King of fruits thriving in deep, well-drained soils across peninsular and northern India.',
    TRUE
);

