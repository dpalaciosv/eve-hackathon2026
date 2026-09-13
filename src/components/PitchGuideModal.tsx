import React from 'react';
import { 
  X, 
  Sparkles, 
  Brain, 
  Cloud, 
  Layers, 
  Award
} from 'lucide-react';
import { EveLogo } from './EveLogo';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#F6F0E9] rounded-3xl border border-[#DDD4C7] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDD4C7] pb-4">
          <div className="flex items-center gap-3">
            <EveLogo size="md" showSubtitle={false} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-xl text-[#2B1720]">
                  EVE — Hackathon Pitch & Architektur
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                  AI Women Hackathon Hamburg
                </span>
              </div>
              <p className="text-xs text-[#161616]/75 font-normal">
                EVE (Evidence for every woman) — 3-Minute Pitch & Strategie-Guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD4C7] flex items-center justify-center text-[#2B1720] hover:text-[#6D1835] cursor-pointer"
          >
            <X className="w-4 h-4 text-[#2B1720]" />
          </button>
        </div>

        {/* 1. THE PITCH HOOK (The Problem) */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6D1835]">
            <span className="w-2 h-2 rounded-full bg-[#E76F61]" />
            1. Das Problem: Die isolierten Symptom-Punkte der Perimenopause
          </div>
          <p className="text-sm font-bold text-[#2B1720] italic">
            „Um 3:17 Uhr nachts aufgewacht und an die Decke gestarrt? Mitten im Satz das Wort vergessen? Plötzliche Reizbarkeit? Frauen glauben oft, sie seien überarbeitet, gestresst oder versagen.“
          </p>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            Über <strong>1,1 Milliarden Frauen</strong> erreichen 2025 die Perimenopause. Doch mehr als 70% erkennen ihre frühen Symptome nicht, weil herkömmliche Aufklärung fast nur Hitzewallungen und Ausbleiben der Periode thematisiert. Die Beschwerden wirken wie zusammenhanglose Belastungen statt wie eine einheitliche endokrine Transition.
          </p>
        </div>

        {/* 2. CORE CONCEPT & UX */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <Sparkles className="w-4 h-4 text-[#E76F61]" />
            2. Kernkonzept & UX: „Swipe to Connect the Dots“
          </div>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            Klassisches Symptom-Tracking scheitert an hoher kognitiver Belastung: Tabellen, Schieberegler und medizinische Fachbegriffe überfordern bei Brain Fog und Schlafmangel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7] text-xs">
              <strong className="text-[#2B1720] block mb-1 font-bold">🎴 Kognitiv entlastendes Swipen</strong>
              <span className="font-normal text-[#161616]/80 leading-relaxed">
                Alltägliche Mikroszenarien (z.B. <em>„Schlüssel im Kühlschrank“</em> oder <em>„Plötzliche innere Heizung“</em>) mühelos per Swipe in <code className="text-[#6D1835] font-bold">symptoms_present</code> und <code className="text-[#161616]/70">symptoms_absent</code> einordnen.
              </span>
            </div>
            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7] text-xs">
              <strong className="text-[#2B1720] block mb-1 font-bold">🧩 Dot Connection Schwellenwert</strong>
              <span className="font-normal text-[#161616]/80 leading-relaxed">
                Nach 10 Matches schaltet sich das Dot Connection Profil frei: Es verbindet die Punkte zu einem ganzheitlichen Bild und validiert das Erleben medizinisch.
              </span>
            </div>
          </div>
        </div>

        {/* 3. GAMIFICATION & UNLOCKS */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <Award className="w-4 h-4 text-[#6D1835]" />
            3. Gamification: Myth-Busting & evidenzbasierte Toolkits
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 bg-[#FAF6F1] border border-[#DDD4C7] rounded-xl">
              <strong className="text-[#2B1720] block mb-0.5 font-bold">🧠 Myth-Buster Trivia</strong>
              <span className="text-[#161616]/80 font-normal">
                Eingestreute interaktive Quizkarten entkräften Mythen (z.B. Unzuverlässigkeit isolierter FSH-Bluttests).
              </span>
            </div>
            <div className="p-2.5 bg-[#6D1835]/10 border border-[#6D1835]/20 rounded-xl">
              <strong className="text-[#6D1835] block mb-0.5 font-bold">🌿 Freischaltbare Toolkits</strong>
              <span className="text-[#161616]/80 font-normal">
                Wissenschaftliche Lifestyle-Protokolle (3-Uhr-Nachts-Schlaf, Thermoregulation, Mikronährstoffe).
              </span>
            </div>
            <div className="p-2.5 bg-[#E76F61]/15 border border-[#E76F61]/30 rounded-xl">
              <strong className="text-[#2B1720] block mb-0.5 font-bold">🌟 Validierungs-Badges</strong>
              <span className="text-[#161616]/80 font-normal">
                Belohnende Meilensteine (Selbst-Advokatin, Dot Connector, Myth Slayer, Informierte Patientin).
              </span>
            </div>
          </div>
        </div>

        {/* 4. TECH STACK & ARCHITECTURE */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <Layers className="w-4 h-4 text-[#6D1835]" />
            4. Tech-Stack & Architektur
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7]">
              <div className="flex items-center gap-1.5 font-bold text-[#2B1720] mb-1">
                <Brain className="w-4 h-4 text-[#6D1835]" />
                <span>Google AI Studio & Gemini 2.5 Flash</span>
              </div>
              <p className="text-[11px] text-[#161616]/80 leading-relaxed font-normal">
                Server-seitige API-Routen via <code className="text-[#6D1835] font-bold">@google/genai</code> generieren dynamische Swipe-Karten (<code className="text-[10px]">/api/generate-cards</code>) und multi-dimensionale klinische Synthesen (<code className="text-[10px]">/api/assess-symptoms</code>).
              </p>
            </div>

            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7]">
              <div className="flex items-center gap-1.5 font-bold text-[#2B1720] mb-1">
                <Cloud className="w-4 h-4 text-[#E76F61]" />
                <span>Google Cloud Run & GitHub CI/CD</span>
              </div>
              <p className="text-[11px] text-[#161616]/80 leading-relaxed font-normal">
                Containerisiertes Node.js + Express Backend mit serverseitig geschützten Gemini Secrets (<code className="text-[10px]">.env</code>) und Vite React Client.
              </p>
            </div>
          </div>
        </div>

        {/* 5. LIVE DEMO SCRIPT */}
        <div className="bg-[#FAF6F1] rounded-2xl p-4 border border-[#DDD4C7] flex items-center justify-between">
          <div className="text-xs text-[#161616]/85 font-normal">
            <strong className="text-[#2B1720] font-bold">Hackathon Live Demo Tipp:</strong> Aktiviere den <strong className="text-[#2B1720]">Mobile Simulator</strong> im Header, um das taktile Swipe-Erlebnis auf einem iPhone 16 Pro Viewport live vorzuführen!
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Jetzt loslegen
          </button>
        </div>
      </div>
    </div>
  );
};
