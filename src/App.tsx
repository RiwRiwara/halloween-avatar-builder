import { useState } from 'react';
import type { PlacedAsset } from './types';
import { CustomizationPage } from './components/CustomizationPage';
import { SaveSharePage } from './components/SaveSharePage';

function App() {
  const [placedAssets, setPlacedAssets] = useState<PlacedAsset[]>([]);
  const [currentPage, setCurrentPage] = useState<'customize' | 'save'>('customize');

  return (
    <div className="font-sans min-h-screen bg-linear-to-br from-purple-900 via-gray-900 to-orange-900">
      {currentPage === 'customize' ? (
        <CustomizationPage
          placedAssets={placedAssets}
          onAssetsChange={setPlacedAssets}
          onNext={() => setCurrentPage('save')}
        />
      ) : (
        <SaveSharePage placedAssets={placedAssets} onBack={() => setCurrentPage('customize')} />
      )}
    </div>
  );
}

export default App;
