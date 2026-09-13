import React from 'react';
import { Wifi, Battery, Sparkles, Layers, Award, History, User } from 'lucide-react';

interface MobileSimulatorFrameProps {
  children: React.ReactNode;
  activeView: 'swipe' | 'dots' | 'toolkits';
  onNavigate: (view: 'swipe' | 'dots' | 'toolkits') => void;
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
      <div className="relative w-[390px] h-[780px] bg-[#1C1B1F] rounded-[52px] p-3.5 shadow-2xl ring-1 ring-zinc-700/50 shadow-black/40 flex flex-col">
        {/* Dynamic Island Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]" />
          </div>
        </div>

        {/* Screen Bezel / Container */}
        <div className="relative w-full h-full bg-[#FAF8F5] rounded-[42px] overflow-hidden flex flex-col border border-zinc-200">
          {/* Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-semibold text-[#1E1B18] z-30 shrink-0">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mini EVE In-App Header */}
          <div className="px-4 py-2 border-b border-[#ECE5D9] bg-white/80 backdrop-blur-xs flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] text-white flex items-center justify-center text-xs font-black">
                E
              </div>
              <span className="font-serif-heading font-black text-sm text-[#1E1B18]">EVE</span>
            </div>

            <div className="flex items-center gap-1.5">
              {onOpenHistory && (
                <button
                  onClick={onOpenHistory}
                  className="p-1 text-zinc-600 hover:text-[#8B5CF6] transition-colors cursor-pointer"
                  title="Historie"
                >
                  <History className="w-4 h-4" />
                </button>
              )}
              {onOpenProfile && (
                <button
                  onClick={onOpenProfile}
                  className="p-1 text-zinc-600 hover:text-[#8B5CF6] transition-colors cursor-pointer"
                  title="Profil"
                >
                  <User className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Screen Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto px-3.5 pt-2 pb-16">
            {children}
          </div>

          {/* Bottom Native Mobile Tab Bar */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-white/95 backdrop-blur-md border-t border-[#EAE4D9] flex items-center justify-around px-4 z-30">
            <button
              onClick={() => onNavigate('swipe')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer ${
                activeView === 'swipe' ? 'text-[#8B5CF6]' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Swipen</span>
            </button>

            <button
              onClick={() => onNavigate('dots')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer relative ${
                activeView === 'dots' ? 'text-[#8B5CF6]' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Dots ({matchesCount})</span>
              {matchesCount >= 10 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
            </button>

            <button
              onClick={() => onNavigate('toolkits')}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-bold transition-colors cursor-pointer relative ${
                activeView === 'toolkits' ? 'text-[#8B5CF6]' : 'text-zinc-400 hover:text-zinc-600'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Toolkits ({unlockedToolkitsCount})</span>
            </button>
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-900 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
