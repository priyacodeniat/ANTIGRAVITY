import React from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useSpeechSynthesis } from '../../hooks/useSpeechSynthesis.js';
import { useTranslation } from '../../context/LanguageContext.js';

interface AudioReadoutButtonProps {
  textToRead: string;
  className?: string;
  label?: string;
}

export const AudioReadoutButton: React.FC<AudioReadoutButtonProps> = ({
  textToRead,
  className = '',
  label,
}) => {
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const { language } = useTranslation();

  if (!isSupported) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSpeaking) {
      stop();
    } else {
      speak(textToRead, language);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
        isSpeaking
          ? 'bg-emerald-600 text-white animate-pulse shadow-sm'
          : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
      } ${className}`}
      title={isSpeaking ? 'Stop reading' : 'Listen to advisory in your regional language'}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>{label ? 'Stop Listening' : 'Stop'}</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-emerald-700" />
          <span>{label || 'Listen Aloud'}</span>
        </>
      )}
    </button>
  );
};
