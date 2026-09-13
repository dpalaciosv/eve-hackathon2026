import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles, XCircle, ShieldCheck } from 'lucide-react';

export type EvidenceType = 'strong' | 'limited' | 'female_layer' | 'unsupported' | 'neutral';

interface EvidenceBadgeProps {
  type: EvidenceType;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  type,
  label,
  sublabel,
  size = 'md',
  showIcon = true
}) => {
  switch (type) {
    case 'strong':
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[11px]' 
            : size === 'lg' 
            ? 'px-4 py-1.5 text-sm' 
            : 'px-3 py-1 text-xs'
        } bg-[#E8F5E9] text-[#1B5E20] border-[#C8E6C9]`}>
          {showIcon && <span className="text-xs">🟢</span>}
          <span>{label || 'Strong Evidence'}</span>
          {sublabel && <span className="text-[10px] text-[#2E7D32] opacity-80">({sublabel})</span>}
        </div>
      );

    case 'limited':
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[11px]' 
            : size === 'lg' 
            ? 'px-4 py-1.5 text-sm' 
            : 'px-3 py-1 text-xs'
        } bg-[#FFF8E1] text-[#B78103] border-[#FFE082]`}>
          {showIcon && <span className="text-xs">🟡</span>}
          <span>{label || 'Limited Evidence'}</span>
          {sublabel && <span className="text-[10px] text-[#8D6502] opacity-80">({sublabel})</span>}
        </div>
      );

    case 'female_layer':
      // Distinct violet/pink palette as specifically mandated in prompt
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-bold border ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[11px]' 
            : size === 'lg' 
            ? 'px-4 py-1.5 text-sm' 
            : 'px-3 py-1 text-xs'
        } bg-gradient-to-r from-[#FCE7F3] via-[#F3E8FF] to-[#FCE7F3] text-[#86198F] border-[#E879F9]/40 shadow-xs`}>
          {showIcon && <span>♀️</span>}
          <span>{label || 'Evidence for Women Like Me'}</span>
          {sublabel && <span className="text-[10px] text-[#701A75] font-normal">({sublabel})</span>}
        </div>
      );

    case 'unsupported':
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[11px]' 
            : size === 'lg' 
            ? 'px-4 py-1.5 text-sm' 
            : 'px-3 py-1 text-xs'
        } bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]`}>
          {showIcon && <span className="text-xs">🔴</span>}
          <span>{label || 'Unsupported / Unproven'}</span>
          {sublabel && <span className="text-[10px] text-[#B71C1C] opacity-80">({sublabel})</span>}
        </div>
      );

    case 'neutral':
      return (
        <div className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${
          size === 'sm' 
            ? 'px-2.5 py-0.5 text-[11px]' 
            : size === 'lg' 
            ? 'px-4 py-1.5 text-sm' 
            : 'px-3 py-1 text-xs'
        } bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]`}>
          {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-[#4B5563]" />}
          <span>{label || 'No relevant gender evidence gap found'}</span>
        </div>
      );

    default:
      return null;
  }
};
