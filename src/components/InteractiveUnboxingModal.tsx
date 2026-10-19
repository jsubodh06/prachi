import React, { useState } from 'react';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import { X, Sparkles, Check, Package, Gift, ShoppingBag, ArrowRight, Eye, RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/festiveAudio';

interface InteractiveUnboxingModalProps {
  hamper: HamperItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
}

export const InteractiveUnboxingModal: React.FC<InteractiveUnboxingModalProps> = ({
  hamper,
  isOpen,
  onClose,
  onAddToQuote
}) => {
  const [step, setStep] = useState<'sealed' | 'unboxed'>('sealed');
  const [selectedItemIdx, setSelectedItemIdx] = useState<number>(0);
  const [orderQty, setOrderQty] = useState<number>(30);

  if (!isOpen || !hamper) return null;

  const handleUnbox = () => {
    festiveAudio.playUnboxChime();
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 }
    });
    setStep('unboxed');
  };

  const handleReset = () => {
    setStep('sealed');
    setSelectedItemIdx(0);
  };

  const activeContent = hamper.contents[selectedItemIdx] || hamper.contents[0];

  // Derive sensory breakdown based on item name
  const getSensoryNotes = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('millet')) {
      return {
        profile: 'Nutty, spiced cardamom aroma with natural jaggery sweetness.',
        texture: 'Delicate melt-in-the-mouth crumble without dryness.',
        highlight: 'Zero refined sugar · Gluten-free superfood grains',
        portions: '100g Freshly Sealed Jar (~6-8 cookies)'
      };
    }
    if (lower.includes('seed pop') || lower.includes('cracker')) {
      return {
        profile: 'Toasted pumpkin, sunflower, chia, and sesame with pink rock salt.',
        texture: 'Audible crispy snap that stays fresh for weeks.',
        highlight: '7-Power Superseeds · High fiber & protein crunch',
        portions: '100g Airtight Jar'
      };
    }
    if (lower.includes('mathri')) {
      return {
        profile: 'Traditional Rajasthani ajwain & black pepper warmth.',
        texture: 'Zero-oil hot-air baked. Flaky and golden without grease.',
        highlight: '100% Whole Wheat · Zero Palm Oil · Zero Deep Frying',
        portions: '100g Baked Portion'
      };
    }
    if (lower.includes('candle')) {
      return {
        profile: 'Sweet saffron cream, condensed milk, and cardamom pods.',
        texture: 'Hand-poured pure soy wax in traditional earthenware / terracotta.',
        highlight: 'Lead-free cotton wick · Up to 18 hours clean burn',
        portions: '1 Artisanal Sculpted Candle'
      };
    }
    if (lower.includes('copper')) {
      return {
        profile: 'Pure Ayurvedic Grade Hammered Red Copper.',
        texture: 'Cool weighty metal with mirror-burnished interior and tactile hammered exterior.',
        highlight: 'Natural antimicrobial properties · Timeless heirloom tumbler',
        portions: 'Set of 2 Heavy Tumblers'
      };
    }
    if (lower.includes('pichwai')) {
      return {
        profile: 'Nathdwara Rajasthan folk artistry with sacred holy cow & lotus motifs.',
        texture: 'Smooth lacquered seasoned wood with gold leaf filigree border.',
        highlight: 'Authentic heritage artisan keepsake tray',
        portions: '1 Hand-Painted Wooden Keepsake Tray'
      };
    }
    if (lower.includes('cards') || lower.includes('poker')) {
      return {
        profile: '24K Gold Foil Waterproof Luxury Card Deck & Casino Weighted Chips.',
        texture: 'High-glide casino tactile feel with distinct weighted chip clink.',
        highlight: 'Complete Diwali Card Night Companion',
        portions: '1 Deck + Chips Caddy'
      };
    }
    if (lower.includes('truffle')) {
      return {
        profile: 'Rich 55% Belgian Couverture ganache rolled in toasted pistachio & rose.',
        texture: 'Silky melt-in-the-mouth cocoa core that dissolves gently on the tongue.',
        highlight: 'Freshly tempered · Pure Cocoa Butter · Zero palm oil',
        portions: 'Box of 12 Gourmet Truffles'
      };
    }
    return {
      profile: 'Signature Nutrosa artisanal recipe crafted with pure creamery butter.',
      texture: 'Crisp buttery perimeter with tender soft-baked heart.',
      highlight: 'Freshly baked to order · Zero chemical stabilizers',
      portions: 'Assorted Gourmet Festive Volume'
    };
  };

  const currentNotes = getSensoryNotes(activeContent);

  // Active pricing tier
  const activeTier =
    hamper.priceTiers.find(
      (t) =>
        orderQty >= t.minQty && (t.maxQty === undefined || orderQty <= t.maxQty)
    ) || hamper.priceTiers[hamper.priceTiers.length - 1];

  const unitRate = activeTier ? activeTier.pricePerUnit : hamper.basePrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C6AF] overflow-hidden my-4 sm:my-6 max-h-[94vh] sm:max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#142C20] text-stone-100 flex items-center justify-between border-b border-[#2C523F]">
          <div>
            <div className="text-xs text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Package className="w-4 h-4 text-amber-300" />
              Tactile Gifting Experience
            </div>
            <h2 className="text-lg sm:text-2xl font-normal font-serif-heading text-stone-50 mt-0.5">
              Virtual Hamper Unboxing: {hamper.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {step === 'unboxed' && (
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg border border-emerald-700/60 text-xs text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Re-seal and unbox again"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-box</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unboxing Stage Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {step === 'sealed' ? (
            /* PHASE 1: SEALED BOX WITH GOLD RIBBON */
            <div className="py-12 flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
              <div className="relative w-72 h-56 rounded-2xl bg-gradient-to-br from-[#1C3E2E] to-[#0D2017] p-4 border-2 border-[#D4AF37] shadow-2xl flex flex-col items-center justify-center transform hover:scale-102 transition-transform select-none">
                {/* Horizontal Gold Satin Ribbon */}
                <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-[#D4AF37] via-[#FFF176] to-[#B8860B] shadow-md flex items-center justify-center" />
                {/* Vertical Ribbon */}
                <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-[#D4AF37] via-[#FFF176] to-[#B8860B] shadow-md flex items-center justify-center" />

                {/* Wax Seal Center Medallion */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#991B1B] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center">
                  <span className="text-amber-200 text-xs font-serif font-bold text-center leading-tight">
                    NUTROSA
                    <br />
                    2026
                  </span>
                </div>

                <div className="absolute bottom-2 text-[10px] text-amber-200/90 font-medium tracking-widest uppercase">
                  Sealed Festive Presentation
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif-heading text-stone-900">
                  Ready to discover what’s inside?
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Experience how your recipients will unwrap this hamper: untying the golden ribbon, lifting the protective parchment, and exploring the hand-curated delicacies.
                </p>
              </div>

              <button
                onClick={handleUnbox}
                className="px-8 py-4 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm uppercase tracking-wider rounded-xl shadow-xl hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer transform active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-stone-950" />
                <span>Untie Golden Ribbon & Unbox</span>
              </button>
            </div>
          ) : (
            /* PHASE 2: UNBOXED TRAY WITH INTERACTIVE INSPECTABLE ITEMS */
            <div className="space-y-6">
              <div className="bg-[#142C20] text-stone-100 p-4 rounded-2xl border border-[#2C523F] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-amber-300 font-semibold">Hamper Unboxed Successfully!</span>
                  <span className="text-stone-400 hidden sm:inline">· Click any treat or keepsake below to inspect its sensory & ingredient profile</span>
                </div>
                <span className="text-xs text-stone-300 tabular-nums">
                  {hamper.contents.length} Inclusions
                </span>
              </div>

              {/* Items Grid & Tasting Card Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: The Items Tray (7 Cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="text-xs uppercase tracking-wider font-bold text-stone-800">
                    Select an Item Inside the Hamper:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {hamper.contents.map((item, idx) => {
                      const isSelected = selectedItemIdx === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedItemIdx(idx)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-white border-[#142C20] ring-2 ring-[#142C20] shadow-md'
                              : 'bg-white/80 border-stone-200 hover:border-stone-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-900/10 text-[#142C20] text-xs flex items-center justify-center font-bold shrink-0">
                              {idx + 1}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                                Selected
                              </span>
                            )}
                          </div>

                          <div className="mt-2 text-xs font-semibold text-stone-900 leading-snug">
                            {item}
                          </div>

                          <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-[#8C6D38] font-medium flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>View sensory notes →</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: The Sensory & Quality Inspector Card (5 Cols) */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E8DEC8] shadow-md space-y-4">
                  <div className="border-b border-stone-200 pb-3">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C6D38]">
                      Sensory & Craft Breakdown
                    </span>
                    <h4 className="text-base font-semibold text-stone-900 font-serif-heading mt-1 leading-snug">
                      {activeContent}
                    </h4>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                        Flavor / Aroma Profile:
                      </span>
                      <p className="text-stone-800 leading-relaxed mt-0.5">
                        {currentNotes.profile}
                      </p>
                    </div>

                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold tracking-wider block">
                        Texture & Craft:
                      </span>
                      <p className="text-stone-800 leading-relaxed mt-0.5">
                        {currentNotes.texture}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60">
                      <span className="text-emerald-900 text-[10px] uppercase font-bold tracking-wider block">
                        Festive Health & Quality Pillar:
                      </span>
                      <p className="text-emerald-950 font-medium leading-snug mt-0.5">
                        {currentNotes.highlight}
                      </p>
                    </div>

                    <div className="flex justify-between text-stone-500 pt-1 text-[11px]">
                      <span>Volume / Portion:</span>
                      <strong className="text-stone-900">{currentNotes.portions}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Order Bar */}
        <div className="p-5 bg-white border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-600">Volume:</span>
            <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
              <button
                onClick={() => setOrderQty(Math.max(1, orderQty - 5))}
                className="px-2.5 py-1 text-xs hover:bg-stone-200 font-bold cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={orderQty}
                onChange={(e) => setOrderQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-14 text-center text-xs font-bold tabular-nums focus:outline-none bg-white"
              />
              <button
                onClick={() => setOrderQty(orderQty + 5)}
                className="px-2.5 py-1 text-xs hover:bg-stone-200 font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="text-xs">
              <span className="text-stone-500">Rate: </span>
              <strong className="text-stone-900 tabular-nums">₹{unitRate} / box</strong>
              <span className="text-stone-400 ml-1">
                (Total: ₹{(unitRate * orderQty).toLocaleString('en-IN')})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToQuote(hamper, orderQty);
                onClose();
              }}
              className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#142C20] hover:bg-[#1C3E2D] text-amber-300 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm text-center"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Add {orderQty} Units to Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
