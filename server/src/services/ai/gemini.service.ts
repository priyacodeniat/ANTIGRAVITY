import { genAI, GEMINI_MODEL } from '../../config/gemini.js';
import { AGRI_SYSTEM_PROMPT } from '../../prompts/system.prompt.js';
import { env } from '../../config/env.js';

export interface InlineMediaPart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

/**
 * Defensive JSON parser that strips markdown code blocks if present
 */
export function extractAndParseJson<T>(rawText: string): T {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/i, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/i, '');
  }
  return JSON.parse(cleaned.trim()) as T;
}

export class GeminiService {
  /**
   * Generates structured text content from Gemini
   */
  static async generateJson<T>(promptText: string): Promise<T> {
    if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'placeholder-gemini-key') {
      throw new Error(
        'GEMINI_API_KEY is not configured on the server. Please add a valid Google Gemini API key to server/.env'
      );
    }

    try {
      const response = await genAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: promptText,
        config: {
          systemInstruction: AGRI_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.2, // Low temperature for deterministic agronomic logic
        },
      });

      const responseText = response.text || '';
      if (!responseText) {
        throw new Error('Empty response received from Gemini AI model');
      }

      return extractAndParseJson<T>(responseText);
    } catch (error: unknown) {
      console.error('[GeminiService.generateJson Error]:', error);
      const msg = error instanceof Error ? error.message : 'Gemini AI inference failure';
      throw new Error(`AI Advisory Generation Failed: ${msg}`);
    }
  }

  /**
   * Generates multimodal analysis for images + text
   */
  static async generateMultimodalJson<T>(
    promptText: string,
    imageBuffer: Buffer,
    mimeType: string
  ): Promise<T> {
    if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'placeholder-gemini-key') {
      throw new Error(
        'GEMINI_API_KEY is not configured on the server. Please add a valid Google Gemini API key to server/.env'
      );
    }

    try {
      const imagePart: InlineMediaPart = {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType,
        },
      };

      const response = await genAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: [promptText, imagePart],
        config: {
          systemInstruction: AGRI_SYSTEM_PROMPT,
          responseMimeType: 'application/json',
          temperature: 0.15, // Extremely grounded for disease diagnosis
        },
      });

      const responseText = response.text || '';
      if (!responseText) {
        throw new Error('Empty response received from Gemini Vision AI model');
      }

      return extractAndParseJson<T>(responseText);
    } catch (error: unknown) {
      console.error('[GeminiService.generateMultimodalJson Error]:', error);
      const msg = error instanceof Error ? error.message : 'Gemini Vision AI inference failure';
      throw new Error(`AI Crop Disease Analysis Failed: ${msg}`);
    }
  }
}

