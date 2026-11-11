import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../context/LanguageContext.js';
import { VoiceInputButton } from '../common/VoiceInputButton.js';
import { apiClient } from '../../services/api.js';
import {
  Send,
  Bot,
  User,
  ShieldAlert,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  category?: string;
  warnings?: string[];
  actions?: string[];
}

export const ChatWindow: React.FC = () => {
  const { language } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Namaste Kisan Bhai! I am your AgriAssist AI copilot. Ask me anything about crop varieties, plant pests, soil preparation, fertilizer timing, or irrigation. You can type or use your voice.',
      category: 'General Agriculture',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const response = await apiClient.post('/chat', {
        message: userText,
        conversationId,
        language,
      });

      if (response.data?.success && response.data?.data) {
        const { conversationId: newConvId, response: aiResponse } = response.data.data;
        if (newConvId) setConversationId(newConvId);

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: aiResponse.answer,
            category: aiResponse.category,
            warnings: aiResponse.important_warnings,
            actions: aiResponse.suggested_actions,
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Unable to complete query: ${err.message || 'Please check your connection.'}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              AgriAssist Kisan Copilot
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                Gemini 2.5
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">Multilingual Voice & Text Agricultural Assistant</p>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
              }`}
            >
              {msg.category && (
                <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {msg.category}
                </span>
              )}

              <p className="whitespace-pre-wrap">{msg.content}</p>

              {msg.actions && msg.actions.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <p className="font-bold text-slate-900 text-[11px]">Recommended Actions:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                    {msg.actions.map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              )}

              {msg.warnings && msg.warnings.length > 0 && (
                <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-900 flex items-start gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Caution: </span>
                    {msg.warnings.join(' ')}
                  </div>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>Kisan Copilot is generating agronomic advice...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <VoiceInputButton
          onTranscript={(text) => setInputMessage(text)}
          language={language === 'hi' ? 'hi-IN' : 'en-IN'}
        />

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type or speak your agricultural question..."
          className="flex-1 px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-xl shadow-xs transition"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

