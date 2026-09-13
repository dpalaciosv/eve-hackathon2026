import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowLeft, 
  Download, 
  Printer, 
  FileText, 
  Moon, 
  Brain, 
  Flame, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Stethoscope, 
  Share2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { DotConnectionAssessment, SwipeCard, SymptomCategory } from '../types';

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
          <div className="absolute inset-0 rounded-full border-4 border-[#8B5CF6]/20 border-t-[#8B5CF6] animate-spin" />
          <div className="absolute inset-2 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-[#8B5CF6] animate-pulse" />
          </div>
        </div>
        <h3 className="font-serif-heading font-black text-2xl text-[#1E1B18] mb-2">
          EVE verknüpft deine Symptom-Punkte...
        </h3>
        <p className="text-sm text-[#6B655E] max-w-md">
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
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <span className="font-bold">📅 Archivierte Dot Connection:</span>
            <span>Gespeichert am {archivedDate}</span>
          </div>
          {onExitArchivedView && (
            <button
              onClick={onExitArchivedView}
              className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl cursor-pointer"
            >
              Zurück zur Live-Sitzung
            </button>
          )}
        </div>
      )}

      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE4D9] pb-4">
        <button
          onClick={onBackToSwiping}
          className="flex items-center gap-1.5 text-xs font-bold text-[#6B655E] hover:text-[#1E1B18] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zum Swipen ({symptomsPresent.length} Symptome)</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {onSaveToHistory && (
            <button
              onClick={onSaveToHistory}
              disabled={isSavedToHistory}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isSavedToHistory 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-white hover:bg-[#FAF7F2] text-[#8B5CF6] border border-[#8B5CF6]/30'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isSavedToHistory ? 'In EVE Historie gesichert ✓' : 'In Historie speichern'}</span>
            </button>
          )}

          <button
            onClick={handleShareOrCopy}
            className="px-3 py-1.5 bg-white border border-[#DCD5C8] hover:bg-[#FAF7F2] text-xs font-bold text-[#4A453E] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedNotification ? 'Kopiert! ✓' : 'Teilen'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3 py-1.5 bg-white border border-[#DCD5C8] hover:bg-[#FAF7F2] text-xs font-bold text-[#4A453E] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF / Druck</span>
          </button>

          <button
            onClick={onOpenToolkits}
            className="px-3.5 py-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-extrabold rounded-xl shadow-sm hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifestyle Toolkits</span>
          </button>
        </div>
      </div>

      {/* Main Validation Headline Banner */}
      <div className="bg-gradient-to-br from-[#FAF5FF] via-white to-[#FFF1F2] border border-[#E9D5FF] rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#C084FC]/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/10 text-[#7C3AED] text-xs font-black tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>Dot Connection Profile Reveal</span>
        </div>

        <h1 className="font-serif-heading font-black text-2xl sm:text-3xl text-[#1E1B18] leading-tight mb-3">
          {assessment.headline}
        </h1>

        <div className="prose prose-sm text-[#4A453F] leading-relaxed whitespace-pre-line max-w-none">
          {assessment.empatheticCopy}
        </div>

        {/* Probability Summary Tag */}
        <div className="mt-5 pt-4 border-t border-[#F3E8FF] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center font-black text-xs shadow-xs">
              {assessment.probabilitySummary.confidence.includes('%') 
                ? assessment.probabilitySummary.confidence.match(/\d+%/)?.[0] || '88%'
                : '88%'}
            </div>
            <div>
              <div className="text-xs font-bold text-[#1E1B18]">
                {assessment.probabilitySummary.stage}
              </div>
              <div className="text-[11px] text-[#6B655E]">
                {assessment.probabilitySummary.rationale}
              </div>
            </div>
          </div>

          <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            {symptomsPresent.length} Symptom Dots Connected
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 bg-[#F0EBE1] p-1 rounded-2xl w-full sm:w-fit">
        <button
          onClick={() => setActiveTab('constellation')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'constellation'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#6B655E] hover:text-[#1E1B18]'
          }`}
        >
          ✨ Dot Constellation
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'categories'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#6B655E] hover:text-[#1E1B18]'
          }`}
        >
          🔬 Symptom Groupings
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'lifestyle'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#6B655E] hover:text-[#1E1B18]'
          }`}
        >
          🌿 3 Lifestyle Actions
        </button>
        <button
          onClick={() => setActiveTab('doctor')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'doctor'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#6B655E] hover:text-[#1E1B18]'
          }`}
        >
          🩺 Doctor Brief
        </button>
      </div>

      {/* TAB 1: INTERACTIVE DOT CONSTELLATION */}
      {activeTab === 'constellation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#EAE4D9] rounded-3xl p-6 shadow-sm">
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
                    stroke={selectedDotId === node.id ? "#8B5CF6" : "#E2D9CC"}
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
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                  <linearGradient id="nodeActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>

                {/* Center Hub Label */}
                <text
                  x={center.x}
                  y={center.y - 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="900"
                  className="pointer-events-none"
                >
                  ESTROGEN /
                </text>
                <text
                  x={center.x}
                  y={center.y + 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="9"
                  fontWeight="900"
                  className="pointer-events-none"
                >
                  PROGESTERONE
                </text>
                <text
                  x={center.x}
                  y={center.y + 18}
                  textAnchor="middle"
                  fill="#FDE047"
                  fontSize="7.5"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  MASTER AXIS
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
                        fill={isSelected ? "url(#nodeActiveGradient)" : "#FAF5FF"}
                        stroke={isSelected ? "#7C3AED" : "#C084FC"}
                        strokeWidth="2"
                        className="transition-all duration-200"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? "4" : "3"}
                        fill={isSelected ? "#FFFFFF" : "#8B5CF6"}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            <span className="text-[11px] text-[#8A8379] mt-1 text-center">
              Klicke auf einen Punkt im Netzwerk, um die hormonelle Verbindung zu sehen.
            </span>
          </div>

          {/* Node Inspector Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#FAF7F2] rounded-2xl p-5 border border-[#EAE4D9]">
            {selectedNode ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#7C3AED]">
                    {selectedNode.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#8A8379]">
                    Symptom Punkt
                  </span>
                </div>

                <h3 className="font-serif-heading font-black text-lg text-[#1E1B18] leading-tight">
                  {selectedNode.title}
                </h3>

                <p className="text-xs text-[#524C44] italic leading-relaxed">
                  "{selectedNode.prompt}"
                </p>

                <div className="pt-2 border-t border-[#E8E1D5]">
                  <span className="text-[11px] font-bold text-[#1E1B18] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Die biologische Verbindung:</span>
                  </span>
                  <p className="text-xs text-[#4A453F] leading-relaxed">
                    {selectedNode.clinical}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#706A62]">Wähle einen Punkt in der Konstellation aus.</p>
            )}

            <div className="mt-4 pt-3 border-t border-[#E8E1D5] text-[11px] text-[#706A62]">
              <strong>Die zentrale Erkenntnis:</strong> {assessment.hormonalDotConnection.slice(0, 180)}...
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
                className="bg-white border border-[#EAE4D9] rounded-2xl p-5 shadow-xs hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-sm text-[#1E1B18]">
                      {group.category}
                    </h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      group.severityLevel === 'pronounced' 
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {group.severityLevel}
                    </span>
                  </div>

                  <p className="text-xs text-[#524C44] leading-relaxed mb-3">
                    {group.clinicalExplanation}
                  </p>

                  <div className="text-[11px] font-semibold text-[#8B5CF6] mb-2">
                    ⚡ Hormoneller Treiber: {group.hormonalDriver}
                  </div>
                </div>

                {group.matchedSymptoms && group.matchedSymptoms.length > 0 && (
                  <div className="pt-2.5 border-t border-[#F0EBE1] flex flex-wrap gap-1.5">
                    {group.matchedSymptoms.map((sym, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium bg-[#FAF7F2] border border-[#E8E1D5] px-2 py-0.5 rounded-md text-[#4A453E]"
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
                className="bg-white border border-[#EAE4D9] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#7C3AED]">
                      {rec.timeframe}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center text-sm">
                      {idx === 0 ? '🌙' : idx === 1 ? '🥑' : '🧘'}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#1E1B18] mb-2 leading-snug">
                    {rec.title}
                  </h3>

                  <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE4D9] text-xs text-[#2E2A25] font-medium leading-relaxed mb-3">
                    {rec.action}
                  </div>
                </div>

                <div className="text-[11px] text-[#6B655E] pt-2 border-t border-[#F0EBE1]">
                  <strong className="text-[#1E1B18]">Warum es wirkt:</strong> {rec.scientificWhy}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F2] border border-[#EAE4D9] p-4 rounded-2xl flex items-center justify-between">
            <div className="text-xs text-[#4A453F]">
              <strong>Möchtest du detaillierte Schritt-für-Schritt-Protokolle?</strong> Erkunde die freigeschalteten Lifestyle-Toolkits.
            </div>
            <button
              onClick={onOpenToolkits}
              className="px-3.5 py-1.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl hover:bg-[#7C3AED] transition-colors cursor-pointer"
            >
              Zu den Toolkits →
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: DOCTOR CONSULTATION BRIEF */}
      {activeTab === 'doctor' && (
        <div className="bg-white border border-[#EAE4D9] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#F0EBE1] pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading font-black text-lg text-[#1E1B18]">
                Arztgesprächs-Leitfaden (Doctor Discussion Brief)
              </h3>
              <p className="text-xs text-[#6B655E]">
                Evidenzbasierte Fragen für deine nächste gynäkologische oder allgemeinmedizinische Konsultation.
              </p>
            </div>
          </div>

          {/* Key Discussion Questions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8379]">
              Gezielte Fragen an dein medizinisches Fachpersonal:
            </h4>
            {assessment.doctorDiscussionPoints.map((point, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE4D9] text-xs text-[#2E2A25] font-medium"
              >
                <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{point}</span>
              </div>
            ))}
          </div>

          {/* Medical Disclaimer Note */}
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-[11px] text-amber-900 leading-relaxed flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Wichtiger Hinweis:</strong> EVE (Evidence for every woman) ist ein evidenzbasiertes Symptom-Tracking- und Bildungs-Tool und ersetzt keine ärztliche Diagnose. Besprich deine individuellen Laborwerte und Therapieoptionen stets mit deiner behandelnden Ärztin oder deinem Arzt.
            </span>
          </div>

          {/* Export Action */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white border border-[#DCD5C8] hover:bg-[#FAF7F2] text-xs font-bold text-[#4A453E] rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Druckansicht öffnen</span>
            </button>
            <button
              onClick={handleShareOrCopy}
              className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4" />
              <span>Text kopieren</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
