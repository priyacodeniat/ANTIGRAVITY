import { GoogleGenAI } from '@google/genai';
import { env } from './env.js';

if (!env.GEMINI_API_KEY || env.GEMINI_API_KEY === 'placeholder-gemini-key') {
  console.warn('⚠️ GEMINI_API_KEY is not configured or using placeholder. AI functions will require a valid key.');
}

export const genAI = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY || 'AIzaSyPlaceholderKey',
});

export const GEMINI_MODEL = env.GEMINI_MODEL || 'gemini-2.5-flash';

