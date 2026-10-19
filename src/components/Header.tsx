import React from 'react';
import { ShoppingBag, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  totalItemsInQuote: number;
  onOpenQuoteDrawer: () => void;
  onOpenSampleModal: () => void;
  onOpenAdminPanel?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalItemsInQuote,
  onOpenQuoteDrawer,
  onOpenAdminPanel,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-8 h-16 sm:h-20">
          {/* Zone 1: Single text element brand wordmark */}
          <a
            href="#"
            className="flex items-center gap-1 text-xl sm:text-2xl font-bold tracking-widest text-[#142C20] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity font-serif-heading"
          >
            NUTRO<span className="text-[#C64E1D] text-lg sm:text-xl">✿</span>SA
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-stone-700">
            <a
              href="#hampers"
              className="hover:text-[#142C20] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Festive Hampers
            </a>
            <a
              href="#budget-calculator"
              className="hover:text-[#142C20] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Budget Splitter
            </a>
            <a
              href="#personalized-concierge"
              className="hover:text-[#142C20] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 text-[#8C6D38] font-semibold"
            >
              Gift Concierge
            </a>
            <a
              href="#bespoke-builder"
              className="hover:text-[#142C20] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Curate Bespoke
            </a>
            <a
              href="#story"
              className="hover:text-[#142C20] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Brand Story
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-[#142C20] bg-amber-50/90 hover:bg-amber-100/90 border border-amber-300/80 rounded-lg shadow-2xs transition-all whitespace-nowrap shrink-0 cursor-pointer"
                title="Bakery Operations & Admin Desk: Update Hamper Photos & Prices"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Admin Desk</span>
              </button>
            )}

            <button
              onClick={onOpenQuoteDrawer}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs uppercase tracking-wider font-semibold text-stone-900 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] hover:brightness-105 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-stone-900" />
              <span>
                <span className="hidden sm:inline">Bulk </span>Proposal
              </span>
              {totalItemsInQuote > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1 bg-[#142C20] text-amber-300 rounded-full text-[11px] font-bold tabular-nums">
                  {totalItemsInQuote}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
