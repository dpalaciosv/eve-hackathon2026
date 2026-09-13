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
        className="bg-[#F6F0E9] rounded-3xl border border-[#DDD4C7] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[#DDD4C7] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center text-xl font-bold border border-[#6D1835]/20">
              E
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#6D1835]">
                Kollektiver Research Opt-In
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#2B1720]">
                {language === 'de' ? 'Forschungslücken sichtbar machen' : 'Highlighting Research Gaps'}
              </h3>
            </div>
          </div>

          <button
            onClick={onDecline}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD4C7] text-[#2B1720] hover:text-[#6D1835] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* The Opt-In Prompt */}
        <div className="bg-white rounded-2xl p-4 border border-[#DDD4C7] space-y-2">
          <p className="text-sm font-bold text-[#2B1720] leading-relaxed">
            „Möchtest du freiwillig anonymisierte Fragesignale beitragen, um medizinische Forschungslücken zur Perimenopause sichtbar zu machen?“
          </p>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            {language === 'de'
              ? 'Deine Daten werden vollständig anonymisiert. Weder dein Name noch persönliche Identifikatoren werden gespeichert. Es fließen nur das abstrakte Symptomcluster und die Lebensphase in die aggregierte EVE Gap Map ein.'
              : 'Your contribution is strictly anonymized. No personal identifiers or PII are stored. Only the abstract symptom cluster and life stage populate the aggregated EVE Gap Map.'}
          </p>
        </div>

        {/* Privacy assurances */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-3 rounded-xl border border-[#DDD4C7] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6D1835] shrink-0" />
            <span className="text-[#2B1720] text-[11px] font-bold">100% Anonym</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#DDD4C7] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6D1835] shrink-0" />
            <span className="text-[#2B1720] text-[11px] font-bold">Kein Tracking</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
          <button
            onClick={onDecline}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#DDD4C7] bg-white text-xs font-bold text-[#2B1720] hover:bg-[#FAF6F1] transition-colors cursor-pointer"
          >
            Privat behalten
          </button>
          <button
            onClick={onConsent}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HeartHandshake className="w-4 h-4 text-[#E76F61]" />
            <span>Ja, beitragen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
