import React from 'react';

interface EveLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const EveLogo: React.FC<EveLogoProps> = ({
  size = 'md',
  showSubtitle = true,
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
      {/* EVE Emblem SVG Mark (Harmonized with #2B1720, #6D1835, #E76F61) */}
      <div className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#6D1835] via-[#2B1720] to-[#2B1720] flex items-center justify-center p-1.5 shadow-sm text-white shrink-0 border border-[#6D1835]/30`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Stylized interconnected dots and gentle botanical/endocrine curve */}
          <circle cx="24" cy="24" r="21" stroke="#E76F61" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <path
            d="M14 26C14 20.4772 18.4772 16 24 16C29.5228 16 34 20.4772 34 26C34 31.5228 29.5228 34 24 34C18.4772 34 14 31.5228 14 26Z"
            fill="#6D1835"
            fillOpacity="0.4"
          />
          <path
            d="M17 24C17 20.134 20.134 17 24 17C27.866 17 31 20.134 31 24C31 27.866 27.866 31 24 31"
            stroke="#E76F61"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* 3 Interconnected Dots (Evidence, Connection, Care) */}
          <circle cx="17" cy="24" r="3.2" fill="#E76F61" />
          <circle cx="24" cy="17" r="3.2" fill="#FAF8F5" />
          <circle cx="31" cy="24" r="3.2" fill="#E76F61" />
        </svg>
      </div>

      {/* Brand Typography: Open Sans Light (300) for EVE as explicitly requested */}
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
    </div>
  );
};
