import type { AvatarOptions } from '../types';

interface AvatarProps {
  options: AvatarOptions;
}

export const Avatar = ({ options }: AvatarProps) => {
  const renderHead = () => {
    switch (options.head) {
      case 'witch-hat':
        return (
          <>
            {/* Witch Hat */}
            <path
              d="M 60 30 L 50 50 L 110 50 L 100 30 Z"
              fill="#1a0033"
              stroke="#8b4513"
              strokeWidth="1"
            />
            <ellipse cx="80" cy="50" rx="35" ry="8" fill="#1a0033" />
            <circle cx="75" cy="40" r="3" fill="#ffd700" />
          </>
        );
      case 'pumpkin':
        return (
          <>
            {/* Pumpkin Head */}
            <circle cx="80" cy="35" r="25" fill="#ff6600" stroke="#cc5200" strokeWidth="2" />
            <path d="M 80 10 Q 80 20 80 35" stroke="#228b22" strokeWidth="4" fill="none" />
            <ellipse cx="72" cy="30" rx="4" ry="6" fill="#000" />
            <ellipse cx="88" cy="30" rx="4" ry="6" fill="#000" />
            <path d="M 70 40 Q 80 45 90 40" stroke="#000" strokeWidth="2" fill="none" />
          </>
        );
      case 'horns':
        return (
          <>
            {/* Devil Horns */}
            <path d="M 50 45 Q 45 35 48 25 Q 52 30 55 40 Z" fill="#cc0000" stroke="#990000" strokeWidth="1" />
            <path d="M 110 45 Q 115 35 112 25 Q 108 30 105 40 Z" fill="#cc0000" stroke="#990000" strokeWidth="1" />
          </>
        );
      case 'bat-ears':
        return (
          <>
            {/* Bat Ears */}
            <path d="M 45 45 Q 35 40 30 50 Q 35 55 45 50 Z" fill="#2d2d2d" stroke="#000" strokeWidth="1" />
            <path d="M 115 45 Q 125 40 130 50 Q 125 55 115 50 Z" fill="#2d2d2d" stroke="#000" strokeWidth="1" />
          </>
        );
      default:
        return null;
    }
  };

  const renderEyes = () => {
    const eyeY = 65;
    const leftEyeX = 65;
    const rightEyeX = 95;

    switch (options.eyes) {
      case 'spooky':
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r="6" fill="#fff" />
            <circle cx={leftEyeX} cy={eyeY} r="3" fill="#000" />
            <circle cx={rightEyeX} cy={eyeY} r="6" fill="#fff" />
            <circle cx={rightEyeX} cy={eyeY} r="3" fill="#000" />
          </>
        );
      case 'vampire':
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r="6" fill="#ff0000" />
            <circle cx={leftEyeX} cy={eyeY} r="3" fill="#000" />
            <circle cx={rightEyeX} cy={eyeY} r="6" fill="#ff0000" />
            <circle cx={rightEyeX} cy={eyeY} r="3" fill="#000" />
          </>
        );
      case 'zombie':
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r="6" fill="#90ee90" />
            <circle cx={leftEyeX + 2} cy={eyeY} r="3" fill="#000" />
            <circle cx={rightEyeX} cy={eyeY} r="6" fill="#90ee90" />
            <circle cx={rightEyeX - 2} cy={eyeY} r="3" fill="#000" />
          </>
        );
      case 'demon':
        return (
          <>
            <path d={`M ${leftEyeX - 8} ${eyeY} L ${leftEyeX + 8} ${eyeY - 6} L ${leftEyeX + 8} ${eyeY + 6} Z`} fill="#ff6600" />
            <circle cx={leftEyeX + 3} cy={eyeY} r="2" fill="#000" />
            <path d={`M ${rightEyeX + 8} ${eyeY} L ${rightEyeX - 8} ${eyeY - 6} L ${rightEyeX - 8} ${eyeY + 6} Z`} fill="#ff6600" />
            <circle cx={rightEyeX - 3} cy={eyeY} r="2" fill="#000" />
          </>
        );
      default: // normal
        return (
          <>
            <circle cx={leftEyeX} cy={eyeY} r="4" fill="#000" />
            <circle cx={rightEyeX} cy={eyeY} r="4" fill="#000" />
          </>
        );
    }
  };

  const renderBody = () => {
    switch (options.body) {
      case 'skeleton':
        return (
          <>
            <rect x="50" y="95" width="60" height="85" fill="#fff" stroke="#000" strokeWidth="2" rx="30" />
            {/* Ribs */}
            <line x1="60" y1="110" x2="100" y2="110" stroke="#000" strokeWidth="2" />
            <line x1="60" y1="120" x2="100" y2="120" stroke="#000" strokeWidth="2" />
            <line x1="60" y1="130" x2="100" y2="130" stroke="#000" strokeWidth="2" />
            <line x1="60" y1="140" x2="100" y2="140" stroke="#000" strokeWidth="2" />
          </>
        );
      case 'vampire-cape':
        return (
          <>
            <path d="M 30 95 Q 20 120 25 180 L 135 180 Q 140 120 130 95" fill="#000" opacity="0.8" />
            <rect x="50" y="95" width="60" height="85" fill="#cc0000" stroke="#990000" strokeWidth="2" rx="30" />
            <polygon points="70,110 90,110 80,130" fill="#fff" />
          </>
        );
      case 'mummy':
        return (
          <>
            <rect x="50" y="95" width="60" height="85" fill="#f5f5dc" stroke="#d3d3d3" strokeWidth="2" rx="30" />
            {/* Bandages */}
            <line x1="50" y1="105" x2="110" y2="105" stroke="#d3d3d3" strokeWidth="4" />
            <line x1="50" y1="120" x2="110" y2="120" stroke="#d3d3d3" strokeWidth="4" />
            <line x1="50" y1="135" x2="110" y2="135" stroke="#d3d3d3" strokeWidth="4" />
            <line x1="50" y1="150" x2="110" y2="150" stroke="#d3d3d3" strokeWidth="4" />
            <line x1="50" y1="165" x2="110" y2="165" stroke="#d3d3d3" strokeWidth="4" />
          </>
        );
      case 'ghost':
        return (
          <>
            <path
              d="M 50 95 Q 50 95 50 120 L 50 180 Q 60 175 70 180 Q 80 175 90 180 Q 100 175 110 180 L 110 120 Q 110 95 80 95 Z"
              fill="#fff"
              stroke="#e0e0e0"
              strokeWidth="2"
              opacity="0.9"
            />
          </>
        );
      default: // plain
        return (
          <rect x="50" y="95" width="60" height="85" fill="#4a90e2" stroke="#357abd" strokeWidth="2" rx="30" />
        );
    }
  };

  return (
    <svg viewBox="0 0 160 200" className="w-full h-full max-w-sm mx-auto">
      {/* Head Accessories (Behind) */}
      {renderHead()}

      {/* Head */}
      <circle cx="80" cy="60" r="30" fill={options.skinTone} stroke="#333" strokeWidth="1.5" />

      {/* Eyes */}
      {renderEyes()}

      {/* Mouth */}
      <path d="M 70 75 Q 80 80 90 75" stroke="#333" strokeWidth="1.5" fill="none" />

      {/* Neck */}
      <rect x="70" y="85" width="20" height="10" fill={options.skinTone} stroke="#333" strokeWidth="1" />

      {/* Body */}
      {renderBody()}

      {/* Arms */}
      <ellipse cx="35" cy="130" rx="12" ry="35" fill={options.skinTone} stroke="#333" strokeWidth="1" />
      <ellipse cx="125" cy="130" rx="12" ry="35" fill={options.skinTone} stroke="#333" strokeWidth="1" />
    </svg>
  );
};
