import React from 'react';
import { ChatWindow } from '../components/chatbot/ChatWindow.js';
import { MessageSquare } from 'lucide-react';

export const ChatbotPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-emerald-600" />
          Kisan AI Agricultural Copilot
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Chat or speak in 7 Indian regional languages. Ask questions regarding seeds, fertilizers, weather protection, or organic cultivation.
        </p>
      </div>

      <ChatWindow />
    </div>
  );
};

