import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition.js';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  language?: string;
  className?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  language = 'en-IN',
  className = '',
}) => {
  const { isListening, transcript, isSupported, startListening, resetTranscript } =
    useSpeechRecognition(language);

  React.useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript, resetTranscript]);

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={startListening}
      disabled={isListening}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition ${
        isListening
          ? 'bg-rose-500 text-white animate-pulse shadow-lg'
          : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
      } ${className}`}
      title={isListening ? 'Listening to voice...' : 'Click to speak query'}
    >
      {isListening ? (
        <span className="flex items-center gap-1.5 text-xs font-semibold px-1">
          <MicOff className="w-4 h-4" /> Listening...
        </span>
      ) : (
        <Mic className="w-5 h-5" />
      )}
    </button>
  );
};

