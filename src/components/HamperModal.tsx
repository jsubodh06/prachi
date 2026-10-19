import React, { useState } from 'react';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import { X, Check, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, PackageOpen, Building2 } from 'lucide-react';
import { BRAND_INFO } from '../data/catalogue';
import { festiveAudio } from '../utils/festiveAudio';

interface HamperModalProps {
  hamper: HamperItem | null;
  onClose: () => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
  onOpenUnbox?: (hamper: HamperItem) => void;
  onOpenAdmin?: (hamper: HamperItem) => void;
}

export const HamperModal: React.FC<HamperModalProps> = ({
  hamper,
  onClose,
  onAddToQuote,
  onOpenUnbox,
  onOpenAdmin
}) => {
  if (!hamper) return null;

  const [quantity, setQuantity] = useState<number>(30);
  const [customBrandName, setCustomBrandName] = useState<string>('');

  // Find active pricing tier
  const activeTier =
    hamper.priceTiers.find(
      (tier) =>
        quantity >= tier.minQty &&
        (tier.maxQty === undefined || quantity <= tier.maxQty)
    ) || hamper.priceTiers[hamper.priceTiers.length - 1];

  const unitPrice = activeTier ? activeTier.pricePerUnit : hamper.basePrice;
  const totalPrice = unitPrice * quantity;
  const totalStandardPrice = hamper.basePrice * quantity;
  const savings = totalStandardPrice - totalPrice;

  const whatsappInquiryUrl = `https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${encodeURIComponent(
    `Hello Prachi! I am interested in ordering ${quantity} units of "${hamper.title}" (Estimated ₹${unitPrice}/unit). ${customBrandName ? `We would like custom branding with logo: "${customBrandName}". ` : ''}Could you please confirm production lead time and sample availability?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#DCD0BE] overflow-hidden my-4 sm:my-8 max-h-[94vh] sm:max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-stone-900/70 hover:bg-stone-900 text-stone-200 rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          {/* Top Graphic Showcase with Virtual Unboxing & Admin Edit Trigger */}
          <div className="relative rounded-xl overflow-hidden border border-[#D5C6AF] shadow-md">
            <HamperVisualShowcase hamper={hamper} size="lg" />

            {/* Quick Admin Edit Trigger */}
            {onOpenAdmin && (
              <div className="absolute top-3 left-3 z-10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin(hamper);
                  }}
                  className="bg-[#142C20]/90 hover:bg-[#142C20] text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md border border-amber-400/30 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
                  title="Open Admin Desk to edit photo or pricing for this hamper"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin Edit</span>
                </button>
              </div>
            )}

            {/* Virtual Unboxing Badge Overlay */}
            {onOpenUnbox && (
              <div className="absolute bottom-3 right-3 z-10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenUnbox(hamper);
                  }}
                  className="bg-[#142C20]/95 hover:bg-[#142C20] text-amber-200 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-amber-400/40 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <PackageOpen className="w-4 h-4 text-amber-300" />
                  <span>Interactive 3D Virtual Unbox</span>
                </button>
              </div>
            )}
          </div>

          {/* Title & Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <span className="uppercase tracking-wider font-semibold text-[#8C6D38]">
                {hamper.category}
              </span>
              {hamper.badge && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-800 font-medium">{hamper.badge}</span>
                </>
              )}
              {hamper.pageNumber && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500 font-medium">Page {hamper.pageNumber}</span>
                </>
              )}
            </div>

            <h2 className="text-3xl font-medium text-stone-900 font-serif-heading leading-tight">
              {hamper.title}
            </h2>
            <p className="text-sm text-stone-600 italic">
              "{hamper.tagline}"
            </p>
          </div>

          {/* Detailed Narrative */}
          <p className="text-sm text-stone-700 leading-relaxed">
            {hamper.description}
          </p>

          {/* Itemized Contents */}
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E6DACB] space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-[#142C20] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C59B27]" />
              Curated Hamper Inclusions:
            </h4>
            <div className="space-y-2.5">
              {hamper.contents.map((item, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-stone-800 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    {index + 1}
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Custom Branding Simulator */}
          <div className="bg-gradient-to-br from-amber-50 to-stone-50 p-5 rounded-xl border border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-xs uppercase tracking-wider font-bold text-stone-800 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-700" />
                <span>Simulate Your Custom Corporate Sleeve & Wax Tag</span>
              </h5>
              <span className="text-[10px] bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-semibold">
                Free for 50+ Units
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Type your company name or family monogram to visualize your custom festive gold-embossed sleeve:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="e.g. Tata Consultancy Services, Google APAC, Kala Family..."
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs focus:outline-none focus:border-[#142C20]"
              />
              {customBrandName && (
                <button
                  onClick={() => setCustomBrandName('')}
                  className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800"
                >
                  Clear
                </button>
              )}
            </div>

            {customBrandName && (
              <div className="mt-3 p-3.5 bg-[#142C20] text-amber-100 rounded-xl border border-amber-400/40 shadow-inner flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold text-xs shadow-md">
                    {customBrandName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                      Custom Foil Belly Band Preview
                    </div>
                    <div className="text-sm font-serif-heading font-semibold text-stone-50">
                      Wishing You A Prosperous Diwali 2026 · {customBrandName}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded font-mono">
                  Applied to Proposal
                </span>
              </div>
            )}
          </div>

          {/* Dietary & Packaging Attributes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DACB] space-y-2">
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-stone-700">
                Ingredients & Dietary Highlights
              </h5>
              <div className="space-y-1.5 text-xs text-stone-700">
                {hamper.dietaryHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E6DACB] space-y-2">
              <h5 className="text-[11px] uppercase tracking-wider font-bold text-stone-700">
                Packaging & Presentation
              </h5>
              <p className="text-xs text-stone-700 leading-relaxed">
                {hamper.packagingType}
              </p>
              <div className="pt-2 text-[11px] text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                Transit-safe protective outer shipping box included for Pan-India couriers.
              </div>
            </div>
          </div>

          {/* Bulk Tier Rate Chart */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
              Official Bulk Quantity Rate Card:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {hamper.priceTiers.map((tier, idx) => {
                const isCurrent = activeTier === tier;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setQuantity(tier.minQty);
                      festiveAudio.playClink();
                    }}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#142C20] text-amber-300 border-[#142C20] shadow-sm font-semibold'
                        : 'bg-[#FFFFFF] text-stone-700 border-[#E6DACB] hover:border-stone-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase text-stone-400">
                      {tier.label}
                    </div>
                    <div className="text-base font-bold tabular-nums mt-0.5">
                      ₹{tier.pricePerUnit}
                    </div>
                    <div className="text-[9px] text-stone-500 mt-0.5">
                      {tier.maxQty ? `${tier.minQty} - ${tier.maxQty} pcs` : `${tier.minQty}+ pcs`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector Slider & Inputs */}
          <div className="bg-[#FFFFFF] p-5 rounded-xl border border-[#E6DACB] space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="modal-qty" className="text-xs font-bold uppercase tracking-wider text-stone-800">
                Adjust Desired Quantity:
              </label>
              <span className="text-sm font-bold text-[#142C20] bg-stone-100 px-3 py-1 rounded-lg tabular-nums">
                {quantity} Hampers
              </span>
            </div>

            <input
              id="modal-qty"
              type="range"
              min="5"
              max="250"
              step="5"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number(e.target.value));
                festiveAudio.playClink();
              }}
              className="w-full accent-[#142C20] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-stone-500">
              <span>5 units (Favor)</span>
              <span>50 units (Team)</span>
              <span>100 units (Corporate)</span>
              <span>200+ units (Enterprise)</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Sticky Action Bar */}
        <div className="p-3.5 sm:p-4 md:p-6 bg-[#FFFFFF] border-t border-[#E8DEC8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-500">
              Calculated Total Investment ({quantity} hampers):
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500 tabular-nums">
                (₹{unitPrice} / unit)
              </span>
              {savings > 0 && (
                <span className="text-[11px] text-emerald-700 font-medium">
                  · You save ₹{savings.toLocaleString('en-IN')}!
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial justify-center py-2.5 px-3 sm:px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 sm:gap-2 transition-colors text-center"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Ask on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                festiveAudio.playClink();
                onAddToQuote(hamper, quantity);
                onClose();
              }}
              className="flex-1 sm:flex-initial justify-center py-2.5 px-4 sm:px-5 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:brightness-105 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer text-center"
            >
              <ShoppingBag className="w-4 h-4 text-stone-950" />
              <span>Add to Proposal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
