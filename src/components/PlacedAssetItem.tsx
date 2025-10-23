import { useDraggable } from '@dnd-kit/core';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import type { PlacedAsset } from '../types';
import type { AssetItem } from '../assetsConfig';

interface PlacedAssetItemProps {
  placedAsset: PlacedAsset;
  assetConfig: AssetItem;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onScaleChange: (scale: number) => void;
}

export const PlacedAssetItem = ({
  placedAsset,
  assetConfig,
  isSelected,
  onSelect,
  onRemove,
  onScaleChange,
}: PlacedAssetItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: placedAsset.id,
    data: { placedAsset },
  });

  const style = {
    left: '50%',
    top: '50%',
    transform: transform
      ? `translate(calc(-50% + ${placedAsset.position.x + transform.x}px), calc(-50% + ${placedAsset.position.y + transform.y}px)) scale(${placedAsset.scale})`
      : `translate(calc(-50% + ${placedAsset.position.x}px), calc(-50% + ${placedAsset.position.y}px)) scale(${placedAsset.scale})`,
    zIndex: isDragging ? 1000 : placedAsset.zIndex,
    opacity: isDragging ? 0.7 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const handleScaleUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onScaleChange(Math.min(placedAsset.scale + 0.1, 3));
  };

  const handleScaleDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onScaleChange(Math.max(placedAsset.scale - 0.1, 0.2));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="absolute"
      onClick={onSelect}
      {...listeners}
      {...attributes}
    >
      <div className="relative">
        <img
          src={assetConfig.url}
          alt={assetConfig.name}
          className="max-w-[120px] h-auto select-none"
          draggable={false}
        />
        
        {isSelected && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-gray-900/90 rounded-lg p-1 border border-primary shadow-lg">
            <button
              onClick={handleScaleDown}
              className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors"
              title="Scale Down"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <button
              onClick={handleScaleUp}
              className="p-1.5 bg-gray-800 hover:bg-gray-700 rounded text-white transition-colors"
              title="Scale Up"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
            <button
              onClick={handleRemove}
              className="p-1.5 bg-red-600 hover:bg-red-700 rounded text-white transition-colors"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        {isSelected && (
          <div className="absolute inset-0 border-2 border-dashed border-primary rounded pointer-events-none" />
        )}
      </div>
    </div>
  );
};
