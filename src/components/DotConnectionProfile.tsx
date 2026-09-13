import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Stethoscope, 
  Share2,
  Info
} from 'lucide-react';
import { DotConnectionAssessment, SwipeCard } from '../types';

interface DotConnectionProfileProps {
  assessment: DotConnectionAssessment | null;
  symptomsPresent: SwipeCard[];
  symptomsAbsent: SwipeCard[];
  onBackToSwiping: () => void;
  onOpenToolkits: () => void;
  isLoading: boolean;
  onSaveToHistory?: () => void;
  isSavedToHistory?: boolean;
  archivedDate?: string;
  onExitArchivedView?: () => void;
}

export const DotConnectionProfile: React.FC<DotConnectionProfileProps> = ({
  assessment,
  symptomsPresent,
  symptomsAbsent,
  onBackToSwiping,
  onOpenToolkits,
  isLoading,
  onSaveToHistory,
  isSavedToHistory,
  archivedDate,
  onExitArchivedView
}) => {
  const [selectedDotId, setSelectedDotId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'constellation' | 'categories' | 'lifestyle' | 'doctor'>('constellation');
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (isLoading || !assessment) {
    return (
      <div className="w-full max-w-3xl mx-auto py-16 px-4 flex flex-col items-center justify-center text-center">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-[#6D1835]/20 border-t-[#6D1835] animate-spin" />
          <div className="absolute inset-2 rounded-full bg-[#6D1835]/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#6D1835] animate-pulse" />
          </div>
        </div>
        <h3 className="font-bold text-2xl text-[#2B1720] mb-2">
          EVE verknüpft deine Symptom-Punkte...
        </h3>
        <p className="text-sm text-[#161616]/80 max-w-md font-normal">
          Evidence for every woman: Analyse von {symptomsPresent.length} bestätigten Signalen über Neuroendokrinologie, Hypothalamus und Zirkadianik.
        </p>
      </div>
    );
  }

  // Generate constellation layout coordinates for present symptoms
  const symptomCount = symptomsPresent.length;
  const radius = 135;
  const center = { x: 190, y: 190 };

  const constellationNodes = symptomsPresent.map((card, idx) => {
    const angle = (idx / (symptomCount || 1)) * 2 * Math.PI - Math.PI / 2;
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);
    return {
      id: card.id,
      title: card.type === 'symptom' ? card.title : 'Mythos-Fakt',
      prompt: card.type === 'symptom' ? card.prompt : card.statement,
      category: card.type === 'symptom' ? card.category : 'Diagnostik-Fakt',
      clinical: card.type === 'symptom' ? card.clinicalCorrelation : card.explanation,
      x,
      y
    };
  });

  const selectedNode = constellationNodes.find(n => n.id === selectedDotId) || constellationNodes[0];

  const handlePrint = () => {
    window.print();
  };

  const handleShareOrCopy = () => {
    const summaryText = `EVE — Evidence for every woman: Perimenopause Symptom Connection Profil\n\n` +
      `Bestätigte Symptome (${symptomsPresent.length}): ${symptomsPresent.map(s => s.type === 'symptom' ? s.title : '').filter(Boolean).join(', ')}\n\n` +
      `Geschätzte Phase: ${assessment.probabilitySummary.stage} (${assessment.probabilitySummary.confidence})\n\n` +
      `Leitfragen für die Arztkonsultation:\n` +
      assessment.doctorDiscussionPoints.map((q, i) => `${i + 1}. ${q}`).join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summaryText);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Archived Banner if viewing past history */}
      {archivedDate && (
        <div className="bg-[#FAF6F1] border border-[#DDD4C7] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#2B1720]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#6D1835]">📅 Archivierte Dot Connection:</span>
            <span>Gespeichert am {archivedDate}</span>
          </div>
          {onExitArchivedView && (
            <button
              onClick={onExitArchivedView}
              className="px-3 py-1.5 bg-[#2B1720] hover:bg-[#3D202D] text-white font-bold rounded-xl cursor-pointer"
            >
              Zurück zur Live-Sitzung
            </button>
          )}
        </div>
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DDD4C7] pb-4">
        <button
          onClick={onBackToSwiping}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2B1720] hover:text-[#6D1835] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#6D1835]" />
          <span>Zurück zum Swipen ({symptomsPresent.length} Symptome)</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {onSaveToHistory && (
            <button
              onClick={onSaveToHistory}
              disabled={isSavedToHistory}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isSavedToHistory 
                  ? 'bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/25' 
                  : 'bg-white hover:bg-[#FAF6F1] text-[#2B1720] border border-[#DDD4C7]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E76F61]" />
              <span>{isSavedToHistory ? 'In EVE Historie gesichert ✓' : 'In Historie speichern'}</span>
            </button>
          )}

          <button
            onClick={handleShareOrCopy}
            className="px-3 py-1.5 bg-white border border-[#DDD4C7] hover:bg-[#FAF6F1] text-xs font-bold text-[#2B1720] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>{copiedNotification ? 'Kopiert! ✓' : 'Teilen'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white border border-[#DDD4C7] hover:bg-[#FAF6F1] text-xs font-bold text-[#2B1720] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#6D1835]" />
            <span>PDF / Druck</span>
          </button>

          <button
            onClick={onOpenToolkits}
            className="px-3.5 py-1.5 bg-gradient-to-r from-[#6D1835] to-[#E76F61] text-white text-xs font-bold rounded-xl shadow-xs hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifestyle Toolkits</span>
          </button>
        </div>
      </div>

      {/* Main Validation Headline Banner */}
      <div className="bg-white border border-[#DDD4C7] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6D1835]/10 text-[#6D1835] text-xs font-bold tracking-wide uppercase mb-3 border border-[#6D1835]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#E76F61]" />
          <span>EVE Dot Connection Profil</span>
        </div>

        <h1 className="font-bold text-2xl sm:text-3xl text-[#2B1720] leading-tight mb-3">
          {assessment.headline}
        </h1>

        <div className="text-sm font-normal text-[#161616] leading-relaxed whitespace-pre-line max-w-none">
          {assessment.empatheticCopy}
        </div>

        {/* Probability Summary Tag */}
        <div className="mt-5 pt-4 border-t border-[#EAE2D6] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2B1720] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-[#6D1835]/40">
              <span className="text-[#E76F61]">
                {assessment.probabilitySummary.confidence.includes('%') 
                  ? assessment.probabilitySummary.confidence.match(/\d+%/)?.[0] || '88%'
                  : '88%'}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-[#2B1720]">
                {assessment.probabilitySummary.stage}
              </div>
              <div className="text-[11px] text-[#161616]/75 font-normal">
                {assessment.probabilitySummary.rationale}
              </div>
            </div>
          </div>

          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
            {symptomsPresent.length} Symptom-Dots verknüpft
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 bg-[#EAE2D6] p-1 rounded-2xl w-full sm:w-fit border border-[#DDD4C7]">
        <button
          onClick={() => setActiveTab('constellation')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'constellation'
              ? 'bg-[#2B1720] text-white shadow-xs'
              : 'text-[#161616]/75 hover:text-[#2B1720]'
          }`}
        >
          ✨ Dot Konstellation
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-[#2B1720] text-white shadow-xs'
              : 'text-[#161616]/75 hover:text-[#2B1720]'
          }`}
        >
          🔬 Symptom-Cluster
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'lifestyle'
              ? 'bg-[#2B1720] text-white shadow-xs'
              : 'text-[#161616]/75 hover:text-[#2B1720]'
          }`}
        >
          🌿 3 Lifestyle-Aktionen
        </button>
        <button
          onClick={() => setActiveTab('doctor')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'doctor'
              ? 'bg-[#2B1720] text-white shadow-xs'
              : 'text-[#161616]/75 hover:text-[#2B1720]'
          }`}
        >
          🩺 Arzt-Briefing
        </button>
      </div>

      {/* TAB 1: INTERACTIVE DOT CONSTELLATION */}
      {activeTab === 'constellation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#DDD4C7] rounded-3xl p-6 shadow-sm">
          {/* Constellation Canvas View */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-2">
            <div className="relative w-[380px] h-[380px] select-none">
              <svg className="w-full h-full" viewBox="0 0 380 380">
                {/* Connecting Lines between Center and Satellite Nodes */}
                {constellationNodes.map((node) => (
                  <line
                    key={`line-${node.id}`}
                    x1={center.x}
                    y1={center.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={selectedDotId === node.id ? "#6D1835" : "#DDD4C7"}
                    strokeWidth={selectedDotId === node.id ? "2.5" : "1.2"}
                    strokeDasharray={selectedDotId === node.id ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                ))}

                {/* Central Conductor Hub (Estrogen/Progesterone Axis) */}
                <circle
                  cx={center.x}
                  cy={center.y}
                  r="38"
                  fill="url(#hubGradient)"
                  className="filter drop-shadow-md cursor-pointer"
                  onClick={() => setSelectedDotId(null)}
                />

                {/* Gradients */}
                <defs>
                  <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2B1720" />
                    <stop offset="100%" stopColor="#6D1835" />
                  </linearGradient>
                  <linearGradient id="nodeActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6D1835" />
                    <stop offset="100%" stopColor="#E76F61" />
                  </linearGradient>
                </defs>

                {/* Center Hub Label */}
                <text
                  x={center.x}
                  y={center.y - 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="Open Sans"
                  className="pointer-events-none"
                >
                  ÖSTROGEN /
                </text>
                <text
                  x={center.x}
                  y={center.y + 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="Open Sans"
                  className="pointer-events-none"
                >
                  PROGESTERON
                </text>
                <text
                  x={center.x}
                  y={center.y + 18}
                  textAnchor="middle"
                  fill="#E76F61"
                  fontSize="7.5"
                  fontWeight="600"
                  fontFamily="Open Sans"
                  className="pointer-events-none"
                >
                  HAUPT-ACHSE
                </text>

                {/* Satellite Nodes (Each Matched Symptom) */}
                {constellationNodes.map((node) => {
                  const isSelected = selectedDotId === node.id || (!selectedDotId && selectedNode?.id === node.id);
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedDotId(node.id)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? "14" : "10"}
                        fill={isSelected ? "url(#nodeActiveGradient)" : "#F6F0E9"}
                        stroke={isSelected ? "#2B1720" : "#DDD4C7"}
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? "4" : "3"}
                        fill={isSelected ? "#FFFFFF" : "#6D1835"}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            <span className="text-[11px] text-[#161616]/70 mt-1 text-center font-normal">
              Klicke auf einen Punkt im Netzwerk, um die hormonelle Verbindung zu sehen.
            </span>
          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF6F1] rounded-2xl p-5 border border-[#DDD4C7]">
            {selectedNode ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                    {selectedNode.category}
                  </span>
                  <span className="text-[10px] font-semibold text-[#161616]/60">
                    Symptom Punkt
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#2B1720] leading-tight">
                  {selectedNode.title}
                </h3>

                <p className="text-xs text-[#161616]/80 italic leading-relaxed font-normal">
                  "{selectedNode.prompt}"
                </p>

                <div className="pt-2 border-t border-[#EAE2D6]">
                  <span className="text-[11px] font-bold text-[#2B1720] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E76F61]" />
                    <span>Die biologische Verbindung:</span>
                  </span>
                  <p className="text-xs text-[#161616] leading-relaxed font-normal">
                    {selectedNode.clinical}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#161616]/70">Wähle einen Punkt in der Konstellation aus.</p>
            )}

            <div className="mt-4 pt-3 border-t border-[#EAE2D6] text-[11px] text-[#161616]/80 font-normal">
              <strong className="text-[#2B1720] font-bold">Die zentrale Erkenntnis:</strong> {assessment.hormonalDotConnection.slice(0, 180)}...
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLINICAL CATEGORY GROUPINGS */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessment.categoryGroupings.map((group, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DDD4C7] rounded-2xl p-5 shadow-xs hover:border-[#6D1835]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-[#2B1720]">
                      {group.category}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      group.severityLevel === 'pronounced' 
                        ? 'bg-[#E76F61]/15 text-[#6D1835] border border-[#E76F61]/30'
                        : 'bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20'
                    }`}>
                      {group.severityLevel}
                    </span>
                  </div>

                  <p className="text-xs text-[#161616]/85 leading-relaxed mb-3 font-normal">
                    {group.clinicalExplanation}
                  </p>

                  <div className="text-[11px] font-bold text-[#6D1835] mb-2">
                    ⚡ Hormoneller Treiber: {group.hormonalDriver}
                  </div>
                </div>

                {group.matchedSymptoms && group.matchedSymptoms.length > 0 && (
                  <div className="pt-2.5 border-t border-[#F0EBE1] flex flex-wrap gap-1.5">
                    {group.matchedSymptoms.map((sym, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-normal bg-[#FAF6F1] border border-[#DDD4C7] px-2 py-0.5 rounded-md text-[#161616]"
                      >
                        ✓ {sym}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 3 LIFESTYLE RECOMMENDATIONS */}
      {activeTab === 'lifestyle' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assessment.lifestyleRecommendations.map((rec, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#DDD4C7] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                      {rec.timeframe}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF6F1] border border-[#DDD4C7] flex items-center justify-center text-sm">
                      {idx === 0 ? '🌙' : idx === 1 ? '🥑' : '🧘'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#2B1720] mb-2 leading-snug">
                    {rec.title}
                  </h3>

                  <div className="bg-[#FAF6F1] p-3 rounded-xl border border-[#DDD4C7] text-xs text-[#161616] font-normal leading-relaxed mb-3">
                    {rec.action}
                  </div>
                </div>

                <div className="text-[11px] text-[#161616]/75 pt-2 border-t border-[#F0EBE1] font-normal">
                  <strong className="text-[#2B1720] font-bold">Warum es wirkt:</strong> {rec.scientificWhy}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF6F1] border border-[#DDD4C7] p-4 rounded-2xl flex items-center justify-between">
            <div className="text-xs text-[#161616]/85 font-normal">
              <strong className="text-[#2B1720] font-bold">Möchtest du detaillierte Schritt-für-Schritt-Protokolle?</strong> Erkunde die freigeschalteten Lifestyle-Toolkits.
            </div>
            <button
              onClick={onOpenToolkits}
              className="px-3.5 py-1.5 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Zu den Toolkits →
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: DOCTOR CONSULTATION BRIEF */}
      {activeTab === 'doctor' && (
        <div className="bg-white border border-[#DDD4C7] rounded-3xl p-6 shadow-sm space-y-6" id="printable-doctor-brief">
          <div className="flex items-center gap-3 border-b border-[#EAE2D6] pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#6D1835]/10 border border-[#6D1835]/20 flex items-center justify-center text-[#6D1835]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#2B1720]">
                Arztgesprächs-Leitfaden (Doctor Discussion Brief)
              </h3>
              <p className="text-xs text-[#161616]/75 font-normal">
                Evidenzbasierte Fragen für deine nächste gynäkologische oder allgemeinmedizinische Konsultation.
              </p>
            </div>
          </div>

          {/* Key Discussion Questions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D1835]">
              Gezielte Fragen an dein medizinisches Fachpersonal:
            </h4>
            {assessment.doctorDiscussionPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF6F1] border border-[#DDD4C7] text-xs text-[#161616] font-normal"
              >
                <span className="w-5 h-5 rounded-full bg-[#2B1720] text-[#E76F61] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          {/* Medical Disclaimer Note */}
          <div className="bg-[#FAF6F1] border border-[#DDD4C7] p-3.5 rounded-xl text-[11px] text-[#2B1720] leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
            <span className="font-normal text-[#161616]">
              <strong className="text-[#2B1720] font-bold">Wichtiger Hinweis:</strong> EVE (Evidence for every woman) ist ein evidenzbasiertes Symptom-Tracking- und Bildungs-Tool und ersetzt keine ärztliche Diagnose. Besprich deine individuellen Laborwerte und Therapieoptionen stets mit deiner behandelnden Ärztin oder deinem Arzt.
            </span>
          </div>

          {/* Export Action */}
          <div className="flex justify-end gap-3 pt-2 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-[#DDD4C7] hover:bg-[#FAF6F1] text-xs font-bold text-[#2B1720] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#6D1835]" />
              <span>Druckansicht öffnen</span>
            </button>
            <button
              onClick={handleShareOrCopy}
              className="px-4 py-2 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#E76F61]" />
              <span>Text kopieren</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
