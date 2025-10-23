import { useRef, useState } from 'react';
import { Download, Share2, ArrowLeft, Check } from 'lucide-react';
import html2canvas from 'html2canvas';
import type { PlacedAsset } from '../types';
import { AvatarDisplay } from './AvatarDisplay';

interface SaveSharePageProps {
  placedAssets: PlacedAsset[];
  onBack: () => void;
}

export const SaveSharePage = ({ placedAssets, onBack }: SaveSharePageProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = async () => {
    if (!avatarRef.current) return;

    setSaving(true);
    try {
      const canvas = await html2canvas(avatarRef.current, {
        backgroundColor: '#000000',
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
        backgroundColor: '#000000',
        scale: 2,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], 'halloween-avatar.png', { type: 'image/png' });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'My Halloween Avatar',
            text: 'Check out my Halloween avatar!',
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
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-linear-to-r from-primary to-orange-600 p-4 shadow-lg flex items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-black hover:text-gray-800 transition-colors font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <h1 className="flex-1 text-xl md:text-2xl font-bold text-white text-center mr-16">
          Your Halloween Avatar
        </h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
        {/* Avatar Display */}
        <div ref={avatarRef} className="w-full max-w-md">
          <AvatarDisplay placedAssets={placedAssets} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleDownload}
            disabled={saving}
            className="flex-1  bg-orange-600 disabled:bg-orange-300 text-black font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Save Image
              </>
            )}
          </button>

          <button
            onClick={handleShare}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3"
          >
            {shared ? (
              <>
                <Check className="w-5 h-5" />
                Shared!
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                Share
              </>
            )}
          </button>
        </div>

        <p className="text-gray-500 text-sm text-center max-w-md">
          Download your avatar or share it with friends
        </p>
      </div>
    </div>
  );
};
