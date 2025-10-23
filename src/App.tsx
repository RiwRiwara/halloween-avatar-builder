import { useState } from 'react';
import type { AvatarOptions } from './types';
import { defaultAvatar } from './avatarData';
import { CustomizationPage } from './components/CustomizationPage';
import { SaveSharePage } from './components/SaveSharePage';

function App() {
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(defaultAvatar);
  const [currentPage, setCurrentPage] = useState<'customize' | 'save'>('customize');

  return (
    <div className="font-sans">
      {currentPage === 'customize' ? (
        <CustomizationPage
          avatarOptions={avatarOptions}
          onAvatarChange={setAvatarOptions}
          onNext={() => setCurrentPage('save')}
        />
      ) : (
        <SaveSharePage avatarOptions={avatarOptions} onBack={() => setCurrentPage('customize')} />
      )}
    </div>
  );
}

export default App;
