import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  Moon, 
  Brain, 
  Flame, 
  Zap, 
  Activity, 
  HeartPulse, 
  Coffee, 
  ShieldAlert, 
  Feather, 
  Wind, 
  Calendar,
  Key,
  Thermometer,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  BookOpen
} from 'lucide-react';
import { SwipeCard } from '../types';

interface SwipeDeckProps {
  cards: SwipeCard[];
  onSwipe: (card: SwipeCard, action: 'present' | 'absent' | 'answered_correct' | 'answered_incorrect') => void;
  onUndo: () => void;
  canUndo: boolean;
  symptomsPresentCount: number;
  symptomsAbsentCount: number;
  matchThreshold: number;
  onConnectTheDots: () => void;
  onGenerateMoreCards: () => void;
  isGeneratingCards: boolean;
  latestUnlockedBadge: string | null;
  onOpenChecklist?: () => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  cards,
  onSwipe,
  onUndo,
  canUndo,
  symptomsPresentCount,
  symptomsAbsentCount,
  matchThreshold,
  onConnectTheDots,
  onGenerateMoreCards,
  isGeneratingCards,
  latestUnlockedBadge,
  onOpenChecklist
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
  const [showScienceDetail, setShowScienceDetail] = useState(false);
  const [mythAnswerState, setMythAnswerState] = useState<'unanswered' | 'revealed'>('unanswered');
  const [mythUserChoice, setMythUserChoice] = useState<boolean | null>(null);

  const currentCard = cards[currentIndex];
  const nextCard = cards[currentIndex + 1];

  const handleDrag = (_: any, info: PanInfo) => {
    if (info.offset.x > 75) {
      setDragDirection('right');
    } else if (info.offset.x < -75) {
      setDragDirection('left');
    } else {
      setDragDirection(null);
    }
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    setDragDirection(null);
    if (!currentCard) return;

    // Swipe Right: That's Me (present)
    if (info.offset.x > 110) {
      triggerSwipe('present');
    }
    // Swipe Left: Not Me (absent)
    else if (info.offset.x < -110) {
      triggerSwipe('absent');
    }
  };

  const triggerSwipe = (action: 'present' | 'absent') => {
    if (!currentCard) return;
    onSwipe(currentCard, action);
    advanceCard();
  };

  const advanceCard = () => {
    setShowScienceDetail(false);
    setMythAnswerState('unanswered');
    setMythUserChoice(null);
    setCurrentIndex(prev => prev + 1);
  };

  const handleMythChoice = (isFactChoice: boolean) => {
    if (!currentCard || currentCard.type !== 'myth_buster') return;
    setMythUserChoice(isFactChoice);
    setMythAnswerState('revealed');
    const isCorrect = isFactChoice === currentCard.isFact;
    onSwipe(currentCard, isCorrect ? 'answered_correct' : 'answered_incorrect');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon': return <Moon className="w-5 h-5 text-[#6D1835]" />;
      case 'Brain': return <Brain className="w-5 h-5 text-[#2B1720]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#E76F61]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#E76F61]" />;
      case 'Activity': return <Activity className="w-5 h-5 text-[#6D1835]" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-[#E76F61]" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-[#6D1835]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#2B1720]" />;
      case 'Feather': return <Feather className="w-5 h-5 text-[#6D1835]" />;
      case 'Wind': return <Wind className="w-5 h-5 text-[#2B1720]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#E76F61]" />;
      case 'Key': return <Key className="w-5 h-5 text-[#E76F61]" />;
      case 'Thermometer': return <Thermometer className="w-5 h-5 text-[#E76F61]" />;
      default: return <Sparkles className="w-5 h-5 text-[#6D1835]" />;
    }
  };

