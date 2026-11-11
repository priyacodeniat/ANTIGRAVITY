import { GeminiService } from '../ai/gemini.service.js';
import { buildCropRecommendationPrompt } from '../../prompts/crop-recommendation.prompt.js';
import {
  CropRecommendationInput,
} from '../../schemas/crop-recommendation.schema.js';
import {
  cropRecommendationAiResponseSchema,
  CropRecommendationAiResponse,
} from '../../schemas/ai-response.schema.js';
import { supabaseAdmin } from '../../config/supabase.js';
import { env } from '../../config/env.js';

export class CropAdvisoryService {
  static async generate(
    userId: string,
    input: CropRecommendationInput
  ): Promise<{ advisoryId?: string; result: CropRecommendationAiResponse }> {
    const prompt = buildCropRecommendationPrompt(input);
    const rawAiOutput = await GeminiService.generateJson<unknown>(prompt);

    // Validate the AI response rigorously via Zod
    const validatedResult = cropRecommendationAiResponseSchema.parse(rawAiOutput);

    let advisoryId: string | undefined;

    // Persist to Supabase advisory_history
    try {
      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .insert({
          user_id: userId,
          advisory_type: 'crop_recommendation',
          request_data: input,
          response_data: validatedResult,
          ai_model: env.GEMINI_MODEL,
          status: 'completed',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to persist crop advisory record:', error.message);
      } else {
        advisoryId = data?.id;
      }
    } catch (dbErr) {
      console.warn('Database persistence warning for crop advisory:', dbErr);
    }

    return {
      advisoryId,
      result: validatedResult,
    };
  }
}

