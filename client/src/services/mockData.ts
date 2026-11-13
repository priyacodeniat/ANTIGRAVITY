import {
  CropRecommendationResponse,
  DiseaseDetectionResponse,
  FertilizerResponse,
  IrrigationResponse,
  ChatResponse,
  AdvisoryHistoryItem,
} from '../types/index.js';

export const mockCropRecommendation: CropRecommendationResponse = {
  summary: 'Excellent agro-climatic alignment for leguminous and oilseed crops based on medium black soil and kharif precipitation.',
  data_sufficiency: 'high',
  recommendations: [
    {
      crop_name: 'Soybean (JS 335 / JS 95-60)',
      category: 'Pulses & Oilseeds',
      suitability_score: 94,
      confidence: 'high',
      suitable_season: 'Kharif (June - October)',
      growing_duration_days: 95,
      water_requirement: 'medium',
      soil_compatibility: 'Black clayey-loam provides ideal cation exchange capacity and moisture reserve during pod filling.',
      reason: 'Perfect rainfall match with vegetative stages. Strong local APMC mandi market demand across Maharashtra and Madhya Pradesh.',
      planting_guidance: 'Sow at 45 cm row spacing after receiving 75-100 mm continuous monsoon rain.',
      harvesting_guidance: 'Harvest when 90% of foliage turns yellow-brown and pods rattle upon shaking.',
      risks: ['Vulnerable to waterlogging if monsoon rainfall exceeds 150mm in a 48-hour window.'],
    },
    {
      crop_name: 'Cotton (Bt Hybrid BG-II)',
      category: 'Commercial crops',
      suitability_score: 89,
      confidence: 'high',
      suitable_season: 'Kharif (June - December)',
      growing_duration_days: 160,
      water_requirement: 'medium',
      soil_compatibility: 'Deep black soil supports deep taproot penetration and retains post-monsoon residual moisture.',
      reason: 'High economic return per acre with proper integrated bollworm and sucking pest monitoring.',
      planting_guidance: 'Sow at 90 x 60 cm spacing with paired-row drip lateral lines.',
      harvesting_guidance: 'Pick bolls in morning hours after dew evaporates to maintain fiber quality.',
      risks: ['Susceptible to Pink Bollworm and Whitefly during cloudy, humid spells.'],
    },
    {
      crop_name: 'Pigeon Pea / Tur (BDN-711)',
      category: 'Pulses',
      suitability_score: 86,
      confidence: 'high',
      suitable_season: 'Kharif (June - January)',
      growing_duration_days: 175,
      water_requirement: 'low',
      soil_compatibility: 'Fixes atmospheric nitrogen, highly resilient in moderately drained soils.',
      reason: 'Excellent intercrop option (4:2 or 3:1 ratio with Soybean) for risk mitigation.',
      planting_guidance: 'Treat seeds with Rhizobium culture and Trichoderma viride before sowing.',
      harvesting_guidance: 'Harvest when 80-85% pods turn dark brown.',
      risks: ['Pod borer (Helicoverpa armigera) during pod development stage.'],
    },
  ],
  missing_information: [],
  precautions: [
    'Complete deep summer ploughing to eradicate resting pupae of soil-borne pests.',
    'Test seed germination rate (maintain >70% minimum germination before full field sowing).',
  ],
  professional_consultation_recommended: false,
};

export const mockDiseaseDiagnosis: DiseaseDetectionResponse = {
  crop_name: 'Tomato',
  image_quality: 'good',
  overall_assessment: 'Visual symptoms and concentric leaf lesions indicate Early Blight caused by Alternaria solani.',
  possible_conditions: [
    {
      name: 'Early Blight (Alternaria solani)',
      condition_type: 'disease',
      confidence: 'high',
      observed_symptoms: [
        'Dark brown to black necrotic spots with concentric rings (target-board effect).',
        'Chlorotic yellow halo surrounding older leaf lesions.',
        'Premature defoliation starting from bottom canopy leaves upward.',
      ],
      explanation: 'Airborne and seed-borne fungal pathogen thriving in warm temperatures (24-30°C) with prolonged relative humidity (>80%).',
      possible_causes: [
        'Frequent overhead sprinkler irrigation splashing spores from soil onto lower foliage.',
        'Dense canopy spacing preventing inter-row air circulation.',
      ],
      recommended_actions: [
        'Biological Remedy: Spray Trichoderma viride or Bacillus subtilis @ 5g/L water at 10-day intervals.',
        'Chemical IPM: Spray Mancozeb 75% WP @ 2.5g/L water or Azoxystrobin 23% SC @ 1ml/L. Observe strict 7-day Pre-Harvest Interval (PHI).',
      ],
    },
  ],
  immediate_steps: [
    'Hand-prune severely infected lower leaves and safely burn or bury them away from the field.',
    'Switch from overhead sprinkler to drip irrigation to keep foliage completely dry.',
  ],
  preventive_measures: [
    'Apply silver-black reflective plastic mulch or paddy straw mulch to prevent soil-to-leaf splashing.',
    'Follow a 3-year crop rotation avoiding solanaceous crops (Potato, Brinjal, Chili).',
  ],
  additional_information_needed: [],
  expert_consultation_recommended: true,
  disclaimer: 'Visual AI screening provides preliminary guidance. Laboratory culturing is recommended for definitive pathological confirmation.',
};

