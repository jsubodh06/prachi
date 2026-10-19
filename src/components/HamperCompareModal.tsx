import React, { useState } from 'react';
import { CATALOGUE_ITEMS } from '../data/catalogue';
import { useCatalogue } from '../utils/catalogueStore';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import { X, Check, Plus, ShoppingBag, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HamperCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
  initialHamperId?: string | null;
}

export const HamperCompareModal: React.FC<HamperCompareModalProps> = ({
  isOpen,
  onClose,
  onAddToQuote,
  initialHamperId
}) => {
  const { hampers } = useCatalogue();
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (initialHamperId) {
      const second = hampers.find((h) => h.id !== initialHamperId)?.id || (hampers[1] || CATALOGUE_ITEMS[1]).id;
      return [initialHamperId, second];
    }
    return [
      (hampers[0] || CATALOGUE_ITEMS[0]).id,
      (hampers[1] || CATALOGUE_ITEMS[1]).id,
      (hampers[4] || CATALOGUE_ITEMS[4]).id
    ];
  });

  if (!isOpen) return null;

  const toggleHamper = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((x) => x !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace last
        setSelectedIds([selectedIds[0], selectedIds[1], id]);
      }
    }
  };

  const comparedHampers = selectedIds
    .map((id) => hampers.find((h) => h.id === id))
    .filter(Boolean) as HamperItem[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C6AF] overflow-hidden my-4 sm:my-6 max-h-[94vh] sm:max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#142C20] text-stone-100 flex items-center justify-between border-b border-[#2C523F]">
          <div>
            <div className="text-xs text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-300" />
              Side-by-Side Specification Matrix
            </div>
            <h2 className="text-lg sm:text-2xl font-normal font-serif-heading text-stone-50 mt-0.5">
              Compare Festive Hampers
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hamper Selector Bar */}
        <div className="p-3 sm:p-4 bg-white border-b border-[#E8DEC8] flex flex-nowrap sm:flex-wrap items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-stone-700 shrink-0">Select 2 to 3 Hampers:</span>
          {hampers.map((h) => {
            const isSelected = selectedIds.includes(h.id);
            return (
              <button
                key={h.id}
                onClick={() => toggleHamper(h.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#142C20] text-amber-300 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {isSelected && '✓ '}
                {h.title}
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {comparedHampers.map((hamper) => (
              <div
                key={hamper.id}
                className="bg-white rounded-2xl border border-[#E5D7C2] p-5 flex flex-col justify-between space-y-5 shadow-sm hover:border-[#142C20] transition-colors"
              >
                <div className="space-y-4">
                  {/* Image */}
                  <div className="rounded-xl overflow-hidden border border-stone-200">
                    <HamperVisualShowcase hamper={hamper} size="sm" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8C6D38]">
                      {hamper.category}
                    </span>
                    <h3 className="text-base font-semibold text-stone-900 font-serif-heading mt-0.5 leading-snug">
                      {hamper.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {hamper.subtitle}
                    </p>
                  </div>

                  {/* Packaging */}
                  <div className="text-xs space-y-1 pt-2 border-t border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                      Packaging Style:
                    </span>
                    <p className="text-stone-800 text-[11px] leading-snug">
                      {hamper.packagingType}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="text-xs space-y-1 pt-2 border-t border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                      Key Highlights ({hamper.contents.length} Items):
                    </span>
                    <ul className="space-y-1 text-[11px] text-stone-700">
                      {hamper.contents.slice(0, 4).map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500">✦</span>
                          <span className="line-clamp-1">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dietary Perks */}
                  <div className="text-xs space-y-1 pt-2 border-t border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                      Dietary & Craft:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {hamper.dietaryHighlights.slice(0, 3).map((d, i) => (
                        <span
                          key={i}
                          className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-medium"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tier Rates */}
                  <div className="text-xs space-y-1 pt-2 border-t border-stone-100">
                    <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                      Bulk Price Slabs (Per Box):
                    </span>
                    <div className="grid grid-cols-2 gap-1 text-[11px] tabular-nums text-stone-700 bg-stone-50 p-2 rounded-lg">
                      {hamper.priceTiers.slice(0, 4).map((t, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{t.label}:</span>
                          <strong className="text-stone-900">₹{t.pricePerUnit}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Add to proposal button */}
                <div className="pt-3 border-t border-stone-100">
                  <button
                    onClick={() => {
                      onAddToQuote(hamper, 30);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-[#142C20] hover:bg-[#1A382A] text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add 30 to Proposal</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
