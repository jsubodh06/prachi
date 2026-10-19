import React from 'react';
import {
  Flame,
  PackageOpen,
  Calculator,
  Sparkles,
  SlidersHorizontal,
  ShoppingBag
} from 'lucide-react';
import { festiveAudio } from '../utils/festiveAudio';

interface FestiveDockProps {
  totalCartUnits: number;
  onOpenQuoteDrawer: () => void;
  onOpenUnboxModal: () => void;
  onOpenCompareModal: () => void;
  onScrollToBudget: () => void;
  onScrollToFortune: () => void;
  onScrollToDiyas: () => void;
}

export const FestiveDock: React.FC<FestiveDockProps> = ({
  totalCartUnits,
  onOpenQuoteDrawer,
  onOpenUnboxModal,
  onOpenCompareModal,
  onScrollToBudget,
  onScrollToFortune,
  onScrollToDiyas
}) => {
  return (
    <aside
      aria-label="Festive Interactive Toolbar"
      className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1rem)] px-1 sm:px-3 pointer-events-none"
    >
      <div className="pointer-events-auto bg-[#142C20]/95 backdrop-blur-md text-stone-100 p-1 sm:p-2 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-none">
        {/* Diyas Trigger */}
        <button
          onClick={() => {
            festiveAudio.playClink();
            onScrollToDiyas();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-colors text-xs font-medium cursor-pointer"
          title="Light sacred Diwali Diyas"
        >
          <span className="text-amber-400 text-sm animate-pulse">🪔</span>
          <span className="hidden md:inline">Light Diyas</span>
        </button>

        <span className="text-stone-600">|</span>

        {/* 3D Unboxing Trigger */}
        <button
          onClick={() => {
            festiveAudio.playUnboxChime();
            onOpenUnboxModal();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-colors text-xs font-medium text-amber-200 cursor-pointer"
          title="Interactive 3D Virtual Unboxing"
        >
          <PackageOpen className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline">Virtual Unbox</span>
        </button>

        {/* Budget Calculator Trigger */}
        <button
          onClick={() => {
            festiveAudio.playClink();
            onScrollToBudget();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-colors text-xs font-medium text-stone-200 cursor-pointer"
          title="Corporate Budget Allocation Calculator"
        >
          <Calculator className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline">Budget Calc</span>
        </button>

        {/* Fortune Card Party Trigger */}
        <button
          onClick={() => {
            festiveAudio.playClink();
            onScrollToFortune();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-colors text-xs font-medium text-amber-300 cursor-pointer"
          title="Diwali Card Draw & Perks"
        >
          <span className="text-xs">🂠</span>
          <span className="hidden md:inline">Fortune Draw</span>
        </button>

        {/* Compare Matrix Trigger */}
        <button
          onClick={() => {
            festiveAudio.playClink();
            onOpenCompareModal();
          }}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-colors text-xs font-medium text-stone-200 cursor-pointer"
          title="Compare Hampers Side-by-Side"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-300" />
          <span className="hidden lg:inline">Compare</span>
        </button>

        <span className="text-stone-600">|</span>

        {/* Bulk Proposal CTA */}
        <button
          onClick={() => {
            festiveAudio.playClink();
            onOpenQuoteDrawer();
          }}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] hover:brightness-105 text-stone-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
          title="Open Bulk Proposal"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-stone-950" />
          <span>Proposal</span>
          {totalCartUnits > 0 && (
            <span className="bg-[#142C20] text-amber-300 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold">
              {totalCartUnits}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
