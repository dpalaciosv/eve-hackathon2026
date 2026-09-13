import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SwipeDeck } from './components/SwipeDeck';
import { DotConnectionProfile } from './components/DotConnectionProfile';
import { GamificationDrawer } from './components/GamificationDrawer';
import { PitchGuideModal } from './components/PitchGuideModal';
import { UserProfileModal } from './components/UserProfileModal';
import { ConnectionHistoryModal } from './components/ConnectionHistoryModal';
import { MobileSimulatorFrame } from './components/MobileSimulatorFrame';
import { INITIAL_CARDS, INITIAL_BADGES, INITIAL_TOOLKITS } from './data/cards';
import { DEFAULT_USER_PROFILE, INITIAL_CONNECTION_HISTORY } from './data/defaultUserData';
import { 
  SwipeCard, 
  SwipeLog, 
  ValidationBadge, 
  LifestyleToolkit, 
  DotConnectionAssessment,
  UserProfile,
  DotConnectionHistoryItem
} from './types';
import { Sparkles, Layers, Award, RefreshCw, Smartphone, History, User, Heart } from 'lucide-react';

const MATCH_THRESHOLD = 10;

export default function App() {
  // User Profile & Authentication State (persisted to localStorage)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('eve_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Could not load user profile:", e);
    }
    return DEFAULT_USER_PROFILE;
  });

  // Longitudinal Dot Connection History (persisted to localStorage)
  const [connectionHistory, setConnectionHistory] = useState<DotConnectionHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('eve_connection_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Could not load connection history:", e);
    }
    return INITIAL_CONNECTION_HISTORY;
  });

  // Currently viewing historical assessment vs active live assessment
  const [viewingHistoricalItem, setViewingHistoricalItem] = useState<DotConnectionHistoryItem | null>(null);
  const [isCurrentSaved, setIsCurrentSaved] = useState(false);

  // Deck & Card State
  const [cards, setCards] = useState<SwipeCard[]>(INITIAL_CARDS);
  const [swipeHistory, setSwipeHistory] = useState<SwipeLog[]>([]);
  const [symptomsPresent, setSymptomsPresent] = useState<SwipeCard[]>([]);
  const [symptomsAbsent, setSymptomsAbsent] = useState<SwipeCard[]>([]);

  // Gamification & Unlocks
  const [badges, setBadges] = useState<ValidationBadge[]>(INITIAL_BADGES);
  const [toolkits, setToolkits] = useState<LifestyleToolkit[]>(INITIAL_TOOLKITS);
  const [latestUnlockedBadge, setLatestUnlockedBadge] = useState<string | null>(null);

  // Active View & Modals
  const [activeView, setActiveView] = useState<'swipe' | 'dots' | 'toolkits'>('swipe');
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [isPitchGuideOpen, setIsPitchGuideOpen] = useState(false);
  const [isGamificationDrawerOpen, setIsGamificationDrawerOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Assessment & AI Generation
  const [assessment, setAssessment] = useState<DotConnectionAssessment | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [isGeneratingCards, setIsGeneratingCards] = useState(false);

  // Sync profile to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('eve_user_profile', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('eve_user_profile');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Sync connection history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eve_connection_history', JSON.stringify(connectionHistory));
    } catch (e) {
      console.error(e);
    }
  }, [connectionHistory]);

  // Helper to trigger badge unlock toast
  const triggerBadgeToast = (title: string) => {
    setLatestUnlockedBadge(title);
    setTimeout(() => {
      setLatestUnlockedBadge(null);
    }, 4000);
  };

  // Evaluate badges & toolkits whenever present symptoms or history updates
  const evaluateGamificationProgress = (
    updatedPresent: SwipeCard[],
    updatedHistory: SwipeLog[]
  ) => {
    const presentCount = updatedPresent.length;
    const totalSwipes = updatedHistory.length;
    const correctMyths = updatedHistory.filter(h => h.action === 'answered_correct').length;

    // Categories covered
    const categoriesCovered = new Set<string>();
    updatedPresent.forEach(c => {
      if (c.type === 'symptom') categoriesCovered.add(c.category);
    });

    // Update Badges
    setBadges(prevBadges =>
      prevBadges.map(b => {
        let current = b.progressCurrent;
        let unlocked = b.isUnlocked;

        if (b.id === 'badge-1') {
          // Self-Advocate Novice (5 swipes)
          current = Math.min(b.progressTarget, totalSwipes);
          if (!unlocked && current >= b.progressTarget) {
            unlocked = true;
            triggerBadgeToast(b.title);
          }
        } else if (b.id === 'badge-2') {
          // The Dot Connector (10 matches)
          current = Math.min(b.progressTarget, presentCount);
          if (!unlocked && current >= b.progressTarget) {
            unlocked = true;
            triggerBadgeToast(b.title);
          }
        } else if (b.id === 'badge-3') {
          // Myth Slayer (3 myths)
          current = Math.min(b.progressTarget, correctMyths);
          if (!unlocked && current >= b.progressTarget) {
            unlocked = true;
            triggerBadgeToast(b.title);
          }
        } else if (b.id === 'badge-4') {
          // Full Spectrum Explorer (5 domains)
          current = Math.min(b.progressTarget, categoriesCovered.size);
          if (!unlocked && current >= b.progressTarget) {
            unlocked = true;
            triggerBadgeToast(b.title);
          }
        }

        return { ...b, progressCurrent: current, isUnlocked: unlocked };
      })
    );

    // Update Toolkits
    setToolkits(prevToolkits =>
      prevToolkits.map(t => {
        const shouldUnlock = presentCount >= t.unlockThreshold;
        return {
          ...t,
          isUnlocked: shouldUnlock
        };
      })
    );
  };

  // Handle a card swipe action
  const handleSwipe = (
    card: SwipeCard,
    action: 'present' | 'absent' | 'answered_correct' | 'answered_incorrect'
  ) => {
    // If viewing archive, return to live session
    if (viewingHistoricalItem) {
      setViewingHistoricalItem(null);
    }
    setIsCurrentSaved(false);

    const newLog: SwipeLog = {
      cardId: card.id,
      cardType: card.type,
      action,
      timestamp: Date.now(),
      card
    };

    const newHistory = [...swipeHistory, newLog];
    setSwipeHistory(newHistory);

    let newPresent = [...symptomsPresent];
    let newAbsent = [...symptomsAbsent];

    if (action === 'present' || action === 'answered_correct') {
      if (!newPresent.some(c => c.id === card.id)) {
        newPresent.push(card);
        setSymptomsPresent(newPresent);
      }
    } else {
      if (!newAbsent.some(c => c.id === card.id)) {
        newAbsent.push(card);
        setSymptomsAbsent(newAbsent);
      }
    }

    evaluateGamificationProgress(newPresent, newHistory);

    // If threshold reached and no assessment generated yet, trigger background assessment
    if (newPresent.length >= MATCH_THRESHOLD && !assessment && !isAssessing) {
      fetchAssessment(newPresent, newAbsent);
    }
  };

  // Undo last swipe
  const handleUndo = () => {
    if (swipeHistory.length === 0) return;

    const lastLog = swipeHistory[swipeHistory.length - 1];
    const newHistory = swipeHistory.slice(0, -1);
    setSwipeHistory(newHistory);

    const newPresent = symptomsPresent.filter(c => c.id !== lastLog.cardId);
    const newAbsent = symptomsAbsent.filter(c => c.id !== lastLog.cardId);

    setSymptomsPresent(newPresent);
    setSymptomsAbsent(newAbsent);
    setIsCurrentSaved(false);
    evaluateGamificationProgress(newPresent, newHistory);
  };

  // Fetch assessment from Gemini with user profile personalization
  const fetchAssessment = async (
    presentList: SwipeCard[] = symptomsPresent,
    absentList: SwipeCard[] = symptomsAbsent
  ) => {
    if (presentList.length === 0) return;
    setIsAssessing(true);

    try {
      const presentTitles = presentList.map(c => 
        c.type === 'symptom' ? `${c.title}: "${c.prompt}"` : `Myth Confirmed: ${c.statement}`
      );
      const absentTitles = absentList.map(c => 
        c.type === 'symptom' ? c.title : c.statement
      );

      const res = await fetch('/api/assess-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symptomsPresent: presentTitles,
          symptomsAbsent: absentTitles,
          userContext: {
            userName: currentUser?.name || 'Sarah',
            age: currentUser?.age || 46,
            ageGroup: currentUser?.ageGroup || '45-49',
            cycleStatus: currentUser?.cycleStatus || 'skipped_cycles',
            hrtStatus: currentUser?.hrtStatus || 'none',
            primaryGoals: currentUser?.primaryGoals || [],
            medicalNotes: currentUser?.medicalNotes || ''
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.assessment) {
          setAssessment(data.assessment);
          setIsCurrentSaved(false);
          // Unlock Empowered Patient Badge
          setBadges(prev => prev.map(b => b.id === 'badge-5' ? { ...b, isUnlocked: true, progressCurrent: 1 } : b));
        }
      }
    } catch (err) {
      console.error("Failed to load assessment:", err);
    } finally {
      setIsAssessing(false);
    }
  };

  // Trigger dot connection profile view
  const handleConnectTheDots = () => {
    setViewingHistoricalItem(null);
    setActiveView('dots');
    if (!assessment) {
      fetchAssessment();
    }
  };

  // Save current live assessment to Dot Connection History
  const handleSaveCurrentToHistory = () => {
    if (!assessment) return;

    const now = new Date();
    const dateStr = `${now.getDate()}. ${now.toLocaleString('de-DE', { month: 'long' })} ${now.getFullYear()} (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;

    const matchedTitles = symptomsPresent.map(c => c.type === 'symptom' ? c.title : c.statement);
    
    const newItem: DotConnectionHistoryItem = {
      id: `history-${Date.now()}`,
      date: dateStr,
      timestamp: Date.now(),
      userSnapshot: {
        name: currentUser?.name || 'Gast',
        age: currentUser?.age || 46,
        cycleStatus: currentUser?.cycleStatus || 'skipped_cycles'
      },
      symptomsMatchedCount: symptomsPresent.length,
      symptomsMatchedTitles: matchedTitles,
      symptomsAbsentCount: symptomsAbsent.length,
      mythsAnsweredCount: swipeHistory.filter(h => h.cardType === 'myth_buster').length,
      stageSummary: assessment.probabilitySummary.stage,
      confidence: assessment.probabilitySummary.confidence,
      dominantCategory: assessment.categoryGroupings[0]?.category || 'Neuroendokrin',
      headline: assessment.headline,
      assessment,
      userNote: `EVE Live-Analyse mit ${symptomsPresent.length} bestätigten Symptom-Dots.`,
      symptomsPresentCards: [...symptomsPresent],
      symptomsAbsentCards: [...symptomsAbsent]
    };

    setConnectionHistory(prev => [newItem, ...prev]);
    setIsCurrentSaved(true);
  };

  // Select item from history to view in Dot Connection Profile
  const handleSelectHistoryItem = (item: DotConnectionHistoryItem) => {
    setViewingHistoricalItem(item);
    setActiveView('dots');
  };

  // Delete item from history
  const handleDeleteHistoryItem = (id: string) => {
    setConnectionHistory(prev => prev.filter(item => item.id !== id));
    if (viewingHistoricalItem?.id === id) {
      setViewingHistoricalItem(null);
    }
  };

  // Update user note on historical item
  const handleUpdateHistoryNote = (id: string, note: string) => {
    setConnectionHistory(prev =>
      prev.map(item => item.id === id ? { ...item, userNote: note } : item)
    );
  };

  // Generate 5 dynamic cards using Gemini
  const handleGenerateMoreCards = async () => {
    setIsGeneratingCards(true);
    try {
      const res = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          count: 5,
          focusArea: 'Surprising, everyday perimenopause moments and myths'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.cards) && data.cards.length > 0) {
          setCards(prev => [...prev, ...data.cards]);
        }
      }
    } catch (err) {
      console.error("Failed to generate cards:", err);
    } finally {
      setIsGeneratingCards(false);
    }
  };

  // Reset demo
  const handleResetDemo = () => {
    setCards(INITIAL_CARDS);
    setSwipeHistory([]);
    setSymptomsPresent([]);
    setSymptomsAbsent([]);
    setBadges(INITIAL_BADGES);
    setToolkits(INITIAL_TOOLKITS);
    setAssessment(null);
    setViewingHistoricalItem(null);
    setIsCurrentSaved(false);
    setActiveView('swipe');
  };

  const unlockedToolkitsCount = toolkits.filter(t => t.isUnlocked).length;
  const unlockedBadgesCount = badges.filter(b => b.isUnlocked).length;

  // View content renderer
  const renderMainContent = () => {
    if (activeView === 'dots') {
      const displayAssessment = viewingHistoricalItem ? viewingHistoricalItem.assessment : assessment;
      const displayPresent = viewingHistoricalItem && viewingHistoricalItem.symptomsPresentCards 
        ? viewingHistoricalItem.symptomsPresentCards 
        : symptomsPresent;
      const displayAbsent = viewingHistoricalItem && viewingHistoricalItem.symptomsAbsentCards 
        ? viewingHistoricalItem.symptomsAbsentCards 
        : symptomsAbsent;

      return (
        <DotConnectionProfile
          assessment={displayAssessment}
          symptomsPresent={displayPresent}
          symptomsAbsent={displayAbsent}
          onBackToSwiping={() => {
            setViewingHistoricalItem(null);
            setActiveView('swipe');
          }}
          onOpenToolkits={() => setIsGamificationDrawerOpen(true)}
          isLoading={isAssessing}
          onSaveToHistory={!viewingHistoricalItem ? handleSaveCurrentToHistory : undefined}
          isSavedToHistory={isCurrentSaved}
          archivedDate={viewingHistoricalItem?.date}
          onExitArchivedView={viewingHistoricalItem ? () => setViewingHistoricalItem(null) : undefined}
        />
      );
    }

    if (activeView === 'toolkits') {
      return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAE4D9] pb-4">
            <div>
              <h2 className="font-serif-heading font-black text-2xl text-[#1E1B18]">
                EVE Lifestyle Toolkits & Badges
              </h2>
              <p className="text-xs text-[#6B655E]">
                Evidence for every woman: Wissenschaftlich fundierte Sofort-Protokolle, freigeschaltet durch deine Symptom-Matches.
              </p>
            </div>
            <button
              onClick={() => setActiveView('swipe')}
              className="px-3.5 py-1.5 bg-[#8B5CF6] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Weiter Swipen
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {toolkits.map(t => (
              <div
                key={t.id}
                className={`p-5 rounded-2xl border transition-all ${
                  t.isUnlocked ? 'bg-white border-[#8B5CF6]/40 shadow-xs' : 'bg-[#FAF8F5] border-[#E8E1D5] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 text-[#7C3AED]">
                    {t.badge}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    t.isUnlocked ? 'bg-emerald-50 text-emerald-800' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {t.isUnlocked ? 'Freigeschaltet ✓' : `${t.unlockThreshold} Matches nötig`}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#1E1B18] mb-1">{t.title}</h3>
                <p className="text-xs text-[#6B655E] mb-3">{t.tagline}</p>
                <div className="space-y-2">
                  {t.protocolSteps.map((step, sIdx) => (
                    <div key={sIdx} className="bg-[#FAF7F2] p-2.5 rounded-xl text-xs text-[#3E3933]">
                      <div className="font-bold text-[11px] text-[#8B5CF6]">{step.timing}</div>
                      <div className="font-semibold text-xs text-[#1E1B18]">{step.action}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{step.scientificReason}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Default: Swipe Deck View
    return (
      <div className="w-full flex flex-col items-center">
        <SwipeDeck
          cards={cards}
          onSwipe={handleSwipe}
          onUndo={handleUndo}
          canUndo={swipeHistory.length > 0}
          symptomsPresentCount={symptomsPresent.length}
          symptomsAbsentCount={symptomsAbsent.length}
          matchThreshold={MATCH_THRESHOLD}
          onConnectTheDots={handleConnectTheDots}
          onGenerateMoreCards={handleGenerateMoreCards}
          isGeneratingCards={isGeneratingCards}
          latestUnlockedBadge={latestUnlockedBadge}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] flex flex-col selection:bg-[#8B5CF6]/20">
      {/* Top Universal Navigation Header */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        matchesCount={symptomsPresent.length}
        matchThreshold={MATCH_THRESHOLD}
        unlockedToolkitsCount={unlockedToolkitsCount}
        unlockedBadgesCount={unlockedBadgesCount}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onOpenPitchGuide={() => setIsPitchGuideOpen(true)}
        currentUser={currentUser}
        savedHistoryCount={connectionHistory.length}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center">
        {isMobileSimulator ? (
          <MobileSimulatorFrame
            activeView={activeView}
            onNavigate={setActiveView}
            matchesCount={symptomsPresent.length}
            unlockedToolkitsCount={unlockedToolkitsCount}
            onOpenHistory={() => setIsHistoryModalOpen(true)}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          >
            {renderMainContent()}
          </MobileSimulatorFrame>
        ) : (
          <div className="w-full">
            {renderMainContent()}
          </div>
        )}
      </main>

      {/* Floating Bottom Quick Bar for Pitch / Reset */}
      <footer className="border-t border-[#EAE4D9] bg-white/70 backdrop-blur-xs py-3 px-4 text-xs text-[#706A62]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span>AI Women Hackathon Hamburg</span>
            <span>•</span>
            <span className="text-[#8B5CF6] font-bold">EVE — Evidence for every woman</span>
            <span>•</span>
            <span>Powered by Gemini 3.8 Flash & Google Cloud Run</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="text-[11px] font-bold text-[#8B5CF6] hover:underline cursor-pointer flex items-center gap-1"
            >
              <History className="w-3.5 h-3.5" />
              <span>Verlauf ({connectionHistory.length})</span>
            </button>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-[11px] font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profil</span>
            </button>
            <button
              onClick={handleResetDemo}
              className="text-[11px] font-bold text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Demo zurücksetzen</span>
            </button>
            <button
              onClick={() => setIsPitchGuideOpen(true)}
              className="text-[11px] font-bold text-[#8B5CF6] hover:underline cursor-pointer"
            >
              Pitch-Guide
            </button>
          </div>
        </div>
      </footer>

      {/* User Profile & Auth Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={updated => setCurrentUser(updated)}
        onSwitchUser={profile => setCurrentUser(profile)}
        onLogout={() => setCurrentUser(null)}
        savedConnectionsCount={connectionHistory.length}
      />

      {/* Dot Connection Longitudinal History Modal */}
      <ConnectionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={connectionHistory}
        onSelectHistoryItem={handleSelectHistoryItem}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onUpdateNote={handleUpdateHistoryNote}
        canSaveCurrentSession={Boolean(assessment && !isCurrentSaved)}
        onSaveCurrentSession={handleSaveCurrentToHistory}
        currentAssessmentAvailable={Boolean(assessment)}
      />

      {/* Toolkits & Badges Modal Drawer */}
      <GamificationDrawer
        isOpen={isGamificationDrawerOpen}
        onClose={() => setIsGamificationDrawerOpen(false)}
        badges={badges}
        toolkits={toolkits}
        symptomsPresentCount={symptomsPresent.length}
      />

      {/* Pitch Guide Modal */}
      <PitchGuideModal
        isOpen={isPitchGuideOpen}
        onClose={() => setIsPitchGuideOpen(false)}
      />
    </div>
  );
}
