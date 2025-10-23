import { useRef, useState } from 'react';
import { Download, Share2, ArrowLeft, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { AvatarOptions } from '../types';
import { Avatar } from './Avatar';

interface SaveSharePageProps {
  avatarOptions: AvatarOptions;
  onBack: () => void;
}

export const SaveSharePage = ({ avatarOptions, onBack }: SaveSharePageProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = async () => {
    if (!avatarRef.current) return;

    setSaving(true);
    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = 'halloween-avatar.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving avatar:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    if (!avatarRef.current) return;

    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'halloween-avatar.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Halloween Avatar',
            text: 'Check out my spooky avatar! 🎃',
          });
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        } else {
          // Fallback: copy to clipboard
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setShared(true);
          setTimeout(() => setShared(false), 2000);
        }
      });
    } catch (error) {
      console.error('Error sharing avatar:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-orange-900 to-black flex flex-col">
      <header className="p-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Back</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-orange-500 mb-8 drop-shadow-lg">Your Spooky Avatar! 👻</h2>

        {/* Avatar Display */}
        <div
          ref={avatarRef}
          className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-orange-500/30 max-w-md w-full mb-8"
        >
          <Avatar options={avatarOptions} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleDownload}
            disabled={saving}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Download size={24} />
                Save
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            {shared ? (
              <>
                <Check size={24} />
                Shared!
              </>
            ) : (
              <>
                <Share2 size={24} />
                Share
              </>
            )}
          </button>
        </div>

        {/* Share info text */}
        <p className="text-gray-400 text-sm mt-4 text-center max-w-md">
          Click Save to download your avatar or Share to share it with friends! 🎃
        </p>
      </div>
    </div>
  );
};
