import { useState } from 'react';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import type { PlacedAsset } from '../types';
import { assetsConfig, type AssetItem } from '../assetsConfig';
import baseAvatarImg from '../assets/images/base-avartar.png';
import { PlacedAssetItem } from './PlacedAssetItem';

interface AvatarProps {
  placedAssets: PlacedAsset[];
  onAssetMove?: (id: string, position: { x: number; y: number }) => void;
  onAssetRemove?: (id: string) => void;
  onAssetScale?: (id: string, scale: number) => void;
}

export const Avatar = ({ placedAssets, onAssetMove, onAssetRemove, onAssetScale }: AvatarProps) => {
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  
  const { setNodeRef } = useDroppable({
    id: 'avatar-canvas',
  });

  useDndMonitor({
    onDragEnd(event) {
      const assetId = event.active.id as string;
      const delta = event.delta;
      
      if (onAssetMove && (delta.x !== 0 || delta.y !== 0)) {
        const existingAsset = placedAssets.find(a => a.id === assetId);
        if (existingAsset) {
          onAssetMove(assetId, {
            x: existingAsset.position.x + delta.x,
            y: existingAsset.position.y + delta.y,
          });
        }
      }
    },
  });

  // Sort assets by zIndex
  const sortedAssets = [...placedAssets].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      ref={setNodeRef}
      className="relative w-full max-w-md mx-auto aspect-3/4 bg-linear-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden"
    >
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
          <PlacedAssetItem
            key={placedAsset.id}
            placedAsset={placedAsset}
            assetConfig={assetConfig}
            isSelected={selectedAssetId === placedAsset.id}
            onSelect={() => setSelectedAssetId(placedAsset.id)}
            onRemove={() => {
              if (onAssetRemove) onAssetRemove(placedAsset.id);
              setSelectedAssetId(null);
            }}
            onScaleChange={(scale) => {
              if (onAssetScale) onAssetScale(placedAsset.id, scale);
            }}
          />
        );
      })}
    </div>
  );
};
