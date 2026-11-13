import React from 'react';
import { Share2 } from 'lucide-react';

interface ShareWhatsAppButtonProps {
  title: string;
  textToShare: string;
  className?: string;
}

export const ShareWhatsAppButton: React.FC<ShareWhatsAppButtonProps> = ({
  title,
  textToShare,
  className = '',
}) => {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const formattedMessage = `🌾 *AgriAssist AI - ${title}*\n\n${textToShare}\n\n_Generated via AgriAssist AI Precision Advisory Platform_`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(formattedMessage)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition ${className}`}
      title="Share advisory via WhatsApp"
    >
      <Share2 className="w-3.5 h-3.5 text-emerald-700" />
      <span>Share on WhatsApp</span>
    </button>
  );
};
