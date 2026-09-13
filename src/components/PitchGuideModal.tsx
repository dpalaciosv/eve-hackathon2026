import React from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Brain, 
  Github, 
  Cloud, 
  Flame, 
  Layers, 
  Award,
  Zap
} from 'lucide-react';

interface PitchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PitchGuideModal: React.FC<PitchGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] rounded-3xl border border-[#E2DCCE] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECE6D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center text-xl font-bold">
              🌸
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-heading text-xl font-bold text-[#1E1B18]">
                  EVE — Hackathon Pitch & Architecture
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#7C3AED]">
                  AI Women Hackathon Hamburg
                </span>
              </div>
              <p className="text-xs text-[#7A746E]">
                EVE (Evidence for every woman) — 3-Minute Pitch & Strategy Guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DCD5C8] flex items-center justify-center text-[#6B655E] hover:text-[#1E1B18] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. THE PITCH HOOK (The Problem) */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9E3D6] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B5CF6]">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            1. The Problem: The Disconnected Dots of Perimenopause
          </div>
          <p className="text-sm font-semibold text-[#1E1B18] italic">
            „Waking at 3:17 AM staring at the ceiling? Forgetting a word mid-sentence? Sudden rage over chewed toast? You assume you're stressed, failing at work, or losing your mind.“
          </p>
          <p className="text-xs text-[#6B655E] leading-relaxed">
            Over <strong>1.1 billion women</strong> will enter perimenopause by 2025. Yet over 70% do not recognize their symptoms because medical education and tracking tools only focus on hot flashes and missed periods. Symptoms feel like random, disjointed failures rather than a single endocrine transition.
          </p>
        </div>

        {/* 2. CORE CONCEPT & UX */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9E3D6] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            2. Core Concept & UX: "Swipe to Connect the Dots"
          </div>
          <p className="text-xs text-[#524C44] leading-relaxed">
            Traditional symptom tracking requires high cognitive load: logging dates, slider scales, and medical terminology. In brain fog and fatigue, women abandon it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE4D9] text-xs">
              <strong className="text-[#1E1B18] block mb-1">🎴 Low Cognitive Load Swiping</strong>
              Ultra-relatable micro-scenarios (e.g. <em>"Keys in the fridge"</em> or <em>"Sudden internal radiator"</em>) sorted into <code className="text-[#8B5CF6]">symptoms_present</code> and <code className="text-zinc-600">symptoms_absent</code> with effortless Tinder-style swipes.
            </div>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE4D9] text-xs">
              <strong className="text-[#1E1B18] block mb-1">🧩 Dot Connection Threshold</strong>
              Hitting the 10-match threshold triggers the constellation reveal: proving these are not 10 unrelated breakdowns, but 10 receptors responding to the estrogen-progesterone symphony.
            </div>
          </div>
        </div>

        {/* 3. GAMIFICATION & UNLOCKS */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9E3D6] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
            <Award className="w-4 h-4 text-amber-600" />
            3. Gamification: Myth-Busting & Actionable Toolkits
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-xl">
              <strong className="text-amber-900 block mb-0.5">🧠 Myth-Buster Trivia</strong>
              Interspersed interactive cards debunking medical misconceptions (e.g. routine FSH blood test reliability).
            </div>
            <div className="p-2.5 bg-purple-50/70 border border-purple-200 rounded-xl">
              <strong className="text-purple-900 block mb-0.5">🌿 Unlockable Toolkits</strong>
              Step-by-step lifestyle protocols (3 AM Sleep Rescue, Thermoregulation, Metabolic Pacing) unlocked by swiping.
            </div>
            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <strong className="text-emerald-900 block mb-0.5">🌟 Validation Badges</strong>
              Milestone rewards (Self-Advocate, Dot Connector, Myth Slayer, Empowered Patient).
            </div>
          </div>
        </div>

        {/* 4. TECH STACK & ARCHITECTURE */}
        <div className="bg-white rounded-2xl p-5 border border-[#E9E3D6] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
            <Layers className="w-4 h-4 text-indigo-600" />
            4. Tech Stack & Implementation Architecture
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE4D9]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E1B18] mb-1">
                <Brain className="w-4 h-4 text-[#8B5CF6]" />
                <span>Google AI Studio & Gemini 3.8 Flash</span>
              </div>
              <p className="text-[11px] text-[#6B655E] leading-relaxed">
                Server-side calls via <code className="text-[#8B5CF6]">@google/genai</code> generating dynamic swipe cards (<code className="text-[10px]">/api/generate-cards</code>) and multi-dimensional clinical synthesis (<code className="text-[10px]">/api/assess-symptoms</code>).
              </p>
            </div>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE4D9]">
              <div className="flex items-center gap-1.5 font-bold text-[#1E1B18] mb-1">
                <Cloud className="w-4 h-4 text-sky-600" />
                <span>Google Cloud Run & GitHub CI/CD</span>
              </div>
              <p className="text-[11px] text-[#6B655E] leading-relaxed">
                Containerized Node.js + Express backend serving production Vite SPA with zero-leakage secret management (<code className="text-[10px]">.env</code>).
              </p>
            </div>
          </div>
        </div>

        {/* 5. LIVE DEMO SCRIPT FOR JURY */}
        <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#EAE4D9] flex items-center justify-between">
          <div className="text-xs text-[#524C44]">
            <strong>Hackathon Live Demo Tip:</strong> Toggle the <strong>Mobile Simulator</strong> in the top header to demonstrate the tactile Tinder swipe gesture on an iPhone 16 Pro viewport!
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Start Swiping Now
          </button>
        </div>
      </div>
    </div>
  );
};
