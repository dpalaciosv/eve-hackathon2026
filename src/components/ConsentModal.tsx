import React from 'react';
import { ShieldCheck, HeartHandshake, Lock, X } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onConsent: () => void;
  onDecline: () => void;
  language: 'de' | 'en';
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onConsent,
  onDecline,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-3xl border border-[#E2DDD2] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#ECE7DC] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E84E36]/10 text-[#C93B26] flex items-center justify-center text-xl">
              🍎
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#C93B26]">
                Kollektiver Research Opt-In
              </span>
              <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#1E1B18]">
                {language === 'de' ? 'Forschungslücken sichtbar machen' : 'Highlighting Research Gaps'}
              </h3>
            </div>
          </div>

          <button
            onClick={onDecline}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#7A746E] hover:text-[#1E1B18] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Exact Opt-In Prompt from Specification */}
        <div className="bg-[#FAF8F5] rounded-2xl p-4 border border-[#ECE5D8] space-y-2">
          <p className="text-sm font-semibold text-[#1E1B18] leading-relaxed">
            „Would you like to voluntarily contribute anonymised question signals to help highlight medical research gaps?“
          </p>
          <p className="text-xs text-[#6B655E] leading-relaxed">
            {language === 'de'
              ? 'Deine Daten werden vollständig anonymisiert. Weder dein Name, noch Identifikatoren oder persönliche Merkmale werden gespeichert. Es fließen nur das abstrakte Symptomcluster und die Lebensphase in die aggregierte EVE Gap Map ein.'
              : 'Your contribution is strictly anonymized. No personal identifiers or PII are stored. Only the abstract symptom cluster and life stage populate the aggregated EVE Gap Map.'}
          </p>
        </div>

        {/* Privacy assurances */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-[#F8FAF8] p-3 rounded-xl border border-[#DFEEDF] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span className="text-[#1E3B20] text-[11px] font-medium">100% Anonym</span>
          </div>
          <div className="bg-[#F8FAF8] p-3 rounded-xl border border-[#DFEEDF] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#2E7D32] shrink-0" />
            <span className="text-[#1E3B20] text-[11px] font-medium">Kein Tracking</span>
          </div>
        </div>

        {/* Action Buttons as requested */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onDecline}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DCD5C9] text-xs font-semibold text-[#6A645D] hover:bg-[#F2ECE3] transition-colors"
          >
            Keep private
          </button>
          <button
            onClick={onConsent}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#E84E36] hover:bg-[#D53F28] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Yes, contribute</span>
          </button>
        </div>
      </div>
    </div>
  );
};
