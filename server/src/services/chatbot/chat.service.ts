import { GeminiService } from '../ai/gemini.service.js';
import { buildChatPrompt, ChatContextMessage } from '../../prompts/chat.prompt.js';
import { ChatMessageInput } from '../../schemas/chat.schema.js';
import { chatAiResponseSchema, ChatAiResponse } from '../../schemas/ai-response.schema.js';
import { supabaseAdmin } from '../../config/supabase.js';

export class ChatService {
  static async processMessage(
    userId: string,
    input: ChatMessageInput
  ): Promise<{ conversationId: string; response: ChatAiResponse }> {
    let conversationId = input.conversationId;

    // 1. Resolve or initialize conversation
    if (!conversationId) {
      const title = input.message.length > 30 ? `${input.message.slice(0, 30)}...` : input.message;
      const { data: convData, error: convErr } = await supabaseAdmin
        .from('chat_conversations')
        .insert({
          user_id: userId,
          title,
          language: input.language,
        })
        .select('id')
        .single();

      if (convErr || !convData) {
        throw new Error(`Failed to create conversation: ${convErr?.message || 'Unknown error'}`);
      }
      conversationId = convData.id;
    }

    // 2. Fetch recent conversation history for grounding context
    const { data: historyData } = await supabaseAdmin
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(10);

    const history: ChatContextMessage[] = (historyData || []).map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // 3. Save incoming user message to database
    await supabaseAdmin.from('chat_messages').insert({
      conversation_id: conversationId,
      user_id: userId,
      role: 'user',
      content: input.message,
    });

    // 4. Prompt Gemini with conversation context
    const prompt = buildChatPrompt(input.message, history, input.language);
    const rawAiOutput = await GeminiService.generateJson<unknown>(prompt);

    // 5. Validate AI structured output
    const validatedResponse = chatAiResponseSchema.parse(rawAiOutput);

    // 6. Save assistant response to database
    await supabaseAdmin.from('chat_messages').insert({
      conversation_id: conversationId,
      user_id: userId,
      role: 'assistant',
      content: validatedResponse.answer,
    });

    // 7. Bump conversation updated_at
    await supabaseAdmin
      .from('chat_conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return {
      conversationId,
      response: validatedResponse,
    };
  }
}

