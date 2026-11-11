import { z } from 'zod';

export const diseaseDetectionSchema = z.object({
  cropName: z.string().min(2, 'Crop name is required').max(100),
  growthStage: z.string().max(100).optional().nullable(),
  plantPartAffected: z.string().max(100).optional().nullable(),
  symptomsObserved: z.string().max(1000).optional().nullable(),
  additionalObservations: z.string().max(1000).optional().nullable(),
  language: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
});

export type DiseaseDetectionInput = z.infer<typeof diseaseDetectionSchema>;

