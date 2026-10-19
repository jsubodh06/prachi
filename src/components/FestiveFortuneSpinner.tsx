import React, { useState } from 'react';
import { Sparkles, Check, Gift, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/festiveAudio';

interface FestiveFortuneSpinnerProps {
  onApplyPerk: (perk: string) => void;
}

interface FortuneCard {
  id: number;
  suit: string;
  rank: string;
  color: string;
  title: string;
  fortune: string;
  perk: string;
}

const CARDS: FortuneCard[] = [
  {
    id: 1,
    suit: '♠',
    rank: 'A',
    color: '#1F2937',
    title: 'The Ace of Abundance',
    fortune: 'An extraordinary quarter of growth, prosperity, and rewarding corporate milestones awaits your organization.',
    perk: 'Complimentary Custom Company Logo Foil Sleeves for All Boxes'
  },
  {
    id: 2,
    suit: '♥',
    rank: 'K',
    color: '#991B1B',
    title: 'The King of Warmth',
    fortune: 'Your thoughtfulness will foster long-lasting trust, goodwill, and loyalty among your esteemed clients and teams.',
    perk: 'Priority Complimentary Sample Tasting Box Dispatched to Your Office'
  },
  {
    id: 3,
    suit: '♣',
    rank: 'Q',
    color: '#166534',
    title: 'The Queen of Delights',
    fortune: 'Every celebration shared with Nutrosa treats creates joyful memories that clients will remember throughout the year.',
    perk: '100% Pan-India Fragile Transit Breakage Insurance Guarantee'
  },
  {
    id: 4,
    suit: '♦',
    rank: 'J',
    color: '#B45309',
    title: 'The Jack of Celebration',
    fortune: 'Festive energy will bring harmony, collaborative enthusiasm, and high spirits across your entire workplace.',
    perk: 'Handcrafted Personalized Wax-Sealed Diwali Message Cards'
  }
];

export const FestiveFortuneSpinner: React.FC<FestiveFortuneSpinnerProps> = ({ onApplyPerk }) => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [claimed, setClaimed] = useState<boolean>(false);

  const handlePickCard = (cardId: number) => {
    setSelectedCardId(cardId);
    setIsRevealed(true);
    festiveAudio.playUnboxChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleClaim = (perk: string) => {
    setClaimed(true);
    onApplyPerk(perk);
    festiveAudio.playFanfare();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  const handleReset = () => {
    setSelectedCardId(null);
    setIsRevealed(false);
    setClaimed(false);
    festiveAudio.playClink();
  };

  const activeCard = CARDS.find((c) => c.id === selectedCardId);

  return (
    <section className="py-16 bg-[#11261B] text-stone-100 border-y border-[#26503B] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#E06A2E] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Diwali Taash Party Tradition
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif-heading text-stone-50">
            Draw Your Golden Diwali Card & Unlock a Corporate Perk
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-lg mx-auto">
            Inspired by our Velvet Card Party Box, choose 1 of the 4 golden cards below to reveal your festive prediction and claim a complimentary gifting bonus.
          </p>
        </div>

        {/* The 4 Cards */}
        {!isRevealed ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {CARDS.map((card) => (
              <button
                key={card.id}
                onClick={() => handlePickCard(card.id)}
                className="group relative h-60 sm:h-72 rounded-2xl p-4 bg-gradient-to-br from-[#1C3E2E] via-[#0E261B] to-[#081710] border-2 border-amber-400/50 hover:border-amber-300 hover:scale-105 transition-all shadow-xl flex flex-col items-center justify-between cursor-pointer select-none"
              >
                {/* Gold Foil Pattern Backing */}
                <div className="w-full flex justify-between text-amber-300 text-xs font-serif font-bold">
                  <span>✤</span>
                  <span>NUTROSA</span>
                  <span>✤</span>
                </div>

                <div className="w-20 h-20 rounded-full border border-amber-400/40 flex items-center justify-center bg-black/30 group-hover:bg-amber-400/10 transition-colors">
                  <span className="text-3xl text-amber-300 group-hover:scale-125 transition-transform duration-300">
                    🂠
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-xs font-serif text-amber-200 tracking-wider">
                    TAP TO REVEAL
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    Festive Card #{card.id}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* REVEALED CARD VIEW */
          activeCard && (
            <div className="max-w-xl mx-auto bg-white text-stone-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-16 rounded-lg bg-stone-900 text-amber-300 border border-amber-400 flex flex-col items-center justify-center font-bold text-lg leading-tight"
                    style={{ color: activeCard.color === '#991B1B' ? '#EF4444' : '#FDE047' }}
                  >
                    <span>{activeCard.rank}</span>
                    <span className="text-sm">{activeCard.suit}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif-heading text-stone-900">
                      {activeCard.title}
                    </h3>
                    <div className="text-xs text-stone-500">
                      Your Diwali 2026 Prediction
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="p-2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  title="Draw another card"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Prediction */}
              <blockquote className="text-sm text-stone-700 italic leading-relaxed border-l-2 border-amber-500 pl-3">
                "{activeCard.fortune}"
              </blockquote>

              {/* Unlocked Corporate Perk */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-800 flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-emerald-700" />
                  Your Unlocked Corporate Gifting Bonus:
                </span>
                <p className="text-sm font-bold text-emerald-950">
                  {activeCard.perk}
                </p>
                <p className="text-[11px] text-emerald-800/80">
                  Automatically applied upon quote confirmation for orders of 30+ units.
                </p>
              </div>

              {/* Claim Action */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Draw Another Card
                </button>

                <button
                  onClick={() => handleClaim(activeCard.perk)}
                  disabled={claimed}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    claimed
                      ? 'bg-emerald-800 text-white cursor-default'
                      : 'bg-[#142C20] hover:bg-[#1A382A] text-amber-300 shadow-md'
                  }`}
                >
                  {claimed ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Bonus Claimed & Added to Proposal!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Claim Bonus for Proposal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};
