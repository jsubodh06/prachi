import React, { useState } from 'react';
import { Flame, Sparkles, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/festiveAudio';

interface DiyaLightingBarProps {
  onUnlockPerk?: (perkName: string) => void;
}

export const DiyaLightingBar: React.FC<DiyaLightingBarProps> = ({ onUnlockPerk }) => {
  const [litDiyas, setLitDiyas] = useState<boolean[]>([true, false, false, false, false]);
  const [isAllLit, setIsAllLit] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(festiveAudio.isMuted());

  const litCount = litDiyas.filter(Boolean).length;

  const handleLightDiya = (index: number) => {
    if (litDiyas[index]) return; // already lit

    // Audio bell chime
    festiveAudio.playDiyaLight(index);

    const newLit = [...litDiyas];
    newLit[index] = true;
    setLitDiyas(newLit);

    // Fire minor sparkle confetti from click
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.15, x: 0.2 + index * 0.15 }
    });

    if (newLit.every(Boolean)) {
      setIsAllLit(true);
      festiveAudio.playFanfare();
      if (onUnlockPerk) {
        onUnlockPerk('Diwali Illumination Blessing: Complimentary Custom Branded Sleeves & Wax-Seal Note Cards');
      }

      // Grand celebration confetti
      setTimeout(() => {
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.25 }
        });
      }, 200);
    }
  };

  const handleReset = () => {
    setLitDiyas([false, false, false, false, false]);
    setIsAllLit(false);
  };

  const handleToggleAudio = () => {
    const nextMuted = festiveAudio.toggleMute();
    setIsAudioMuted(!nextMuted);
    if (nextMuted) {
      festiveAudio.playClink();
    }
  };

  const diyaNames = [
    'Auspicious Beginnings',
    'Health & Wellness',
    'Sweet Delights',
    'Abundance & Joy',
    'Prosperity 2026'
  ];

  return (
    <div className="relative bg-gradient-to-r from-[#0C1E14] via-[#143224] to-[#0C1E14] text-stone-100 py-2.5 px-4 border-b border-[#2A523C] shadow-inner select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left Side: Blessing & Count */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg animate-pulse">🪔</span>
            <div>
              <div className="text-xs font-semibold tracking-wider text-amber-200 uppercase flex items-center gap-1.5">
                <span>Light the Diwali Diyas</span>
                <span className="text-stone-400">·</span>
                <span className="text-emerald-400 font-bold tabular-nums">
                  {litCount}/5 Lit
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-light">
                {isAllLit
                  ? '✨ All 5 diyas lit! Auspicious Diwali 2026 blessings unlocked.'
                  : 'Tap each diya to illuminate & unlock your corporate perk.'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: The 5 Interactive Diyas */}
        <div className="flex items-center gap-2 sm:gap-4">
          {litDiyas.map((isLit, idx) => (
            <button
              key={idx}
              onClick={() => handleLightDiya(idx)}
              className={`group relative flex flex-col items-center p-1.5 rounded-xl transition-all cursor-pointer ${
                isLit
                  ? 'bg-amber-400/15 border border-amber-400/50 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-black/30 border border-stone-700/50 hover:border-amber-400/60 hover:bg-stone-800/40 hover:scale-105'
              }`}
              title={isLit ? `${diyaNames[idx]} (Illuminated)` : `Click to light: ${diyaNames[idx]}`}
            >
              {/* Flame Glow Animation */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                {isLit ? (
                  <div className="relative">
                    {/* Pulsing halo */}
                    <div className="absolute -inset-1 rounded-full bg-amber-400/40 blur-xs animate-ping opacity-60" />
                    {/* Flame icon */}
                    <Flame className="w-5 h-5 text-amber-400 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-bounce duration-1000" />
                  </div>
                ) : (
                  <Flame className="w-4 h-4 text-stone-500 group-hover:text-amber-300/60 transition-colors" />
                )}
              </div>

              {/* Clay Diya Base */}
              <div
                className={`w-5 h-2 rounded-b-full transition-colors mt-0.5 ${
                  isLit ? 'bg-amber-600 border border-amber-400' : 'bg-stone-600'
                }`}
              />

              <span className="text-[9px] text-stone-300 mt-0.5 hidden sm:block whitespace-nowrap">
                {isLit ? '✓ Lit' : 'Light'}
              </span>
            </button>
          ))}
        </div>

        {/* Right Side: Unlocked Perk Banner & Audio Toggle */}
        <div className="flex items-center gap-3">
          {isAllLit ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 px-3 py-1 rounded-lg text-xs font-bold shadow-md animate-in fade-in">
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>Custom Logo Sleeves Unlocked!</span>
              </div>
              <button
                onClick={handleReset}
                className="p-1 rounded text-stone-400 hover:text-stone-200 cursor-pointer"
                title="Relight diyas"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-[11px] text-stone-400 text-right hidden lg:block">
              Light {5 - litCount} more to unlock VIP corporate sleeve tags
            </div>
          )}

          {/* Festive Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer flex items-center gap-1 ${
              isAudioMuted
                ? 'border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500'
                : 'border-amber-400/50 bg-amber-400/10 text-amber-300'
            }`}
            title={isAudioMuted ? 'Turn Festive Sounds ON' : 'Mute Festive Sounds'}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="text-[10px] hidden sm:inline">
              {isAudioMuted ? 'Muted' : 'Audio'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
