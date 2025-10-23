import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { ChevronRight, Shirt, Eye, Crown, Sparkles, Trash2 } from 'lucide-react';
import type { PlacedAsset } from '../types';
import { Avatar } from './Avatar';
import { assetsConfig, type CategoryKey } from '../assetsConfig';
import { DraggableAsset } from './DraggableAsset';

interface CustomizationPageProps {
  placedAssets: PlacedAsset[];
  onAssetsChange: (assets: PlacedAsset[]) => void;
  onNext: () => void;
}

export const CustomizationPage = ({ placedAssets, onAssetsChange, onNext }: CustomizationPageProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('head');

  const handleAddAsset = (assetId: string) => {
    const categoryData = assetsConfig[activeCategory];
    const asset = categoryData[assetId];
    
    if (!asset) return;

    const newAsset: PlacedAsset = {
      id: `${assetId}-${Date.now()}`,
      assetId: asset.id,
      category: activeCategory,
      position: asset.position || { x: 0, y: 0 },
      scale: asset.scale || 1,
      zIndex: asset.zIndex || 5,
    };

    onAssetsChange([...placedAssets, newAsset]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === 'avatar-canvas') {
      const assetId = event.active.id as string;
      const asset = event.active.data.current?.asset;
      
      if (asset) {
        handleAddAsset(assetId);
      }
    }
  };

  const handleAssetMove = (id: string, position: { x: number; y: number }) => {
    onAssetsChange(
      placedAssets.map((asset) =>
        asset.id === id ? { ...asset, position } : asset
      )
    );
  };

  const handleAssetRemove = (id: string) => {
    onAssetsChange(placedAssets.filter((asset) => asset.id !== id));
  };

  const handleAssetScale = (id: string, scale: number) => {
    onAssetsChange(
      placedAssets.map((asset) =>
        asset.id === id ? { ...asset, scale } : asset
      )
    );
  };

  const handleClearAll = () => {
    onAssetsChange([]);
  };

  const categoryIcons: Record<CategoryKey, React.ReactNode> = {
    head: <Crown className="w-5 h-5" />,
    face: <Eye className="w-5 h-5" />,
    body: <Shirt className="w-5 h-5" />,
    accessories: <Sparkles className="w-5 h-5" />,
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-linear-to-r from-primary to-orange-600 p-4 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Halloween Avatar Builder
          </h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4">
          {/* Avatar Canvas */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Avatar 
                placedAssets={placedAssets} 
                onAssetMove={handleAssetMove}
                onAssetRemove={handleAssetRemove}
                onAssetScale={handleAssetScale}
              />
            </div>
          </div>

          {/* Customization Panel */}
          <div className="lg:w-96 bg-gray-900 rounded-lg shadow-xl border border-gray-800 flex flex-col">
            {/* Category Tabs */}
            <div className="grid grid-cols-4 gap-2 p-4 border-b border-gray-800">
              {Object.keys(assetsConfig).map((cat) => {
                const category = cat as CategoryKey;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-lg font-medium transition-all ${
                      activeCategory === category
                        ? '  text-gray-200'
                        : 'bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-200'
                    }`}
                  >
                    {categoryIcons[category]}
                    <span className="text-xs capitalize">{category}</span>
                  </button>
                );
              })}
            </div>

            {/* Assets Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-4 gap-3">
                {Object.values(assetsConfig[activeCategory]).map((asset) => (
                  <DraggableAsset
                    key={asset.id}
                    asset={asset}
                    onAddToCanvas={handleAddAsset}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-800 space-y-3">
              <button
                onClick={handleClearAll}
                disabled={placedAssets.length === 0}
                className="w-full bg-gray-500 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
              
              <button
                onClick={onNext}
                className="w-full bg-gray-200 hover:bg-gray-700 text-black font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  );
};
