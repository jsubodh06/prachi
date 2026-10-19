import React, { useState, useRef, useEffect } from 'react';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import { Check, Plus, Eye, Sparkles, PackageOpen, SlidersHorizontal, Camera } from 'lucide-react';
import { festiveAudio } from '../utils/festiveAudio';

interface ProductCardProps {
  hamper: HamperItem;
  onSelectHamper: (hamper: HamperItem) => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
  onUnboxHamper?: (hamper: HamperItem) => void;
  onCompareHamper?: (hamper: HamperItem) => void;
  onEditHamper?: (hamper: HamperItem) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  hamper,
  onSelectHamper,
  onAddToQuote,
  onUnboxHamper,
  onCompareHamper,
  onEditHamper,
  index
}) => {
  const [selectedQty, setSelectedQty] = useState<number>(30); // Default to a standard corporate bulk tier
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // If IntersectionObserver is unavailable or user prefers reduced motion, reveal immediately
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const currentEl = cardRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
      observer.disconnect();
    };
  }, []);

  // Calculate unit price based on selectedQty
  const currentTier =
    hamper.priceTiers.find(
      (tier) =>
        selectedQty >= tier.minQty &&
        (tier.maxQty === undefined || selectedQty <= tier.maxQty)
    ) || hamper.priceTiers[hamper.priceTiers.length - 1];

  const currentUnitPrice = currentTier ? currentTier.pricePerUnit : hamper.basePrice;
  const unitSavings = hamper.basePrice - currentUnitPrice;

  const handleSelectQty = (qty: number) => {
    setSelectedQty(qty);
    festiveAudio.playClink();
  };

  const staggerDelay = index !== undefined ? `${(index % 3) * 90}ms` : '0ms';

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: isVisible ? staggerDelay : '0ms'
      }}
      className={`transition-all duration-700 ease-out will-change-[transform,opacity] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-7 pointer-events-none'
      }`}
    >
      <div className="group bg-[#FFFFFF] rounded-2xl border border-[#EADBCE] overflow-hidden flex flex-col shadow-sm hover:shadow-2xl transition-all duration-300 h-full">
      {/* Product Image / Artwork with Interactive Overlays */}
      <div className="relative">
        <div className="cursor-pointer" onClick={() => onSelectHamper(hamper)}>
          <HamperVisualShowcase hamper={hamper} size="md" />
        </div>

        {/* Floating Quick Action Overlay Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          {hamper.badge ? (
            <span className="bg-[#142C20]/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shadow-xs">
              {hamper.badge}
            </span>
          ) : <span />}

          <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            {onUnboxHamper && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUnboxHamper(hamper);
                }}
                className="bg-amber-100 hover:bg-amber-200 text-amber-950 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300 shadow-sm flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                title="Virtual 3D Unboxing of this hamper"
              >
                <PackageOpen className="w-3 h-3 text-amber-800" />
                <span>Virtual Unbox</span>
              </button>
            )}

            {onCompareHamper && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareHamper(hamper);
                }}
                className="bg-white/90 hover:bg-white text-stone-800 text-[10px] font-medium p-1.5 rounded-full border border-stone-200 shadow-sm cursor-pointer transition-transform hover:scale-105"
                title="Compare with another hamper"
              >
                <SlidersHorizontal className="w-3 h-3 text-stone-700" />
              </button>
            )}

            {onEditHamper && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditHamper(hamper);
                }}
                className="bg-white/90 hover:bg-amber-100 text-stone-800 hover:text-amber-900 text-[10px] font-medium p-1.5 rounded-full border border-stone-200 shadow-sm cursor-pointer transition-transform hover:scale-105"
                title="Quick Admin Edit: Update Photo or Prices"
              >
                <Camera className="w-3 h-3 text-amber-800" />
              </button>
            )}
          </div>
        </div>

        {/* Hover quick inspect badge */}
        <div
          onClick={() => onSelectHamper(hamper)}
          className="absolute inset-0 bg-[#0F2218]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
        >
          <span className="bg-[#FAF7F2] text-[#142C20] text-xs font-semibold px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            View Complete Hamper Details
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
        <div>
          {/* Subtle category metadata */}
          <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-[#8C6D38]">
              {hamper.category}
            </span>
            {hamper.pageNumber ? (
              <span className="text-stone-400 text-[11px]">
                Page {hamper.pageNumber}
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectHamper(hamper)}
            className="text-lg sm:text-xl font-normal text-stone-900 font-serif-heading hover:text-[#173D2C] transition-colors cursor-pointer leading-snug"
          >
            {hamper.title}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-1 font-light">
            {hamper.subtitle}
          </p>

          {/* Highlights Checklist (max 3 items) */}
          <div className="mt-3 pt-2.5 border-t border-[#F1E9DE] space-y-1.5">
            {hamper.contents.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-tight">
                <span className="text-[#C59B27] mt-0.5 shrink-0">✦</span>
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Quantity & Tier Pricing Section */}
        <div className="pt-3 border-t border-[#F1E9DE] space-y-2.5 sm:space-y-3">
          {/* Tier pricing preview */}
          <div className="flex items-baseline justify-between gap-1 flex-wrap">
            <div>
              <span className="text-xl sm:text-2xl font-semibold text-stone-900 tabular-nums">
                ₹{currentUnitPrice}
              </span>
              <span className="text-xs text-stone-500 ml-1">/ unit</span>
            </div>

            {unitSavings > 0 ? (
              <div className="text-[10px] sm:text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium tabular-nums">
                Save ₹{unitSavings} / box ({Math.round((unitSavings / hamper.basePrice) * 100)}% off)
              </div>
            ) : (
              <div className="text-[11px] text-stone-400">Standard Tier</div>
            )}
          </div>

          {/* Quick Quantity Selector Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-stone-100 rounded-lg text-xs overflow-x-auto scrollbar-none">
            <span className="text-[11px] text-stone-500 pl-1 sm:pl-1.5 pr-0.5 shrink-0">Qty:</span>
            {[10, 30, 50, 100, 200].map((qty) => (
              <button
                key={qty}
                onClick={() => handleSelectQty(qty)}
                className={`flex-1 min-w-[28px] py-1 rounded-md text-xs font-medium tabular-nums transition-all cursor-pointer shrink-0 ${
                  selectedQty === qty
                    ? 'bg-[#142C20] text-amber-200 shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {qty}
              </button>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => onSelectHamper(hamper)}
              className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 border border-[#D5C6AF] hover:border-[#142C20] text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
            >
              Full Specs
            </button>

            <button
              onClick={() => {
                festiveAudio.playClink();
                onAddToQuote(hamper, selectedQty);
              }}
              className="flex-1 py-2 sm:py-2.5 px-2.5 sm:px-3 bg-[#142C20] hover:bg-[#1A382A] text-amber-300 text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add {selectedQty}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