export const mockFertilizerAdvisory: FertilizerResponse = {
  crop_name: 'Wheat',
  assessment: 'Balanced nutrition prescription formulated for Tillering stage (20-25 days after sowing) under loamy soil conditions.',
  data_sufficiency: 'high',
  nutrient_observations: [
    {
      nutrient: 'Nitrogen (N)',
      status: 'deficient',
      explanation: 'Active tillering demands top-dressed nitrogen to maximize fertile spikelet formation.',
    },
    {
      nutrient: 'Phosphorus (P)',
      status: 'adequate',
      explanation: 'Basal DAP applied at sowing meets primary root development demands.',
    },
    {
      nutrient: 'Potassium (K)',
      status: 'adequate',
      explanation: 'Soil potassium reserve is sufficient for stem elongation and lodging resistance.',
    },
  ],
  organic_options: [
    'Apply vermicompost enriched with Azotobacter and PSB bio-fertilizers @ 2 tonnes/acre.',
    'Foliar spray of 10% Cow Urine (Gomutra) or Panchagavya @ 30 ml/L water during early morning.',
  ],
  fertilizer_options: [
    'Top-dress Urea @ 30-35 kg/acre immediately before or right after the Crown Root Initiation (CRI) first irrigation.',
    'In case of yellowing leaf tips, apply Zinc Sulfate (ZnSO4 21%) @ 10 kg/acre or foliar chelated Zn @ 1g/L.',
  ],
  application_guidance: [
    'Never broadcast nitrogen on dry soil; apply when adequate root-zone moisture exists.',
    'Split nitrogen into 3 equal doses: 1/3rd at sowing, 1/3rd at tillering (21 DAS), and 1/3rd at jointing (45 DAS).',
  ],
  timing: 'Crown Root Initiation (CRI) stage (21 to 25 days after sowing)',
  precautions: [
    'Avoid excessive nitrogen which promotes succulent growth, making the crop prone to aphids and lodging.',
  ],
  soil_testing_recommended: true,
  expert_consultation_recommended: false,
};

export const mockIrrigationAdvisory: IrrigationResponse = {
  crop_name: 'Tomato',
  assessment: 'Precision drip fertigation schedule formulated for Flowering and Early Fruit Set stage.',
  water_requirement: 'medium',
  irrigation_guidance: [
    'Run drip lines for 90 to 120 minutes every alternate day during morning hours (06:00 AM - 08:30 AM).',
    'Maintain root-zone moisture at 65-70% Field Capacity. Avoid alternating between extreme drought and flooding to prevent Blossom End Rot.',
  ],
  soil_moisture_monitoring: 'Take soil from 15 cm depth and squeeze into a ball: it should hold shape without dripping water or crumbling instantly (Ball-Feel Method).',
  recommended_irrigation_method: 'Inline Drip System with 2 LPH emitters spaced 40 cm apart.',
  overwatering_signs: [
    'Lower leaves turning pale yellow (chlorosis).',
    'Root asphyxiation and damping-off / collar rot fungus at soil line.',
  ],
  underwatering_signs: [
    'Midday leaf curling / rolling.',
    'Flower drop and abortion of early fruit set.',
  ],
  water_conservation_methods: [
    'Apply 30-micron UV-stabilized silver-black plastic mulch to reduce soil surface evaporation by 40%.',
    'Maintain drip operating pressure at 1.0 to 1.2 kg/cm² to ensure uniform discharge across all sub-mains.',
  ],
  missing_information: [],
  precautions: [
    'Do not irrigate during peak heat hours (12:00 PM - 03:00 PM) to avoid root shock.',
  ],
};

export const mockChatResponse: ChatResponse = {
  answer: 'For management of aphids in mustard and vegetables, use 5% Neem Seed Kernel Extract (NSKE) or cold-pressed Neem Oil (10,000 ppm) @ 3-4 ml/L water with a mild emulsifier (0.5 ml liquid soap). Spray thoroughly during late afternoon on both upper and lower leaf surfaces. For severe infestations exceeding the Economic Threshold Level (ETL of 20 aphids/10 cm central twig), apply Imidacloprid 17.8% SL @ 0.5 ml/L with a mandatory 15-day pre-harvest waiting period.',
  category: 'Pest & Disease',
  suggested_actions: [
    'Install yellow sticky traps @ 15-20 traps per acre at crop canopy height.',
    'Spray in late afternoon to protect honeybees and predatory ladybird beetles.',
  ],
  important_warnings: [
    'Never spray synthetic insecticides during peak morning pollinator activity.',
  ],
  confidence: 'high',
  requires_expert_consultation: false,
};

