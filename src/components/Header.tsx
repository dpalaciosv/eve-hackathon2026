import React from 'react';
import { 
  Sparkles, 
  Layers, 
  Award, 
  Smartphone, 
  Monitor, 
  Info,
  History,
  User,
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { UserProfile } from '../types';
import { EveLogo } from './EveLogo';

interface HeaderProps {
  activeView: 'swipe' | 'checklist' | 'dots' | 'toolkits';
  onSelectView: (view: 'swipe' | 'checklist' | 'dots' | 'toolkits') => void;
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
    <header className="sticky top-0 z-40 bg-[#F6F0E9]/95 backdrop-blur-md border-b border-[#E5DDD2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & EVE Tagline (Open Sans Light for Logo) */}
          <div 
            onClick={() => onSelectView('swipe')}
            className="cursor-pointer group select-none py-1"
            id="eve-header-logo"
          >
            <EveLogo size="md" showSubtitle={true} />
          </div>

          {/* Navigation Pill Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#EAE2D6] p-1 rounded-2xl border border-[#DDD4C7]">
            <button
              onClick={() => onSelectView('swipe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'swipe'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'text-[#161616]/75 hover:text-[#2B1720]'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${activeView === 'swipe' ? 'text-[#E76F61]' : 'text-[#6D1835]'}`} />
              <span>Symptom Swiper</span>
            </button>

            <button
              onClick={() => onSelectView('checklist')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'checklist'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'text-[#161616]/75 hover:text-[#2B1720]'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 ${activeView === 'checklist' ? 'text-[#E76F61]' : 'text-[#6D1835]'}`} />
              <span>60 Symptome</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-[#E76F61]/25 text-[#6D1835]">
                60
              </span>
            </button>

            <button
              onClick={() => onSelectView('dots')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 relative ${
                activeView === 'dots'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'text-[#161616]/75 hover:text-[#2B1720]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeView === 'dots' ? 'text-[#E76F61]' : 'text-[#6D1835]'}`} />
              <span>Dot Profil</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isThresholdMet 
                  ? 'bg-[#E76F61] text-[#2B1720] animate-pulse' 
                  : activeView === 'dots' ? 'bg-[#6D1835] text-white' : 'bg-[#DDD4C7] text-[#161616]'
              }`}>
                {matchesCount}
              </span>
            </button>

            <button
              onClick={() => onSelectView('toolkits')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'toolkits'
                  ? 'bg-[#2B1720] text-white shadow-xs'
                  : 'text-[#161616]/75 hover:text-[#2B1720]'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${activeView === 'toolkits' ? 'text-[#E76F61]' : 'text-[#6D1835]'}`} />
              <span>Toolkits</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                activeView === 'toolkits' ? 'bg-[#6D1835] text-white' : 'bg-[#E76F61]/25 text-[#6D1835]'
              }`}>
                {unlockedToolkitsCount + unlockedBadgesCount}
              </span>
            </button>

            {/* History Tab */}
            <button
              onClick={onOpenHistory}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 text-[#161616]/75 hover:text-[#2B1720] hover:bg-white/60"
            >
              <History className="w-3.5 h-3.5 text-[#6D1835]" />
              <span>Historie</span>
              <span className="text-[10px] bg-[#6D1835]/15 text-[#6D1835] font-bold px-1.5 py-0.2 rounded-full">
                {savedHistoryCount}
              </span>
            </button>
          </nav>

          {/* Right Action Tools: User Profile + History + Simulator + Pitch */}
          <div className="flex items-center gap-2">
            
            {/* History button for quick access */}
            <button
              onClick={onOpenHistory}
              title="Meine gespeicherten Dot Connections"
              className="p-2 sm:px-3 sm:py-1.5 bg-white hover:bg-[#FAF6F1] border border-[#DDD4C7] text-xs font-bold text-[#2B1720] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <History className="w-4 h-4 text-[#6D1835]" />
              <span className="hidden lg:inline">Historie</span>
              <span className="text-[10px] bg-[#6D1835]/15 text-[#6D1835] font-bold px-1.5 py-0.2 rounded-full">
                {savedHistoryCount}
              </span>
            </button>

            {/* User Profile / Log In Button */}
            <button
              onClick={onOpenProfile}
              className="p-1.5 sm:px-3 sm:py-1.5 bg-white hover:bg-[#FAF6F1] border border-[#DDD4C7] text-xs font-bold text-[#2B1720] rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs group"
              id="eve-user-profile-button"
            >
              {currentUser ? (
                <>
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6D1835] to-[#2B1720] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold text-[#2B1720]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#2B1720]/50 group-hover:text-[#2B1720] hidden sm:inline" />
                </>
              ) : (
                <>
                  <User className="w-4 h-4 text-[#6D1835]" />
                  <span className="hidden sm:inline">Anmelden</span>
                </>
              )}
            </button>

            {/* Mobile Simulator Frame Toggle */}
            <button
              onClick={onToggleMobileSimulator}
              title={isMobileSimulator ? "Desktop-Ansicht" : "Smartphone-Vorschau"}
              className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                isMobileSimulator
                  ? 'bg-[#2B1720] text-white border-[#2B1720]'
                  : 'bg-white text-[#2B1720] border-[#DDD4C7] hover:bg-[#FAF6F1]'
              }`}
            >
              {isMobileSimulator ? (
                <>
                  <Monitor className="w-4 h-4 text-[#E76F61]" />
                  <span className="hidden xl:inline">Desktop</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-[#6D1835]" />
                  <span className="hidden xl:inline">Mobile</span>
                </>
              )}
            </button>

            {/* Über EVE Info Modal */}
            <button
              onClick={onOpenPitchGuide}
              title="Über EVE & Funktionsweise"
              className="p-2 sm:px-3 sm:py-1.5 bg-[#FAF6F1] hover:bg-[#EAE2D6] border border-[#DDD4C7] text-xs font-bold text-[#2B1720] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Info className="w-4 h-4 text-[#6D1835]" />
              <span className="hidden xl:inline">Über EVE</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
