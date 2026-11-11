import { z } from 'zod';

export const fertilizerAdvisorySchema = z.object({
  cropName: z.string().min(2, 'Crop name is required').max(100),
  growthStage: z.string().min(2, 'Growth stage is required').max(100),
  soilType: z.string().min(2, 'Soil type is required').max(100),
  soilPh: z.number().min(0).max(14).optional().nullable(),
  nitrogen: z.number().min(0).optional().nullable(),
  phosphorus: z.number().min(0).optional().nullable(),
  potassium: z.number().min(0).optional().nullable(),
  landArea: z.number().positive('Land area must be greater than 0'),
  landAreaUnit: z.enum(['acre', 'hectare', 'bigha', 'guntha']).default('acre'),
  previousFertilizerUsage: z.string().max(500).optional().nullable(),
  fertilizerPreference: z.enum(['organic', 'conventional', 'integrated']),
  language: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
});

export type FertilizerAdvisoryInput = z.infer<typeof fertilizerAdvisorySchema>;

