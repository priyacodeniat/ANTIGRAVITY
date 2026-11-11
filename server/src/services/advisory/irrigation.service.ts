import { GeminiService } from '../ai/gemini.service.js';
import { buildIrrigationPrompt } from '../../prompts/irrigation.prompt.js';
import { IrrigationAdvisoryInput } from '../../schemas/irrigation.schema.js';
import {
  irrigationAiResponseSchema,
  IrrigationAiResponse,
} from '../../schemas/ai-response.schema.js';
import { supabaseAdmin } from '../../config/supabase.js';
import { env } from '../../config/env.js';

export class IrrigationAdvisoryService {
  static async generate(
    userId: string,
    input: IrrigationAdvisoryInput
  ): Promise<{ advisoryId?: string; result: IrrigationAiResponse }> {
    const prompt = buildIrrigationPrompt(input);
    const rawAiOutput = await GeminiService.generateJson<unknown>(prompt);

    const validatedResult = irrigationAiResponseSchema.parse(rawAiOutput);

    let advisoryId: string | undefined;

    try {
      const { data, error } = await supabaseAdmin
        .from('advisory_history')
        .insert({
          user_id: userId,
          advisory_type: 'irrigation_advisory',
          request_data: input,
          response_data: validatedResult,
          ai_model: env.GEMINI_MODEL,
          status: 'completed',
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to save irrigation advisory record:', error.message);
      } else {
        advisoryId = data?.id;
      }
    } catch (dbErr) {
      console.warn('Database persistence warning for irrigation advisory:', dbErr);
    }

    return {
      advisoryId,
      result: validatedResult,
    };
  }
}

