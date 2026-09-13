import React from 'react';
import { Wifi, Battery, Sparkles, Layers, Award, History, User, BookOpen } from 'lucide-react';
import { EveLogo } from './EveLogo';

interface MobileSimulatorFrameProps {
  children: React.ReactNode;
  activeView: 'swipe' | 'checklist' | 'dots' | 'toolkits';
  onNavigate: (view: 'swipe' | 'checklist' | 'dots' | 'toolkits') => void;
  matchesCount: number;
  unlockedToolkitsCount: number;
  onOpenHistory?: () => void;
  onOpenProfile?: () => void;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  children,
  activeView,
  onNavigate,
  matchesCount,
  unlockedToolkitsCount,
  onOpenHistory,
  onOpenProfile
}) => {
  return (
    <div className="flex justify-center items-center py-6 px-2">
      {/* iPhone 16 Pro Outer Chassis */}
      <div className="relative w-[390px] h-[780px] bg-[#161616] rounded-[52px] p-3.5 shadow-2xl ring-1 ring-zinc-800/80 shadow-black/50 flex flex-col">
        {/* Dynamic Island Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#E76F61]" />
          </div>
        </div>

        {/* Screen Bezel / Container */}
        <div className="relative w-full h-full bg-[#F6F0E9] rounded-[42px] overflow-hidden flex flex-col border border-[#DDD4C7]">
          {/* Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-[#2B1720] z-30 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3 h-3 text-[#2B1720]" />
              <Battery className="w-3.5 h-3.5 text-[#2B1720]" />
            </div>
          </div>

          {/* Mini EVE In-App Header with EveLogo */}
          <div className="px-4 py-2 border-b border-[#DDD4C7] bg-white/90 backdrop-blur-xs flex items-center justify-between shrink-0">
            <EveLogo size="sm" showSubtitle={false} />

            <div className="flex items-center gap-1.5">
              {onOpenHistory && (
                <button
                  onClick={onOpenHistory}
                  className="p-1 text-[#2B1720] hover:text-[#6D1835] transition-colors cursor-pointer"
                  title="Historie"
                >
                  <History className="w-4 h-4 text-[#6D1835]" />
                </button>
              )}
              {onOpenProfile && (
                <button
                  onClick={onOpenProfile}
                  className="p-1 text-[#2B1720] hover:text-[#6D1835] transition-colors cursor-pointer"
                  title="Profil"
                >
                  <User className="w-4 h-4 text-[#6D1835]" />
                </button>
              )}
            </div>
          </div>

          {/* Screen Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto px-3.5 pt-2 pb-16">
            {children}
          </div>

          {/* Bottom Native Mobile Tab Bar */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-white/95 backdrop-blur-md border-t border-[#DDD4C7] flex items-center justify-around px-2 z-30">
            <button
              onClick={() => onNavigate('swipe')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'swipe' ? 'text-[#2B1720]' : 'text-[#161616]/50 hover:text-[#2B1720]'
              }`}
            >
              <Layers className={`w-4 h-4 ${activeView === 'swipe' ? 'text-[#E76F61]' : 'text-zinc-400'}`} />
              <span>Swiper</span>
            </button>

            <button
              onClick={() => onNavigate('checklist')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'checklist' ? 'text-[#2B1720]' : 'text-[#161616]/50 hover:text-[#2B1720]'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeView === 'checklist' ? 'text-[#E76F61]' : 'text-zinc-400'}`} />
              <span>60 Check</span>
            </button>

            <button
              onClick={() => onNavigate('dots')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer relative ${
                activeView === 'dots' ? 'text-[#2B1720]' : 'text-[#161616]/50 hover:text-[#2B1720]'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeView === 'dots' ? 'text-[#E76F61]' : 'text-zinc-400'}`} />
              <span>Dots ({matchesCount})</span>
              {matchesCount >= 10 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E76F61] animate-ping" />
              )}
            </button>

            <button
              onClick={() => onNavigate('toolkits')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer relative ${
                activeView === 'toolkits' ? 'text-[#2B1720]' : 'text-[#161616]/50 hover:text-[#2B1720]'
              }`}
            >
              <Award className={`w-4 h-4 ${activeView === 'toolkits' ? 'text-[#E76F61]' : 'text-zinc-400'}`} />
              <span>Toolkits</span>
            </button>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-900 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
