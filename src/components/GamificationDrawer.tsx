import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  X, 
  Moon, 
  Flame, 
  Brain, 
  ChevronRight, 
  Check,
  ShieldCheck,
  Zap,
  Clock,
  Compass,
  GitCommit,
  Stethoscope
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#FBF9F6] rounded-3xl shadow-2xl border border-[#DCD5C8] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE4D9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-heading font-black text-lg text-[#1E1B18]">
                Toolkits & Badges
              </h2>
              <p className="text-[11px] text-[#6B655E]">
                {symptomsPresentCount} Symptome gematcht • {unlockedToolkitsCount}/{toolkits.length} Toolkits freigeschaltet
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#DDD6C8] flex items-center justify-center text-[#706A62] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-3 bg-white flex items-center gap-3 border-b border-[#EAE4D9] shrink-0">
          <button
            onClick={() => setActiveTab('toolkits')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'toolkits'
                ? 'border-[#8B5CF6] text-[#8B5CF6]'
                : 'border-transparent text-[#706A62] hover:text-[#1E1B18]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifestyle Toolkits ({unlockedToolkitsCount}/{toolkits.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'border-[#8B5CF6] text-[#8B5CF6]'
                : 'border-transparent text-[#706A62] hover:text-[#1E1B18]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
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
                            ? 'bg-purple-50 border-[#8B5CF6] shadow-sm'
                            : 'bg-white border-[#EAE4D9] hover:border-[#8B5CF6]/50 shadow-xs'
                          : 'bg-[#F3EFEA]/80 border-[#E2DDD2] opacity-75 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#7C3AED]">
                            {toolkit.badge}
                          </span>
                          {toolkit.isUnlocked ? (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Freigeschaltet
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-[#8A8379] bg-[#EAE4D9] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" /> {toolkit.unlockThreshold} Matches nötig
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-sm text-[#1E1B18] mb-1">
                          {toolkit.title}
                        </h3>

                        <p className="text-xs text-[#6B655E] leading-relaxed">
                          {toolkit.tagline}
                        </p>
                      </div>

                      {toolkit.isUnlocked && (
                        <div className="mt-3 pt-2.5 border-t border-[#F0EBE1] text-[11px] font-bold text-[#8B5CF6] flex items-center justify-between">
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
                <div className="bg-white border border-[#8B5CF6]/30 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#8B5CF6]">
                        {selectedToolkit.badge} Protokoll
                      </span>
                      <h3 className="font-serif-heading font-black text-base text-[#1E1B18]">
                        {selectedToolkit.title}
                      </h3>
                    </div>
                    <span className="text-xs text-[#6B655E]">
                      Empfohlenes Supplement / Food: <strong>{selectedToolkit.keySupplementOrFood}</strong>
                    </span>
                  </div>

                  {/* Step-by-Step Protocol */}
                  <div className="space-y-2.5">
                    {selectedToolkit.protocolSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE4D9] text-xs text-[#2E2A25]"
                      >
                        <div className="flex items-center gap-2 text-[11px] font-bold text-[#8B5CF6] mb-1">
                          <Clock className="w-3 h-3" />
                          <span>{step.timing}</span>
                        </div>
                        <div className="font-extrabold text-xs text-[#1E1B18] mb-1">
                          {step.action}
                        </div>
                        <div className="text-[11px] text-[#6B655E] leading-relaxed">
                          {step.scientificReason}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Checklist */}
                  <div className="pt-2 border-t border-[#F0EBE1]">
                    <div className="text-xs font-bold text-[#1E1B18] mb-2">
                      Checkliste für den Alltag:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedToolkit.quickChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-[#4A453E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
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
                        ? 'bg-amber-50/70 border-amber-200 shadow-xs'
                        : 'bg-white border-[#EAE4D9]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          badge.isUnlocked ? 'bg-amber-500 text-white' : 'bg-[#FAF7F2] text-[#8A8379] border border-[#EAE4D9]'
                        }`}>
                          <Award className="w-4 h-4" />
                        </div>
                        {badge.isUnlocked ? (
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            Freigeschaltet ✓
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-[#8A8379]">
                            {badge.progressCurrent} / {badge.progressTarget}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-[#1E1B18] mb-0.5">
                        {badge.title}
                      </h3>
                      <div className="text-[11px] font-bold text-[#8B5CF6] mb-1.5">
                        {badge.subtitle}
                      </div>
                      <p className="text-xs text-[#6B655E] leading-relaxed">
                        {badge.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 pt-2 border-t border-[#F0EBE1]">
                      <div className="w-full h-1.5 bg-[#EAE4D9] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            badge.isUnlocked ? 'bg-amber-500' : 'bg-[#8B5CF6]'
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
        <div className="px-6 py-3 bg-white border-t border-[#EAE4D9] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#8A8379]">
            Swipen schaltet Schritt für Schritt neue wissenschaftliche Toolkits frei.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1E1B18] hover:bg-[#332F2A] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
};
