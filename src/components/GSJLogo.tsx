import React from 'react';

interface GSJLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
}

export const GSJLogo: React.FC<GSJLogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  onClick,
}) => {
  const isDark = variant === 'dark';

  // Sizing configurations
  const dimensions = {
    sm: { width: 140, height: 48, textScale: 'text-base', subScale: 'text-[9px]' },
    md: { width: 180, height: 62, textScale: 'text-xl', subScale: 'text-[11px]' },
    lg: { width: 220, height: 76, textScale: 'text-2xl', subScale: 'text-xs' },
    xl: { width: 280, height: 96, textScale: 'text-3xl', subScale: 'text-sm' },
  }[size];

  const carTopColor = isDark ? '#FFFFFF' : '#0F172A';
  const cyanAccent = '#00AEEF';
  const subtextColor = isDark ? '#CBD5E1' : '#0F172A';

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="GSJ Location Abidjan"
    >
      {/* SVG Car Graphic Mark */}
      <svg
        viewBox="0 0 340 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto"
        style={{ height: `${dimensions.height * 0.55}px` }}
      >
        {/* Top car silhouette: aerodynamic curve from hood to roof and tail */}
        <path
          d="M 40 46 C 75 42 120 28 148 20 C 180 12 215 15 240 28 C 265 41 292 46 320 54 C 305 52 285 45 272 43 C 255 41 235 41 215 34 C 185 24 150 24 120 33 C 90 42 60 46 40 46 Z"
          fill={carTopColor}
        />
        {/* Sleek roof arc line */}
        <path
          d="M 50 44 C 95 38 140 22 170 17 C 205 12 245 16 270 34 C 290 48 310 52 322 55"
          stroke={carTopColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Front window and cabin cut */}
        <path
          d="M 105 38 C 145 28 190 26 215 36"
          stroke={carTopColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Lower body ground sweep line */}
        <path
          d="M 50 44 L 180 44 C 185 44 190 43 195 41"
          stroke={carTopColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Dynamic Electric Cyan / Sky Blue Lower Accents & Wheel Arch Flourishes */}
        {/* Speed sweep underline */}
        <path
          d="M 35 56 C 85 57 140 57 175 62 L 205 62 L 185 70 L 235 70 L 210 80 C 250 79 300 83 318 84"
          stroke={cyanAccent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cyan front wheel arch gesture */}
        <path
          d="M 62 68 C 72 58 100 58 114 70"
          stroke={cyanAccent}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Secondary electric streak */}
        <path
          d="M 125 61 C 150 61 175 62 200 65"
          stroke={cyanAccent}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 185 75 L 305 76"
          stroke={cyanAccent}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Name Lockup */}
      <div className="flex flex-col items-center -mt-1">
        <div className="flex items-baseline font-black tracking-tight leading-none">
          <span
            className={`font-black ${isDark ? 'text-white' : 'text-slate-950'} ${dimensions.textScale}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.03em' }}
          >
            GSJ
          </span>
          <span
            className={`ml-1.5 font-bold text-[#00AEEF] ${dimensions.textScale}`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}
          >
            Location
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-extrabold uppercase mt-0.5 tracking-[0.38em] pl-[0.38em] ${dimensions.subScale}`}
            style={{ color: subtextColor }}
          >
            ABIDJAN
          </span>
        )}
      </div>
    </div>
  );
};
