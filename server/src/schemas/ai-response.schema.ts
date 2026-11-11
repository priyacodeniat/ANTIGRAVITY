import { z } from 'zod';

export const cropRecommendationAiResponseSchema = z.object({
  summary: z.string(),
  data_sufficiency: z.enum(['high', 'medium', 'low']),
  recommendations: z.array(
    z.object({
      crop_name: z.string(),
      category: z.string(),
      suitability_score: z.number().min(0).max(100),
      confidence: z.enum(['high', 'medium', 'low']),
      suitable_season: z.string(),
      growing_duration_days: z.number(),
      water_requirement: z.enum(['low', 'medium', 'high']),
      soil_compatibility: z.string(),
      reason: z.string(),
      planting_guidance: z.string(),
      harvesting_guidance: z.string(),
      risks: z.array(z.string()),
    })
  ).min(1),
  missing_information: z.array(z.string()).default([]),
  precautions: z.array(z.string()).default([]),
  professional_consultation_recommended: z.boolean().default(false),
});

export const diseaseDetectionAiResponseSchema = z.object({
  crop_name: z.string(),
  image_quality: z.enum(['good', 'acceptable', 'poor']),
  overall_assessment: z.string(),
  possible_conditions: z.array(
    z.object({
      name: z.string(),
      condition_type: z.enum(['disease', 'pest', 'nutrient_deficiency', 'environmental_stress', 'unknown']),
      confidence: z.enum(['high', 'medium', 'low']),
      observed_symptoms: z.array(z.string()),
      explanation: z.string(),
      possible_causes: z.array(z.string()),
      recommended_actions: z.array(z.string()),
    })
  ),
  immediate_steps: z.array(z.string()),
  preventive_measures: z.array(z.string()),
  additional_information_needed: z.array(z.string()).default([]),
  expert_consultation_recommended: z.boolean().default(true),
  disclaimer: z.string(),
});

export const fertilizerAiResponseSchema = z.object({
  crop_name: z.string(),
  assessment: z.string(),
  data_sufficiency: z.enum(['high', 'medium', 'low']),
  nutrient_observations: z.array(
    z.object({
      nutrient: z.string(),
      status: z.enum(['deficient', 'adequate', 'excessive', 'unknown']),
      explanation: z.string(),
    })
  ),
  organic_options: z.array(z.string()),
  fertilizer_options: z.array(z.string()),
  application_guidance: z.array(z.string()),
  timing: z.string(),
  precautions: z.array(z.string()),
  soil_testing_recommended: z.boolean().default(true),
  expert_consultation_recommended: z.boolean().default(false),
});

export const irrigationAiResponseSchema = z.object({
  crop_name: z.string(),
  assessment: z.string(),
  water_requirement: z.enum(['low', 'medium', 'high']),
  irrigation_guidance: z.array(z.string()),
  soil_moisture_monitoring: z.string(),
  recommended_irrigation_method: z.string(),
  overwatering_signs: z.array(z.string()),
  underwatering_signs: z.array(z.string()),
  water_conservation_methods: z.array(z.string()),
  missing_information: z.array(z.string()).default([]),
  precautions: z.array(z.string()),
});

export const chatAiResponseSchema = z.object({
  answer: z.string(),
  category: z.string(),
  suggested_actions: z.array(z.string()).default([]),
  important_warnings: z.array(z.string()).default([]),
  confidence: z.enum(['high', 'medium', 'low']).default('medium'),
  requires_expert_consultation: z.boolean().default(false),
});

export type CropRecommendationAiResponse = z.infer<typeof cropRecommendationAiResponseSchema>;
export type DiseaseDetectionAiResponse = z.infer<typeof diseaseDetectionAiResponseSchema>;
export type FertilizerAiResponse = z.infer<typeof fertilizerAiResponseSchema>;
export type IrrigationAiResponse = z.infer<typeof irrigationAiResponseSchema>;
export type ChatAiResponse = z.infer<typeof chatAiResponseSchema>;

