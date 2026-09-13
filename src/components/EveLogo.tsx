import React from 'react';

interface EveLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  showWordmark?: boolean;
  className?: string;
}

export const EveLogo: React.FC<EveLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  showWordmark = true,
  className = ''
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact EVE Official Brand Emblem from uploaded SVG */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#6D1835] transition-transform duration-200 hover:scale-105"
          aria-label="EVE Logo"
        >
          {/* Outer Ring */}
          <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="5.5" />
          
          {/* Upper Arch / Semicircle */}
          <path d="M 21 50 A 29 29 0 0 1 79 50" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          
          {/* Horizontal Diameter Line */}
          <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
          
          {/* Center Core Dot */}
          <circle cx="50" cy="50" r="7.5" fill="currentColor" />
        </svg>
      </div>

      {/* Brand Typography: Open Sans Light (300) for EVE as explicitly requested */}
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-logo font-light ${textSizes[size]} tracking-[0.22em] text-[#2B1720] uppercase`}>
              EVE
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
              Evidence
            </span>
          </div>
          {showSubtitle && (
            <p className={`${subtitleSizes[size]} font-normal text-[#6D1835] tracking-wide mt-0.5`}>
              Evidence for every woman
            </p>
          )}
        </div>
      )}
    </div>
  );
};
