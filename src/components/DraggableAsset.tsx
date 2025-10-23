import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { AssetItem } from '../assetsConfig';

interface DraggableAssetProps {
  asset: AssetItem;
  onAddToCanvas: (assetId: string) => void;
}

export const DraggableAsset = ({ asset, onAddToCanvas }: DraggableAssetProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: asset.id,
    data: { asset },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => onAddToCanvas(asset.id)}
      className="relative w-16 h-16 bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-primary rounded-lg transition-all cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <img
        src={asset.url}
        alt={asset.name}
        className="w-full h-full object-contain"
        draggable={false}
      />
    </button>
  );
};
