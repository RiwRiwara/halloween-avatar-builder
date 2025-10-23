import mummyImg from './assets/images/mummy-1.png';

export interface AssetItem {
  id: string;
  name: string;
  url: string;
  position?: { x: number; y: number };
  scale?: number;
  zIndex?: number;
}

export interface AssetCategory {
  [key: string]: AssetItem;
}

export interface AssetsConfig {
  head: AssetCategory;
  face: AssetCategory;
  body: AssetCategory;
  accessories: AssetCategory;
}

export const assetsConfig: AssetsConfig = {
  head: {
    'black-hat': {
      id: 'black-hat',
      name: 'Black Hat',
      url: '/src/assets/images/black-hat.png',
      position: { x: 0, y: -120 },
      scale: 0.8,
      zIndex: 10,
    },
    'witch-hat': {
      id: 'witch-hat',
      name: 'Witch Hat',
      url: '/src/assets/images/black-hat.png', // Using as placeholder
      position: { x: 0, y: -115 },
      scale: 0.75,
      zIndex: 10,
    },
    'mummy-head': {
      id: 'mummy-head',
      name: 'Mummy Wrap',
      url: mummyImg,
      position: { x: 0, y: -80 },
      scale: 0.9,
      zIndex: 8,
    },
  },
  face: {
    'vampire-eyes': {
      id: 'vampire-eyes',
      name: 'Vampire Eyes',
      url: '/src/assets/images/black-hat.png', // Placeholder
      position: { x: 0, y: -30 },
      scale: 0.5,
      zIndex: 5,
    },
  },
  body: {
    'cape': {
      id: 'cape',
      name: 'Vampire Cape',
      url: '/src/assets/images/black-hat.png', // Placeholder
      position: { x: 0, y: 50 },
      scale: 1.2,
      zIndex: 1,
    },
  },
  accessories: {
    'bat': {
      id: 'bat',
      name: 'Bat',
      url: '/src/assets/images/black-hat.png', // Placeholder
      position: { x: 100, y: -50 },
      scale: 0.6,
      zIndex: 15,
    },
  },
};

export type CategoryKey = keyof AssetsConfig;
export const categories: CategoryKey[] = ['head', 'face', 'body', 'accessories'];
