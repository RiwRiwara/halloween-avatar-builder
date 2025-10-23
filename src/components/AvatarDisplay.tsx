import type { PlacedAsset } from '../types';
import { assetsConfig, type AssetItem } from '../assetsConfig';
import baseAvatarImg from '../assets/images/base-avartar.png';

interface AvatarDisplayProps {
  placedAssets: PlacedAsset[];
}

export const AvatarDisplay = ({ placedAssets }: AvatarDisplayProps) => {
  // Sort assets by zIndex
  const sortedAssets = [...placedAssets].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-3/4 bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden">
      {/* Base Avatar */}
      <img
        src={baseAvatarImg}
        alt="Base Avatar"
        className="absolute inset-0 w-full h-full object-contain"
        draggable={false}
      />

      {/* Placed Assets */}
      {sortedAssets.map((placedAsset) => {
        const assetConfig = Object.values(assetsConfig)
          .flatMap(category => Object.values(category) as AssetItem[])
          .find(asset => asset.id === placedAsset.assetId);

        if (!assetConfig) return null;

        return (
          <img
            key={placedAsset.id}
            src={assetConfig.url}
            alt={assetConfig.name}
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${placedAsset.position.x}px), calc(-50% + ${placedAsset.position.y}px)) scale(${placedAsset.scale})`,
              zIndex: placedAsset.zIndex,
              maxWidth: '120px',
              height: 'auto',
            }}
            draggable={false}
          />
        );
      })}
    </div>
  );
};
