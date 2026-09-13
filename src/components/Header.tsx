import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Award, 
  Smartphone, 
  Monitor, 
  Presentation,
  History,
  User,
  Heart,
  ChevronDown
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  activeView: 'swipe' | 'dots' | 'toolkits';
  onSelectView: (view: 'swipe' | 'dots' | 'toolkits') => void;
  matchesCount: number;
  matchThreshold: number;
  unlockedToolkitsCount: number;
  unlockedBadgesCount: number;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onOpenPitchGuide: () => void;
  currentUser: UserProfile | null;
  savedHistoryCount: number;
  onOpenProfile: () => void;
  onOpenHistory: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  matchesCount,
  matchThreshold,
  unlockedToolkitsCount,
  unlockedBadgesCount,
  isMobileSimulator,
  onToggleMobileSimulator,
  onOpenPitchGuide,
  currentUser,
  savedHistoryCount,
  onOpenProfile,
  onOpenHistory
}) => {
  const isThresholdMet = matchesCount >= matchThreshold;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & EVE Tagline */}
          <div 
            onClick={() => onSelectView('swipe')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="eve-header-logo"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#EC4899] text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform font-serif-heading font-black">
              E
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading text-xl sm:text-2xl font-black tracking-tight text-[#1E1B18]">
                  EVE
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#7C3AED] tracking-wider uppercase">
                  Evidence
                </span>
              </div>
              <p className="text-[11px] text-[#706A62] font-semibold hidden sm:block tracking-wide">
                Evidence for every woman
              </p>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#EFE9DF] p-1 rounded-2xl border border-[#DDD6C8]">
            <button
              onClick={() => onSelectView('swipe')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'swipe'
                  ? 'bg-white text-[#1E1B18] shadow-xs'
                  : 'text-[#6B655E] hover:text-[#1E1B18]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Symptom Swiper</span>
            </button>

            <button
              onClick={() => onSelectView('dots')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeView === 'dots'
                  ? 'bg-white text-[#1E1B18] shadow-xs'
                  : 'text-[#6B655E] hover:text-[#1E1B18]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
              <span>Dot Profil</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                isThresholdMet 
                  ? 'bg-[#EC4899] text-white animate-pulse' 
                  : 'bg-[#DDD6C8] text-[#4A453E]'
              }`}>
                {matchesCount}
              </span>
            </button>

            <button
              onClick={() => onSelectView('toolkits')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'toolkits'
                  ? 'bg-white text-[#1E1B18] shadow-xs'
                  : 'text-[#6B655E] hover:text-[#1E1B18]'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Toolkits</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded-full">
                {unlockedToolkitsCount + unlockedBadgesCount}
              </span>
            </button>

            {/* History Tab */}
            <button
              onClick={onOpenHistory}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[#6B655E] hover:text-[#1E1B18] hover:bg-white/60"
            >
              <History className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Historie</span>
              <span className="text-[10px] bg-[#8B5CF6]/15 text-[#7C3AED] font-black px-1.5 py-0.2 rounded-full">
                {savedHistoryCount}
              </span>
            </button>
          </nav>

          {/* Right Action Tools: User Profile + History + Simulator + Pitch */}
          <div className="flex items-center gap-2">
            
            {/* History button for mobile / quick access */}
            <button
              onClick={onOpenHistory}
              title="Meine gespeicherten Dot Connections"
              className="p-2 sm:px-3 sm:py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#DCD5C8] text-xs font-bold text-[#1E1B18] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <History className="w-4 h-4 text-[#8B5CF6]" />
              <span className="hidden lg:inline">Historie</span>
              <span className="text-[10px] bg-[#8B5CF6]/15 text-[#7C3AED] font-black px-1.5 py-0.2 rounded-full">
                {savedHistoryCount}
              </span>
            </button>

            {/* User Profile / Log In Button */}
            <button
              onClick={onOpenProfile}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#DCD5C8] text-xs font-bold text-[#1E1B18] rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs group"
              id="eve-user-profile-button"
            >
              {currentUser ? (
                <>
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${currentUser.avatarBg} text-white flex items-center justify-center text-xs font-black`}>
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-[#1E1B18]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-700 hidden sm:inline" />
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="hidden sm:inline">Anmelden</span>
                </>
              )}
            </button>

            {/* Mobile Simulator Frame Toggle */}
            <button
              onClick={onToggleMobileSimulator}
              title={isMobileSimulator ? "Desktop-Ansicht" : "iPhone 16 Pro Vorschau"}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isMobileSimulator
                  ? 'bg-[#1E1B18] text-white border-[#1E1B18]'
                  : 'bg-white text-[#4A453E] border-[#DCD5C8] hover:bg-[#FAF7F2]'
              }`}
            >
              {isMobileSimulator ? (
                <>
                  <Monitor className="w-4 h-4" />
                  <span className="hidden xl:inline">Desktop</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="hidden xl:inline">iPhone</span>
                </>
              )}
            </button>

            {/* Hackathon Pitch Guide */}
            <button
              onClick={onOpenPitchGuide}
              className="p-2 sm:px-3 sm:py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-[#DCD5C8] text-xs font-bold text-[#1E1B18] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Presentation className="w-4 h-4 text-[#8B5CF6]" />
              <span className="hidden xl:inline">Pitch</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
