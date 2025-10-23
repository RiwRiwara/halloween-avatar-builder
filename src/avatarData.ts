import type { CustomizationCategory } from './types';

export const skinTones = [
  { id: '#FFE0BD', label: 'Light', color: '#FFE0BD' },
  { id: '#D4A574', label: 'Medium', color: '#D4A574' },
  { id: '#8D5524', label: 'Dark', color: '#8D5524' },
  { id: '#4A3728', label: 'Deep', color: '#4A3728' },
];

export const customizationCategories: CustomizationCategory[] = [
  {
    name: 'Head',
    options: [
      { id: 'none', label: 'None', icon: '🚫' },
      { id: 'witch-hat', label: 'Witch Hat', icon: '🎩' },
      { id: 'pumpkin', label: 'Pumpkin', icon: '🎃' },
      { id: 'horns', label: 'Horns', icon: '👹' },
      { id: 'bat-ears', label: 'Bat Ears', icon: '🦇' },
    ],
  },
  {
    name: 'Eyes',
    options: [
      { id: 'normal', label: 'Normal', icon: '👁️' },
      { id: 'spooky', label: 'Spooky', icon: '👻' },
      { id: 'vampire', label: 'Vampire', icon: '🧛' },
      { id: 'zombie', label: 'Zombie', icon: '🧟' },
      { id: 'demon', label: 'Demon', icon: '😈' },
    ],
  },
  {
    name: 'Body',
    options: [
      { id: 'plain', label: 'Plain', icon: '👕' },
      { id: 'skeleton', label: 'Skeleton', icon: '💀' },
      { id: 'vampire-cape', label: 'Vampire', icon: '🧛' },
      { id: 'mummy', label: 'Mummy', icon: '🧻' },
      { id: 'ghost', label: 'Ghost', icon: '👻' },
    ],
  },
];

export const defaultAvatar = {
  skinTone: '#FFE0BD',
  head: 'none',
  eyes: 'normal',
  body: 'plain',
};
