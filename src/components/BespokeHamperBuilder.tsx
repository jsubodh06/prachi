import React, { useState } from 'react';
import {
  BESPOKE_BOX_OPTIONS,
  BESPOKE_TREAT_OPTIONS,
  BESPOKE_KEEPSAKE_OPTIONS,
  BRAND_INFO
} from '../data/catalogue';
import { Sparkles, Check, Plus, MessageCircle, Gift, Sliders } from 'lucide-react';
import { HamperItem } from '../types';

interface BespokeHamperBuilderProps {
  onAddCustomHamperToQuote: (hamper: HamperItem, qty: number) => void;
}

export const BespokeHamperBuilder: React.FC<BespokeHamperBuilderProps> = ({
  onAddCustomHamperToQuote
}) => {
  const [selectedBoxId, setSelectedBoxId] = useState<string>(BESPOKE_BOX_OPTIONS[0].id);
  const [selectedTreatIds, setSelectedTreatIds] = useState<string[]>([
    'millet-cookies',
    'kunafa-cookie',
    'seed-crackers'
  ]);
  const [selectedKeepsakeIds, setSelectedKeepsakeIds] = useState<string[]>([
    'lotus-diya',
    'shubh-labh'
  ]);
  const [bespokeQty, setBespokeQty] = useState<number>(25);

  const activeBox =
    BESPOKE_BOX_OPTIONS.find((b) => b.id === selectedBoxId) || BESPOKE_BOX_OPTIONS[0];

  const toggleTreat = (id: string) => {
    if (selectedTreatIds.includes(id)) {
      if (selectedTreatIds.length > 1) {
        setSelectedTreatIds(selectedTreatIds.filter((t) => t !== id));
      }
    } else {
      setSelectedTreatIds([...selectedTreatIds, id]);
    }
  };

  const toggleKeepsake = (id: string) => {
    if (selectedKeepsakeIds.includes(id)) {
      setSelectedKeepsakeIds(selectedKeepsakeIds.filter((k) => k !== id));
    } else {
      setSelectedKeepsakeIds([...selectedKeepsakeIds, id]);
    }
  };

  // Base item cost calculation
  const boxCost = activeBox.price;
  const treatsCost = selectedTreatIds.reduce((sum, tid) => {
    const t = BESPOKE_TREAT_OPTIONS.find((item) => item.id === tid);
    return sum + (t ? t.price : 0);
  }, 0);
  const keepsakesCost = selectedKeepsakeIds.reduce((sum, kid) => {
    const k = BESPOKE_KEEPSAKE_OPTIONS.find((item) => item.id === kid);
    return sum + (k ? k.price : 0);
  }, 0);

  const baseUnitPrice = boxCost + treatsCost + keepsakesCost;

  // Bulk discount calculation
  let discountMultiplier = 1;
  if (bespokeQty >= 100) discountMultiplier = 0.82; // 18% off
  else if (bespokeQty >= 50) discountMultiplier = 0.88; // 12% off
  else if (bespokeQty >= 25) discountMultiplier = 0.94; // 6% off

  const unitPrice = Math.round(baseUnitPrice * discountMultiplier);
  const totalBespokeCost = unitPrice * bespokeQty;

  const handleAddBespoke = () => {
    const treatNames = selectedTreatIds
      .map((tid) => BESPOKE_TREAT_OPTIONS.find((t) => t.id === tid)?.name)
      .filter(Boolean) as string[];
    const keepsakeNames = selectedKeepsakeIds
      .map((kid) => BESPOKE_KEEPSAKE_OPTIONS.find((k) => k.id === kid)?.name)
      .filter(Boolean) as string[];

    const customHamper: HamperItem = {
      id: `custom-bespoke-${Date.now()}`,
      title: `Bespoke Curation: ${activeBox.name}`,
      subtitle: `${treatNames.length} Confections · ${keepsakeNames.length} Keepsakes`,
      category: 'Ultra Luxury',
      badge: 'Client Bespoke Custom Hamper',
      tagline: 'Custom curated festive selection designed to your unique corporate requirements.',
      description: `A personalized festive gifting curation featuring ${activeBox.name}. Filled with ${treatNames.join(', ')} and festive keepsakes: ${keepsakeNames.join(', ')}.`,
      contents: [...treatNames, ...keepsakeNames],
      dietaryHighlights: ['Crafted to Order', 'Zero Preservatives', 'Personalized Selection'],
      packagingType: activeBox.name,
      basePrice: baseUnitPrice,
      minPrice: Math.round(baseUnitPrice * 0.82),
      priceTiers: [
        { minQty: 1, maxQty: 24, pricePerUnit: baseUnitPrice, label: '01–24 units' },
        { minQty: 25, maxQty: 49, pricePerUnit: Math.round(baseUnitPrice * 0.94), label: '25+ units' },
        { minQty: 50, maxQty: 99, pricePerUnit: Math.round(baseUnitPrice * 0.88), label: '50+ units' },
        { minQty: 100, pricePerUnit: Math.round(baseUnitPrice * 0.82), label: '100+ units' }
      ],
      accentColor: '#17365D',
      graphicType:
        activeBox.id === 'velvet-round'
          ? 'velvet-party'
          : activeBox.id === 'rattan-chest'
          ? 'rattan-chest'
          : activeBox.id === 'pichwai-tray'
          ? 'pichwai-box'
          : 'healthy-box'
    };

    onAddCustomHamperToQuote(customHamper, bespokeQty);
  };

  const bespokeWhatsAppText = encodeURIComponent(
    `Hello Prachi! I created a Bespoke Hamper on your Nutrosa catalogue:\n• Packaging: ${activeBox.name}\n• Treats: ${selectedTreatIds.map(t => BESPOKE_TREAT_OPTIONS.find(x => x.id === t)?.name).join(', ')}\n• Keepsakes: ${selectedKeepsakeIds.map(k => BESPOKE_KEEPSAKE_OPTIONS.find(x => x.id === k)?.name).join(', ')}\n• Quantity: ${bespokeQty} units\n• Estimated unit rate: ₹${unitPrice}\nCould you please send me a formal quotation and sample options?`
  );

  return (
    <section id="bespoke-builder" className="py-16 bg-[#F4EFE6] border-y border-[#E2D5C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold">
            Bespoke Corporate Curation Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif-heading text-stone-900">
            Curate your own bespoke Diwali hamper.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light">
            Need a specific combination tailored to your brand budget or dietary preferences? Select your keepsake box, artisanal treats, and festive souvenirs below.
          </p>
        </div>

        {/* Studio Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls: Left 8 Columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Packaging Style */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5D7C2] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">1</span>
                  Select Packaging Chest / Box
                </h3>
                <span className="text-xs text-stone-500">Pick 1 style</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BESPOKE_BOX_OPTIONS.map((box) => {
                  const isSelected = selectedBoxId === box.id;
                  return (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBoxId(box.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#142C20] bg-emerald-950/5 ring-1 ring-[#142C20]'
                          : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold text-stone-900">{box.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#142C20]" />}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                        {box.desc}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-[#8C6D38] tabular-nums">
                        ₹{box.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Bakery Delights & Treats */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5D7C2] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">2</span>
                  Choose Nutrosa Bakery & Savory Treats
                </h3>
                <span className="text-xs text-stone-500">
                  {selectedTreatIds.length} items chosen
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {BESPOKE_TREAT_OPTIONS.map((treat) => {
                  const isSelected = selectedTreatIds.includes(treat.id);
                  return (
                    <button
                      key={treat.id}
                      onClick={() => toggleTreat(treat.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#142C20] bg-emerald-900/10 text-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/40 text-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold leading-tight">{treat.name}</div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{treat.category}</div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-xs font-bold text-stone-900 tabular-nums">
                          +₹{treat.price}
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-800">Added</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Festive Keepsakes */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5D7C2] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">3</span>
                  Choose Festive Keepsakes & Diyas
                </h3>
                <span className="text-xs text-stone-500">
                  {selectedKeepsakeIds.length} items chosen
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {BESPOKE_KEEPSAKE_OPTIONS.map((keepsake) => {
                  const isSelected = selectedKeepsakeIds.includes(keepsake.id);
                  return (
                    <button
                      key={keepsake.id}
                      onClick={() => toggleKeepsake(keepsake.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#142C20] bg-emerald-900/10 text-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/40 text-stone-700'
                      }`}
                    >
                      <div className="text-xs font-semibold leading-tight">{keepsake.name}</div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-xs font-bold text-stone-900 tabular-nums">
                          +₹{keepsake.price}
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-800">Added</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Curation Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#142C20] text-stone-100 p-6 rounded-2xl border border-[#2A5540] shadow-xl space-y-5">
              <div className="border-b border-emerald-900/60 pb-3">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  Your Custom Curation
                </div>
                <h4 className="text-lg font-normal font-serif-heading text-white mt-1">
                  {activeBox.name}
                </h4>
              </div>

              {/* Inclusions Checklist */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider mb-1">
                    Confectionery & Bakes ({selectedTreatIds.length}):
                  </div>
                  <ul className="space-y-1 text-stone-200">
                    {selectedTreatIds.map((tid) => {
                      const t = BESPOKE_TREAT_OPTIONS.find((item) => item.id === tid);
                      return (
                        <li key={tid} className="flex items-center gap-1.5">
                          <span className="text-amber-400">✦</span>
                          <span className="truncate">{t?.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div>
                  <div className="text-stone-400 font-semibold text-[11px] uppercase tracking-wider mb-1">
                    Diwali Keepsakes ({selectedKeepsakeIds.length}):
                  </div>
                  <ul className="space-y-1 text-stone-200">
                    {selectedKeepsakeIds.length === 0 ? (
                      <li className="text-stone-400 italic">No keepsakes selected</li>
                    ) : (
                      selectedKeepsakeIds.map((kid) => {
                        const k = BESPOKE_KEEPSAKE_OPTIONS.find((item) => item.id === kid);
                        return (
                          <li key={kid} className="flex items-center gap-1.5">
                            <span className="text-amber-400">✦</span>
                            <span className="truncate">{k?.name}</span>
                          </li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="pt-3 border-t border-emerald-900/60 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Estimated Quantity:</span>
                  <span className="text-amber-300 font-bold tabular-nums">
                    {bespokeQty} units
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={bespokeQty}
                  onChange={(e) => setBespokeQty(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400">
                  <span>10 boxes</span>
                  <span>50 boxes (12% off)</span>
                  <span>100+ boxes (18% off)</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-3 border-t border-emerald-900/60 space-y-1">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Base Individual Rate:</span>
                  <span className="tabular-nums">₹{baseUnitPrice} / unit</span>
                </div>
                <div className="flex justify-between text-xs text-amber-300">
                  <span>Bulk Discounted Rate:</span>
                  <span className="text-base font-bold tabular-nums">
                    ₹{unitPrice} / unit
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-xs text-stone-200">Estimated Total:</span>
                  <span className="text-2xl font-bold text-white tabular-nums">
                    ₹{totalBespokeCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleAddBespoke}
                  className="w-full py-3 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-stone-950" />
                  <span>Add Custom Hamper to Proposal</span>
                </button>

                <a
                  href={`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${bespokeWhatsAppText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-900/60 hover:bg-emerald-900 text-stone-100 border border-emerald-600/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Discuss Customization on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
