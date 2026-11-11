import { z } from 'zod';

export const cropRecommendationSchema = z.object({
  state: z.string().min(2, 'State is required').max(100),
  district: z.string().min(2, 'District is required').max(100),
  village: z.string().max(100).optional().nullable(),
  soilType: z.string().min(2, 'Soil type is required'),
  soilPh: z.number().min(0).max(14).optional().nullable(),
  nitrogen: z.number().min(0).optional().nullable(),
  phosphorus: z.number().min(0).optional().nullable(),
  potassium: z.number().min(0).optional().nullable(),
  landArea: z.number().positive('Land area must be positive'),
  landAreaUnit: z.enum(['acre', 'hectare', 'bigha', 'guntha']).default('acre'),
  waterAvailability: z.enum(['low', 'medium', 'high']),
  season: z.enum(['kharif', 'rabi', 'zaid', 'other']),
  temperature: z.number().optional().nullable(),
  rainfall: z.number().optional().nullable(),
  farmingPreference: z.enum(['organic', 'conventional', 'mixed']),
  language: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
});

export type CropRecommendationInput = z.infer<typeof cropRecommendationSchema>;

