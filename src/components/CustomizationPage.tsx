import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { AvatarOptions } from '../types';
import { Avatar } from './Avatar';
import { skinTones, customizationCategories } from '../avatarData';

interface CustomizationPageProps {
  avatarOptions: AvatarOptions;
  onAvatarChange: (options: AvatarOptions) => void;
  onNext: () => void;
}

export const CustomizationPage = ({ avatarOptions, onAvatarChange, onNext }: CustomizationPageProps) => {
  const [activeCategory, setActiveCategory] = useState<'skin' | 'head' | 'eyes' | 'body'>('skin');

  const handleOptionSelect = (category: string, value: string) => {
    if (category === 'skin') {
      onAvatarChange({ ...avatarOptions, skinTone: value });
    } else {
      onAvatarChange({ ...avatarOptions, [category.toLowerCase()]: value });
    }
  };

  const renderOptions = () => {
    if (activeCategory === 'skin') {
      return (
        <div className="grid grid-cols-4 gap-3">
          {skinTones.map((tone) => (
            <button
              key={tone.id}
              onClick={() => handleOptionSelect('skin', tone.id)}
              className={`aspect-square rounded-lg border-2 transition-all ${
                avatarOptions.skinTone === tone.id
                  ? 'border-orange-500 scale-110'
                  : 'border-gray-300 hover:border-orange-300'
              }`}
              style={{ backgroundColor: tone.color }}
              aria-label={tone.label}
            />
          ))}
        </div>
      );
    }

    const category = customizationCategories.find((cat) => cat.name.toLowerCase() === activeCategory);
    if (!category) return null;

    return (
      <div className="grid grid-cols-4 gap-3">
        {category.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(activeCategory, option.id)}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center text-3xl transition-all ${
              avatarOptions[activeCategory as keyof AvatarOptions] === option.id
                ? 'border-orange-500 bg-orange-50 scale-110'
                : 'border-gray-300 bg-white hover:border-orange-300 hover:bg-orange-50'
            }`}
            aria-label={option.label}
          >
            {option.icon}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-orange-900 to-black flex flex-col">
      <header className="p-4 text-center">
        <h1 className="text-3xl font-bold text-orange-500 drop-shadow-lg">🎃 Halloween Avatar Builder</h1>
      </header>

      {/* Avatar Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-2 border-orange-500/30 max-w-md w-full">
          <Avatar options={avatarOptions} />
        </div>
      </div>

      {/* Customization Panel */}
      <div className="bg-gray-900 border-t-2 border-orange-500 rounded-t-3xl p-6 shadow-2xl">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'skin', label: 'Skin', icon: '🎨' },
            { id: 'head', label: 'Head', icon: '🎩' },
            { id: 'eyes', label: 'Eyes', icon: '👁️' },
            { id: 'body', label: 'Body', icon: '👕' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex-1 min-w-[70px] py-3 px-4 rounded-lg font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-lg scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-xs">{cat.label}</div>
            </button>
          ))}
        </div>

        {/* Options Grid */}
        <div className="mb-6">{renderOptions()}</div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg"
        >
          Continue
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
