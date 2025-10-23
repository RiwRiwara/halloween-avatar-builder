export interface PlacedAsset {
  id: string;
  assetId: string;
  category: string;
  position: { x: number; y: number };
  scale: number;
  zIndex: number;
}

export interface AvatarState {
  placedAssets: PlacedAsset[];
}

export interface CustomizationCategory {
  name: string;
  options: {
    id: string;
    label: string;
    icon: string;
  }[];
}
