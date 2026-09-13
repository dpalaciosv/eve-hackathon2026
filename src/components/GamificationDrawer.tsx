import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Check,
  Clock
} from 'lucide-react';
import { ValidationBadge, LifestyleToolkit } from '../types';

interface GamificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  badges: ValidationBadge[];
  toolkits: LifestyleToolkit[];
  symptomsPresentCount: number;
}

export const GamificationDrawer: React.FC<GamificationDrawerProps> = ({
  isOpen,
  onClose,
  badges,
  toolkits,
  symptomsPresentCount
}) => {
  const [activeTab, setActiveTab] = useState<'toolkits' | 'badges'>('toolkits');
  const [selectedToolkitId, setSelectedToolkitId] = useState<string | null>(null);

  if (!isOpen) return null;

  const unlockedToolkitsCount = toolkits.filter(t => t.isUnlocked).length;
  const unlockedBadgesCount = badges.filter(b => b.isUnlocked).length;

  const selectedToolkit = toolkits.find(t => t.id === selectedToolkitId) || toolkits[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#F6F0E9] rounded-3xl shadow-2xl border border-[#DDD4C7] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#DDD4C7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center border border-[#6D1835]/20">
              <Award className="w-4 h-4 text-[#6D1835]" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-[#2B1720]">
                Toolkits & Badges
              </h2>
              <p className="text-[11px] text-[#161616]/75 font-normal">
                {symptomsPresentCount} Symptome gematcht • {unlockedToolkitsCount}/{toolkits.length} Toolkits freigeschaltet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF6F1] hover:bg-[#EAE2D6] border border-[#DDD4C7] flex items-center justify-center text-[#2B1720] cursor-pointer"
          >
            <X className="w-4 h-4 text-[#2B1720]" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-3 bg-white flex items-center gap-3 border-b border-[#DDD4C7] shrink-0">
          <button
            onClick={() => setActiveTab('toolkits')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'toolkits'
                ? 'border-[#2B1720] text-[#2B1720]'
                : 'border-transparent text-[#161616]/70 hover:text-[#2B1720]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E76F61]" />
            <span>Lifestyle Toolkits ({unlockedToolkitsCount}/{toolkits.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'border-[#2B1720] text-[#2B1720]'
                : 'border-transparent text-[#161616]/70 hover:text-[#2B1720]'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>Validation Badges ({unlockedBadgesCount}/{badges.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* TAB 1: TOOLKITS */}
          {activeTab === 'toolkits' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {toolkits.map((toolkit) => {
                  const isSelected = selectedToolkitId === toolkit.id;
                  return (
                    <div
                      key={toolkit.id}
                      onClick={() => toolkit.isUnlocked && setSelectedToolkitId(toolkit.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        toolkit.isUnlocked
                          ? isSelected
                            ? 'bg-white border-[#2B1720] shadow-sm'
                            : 'bg-white border-[#DDD4C7] hover:border-[#6D1835]/50 shadow-xs'
                          : 'bg-[#EAE2D6]/60 border-[#DDD4C7] opacity-75 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                            {toolkit.badge}
                          </span>
                          {toolkit.isUnlocked ? (
                            <span className="text-[10px] font-bold text-[#6D1835] bg-[#E76F61]/15 px-2 py-0.5 rounded-full border border-[#E76F61]/30 flex items-center gap-1">
                              <Check className="w-3 h-3 text-[#E76F61]" /> Freigeschaltet
                            </span>
                          ) : (
                            <span className="text-[10px] font-normal text-[#161616]/60 bg-[#FAF6F1] px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#DDD4C7]">
                              <Lock className="w-3 h-3" /> {toolkit.unlockThreshold} Matches nötig
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-[#2B1720] mb-1">
                          {toolkit.title}
                        </h3>

                        <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
                          {toolkit.tagline}
                        </p>
                      </div>

                      {toolkit.isUnlocked && (
                        <div className="mt-3 pt-2.5 border-t border-[#EAE2D6] text-[11px] font-bold text-[#6D1835] flex items-center justify-between">
                          <span>Protokoll ansehen</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected Toolkit Protocol Detail Card */}
              {selectedToolkit && selectedToolkit.isUnlocked && (
                <div className="bg-white border border-[#2B1720] rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EAE2D6] pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D1835]">
                        {selectedToolkit.badge} Protokoll
                      </span>
                      <h3 className="font-bold text-base text-[#2B1720]">
                        {selectedToolkit.title}
                      </h3>
                    </div>
                    <span className="text-xs text-[#161616]/75 font-normal">
                      Empfohlenes Supplement / Food: <strong className="text-[#2B1720] font-bold">{selectedToolkit.keySupplementOrFood}</strong>
                    </span>
                  </div>

                  {/* Step-by-Step Protocol */}
                  <div className="space-y-2.5">
                    {selectedToolkit.protocolSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF6F1] p-3 rounded-xl border border-[#DDD4C7] text-xs text-[#161616]"
                      >
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#6D1835] mb-1">
                          <Clock className="w-3 h-3 text-[#E76F61]" />
                          <span>{step.timing}</span>
                        </div>
                        <div className="font-bold text-xs text-[#2B1720] mb-1">
                          {step.action}
                        </div>
                        <div className="text-[11px] text-[#161616]/80 leading-relaxed font-normal">
                          {step.scientificReason}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Checklist */}
                  <div className="pt-2 border-t border-[#EAE2D6]">
                    <div className="text-xs font-bold text-[#2B1720] mb-2">
                      Checkliste für den Alltag:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedToolkit.quickChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#161616] font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E76F61] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VALIDATION BADGES */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {badges.map((badge) => {
                const percent = Math.min(100, Math.round((badge.progressCurrent / badge.progressTarget) * 100));
                return (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      badge.isUnlocked
                        ? 'bg-white border-[#2B1720] shadow-xs'
                        : 'bg-white/90 border-[#DDD4C7]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          badge.isUnlocked ? 'bg-[#2B1720] text-[#E76F61]' : 'bg-[#FAF6F1] text-[#2B1720]/60 border border-[#DDD4C7]'
                        }`}>
                          <Award className="w-4 h-4" />
                        </div>
                        {badge.isUnlocked ? (
                          <span className="text-[10px] font-bold uppercase text-[#6D1835] bg-[#E76F61]/15 border border-[#E76F61]/30 px-2 py-0.5 rounded-full">
                            Freigeschaltet ✓
                          </span>
                        ) : (
                          <span className="text-[10px] font-normal text-[#161616]/60">
                            {badge.progressCurrent} / {badge.progressTarget}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-[#2B1720] mb-0.5">
                        {badge.title}
                      </h3>
                      <div className="text-[11px] font-bold text-[#6D1835] mb-1.5">
                        {badge.subtitle}
                      </div>
                      <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
                        {badge.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 pt-2 border-t border-[#EAE2D6]">
                      <div className="w-full h-1.5 bg-[#EAE2D6] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            badge.isUnlocked ? 'bg-gradient-to-r from-[#6D1835] to-[#E76F61]' : 'bg-[#2B1720]'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-white border-t border-[#DDD4C7] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#161616]/75 font-normal">
            Swipen schaltet Schritt für Schritt neue wissenschaftliche Toolkits frei.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
};
