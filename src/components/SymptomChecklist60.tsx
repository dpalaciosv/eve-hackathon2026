import React, { useState, useMemo } from 'react';
import { 
  Check, 
  X, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  FileText, 
  Download, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  Brain, 
  Moon, 
  Flame, 
  Activity, 
  HeartPulse, 
  Layers, 
  Filter, 
  ArrowRight,
  Info,
  Pill,
  Apple,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import { SIXTY_SYMPTOMS, SYMPTOM_CATEGORIES } from '../data/sixtySymptoms';
import { SymptomItem60, ChecklistSelection } from '../types';

interface SymptomChecklist60Props {
  checklist: ChecklistSelection;
  onToggleSymptom: (id: number, status: 'yes' | 'no') => void;
  onConnectTheDots: () => void;
  onOpenDoctorExport?: () => void;
}

export const SymptomChecklist60: React.FC<SymptomChecklist60Props> = ({
  checklist,
  onToggleSymptom,
  onConnectTheDots,
  onOpenDoctorExport
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'yes' | 'no' | 'unanswered'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Counters
  const yesCount = useMemo(() => {
    return Object.values(checklist).filter(val => val === 'yes').length;
  }, [checklist]);

  const noCount = useMemo(() => {
    return Object.values(checklist).filter(val => val === 'no').length;
  }, [checklist]);

  // Score & Stage calculation based on clinical STRAW+10 weights
  const { totalScore, stageAssessment, stageColor } = useMemo(() => {
    let score = 0;
    SIXTY_SYMPTOMS.forEach(s => {
      if (checklist[s.id] === 'yes') {
        score += s.weight;
      }
    });

    let stage = 'Geringe Symptomlast / Frühe Phase';
    let color = 'bg-[#6D1835] text-white';

    if (score >= 25 || yesCount >= 15) {
      stage = 'Fortgeschrittene Perimenopause (STRAW -1)';
      color = 'bg-[#2B1720] text-white';
    } else if (score >= 12 || yesCount >= 7) {
      stage = 'Etablierte frühe Perimenopause (STRAW -2)';
      color = 'bg-[#6D1835] text-white';
    } else if (score > 3 || yesCount >= 2) {
      stage = 'Erste perimenopausale Signale';
      color = 'bg-[#E76F61] text-[#2B1720]';
    }

    return { totalScore: score, stageAssessment: stage, stageColor: color };
  }, [checklist, yesCount]);

  // Filtered symptoms
  const filteredSymptoms = useMemo(() => {
    return SIXTY_SYMPTOMS.filter(sym => {
      // Category filter
      if (activeCategory !== 'all' && sym.categoryKey !== activeCategory) {
        return false;
      }

      // Status filter
      const currentStatus = checklist[sym.id] || 'unanswered';
      if (filterStatus === 'yes' && currentStatus !== 'yes') return false;
      if (filterStatus === 'no' && currentStatus !== 'no') return false;
      if (filterStatus === 'unanswered' && currentStatus !== 'unanswered') return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = sym.titleDe.toLowerCase().includes(query) || sym.titleEn.toLowerCase().includes(query);
        const matchesQuestion = sym.clinicalQuestionDe.toLowerCase().includes(query) || sym.clinicalQuestionEn.toLowerCase().includes(query);
        const matchesDesc = sym.description.toLowerCase().includes(query) || sym.biologicalRationale.toLowerCase().includes(query);
        const matchesSuppl = sym.supplements.toLowerCase().includes(query) || sym.measures.toLowerCase().includes(query);
        return matchesTitle || matchesQuestion || matchesDesc || matchesSuppl;
      }

      return true;
    });
  }, [activeCategory, filterStatus, searchQuery, checklist]);

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner / Summary Card */}
      <div className="bg-[#2B1720] text-[#F6F0E9] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#6D1835]/40 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6D1835]/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#E76F61]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D1835]/60 border border-[#E76F61]/40 text-[#E76F61] text-xs font-bold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Evidenzbasiertes 60-Symptome Kompendium</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Der 60-Symptome Check für jede Frau
            </h1>
            
            <p className="text-sm sm:text-base text-[#F6F0E9]/85 leading-relaxed font-sans">
              Erfassen Sie Ihre persönlichen Symptome über 11 Körpersysteme hinweg. Jedes Symptom ist mit biologischen Zusammenhängen, Lebensstiloptionen, Mikronährstoffen und klinischen Konsultationshinweisen unterlegt.
            </p>
          </div>

          {/* Gamified Score Card */}
          <div className="bg-[#F6F0E9]/10 backdrop-blur-md rounded-2xl p-5 border border-[#F6F0E9]/15 flex flex-col items-center sm:items-end text-center sm:text-right min-w-[260px] w-full lg:w-auto">
            <div className="text-xs uppercase tracking-wider text-[#E76F61] font-bold">
              Erfasste Symptome
            </div>
            
            <div className="flex items-baseline gap-2 my-1">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                {yesCount}
              </span>
              <span className="text-lg text-[#F6F0E9]/70 font-semibold">
                / 60
              </span>
            </div>

            <div className={`text-xs px-3 py-1 rounded-full font-bold mt-1 ${stageColor}`}>
              {stageAssessment}
            </div>

            <div className="w-full bg-white/20 h-2 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-[#E76F61] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (yesCount / 60) * 100)}%` }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2 w-full justify-center sm:justify-end">
              <button
                onClick={onConnectTheDots}
                className="px-4 py-2 rounded-xl bg-[#E76F61] hover:bg-[#E76F61]/90 text-[#2B1720] font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer flex-1 sm:flex-initial"
              >
                <Sparkles className="w-4 h-4 text-[#2B1720]" />
                <span>KI-Dot-Profil</span>
              </button>

              {onOpenDoctorExport && (
                <button
                  onClick={onOpenDoctorExport}
                  className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-white/20 cursor-pointer"
                  title="Als Arzt-Brief exportieren"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Arzt-Export</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E5DDD2] space-y-4">
        
        {/* Search input + Status Filter Buttons */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#161616]/40" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Symptom, Wirkstoff oder Frage durchsuchen (z. B. Magnesium, Gelenk, Gehirnnebel)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DDD4C7] bg-[#F6F0E9]/40 text-sm text-[#161616] placeholder-[#161616]/50 focus:outline-none focus:ring-2 focus:ring-[#6D1835] focus:border-transparent transition-all font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#161616]/50 hover:text-[#2B1720] cursor-pointer"
              >
                Löschen
              </button>
            )}
          </div>

          {/* Quick status pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'bg-[#F6F0E9] text-[#161616]/70 hover:bg-[#EAE2D6]'
              }`}
            >
              Alle ({SIXTY_SYMPTOMS.length})
            </button>
            <button
              onClick={() => setFilterStatus('yes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                filterStatus === 'yes'
                  ? 'bg-[#6D1835] text-white shadow-xs'
                  : 'bg-[#F6F0E9] text-[#6D1835] hover:bg-[#EAE2D6]'
              }`}
            >
              <Check className="w-3.5 h-3.5 text-[#E76F61]" />
              <span>Trifft zu ({yesCount})</span>
            </button>
            <button
              onClick={() => setFilterStatus('no')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                filterStatus === 'no'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'bg-[#F6F0E9] text-[#161616]/70 hover:bg-[#EAE2D6]'
              }`}
            >
              <X className="w-3.5 h-3.5 text-gray-400" />
              <span>Nein ({noCount})</span>
            </button>
            <button
              onClick={() => setFilterStatus('unanswered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === 'unanswered'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'bg-[#F6F0E9] text-[#161616]/70 hover:bg-[#EAE2D6]'
              }`}
            >
              Offen ({SIXTY_SYMPTOMS.length - yesCount - noCount})
            </button>
          </div>
        </div>

        {/* 11 Category Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {SYMPTOM_CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#6D1835] text-white shadow-xs'
                    : 'bg-[#F6F0E9] text-[#161616]/75 hover:bg-[#EAE2D6] hover:text-[#2B1720]'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptom Count Alert */}
      <div className="flex items-center justify-between text-xs text-[#161616]/70 px-2">
        <span>
          Zeige <strong>{filteredSymptoms.length}</strong> von 60 Symptomen
          {activeCategory !== 'all' && ` in Kategorie "${SYMPTOM_CATEGORIES.find(c => c.key === activeCategory)?.title}"`}
        </span>
        <button
          onClick={() => {
            // Expand all or collapse
            if (expandedId !== null) setExpandedId(null);
            else if (filteredSymptoms.length > 0) setExpandedId(filteredSymptoms[0].id);
          }}
          className="text-[#6D1835] font-bold hover:underline cursor-pointer"
        >
          {expandedId !== null ? 'Alle einklappen' : 'Erstes Detail aufklappen'}
        </button>
      </div>

      {/* Symptoms List */}
      <div className="space-y-3.5">
        {filteredSymptoms.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#E5DDD2] space-y-3">
            <Filter className="w-8 h-8 mx-auto text-[#6D1835]/40" />
            <h3 className="text-base font-bold text-[#2B1720]">Keine Symptome gefunden</h3>
            <p className="text-xs text-[#161616]/60 max-w-sm mx-auto">
              Für Ihre Filterkombination oder den Suchbegriff liegen keine Ergebnisse vor. Setzen Sie die Filter zurück.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setFilterStatus('all');
              }}
              className="px-4 py-2 bg-[#2B1720] text-white rounded-xl text-xs font-bold hover:bg-[#6D1835] transition-all cursor-pointer"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          filteredSymptoms.map(sym => {
            const status = checklist[sym.id] || 'unanswered';
            const isExpanded = expandedId === sym.id;
            const isYes = status === 'yes';
            const isNo = status === 'no';

            return (
              <div 
                key={sym.id}
                className={`bg-white rounded-2xl transition-all border ${
                  isYes 
                    ? 'border-[#6D1835] shadow-sm ring-1 ring-[#6D1835]/20' 
                    : isNo
                    ? 'border-[#E5DDD2] opacity-70'
                    : 'border-[#E5DDD2] hover:border-[#DDD4C7] shadow-xs'
                }`}
              >
                {/* Main Card Header / Quick Assessment */}
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Left: Number, Title, Clinical Question */}
                    <div className="space-y-1.5 flex-1 cursor-pointer" onClick={() => toggleExpand(sym.id)}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="w-6 h-6 rounded-full bg-[#2B1720] text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {sym.id}
                        </span>
                        
                        <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F6F0E9] text-[#6D1835] font-bold">
                          {sym.categoryTitle}
                        </span>

                        {sym.factCheckVerified && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#E76F61]/20 text-[#6D1835] font-extrabold flex items-center gap-1 border border-[#E76F61]/40">
                            <ShieldCheck className="w-3 h-3 text-[#6D1835]" />
                            <span>Evidenz-Check</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#2B1720] hover:text-[#6D1835] transition-colors flex items-center gap-2">
                        <span>{sym.titleDe}</span>
                        <span className="text-xs text-[#161616]/50 font-normal hidden md:inline">
                          ({sym.titleEn})
                        </span>
                      </h3>

                      {/* Clinical Anamnesis Question in Quotes */}
                      <p className="text-xs sm:text-sm text-[#161616]/80 italic bg-[#F6F0E9]/50 p-2.5 rounded-xl border border-[#E5DDD2]/50 font-serif leading-relaxed">
                        „{sym.clinicalQuestionDe}“
                      </p>
                    </div>

                    {/* Right: [Ja] [Nein] Quick Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => onToggleSymptom(sym.id, 'yes')}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isYes
                            ? 'bg-[#6D1835] text-white shadow-md ring-2 ring-[#E76F61]'
                            : 'bg-[#F6F0E9] text-[#2B1720] hover:bg-[#EAE2D6]'
                        }`}
                      >
                        <Check className={`w-4 h-4 ${isYes ? 'text-[#E76F61]' : 'text-[#6D1835]'}`} />
                        <span>Ja</span>
                      </button>

                      <button
                        onClick={() => onToggleSymptom(sym.id, 'no')}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isNo
                            ? 'bg-[#2B1720] text-white shadow-sm'
                            : 'bg-[#F6F0E9] text-[#161616]/60 hover:bg-[#EAE2D6]'
                        }`}
                      >
                        <X className="w-3.5 h-3.5 text-gray-400" />
                        <span>Nein</span>
                      </button>

                      {/* Expand Details Trigger */}
                      <button
                        onClick={() => toggleExpand(sym.id)}
                        className="p-2 rounded-xl bg-[#F6F0E9] hover:bg-[#EAE2D6] text-[#2B1720] transition-colors cursor-pointer"
                        title={isExpanded ? 'Details einklappen' : 'Klinische Details anzeigen'}
                        aria-label="Details umschalten"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-[#6D1835]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#2B1720]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Section: 7 Evidence Categories */}
                {isExpanded && (
                  <div className="border-t border-[#E5DDD2] bg-[#F6F0E9]/30 p-4 sm:p-6 space-y-4 rounded-b-2xl animate-in fade-in duration-200">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* 1. Verständliche Beschreibung */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Info className="w-3.5 h-3.5 text-[#E76F61]" />
                          <span>1. Verständliche Beschreibung</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed">
                          {sym.description}
                        </p>
                      </div>

                      {/* 2. Mögliche Zusammenhänge (Hormonelle Ursache) */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Brain className="w-3.5 h-3.5 text-[#6D1835]" />
                          <span>2. Mögliche biologische Zusammenhänge</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed">
                          {sym.biologicalRationale}
                        </p>
                      </div>

                      {/* 3. Allgemeine Informationen / Prävalenz */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Layers className="w-3.5 h-3.5 text-[#E76F61]" />
                          <span>3. Relevanz & Häufigkeit</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed">
                          {sym.generalInfo}
                        </p>
                      </div>

                      {/* 4. Gezielte Sofortmaßnahmen */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Activity className="w-3.5 h-3.5 text-[#6D1835]" />
                          <span>4. Mögliche Maßnahmen</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed">
                          {sym.measures}
                        </p>
                      </div>

                      {/* 5. Lebensstiloptionen */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Apple className="w-3.5 h-3.5 text-[#E76F61]" />
                          <span>5. Allgemeine Lebensstiloptionen</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed">
                          {sym.lifestyleOptions}
                        </p>
                      </div>

                      {/* 6. Supplement-Optionen */}
                      <div className="bg-white p-3.5 rounded-xl border border-[#E5DDD2] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
                          <Pill className="w-3.5 h-3.5 text-[#6D1835]" />
                          <span>6. Mögliche Supplement-Optionen</span>
                        </div>
                        <p className="text-xs text-[#161616]/85 leading-relaxed font-medium">
                          {sym.supplements}
                        </p>
                      </div>
                    </div>

                    {/* 7. Wann ärztliche Abklärung sinnvoll ist (Red Flag Box) */}
                    <div className="bg-[#FFF5F4] border border-[#E76F61]/50 rounded-xl p-3.5 flex items-start gap-3">
                      <Stethoscope className="w-4 h-4 text-[#6D1835] shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#6D1835]">
                          7. Wann eine ärztliche Abklärung sinnvoll ist:
                        </div>
                        <p className="text-xs text-[#161616]/90 leading-relaxed">
                          {sym.doctorConsultationWhen}
                        </p>
                        {sym.factCheckSource && (
                          <div className="text-[11px] text-[#6D1835]/70 pt-1">
                            Klinische Quelle: <strong>{sym.factCheckSource}</strong>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Floating Bottom Sticky Bar if symptoms are checked */}
      {yesCount > 0 && (
        <div className="sticky bottom-6 z-30 bg-[#2B1720]/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-xl border border-[#6D1835] flex items-center justify-between gap-4 max-w-xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#E76F61] text-[#2B1720] font-extrabold text-sm flex items-center justify-center">
              {yesCount}
            </span>
            <div className="text-xs">
              <div className="font-bold">Symptome ausgewählt</div>
              <div className="text-[#F6F0E9]/70 text-[11px]">{stageAssessment}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onConnectTheDots}
              className="px-4 py-2 rounded-xl bg-[#E76F61] hover:bg-[#E76F61]/90 text-[#2B1720] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dot Profil starten</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
