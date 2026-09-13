import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { 
  Check, 
  X, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
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
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { SwipeCard, SymptomCard, MythBusterCard, SwipeLog } from '../types';

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
  latestUnlockedBadge
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
      case 'Moon': return <Moon className="w-5 h-5 text-indigo-500" />;
      case 'Brain': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'Flame': return <Flame className="w-5 h-5 text-rose-500" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-pink-500" />;
      case 'Coffee': return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-indigo-600" />;
      case 'Feather': return <Feather className="w-5 h-5 text-purple-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-sky-500" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-rose-400" />;
      case 'Key': return <Key className="w-5 h-5 text-yellow-500" />;
      case 'Thermometer': return <Thermometer className="w-5 h-5 text-red-500" />;
      default: return <Sparkles className="w-5 h-5 text-rose-500" />;
    }
  };

  const progressPercent = Math.min(100, Math.round((symptomsPresentCount / matchThreshold) * 100));
  const isThresholdMet = symptomsPresentCount >= matchThreshold;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none">
      {/* Progress & Dot Connection Meter */}
      <div className="w-full mb-4 bg-white/90 backdrop-blur-sm border border-[#E8E1D5] p-3.5 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between text-xs mb-2">
          <div className="flex items-center gap-1.5 font-bold text-[#1E1B18]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span>Dot Connection Meter:</span>
            <span className="text-[#8B5CF6] font-extrabold">{symptomsPresentCount} / {matchThreshold} Matches</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#706A62]">
            <span className="flex items-center gap-1 text-emerald-600">
              <Check className="w-3 h-3" /> {symptomsPresentCount} Yes
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-500">
              <X className="w-3 h-3" /> {symptomsAbsentCount} No
            </span>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="relative w-full h-2.5 bg-[#EAE4D9] rounded-full overflow-hidden">
          <motion.div 
            className={`h-full rounded-full transition-all ${
              isThresholdMet 
                ? 'bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B]' 
                : 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]'
            }`}
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
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#6D28D9]">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Threshold reached! Profile unlocked.</span>
            </div>
            <button
              onClick={onConnectTheDots}
              className="px-3 py-1 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white text-xs font-bold rounded-lg shadow-sm hover:opacity-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Connect Dots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {latestUnlockedBadge && (
          <div className="mt-2 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] text-amber-800 font-bold animate-fadeIn">
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>New Badge Unlocked: {latestUnlockedBadge}!</span>
          </div>
        )}
      </div>

      {/* Card Deck Stage */}
      <div className="relative w-full h-[460px] flex items-center justify-center">
        {/* Next Card Background Shadow (Stack Effect) */}
        {nextCard && (
          <div className="absolute w-[94%] h-[435px] bg-[#F3EFEA] border border-[#DDD6C8] rounded-3xl top-4 scale-95 opacity-70 z-0 pointer-events-none transition-transform" />
        )}

        {/* Current Active Card */}
        <AnimatePresence mode="popLayout">
          {currentCard ? (
            <motion.div
              key={currentCard.id}
              className="absolute w-full h-[450px] bg-white rounded-3xl shadow-xl border border-[#DCD5C8] p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing z-10 select-none overflow-hidden"
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
                <div className="absolute top-5 right-5 z-30 border-2 border-emerald-500 text-emerald-600 bg-emerald-50/95 px-4 py-1.5 rounded-xl font-black text-sm tracking-wider uppercase rotate-12 shadow-md animate-pulse">
                  THAT'S ME 💜
                </div>
              )}
              {dragDirection === 'left' && (
                <div className="absolute top-5 left-5 z-30 border-2 border-zinc-400 text-zinc-500 bg-zinc-50/95 px-4 py-1.5 rounded-xl font-black text-sm tracking-wider uppercase -rotate-12 shadow-md animate-pulse">
                  NOT ME ⚪
                </div>
              )}

              {/* CARD TYPE: SYMPTOM */}
              {currentCard.type === 'symptom' && (
                <>
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center">
                        {getCategoryIcon(currentCard.icon)}
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8A8379]">
                          {currentCard.category}
                        </span>
                        <h3 className="font-bold text-sm text-[#1E1B18] leading-tight">
                          {currentCard.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#7C3AED]">
                      Symptom Signal
                    </span>
                  </div>

                  {/* Card Body / Relatable Prompt */}
                  <div className="my-auto py-3">
                    <p className="font-serif-heading font-black text-xl sm:text-2xl text-[#1E1B18] leading-snug">
                      "{currentCard.prompt}"
                    </p>
                    <p className="text-xs text-[#6B655E] mt-2.5 font-medium leading-relaxed">
                      {currentCard.subtext}
                    </p>
                  </div>

                  {/* Collapsible Clinical Connection */}
                  <div className="border-t border-[#F0EBE1] pt-2.5">
                    <button
                      type="button"
                      onClick={() => setShowScienceDetail(!showScienceDetail)}
                      className="w-full flex items-center justify-between text-xs text-[#8A8379] hover:text-[#1E1B18] transition-colors py-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5 font-bold">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>Why your body does this</span>
                      </span>
                      {showScienceDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showScienceDetail && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-[#FAF7F2] p-2.5 rounded-xl text-[11px] text-[#4A453E] leading-relaxed mt-1.5 border border-[#EAE4D9]"
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
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-700">
                          {currentCard.badgeText}
                        </span>
                        <h3 className="font-bold text-sm text-[#1E1B18]">
                          Myth-Buster Trivia
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800">
                      Gamified Check
                    </span>
                  </div>

                  {/* Trivia Statement */}
                  <div className="my-auto py-2">
                    <p className="font-serif-heading font-black text-lg sm:text-xl text-[#1E1B18] leading-snug">
                      {currentCard.statement}
                    </p>

                    {/* Interactive Fact vs Myth Choice */}
                    {mythAnswerState === 'unanswered' ? (
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleMythChoice(false)}
                          className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          🚨 It's a Myth!
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMythChoice(true)}
                          className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          ✅ It's a Fact!
                        </button>
                      </div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                          mythUserChoice === currentCard.isFact 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                            : 'bg-amber-50 border-amber-200 text-amber-900'
                        }`}
                      >
                        <div className="font-black mb-1 flex items-center gap-1.5">
                          {mythUserChoice === currentCard.isFact ? (
                            <span className="text-emerald-600">🎯 Correct! Great medical radar!</span>
                          ) : (
                            <span className="text-amber-700">💡 Common misconception! Here's the science:</span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium">{currentCard.explanation}</p>
                        <p className="text-[10px] text-zinc-500 mt-1 italic">{currentCard.clinicalReality}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-amber-100 pt-2 flex items-center justify-between text-[11px] text-[#8A8379]">
                    <span>Swipe or click to continue</span>
                    <button
                      type="button"
                      onClick={() => triggerSwipe('present')}
                      className="text-amber-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      Next Card <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            /* Empty Deck State */
            <div className="w-full h-[450px] bg-white rounded-3xl shadow-md border border-[#DCD5C8] p-6 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] flex items-center justify-center mb-3">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif-heading font-black text-xl text-[#1E1B18] mb-1">
                You've Explored the Deck!
              </h3>
              <p className="text-xs text-[#6B655E] max-w-xs mb-5">
                You've identified <strong>{symptomsPresentCount} present symptoms</strong> and ruled out {symptomsAbsentCount}.
              </p>

              <div className="flex flex-col gap-2.5 w-full max-w-xs">
                <button
                  type="button"
                  onClick={onConnectTheDots}
                  className="w-full py-3 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-bold text-sm rounded-xl shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My Dot Connection Profile</span>
                </button>

                <button
                  type="button"
                  onClick={onGenerateMoreCards}
                  disabled={isGeneratingCards}
                  className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#DCD5C8] text-[#4A453F] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>{isGeneratingCards ? 'Gemini Generating Fresh Cards...' : 'Generate 5 More Cards with Gemini'}</span>
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Swipe Action Controls */}
      <div className="w-full max-w-xs mt-4 flex items-center justify-between gap-3 px-2">
        {/* Undo Button */}
        <button
          type="button"
          onClick={onUndo}
          disabled={!canUndo}
          title="Undo last swipe"
          className="w-11 h-11 rounded-full bg-white border border-[#DDD6C8] shadow-sm flex items-center justify-center text-[#706A62] hover:text-[#1E1B18] hover:bg-[#FAF7F2] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Swipe Left Button: Not Me */}
        <button
          type="button"
          onClick={() => triggerSwipe('absent')}
          disabled={!currentCard}
          className="flex-1 py-3 px-4 bg-white border border-[#DCD5C8] hover:border-zinc-400 hover:bg-zinc-50 rounded-2xl shadow-sm text-xs font-black text-[#5C564E] flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          <X className="w-4 h-4 text-zinc-400" />
          <span>Not Me</span>
        </button>

        {/* Swipe Right Button: That's Me! */}
        <button
          type="button"
          onClick={() => triggerSwipe('present')}
          disabled={!currentCard}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white rounded-2xl shadow-md text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 disabled:opacity-40"
        >
          <Check className="w-4 h-4 text-white" />
          <span>That's Me!</span>
        </button>

        {/* Connect Now Quick Access */}
        <button
          type="button"
          onClick={onConnectTheDots}
          disabled={symptomsPresentCount === 0}
          title="Connect the Dots now"
          className="w-11 h-11 rounded-full bg-[#FAF7F2] border border-[#DDD6C8] shadow-sm flex items-center justify-center text-[#8B5CF6] hover:bg-[#F3EFEA] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-[#8A8379] font-medium mt-3 text-center">
        Tip: Swipe right for <strong>"That's Me"</strong>, left for <strong>"Not Me"</strong>
      </p>
    </div>
  );
};
