import { GeminiService } from '../ai/gemini.service.js';
import { StorageService } from '../storage/supabase-storage.service.js';
import { buildDiseaseDetectionPrompt } from '../../prompts/disease-detection.prompt.js';
import { DiseaseDetectionInput } from '../../schemas/disease-detection.schema.js';
import {
  diseaseDetectionAiResponseSchema,
  DiseaseDetectionAiResponse,
} from '../../schemas/ai-response.schema.js';
import { supabaseAdmin } from '../../config/supabase.js';
import { env } from '../../config/env.js';

export class DiseaseAdvisoryService {
  static async analyze(
    userId: string,
    input: DiseaseDetectionInput,
    imageBuffer: Buffer,
    mimeType: string,
    fileSize: number
  ): Promise<{ advisoryId?: string; imageUrl?: string; result: DiseaseDetectionAiResponse }> {
    // 1. Upload image to Supabase Storage
    const { storagePath, publicUrl } = await StorageService.uploadCropImage(
      userId,
      imageBuffer,
      mimeType
    );

    // 2. Perform multimodal inference
    const prompt = buildDiseaseDetectionPrompt(input);
    const rawAiOutput = await GeminiService.generateMultimodalJson<unknown>(
      prompt,
      imageBuffer,
      mimeType
    );

    // 3. Validate structured AI diagnosis with Zod
    const validatedResult = diseaseDetectionAiResponseSchema.parse(rawAiOutput);

    let advisoryId: string | undefined;

    // 4. Save to advisory_history and uploaded_images in database
    try {
      const { data: advData, error: advErr } = await supabaseAdmin
        .from('advisory_history')
        .insert({
          user_id: userId,
          advisory_type: 'disease_detection',
          request_data: { ...input, storagePath },
          response_data: validatedResult,
          ai_model: env.GEMINI_MODEL,
          status: 'completed',
        })
        .select('id')
        .single();

      if (advErr) {
        console.error('Failed to save disease advisory to database:', advErr.message);
      } else if (advData) {
        advisoryId = advData.id;

        // Record uploaded image entry
        await supabaseAdmin.from('uploaded_images').insert({
          user_id: userId,
          advisory_id: advisoryId,
          storage_path: storagePath,
          mime_type: mimeType,
          file_size: fileSize,
        });
      }
    } catch (dbErr) {
      console.warn('Database persistence warning for disease analysis:', dbErr);
    }

    return {
      advisoryId,
      imageUrl: publicUrl,
      result: validatedResult,
    };
  }
}

