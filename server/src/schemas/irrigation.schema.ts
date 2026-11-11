import { z } from 'zod';

export const irrigationAdvisorySchema = z.object({
  cropName: z.string().min(2, 'Crop name is required').max(100),
  growthStage: z.string().min(2, 'Growth stage is required').max(100),
  soilType: z.string().min(2, 'Soil type is required').max(100),
  waterAvailability: z.enum(['low', 'medium', 'high']),
  irrigationMethod: z.enum(['drip', 'sprinkler', 'surface_flood', 'furrow', 'rain_fed']),
  recentRainfall: z.string().max(200).optional().nullable(),
  weatherConditions: z.string().max(200).optional().nullable(),
  language: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
});

export type IrrigationAdvisoryInput = z.infer<typeof irrigationAdvisorySchema>;

