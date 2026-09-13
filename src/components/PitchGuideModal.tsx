import React from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Stethoscope, 
  Layers, 
  Award,
  BookOpen,
  Heart
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
            <EveLogo size="md" showSubtitle={false} showWordmark={false} />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-xl text-[#2B1720]">
                  Über EVE — Evidenz für jede Frau
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                  Evidenzbasiert
                </span>
              </div>
              <p className="text-xs text-[#161616]/75 font-normal">
                EVE (Evidence for every woman) — Dein intelligenter Begleiter durch die Perimenopause
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#DDD4C7] flex items-center justify-center text-[#2B1720] hover:text-[#6D1835] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4 text-[#2B1720]" />
          </button>
        </div>

        {/* 1. DIE MISSION */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6D1835]">
            <Heart className="w-3.5 h-3.5 text-[#E76F61]" />
            1. Das Konzept: Die verborgenen Punkte verbinden
          </div>
          <p className="text-sm font-bold text-[#2B1720] italic leading-snug">
            „Um 3:17 Uhr nachts wach? Mitten im Satz das Wort vergessen? Plötzliche Reizbarkeit oder steife Gelenke am Morgen? Du bist nicht überfordert – deine Hormone stellen sich um.“
          </p>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            Viele Frauen erleben frühe Anzeichen der Perimenopause bereits ab Ende 30 oder Anfang 40, lange bevor die Periode ausbleibt. Weil herkömmliche Aufklärung fast ausschließlich Hitzewallungen thematisiert, wirken die Beschwerden oft wie isolierte Belastungen oder Überarbeitung. EVE ordnet deine Körpersignale neuroendokrin ein und macht das biologische Muster sichtbar.
          </p>
        </div>

        {/* 2. DER ANSATZ: NIEDRIGSCHWELLIGES ERFASSEN */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <Sparkles className="w-4 h-4 text-[#E76F61]" />
            2. Spielerisch & intuitiv: Swipen statt Frust
          </div>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            Klassisches Symptom-Tracking scheitert oft an hoher kognitiver Belastung: Tabellen, Schieberegler und medizinische Fachbegriffe überfordern besonders bei Brain Fog und Schlafmangel.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7] text-xs">
              <strong className="text-[#2B1720] block mb-1 font-bold">🎴 Alltägliche Mikroszenarien</strong>
              <span className="font-normal text-[#161616]/80 leading-relaxed">
                Konkrete Situationen (z. B. <em>„Kaffee plötzlich unverträglich“</em> oder <em>„Das verschwundene Wort“</em>) mit einer einfachen Wischbewegung bewerten.
              </span>
            </div>
            <div className="p-3 bg-[#FAF6F1] rounded-xl border border-[#DDD4C7] text-xs">
              <strong className="text-[#2B1720] block mb-1 font-bold">🧩 Ganzheitliche Musteranalyse</strong>
              <span className="font-normal text-[#161616]/80 leading-relaxed">
                Sobald du Symptome erfasst hast, verknüpft EVE die Punkte zu einem Profil, das Zusammenhänge zwischen Schlaf, Nervensystem und Hormonen aufzeigt.
              </span>
            </div>
          </div>
        </div>

        {/* 3. WISSENSCHAFT & TOOLKITS */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <Award className="w-4 h-4 text-[#6D1835]" />
            3. Evidenzbasierte Unterstützung & Mythen-Aufklärung
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 bg-[#FAF6F1] border border-[#DDD4C7] rounded-xl">
              <strong className="text-[#2B1720] block mb-0.5 font-bold">🧠 Mythen-Checks</strong>
              <span className="text-[#161616]/80 font-normal">
                Verlässliche Fakten entkräften überholte Annahmen (z. B. zur Aussagekraft einzelner Bluttests).
              </span>
            </div>
            <div className="p-2.5 bg-[#6D1835]/10 border border-[#6D1835]/20 rounded-xl">
              <strong className="text-[#6D1835] block mb-0.5 font-bold">🌿 Lifestyle-Toolkits</strong>
              <span className="text-[#161616]/80 font-normal">
                Konkrete Schritt-für-Schritt-Pläne für besseren Schlaf, Temperaturregulation und Muskelerhalt.
              </span>
            </div>
            <div className="p-2.5 bg-[#E76F61]/15 border border-[#E76F61]/30 rounded-xl">
              <strong className="text-[#2B1720] block mb-0.5 font-bold">🩺 Arzt-Leitfaden</strong>
              <span className="text-[#161616]/80 font-normal">
                Ein strukturierter Leitfaden mit gezielten Fragen für dein nächstes medizinisches Gespräch.
              </span>
            </div>
          </div>
        </div>

        {/* 4. DATENSCHUTZ & ETHIK */}
        <div className="bg-white rounded-2xl p-5 border border-[#DDD4C7] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2B1720]">
            <ShieldCheck className="w-4 h-4 text-[#6D1835]" />
            4. Höchste Datensicherheit & Privatsphäre
          </div>
          <p className="text-xs text-[#161616]/80 leading-relaxed font-normal">
            Gesundheitsdaten sind hochsensibel. EVE anonymisiert alle Eingaben vor der Verarbeitung lokal im Browser. Keine Klarnamen, keine Identifikatoren und kein Weiterverkauf von Gesundheitsdaten – deine Privatsphäre ist zu 100 % geschützt.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF6F1] rounded-2xl p-4 border border-[#DDD4C7] flex items-center justify-between">
          <div className="text-xs text-[#161616]/85 font-normal">
            <strong className="text-[#2B1720] font-bold">Hinweis:</strong> EVE dient der Information und Selbstbefähigung und ersetzt keine ärztliche Diagnose.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Verstanden & schließen
          </button>
        </div>
      </div>
    </div>
  );
};
