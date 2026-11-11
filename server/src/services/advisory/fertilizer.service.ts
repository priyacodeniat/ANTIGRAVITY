import { GeminiService } from '../ai/gemini.service.js';
import { buildFertilizerPrompt } from '../../prompts/fertilizer.prompt.js';
import { FertilizerAdvisoryInput } from '../../schemas/fertilizer.schema.js';
import {
  fertilizerAiResponseSchema,
  FertilizerAiResponse,
} from '../../schemas/ai-response.schema.js';
import { supabaseAdmin } from '../../config/supabase.js';
import { env } from '../../config/env.js';

export class FertilizerAdvisoryService {
  static async generate(
    userId: string,
    input: FertilizerAdvisoryInput
  ): Promise<{ advisoryId?: string; result: FertilizerAiResponse }> {
    const prompt = buildFertilizerPrompt(input);
    const rawAiOutput = await GeminiService.generateJson<unknown>(prompt);

    const validatedResult = fertilizerAiResponseSchema.parse(rawAiOutput);

    let advisoryId: string | undefined;

    try {
      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .insert({
          user_id: userId,
          advisory_type: 'fertilizer_advisory',
          request_data: input,
          response_data: validatedResult,
          ai_model: env.GEMINI_MODEL,
          status: 'completed',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to save fertilizer advisory record:', error.message);
      } else {
        advisoryId = data?.id;
      }
    } catch (dbErr) {
      console.warn('Database persistence warning for fertilizer advisory:', dbErr);
    }

    return {
      advisoryId,
      result: validatedResult,
    };
  }
}

