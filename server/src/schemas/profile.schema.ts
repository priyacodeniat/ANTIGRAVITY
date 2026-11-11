import { z } from 'zod';

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(150),
  phone: z.string().max(25).optional().nullable(),
  state: z.string().min(2, 'State is required').max(100),
  district: z.string().min(2, 'District is required').max(100),
  village: z.string().max(100).optional().nullable(),
  preferredLanguage: z.enum(['en', 'hi', 'kn', 'te', 'ta', 'ml', 'mr']).default('en'),
  landArea: z.number().positive('Land area must be greater than 0').optional().nullable(),
  landAreaUnit: z.enum(['acre', 'hectare', 'bigha', 'guntha']).default('acre'),
  soilType: z.string().max(100).optional().nullable(),
  irrigationAvailability: z.string().max(100).optional().nullable(),
  farmingExperience: z.string().max(100).optional().nullable(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

