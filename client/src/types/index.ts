export type SupportedLanguage = 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml' | 'mr';

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string | null;
  state?: string | null;
  district?: string | null;
  village?: string | null;
  preferred_language: SupportedLanguage;
  land_area?: number | null;
  land_area_unit?: string | null;
  soil_type?: string | null;
  irrigation_availability?: string | null;
  farming_experience?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CropRecommendationItem {
  crop_name: string;
  category: string;
  suitability_score: number;
  confidence: 'high' | 'medium' | 'low';
  suitable_season: string;
  growing_duration_days: number;
  water_requirement: 'low' | 'medium' | 'high';
  soil_compatibility: string;
  reason: string;
  planting_guidance: string;
  harvesting_guidance: string;
  risks: string[];
}

export interface CropRecommendationResponse {
  summary: string;
  data_sufficiency: 'high' | 'medium' | 'low';
  recommendations: CropRecommendationItem[];
  missing_information: string[];
  precautions: string[];
  professional_consultation_recommended: boolean;
}

export interface PossibleCondition {
  name: string;
  condition_type: 'disease' | 'pest' | 'nutrient_deficiency' | 'environmental_stress' | 'unknown';
  confidence: 'high' | 'medium' | 'low';
  observed_symptoms: string[];
  explanation: string;
  possible_causes: string[];
  recommended_actions: string[];
}

export interface DiseaseDetectionResponse {
  crop_name: string;
  image_quality: 'good' | 'acceptable' | 'poor';
  overall_assessment: string;
  possible_conditions: PossibleCondition[];
  immediate_steps: string[];
  preventive_measures: string[];
  additional_information_needed: string[];
  expert_consultation_recommended: boolean;
  disclaimer: string;
}

export interface NutrientObservation {
  nutrient: string;
  status: 'deficient' | 'adequate' | 'excessive' | 'unknown';
  explanation: string;
}

export interface FertilizerResponse {
  crop_name: string;
  assessment: string;
  data_sufficiency: 'high' | 'medium' | 'low';
  nutrient_observations: NutrientObservation[];
  organic_options: string[];
  fertilizer_options: string[];
  application_guidance: string[];
  timing: string;
  precautions: string[];
  soil_testing_recommended: boolean;
  expert_consultation_recommended: boolean;
}

export interface IrrigationResponse {
  crop_name: string;
  assessment: string;
  water_requirement: 'low' | 'medium' | 'high';
  irrigation_guidance: string[];
  soil_moisture_monitoring: string;
  recommended_irrigation_method: string;
  overwatering_signs: string[];
  underwatering_signs: string[];
  water_conservation_methods: string[];
  missing_information: string[];
  precautions: string[];
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface ChatResponse {
  answer: string;
  category: string;
  suggested_actions: string[];
  important_warnings: string[];
  confidence: 'high' | 'medium' | 'low';
  requires_expert_consultation: boolean;
}

export interface ChatConversation {
  id: string;
  user_id: string;
  title: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface AdvisoryHistoryItem {
  id: string;
  user_id: string;
  advisory_type: 'crop_recommendation' | 'disease_detection' | 'fertilizer_advisory' | 'irrigation_advisory';
  request_data: Record<string, unknown>;
  response_data: Record<string, unknown>;
  ai_model: string;
  status: 'completed' | 'failed';
  created_at: string;
}

export interface CropCatalogItem {
  id: string;
  crop_name: string;
  scientific_name?: string;
  category: string;
  suitable_soil_types?: string[];
  suitable_seasons?: string[];
  water_requirement?: string;
  growth_duration_days?: number;
  description?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown;
  };
}