  const progressPercent = Math.min(100, Math.round((symptomsPresentCount / matchThreshold) * 100));
  const isThresholdMet = symptomsPresentCount >= matchThreshold;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none">
      {/* Progress & Dot Connection Meter */}
      <div className="w-full mb-4 bg-white/95 backdrop-blur-sm border border-[#DDD4C7] p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5 font-bold text-[#2B1720]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F61] animate-pulse" />
            <span>Dot Connection Fortschritt:</span>
            <span className="text-[#6D1835] font-bold">{symptomsPresentCount} / {matchThreshold} Matches</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#161616]/70">
            <span className="flex items-center gap-1 text-[#6D1835] font-bold">
              <Check className="w-3 h-3 text-[#E76F61]" /> {symptomsPresentCount} Ja
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#161616]/60">
              <X className="w-3 h-3" /> {symptomsAbsentCount} Nein
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar with EVE Brand Colors */}
        <div className="relative w-full h-2.5 bg-[#EAE2D6] rounded-full overflow-hidden">
          <motion.div 
            className="h-full rounded-full transition-all bg-gradient-to-r from-[#6D1835] via-[#2B1720] to-[#E76F61]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Threshold Met Notification Banner */}
        {isThresholdMet && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2.5 pt-2 border-t border-[#F0EBE1] flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D1835]">
              <Sparkles className="w-4 h-4 text-[#E76F61]" />
              <span>Schwelle erreicht! Dot Profil freigeschaltet.</span>
            </div>
            <button
              onClick={onConnectTheDots}
              className="px-3 py-1 bg-[#2B1720] hover:bg-[#3D202D] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Dots verbinden</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E76F61]" />
            </button>
          </motion.div>
        )}

        {latestUnlockedBadge && (
          <div className="mt-2 bg-[#E76F61]/15 border border-[#E76F61]/30 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] text-[#2B1720] font-bold animate-fadeIn">
            <Award className="w-3.5 h-3.5 text-[#6D1835] shrink-0" />
            <span>Neues Abzeichen freigeschaltet: {latestUnlockedBadge}!</span>
          </div>
        )}
      </div>

      {/* Card Deck Stage */}
      <div className="relative w-full h-[460px] flex items-center justify-center">
        {/* Next Card Background Shadow (Stack Effect) */}
        {nextCard && (
          <div className="absolute w-[94%] h-[435px] bg-[#EFE8DE] border border-[#DDD4C7] rounded-3xl top-4 scale-95 opacity-80 z-0 pointer-events-none transition-transform" />
        )}

        {/* Current Active Card */}
        <AnimatePresence mode="popLayout">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              className="absolute w-full h-[450px] bg-white rounded-3xl shadow-lg border border-[#DDD4C7] p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing z-10 select-none overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 1.02 }}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              exit={{
                x: dragDirection === 'right' ? 350 : -350,
                rotate: dragDirection === 'right' ? 18 : -18,
                opacity: 0,
                transition: { duration: 0.25 }
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              {/* Dynamic Drag Overlay Stamp Indicator */}
              {dragDirection === 'right' && (
                <div className="absolute top-5 right-5 z-30 border-2 border-[#E76F61] text-[#6D1835] bg-[#F6F0E9]/95 px-4 py-1.5 rounded-xl font-bold text-sm tracking-wider uppercase rotate-12 shadow-md animate-pulse">
                  DAS BIN ICH ✨
                </div>
              )}
              {dragDirection === 'left' && (
                <div className="absolute top-5 left-5 z-30 border-2 border-[#2B1720]/40 text-[#2B1720]/80 bg-white/95 px-4 py-1.5 rounded-xl font-bold text-sm tracking-wider uppercase -rotate-12 shadow-md animate-pulse">
                  NICHT ICH ⚪
                </div>
              )}

              {/* CARD TYPE: SYMPTOM */}
              {currentCard.type === 'symptom' && (
                <>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF6F1] border border-[#DDD4C7] flex items-center justify-center">
                        {getCategoryIcon(currentCard.icon)}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D1835]">
                          {currentCard.category}
                        </span>
                        <h3 className="font-bold text-sm text-[#2B1720] leading-tight">
                          {currentCard.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                      Symptom Signal
                    </span>
                  </div>

                  {/* Card Body / Relatable Prompt */}
                  <div className="my-auto py-3">
                    <p className="font-bold text-xl sm:text-2xl text-[#2B1720] leading-snug">
                      "{currentCard.prompt}"
                    </p>
                    <p className="text-xs text-[#161616]/80 mt-2.5 font-normal leading-relaxed">
                      {currentCard.subtext}
                    </p>
                  </div>

                  {/* Collapsible Clinical Connection */}
                  <div className="border-t border-[#F0EBE1] pt-2.5">
                    <button
                      type="button"
                      onClick={() => setShowScienceDetail(!showScienceDetail)}
                      className="w-full flex items-center justify-between text-xs text-[#6D1835] hover:text-[#2B1720] transition-colors py-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 font-bold">
                        <Lightbulb className="w-3.5 h-3.5 text-[#E76F61]" />
                        <span>Biologischer Hintergrund (Evidence)</span>
                      </span>
                      {showScienceDetail ? <ChevronUp className="w-4 h-4 text-[#2B1720]" /> : <ChevronDown className="w-4 h-4 text-[#2B1720]" />}
                    </button>

                    {showScienceDetail && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#FAF6F1] p-2.5 rounded-xl text-[11px] text-[#161616] leading-relaxed mt-1.5 border border-[#DDD4C7]"
                      >
                        {currentCard.clinicalCorrelation}
                      </motion.div>
                    )}
                  </div>
                </>
              )}

              {/* CARD TYPE: MYTH BUSTER TRIVIA */}
              {currentCard.type === 'myth_buster' && (
                <>
                  <div className="flex items-center justify-between border-b border-[#E76F61]/20 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#E76F61]/15 border border-[#E76F61]/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#6D1835]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#6D1835]">
                          {currentCard.badgeText}
                        </span>
                        <h3 className="font-bold text-sm text-[#2B1720]">
                          Mythos-Buster
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6D1835]/10 text-[#6D1835] border border-[#6D1835]/20">
                      Evidenz-Check
                    </span>
                  </div>

                  {/* Trivia Statement */}
                  <div className="my-auto py-2">
                    <p className="font-bold text-lg sm:text-xl text-[#2B1720] leading-snug">
                      {currentCard.statement}
                    </p>

                    {/* Interactive Fact vs Myth Choice */}
                    {mythAnswerState === 'unanswered' ? (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleMythChoice(false)}
                          className="py-2.5 px-3 bg-[#E76F61]/15 hover:bg-[#E76F61]/25 border border-[#E76F61]/40 text-[#6D1835] font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          🚨 Es ist ein Mythos!
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMythChoice(true)}
                          className="py-2.5 px-3 bg-[#6D1835]/15 hover:bg-[#6D1835]/25 border border-[#6D1835]/40 text-[#2B1720] font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          ✅ Es ist ein Fakt!
                        </button>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                          mythUserChoice === currentCard.isFact 
                            ? 'bg-[#E76F61]/10 border-[#E76F61]/30 text-[#2B1720]' 
                            : 'bg-[#FAF6F1] border-[#DDD4C7] text-[#161616]'
                        }`}
                      >
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          {mythUserChoice === currentCard.isFact ? (
                            <span className="text-[#6D1835]">🎯 Richtig erkannt! Starkes medizinisches Radar!</span>
                          ) : (
                            <span className="text-[#E76F61]">💡 Häufiger Irrglaube! Hier ist die Evidenz:</span>
                          )}
                        </div>
                        <p className="text-[11px] font-normal text-[#161616]">{currentCard.explanation}</p>
                        <p className="text-[10px] text-[#6D1835] mt-1 italic font-medium">{currentCard.clinicalReality}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-[#DDD4C7] pt-2 flex items-center justify-between text-[11px] text-[#161616]/70">
                    <span>Swipen oder klicken zum Fortfahren</span>
                    <button
                      type="button"
                      onClick={() => triggerSwipe('present')}
                      className="text-[#6D1835] font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Nächste Karte <ArrowRight className="w-3 h-3 text-[#E76F61]" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            /* Empty Deck State */
            <div className="w-full h-[450px] bg-white rounded-3xl shadow-md border border-[#DDD4C7] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#6D1835]/10 text-[#6D1835] flex items-center justify-center mb-3">
                <Sparkles className="w-7 h-7 text-[#E76F61]" />
              </div>
              <h3 className="font-bold text-xl text-[#2B1720] mb-1">
                Du hast alle Karten durchgesehen!
              </h3>
              <p className="text-xs text-[#161616]/80 max-w-xs mb-5 font-normal">
                Du hast <strong>{symptomsPresentCount} bestätigte Symptome</strong> markiert und {symptomsAbsentCount} ausgeschlossen.
              </p>

              <div className="flex flex-col gap-2.5 w-full max-w-xs">
                <button
                  type="button"
                  onClick={onConnectTheDots}
                  className="w-full py-3 bg-[#2B1720] hover:bg-[#3D202D] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E76F61]" />
                  <span>Mein Dot Connection Profil öffnen</span>
                </button>

                {onOpenChecklist && (
                  <button
                    type="button"
                    onClick={onOpenChecklist}
                    className="w-full py-2.5 bg-[#FAF6F1] hover:bg-[#EAE2D6] border border-[#DDD4C7] text-[#2B1720] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#6D1835]" />
                    <span>Gesamte 60 Symptome Checklist ansehen</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onGenerateMoreCards}
                  disabled={isGeneratingCards}
                  className="w-full py-2.5 bg-white hover:bg-[#FAF6F1] border border-[#DDD4C7] text-[#161616] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6D1835]" />
                  <span>{isGeneratingCards ? 'Gemini generiert neue Karten...' : '5 weitere Karten mit Gemini generieren'}</span>
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Action Controls (Dark: #2B1720, Medium: #6D1835, Light: #E76F61) */}
      <div className="w-full max-w-xs mt-4 flex items-center justify-between gap-3 px-2">
        {/* Undo Button */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Letzten Swipe rückgängig machen"
          className="w-11 h-11 rounded-full bg-white border border-[#DDD4C7] shadow-sm flex items-center justify-center text-[#2B1720] hover:text-[#6D1835] hover:bg-[#FAF6F1] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Swipe Left Button: Not Me */}
        <button
          type="button"
          onClick={() => triggerSwipe('absent')}
          disabled={!currentCard}
          className="flex-1 py-3 px-4 bg-white border border-[#DDD4C7] hover:border-[#2B1720] hover:bg-[#FAF6F1] rounded-2xl shadow-sm text-xs font-bold text-[#2B1720] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          <X className="w-4 h-4 text-[#2B1720]/60" />
          <span>Nicht ich</span>
        </button>

        {/* Swipe Right Button: That's Me! (Dark Button #2B1720 with Light Accent #E76F61) */}
        <button
          type="button"
          onClick={() => triggerSwipe('present')}
          disabled={!currentCard}
          className="flex-1 py-3 px-4 bg-[#2B1720] hover:bg-[#3D202D] text-white rounded-2xl shadow-md text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          <Check className="w-4 h-4 text-[#E76F61]" />
          <span>Das bin ich!</span>
        </button>

        {/* Connect Now Quick Access */}
        <button
          type="button"
          onClick={onConnectTheDots}
          disabled={symptomsPresentCount === 0}
          title="Jetzt Punkte verbinden"
          className="w-11 h-11 rounded-full bg-[#FAF6F1] border border-[#DDD4C7] shadow-sm flex items-center justify-center text-[#6D1835] hover:text-[#2B1720] hover:bg-[#EAE2D6] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#E76F61]" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-3 text-center">
        <p className="text-[11px] text-[#161616]/70 font-normal">
          Tipp: Nach rechts swipen für <strong>"Das bin ich"</strong>, nach links für <strong>"Nicht ich"</strong>
        </p>
        {onOpenChecklist && (
          <>
            <span className="text-[#DDD4C7]">•</span>
            <button
              type="button"
              onClick={onOpenChecklist}
              className="text-[11px] font-bold text-[#6D1835] hover:underline cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-[#E76F61]" />
              <span>Alle 60 Symptome</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
