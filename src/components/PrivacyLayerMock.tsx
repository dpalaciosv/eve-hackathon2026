import React, { useState } from 'react';
import { ShieldCheck, Lock, EyeOff, CheckCircle2, ChevronRight, X, Sparkles } from 'lucide-react';

interface PrivacyLayerMockProps {
  isSimulating?: boolean;
}

export const PrivacyLayerMock: React.FC<PrivacyLayerMockProps> = ({ isSimulating = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="cursor-pointer group flex items-center justify-between gap-3 bg-[#F4F8F4] hover:bg-[#EBF3EB] border border-[#D5E6D6] px-3.5 py-2 rounded-2xl text-xs transition-all shadow-2xs"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2E7D32] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2E7D32]"></span>
          </span>
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span className="font-semibold text-[#1B4D20]">
            EVE Privacy Shield Active:
          </span>
          <span className="text-[#3E6B42] hidden sm:inline">
            Anonymisation Layer enabled (Zero PII transmitted)
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] group-hover:translate-x-0.5 transition-transform">
          <span>Details</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-white rounded-3xl border border-[#E2DDD2] max-w-md w-full p-6 space-y-4 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DC] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold">
                  🛡️
                </div>
                <div>
                  <h3 className="font-serif-heading text-base font-bold text-[#1E1B18]">
                    EVE Anonymisation Layer
                  </h3>
                  <p className="text-[11px] text-[#7A746E]">
                    Zero-Knowledge Privacy Protection
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDetails(false)}
                className="w-7 h-7 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#7A746E] hover:text-[#1E1B18]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-[#524B45] leading-relaxed">
              Before any input is evaluated against medical literature or research models, EVE runs a client-side anonymisation filter:
            </p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 bg-[#FAFDF9] p-2.5 rounded-xl border border-[#DCECDC]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#1B4D20] block">PII & Metadata Scrubbing</span>
                  <span className="text-[#4F6851] text-[11px]">Social handles, timestamps, filenames, doctor names, and clinic locations are expunged locally.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-[#FAFDF9] p-2.5 rounded-xl border border-[#DCECDC]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#1B4D20] block">Clinical Signal Isolation</span>
                  <span className="text-[#4F6851] text-[11px]">Only isolated symptom tokens and life-stage cohort markers are passed to the evidence evaluator.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-[#FAFDF9] p-2.5 rounded-xl border border-[#DCECDC]">
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-[#1B4D20] block">No Advertising or Insurer Tracking</span>
                  <span className="text-[#4F6851] text-[11px]">Zero third-party trackers, no cookie profiling, and strictly ephemeral evaluation sessions.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowDetails(false)}
                className="w-full py-2.5 rounded-xl bg-[#1E1B18] text-white text-xs font-bold hover:bg-[#332E2A] transition-colors"
              >
                Verstanden & Geschützt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
