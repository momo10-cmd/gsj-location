import React, { useState } from 'react';
import logoTransparent from '../assets/images/gsj_logo_transparent.png';
import logoCropped from '../assets/images/gsj_logo_cropped.jpg';

interface GSJLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'mono' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  onClick?: () => void;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
}

export const GSJLogo: React.FC<GSJLogoProps> = ({
  className = '',
  size = 'md',
  onClick,
  imgClassName,
  imgStyle,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(logoTransparent);

  // Tailles adaptées pour le header mobile/desktop et le footer
  const sizeClasses = {
    sm: 'h-11 sm:h-13 md:h-14 w-auto',
    md: 'h-14 sm:h-16 md:h-18 w-auto',
    lg: 'h-20 sm:h-24 max-h-24 w-auto',
    xl: 'h-24 sm:h-28 max-h-28 w-auto',
  }[size];

  const handleImageError = () => {
    if (imgSrc === logoTransparent) {
      setImgSrc(logoCropped);
    } else if (imgSrc === logoCropped) {
      setImgSrc('/images/gsj_logo_transparent.png');
    } else {
      setImgSrc('/images/gsj_logo_cropped.jpg');
    }
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="GSJ Location Abidjan"
    >
      <img
        src={imgSrc}
        alt="GSJ Location Abidjan"
        style={imgStyle}
        className={`${imgClassName || sizeClasses} object-contain transition-transform duration-200 hover:scale-[1.02]`}
        onError={handleImageError}
        loading="eager"
      />
    </div>
  );
};

