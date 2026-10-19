import React, { useState, useMemo } from 'react';
import { CATALOGUE_ITEMS, BRAND_INFO } from '../data/catalogue';
import { useCatalogue } from '../utils/catalogueStore';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import {
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  Sliders,
  Gift,
  Heart,
  Coffee,
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PersonalizedGiftingConciergeProps {
  onSelectHamper: (hamper: HamperItem) => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
}

type BudgetRange = 'under-500' | '500-1000' | '1000-2000' | 'above-2000' | 'all';
type ThemeType = 'gourmet' | 'health' | 'relaxation' | 'heritage' | 'party';

interface ThemeOption {
  id: ThemeType;
  title: string;
  tagline: string;
  icon: string;
  description: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'gourmet',
    title: 'Gourmet Bakery & Sweet Indulgence',
    tagline: 'Molten cookies, rich chocolate bakes & handcrafted truffles',
    icon: '🍪',
    description: 'Designed for confectionery lovers wanting decadent, melt-in-the-mouth center-filled treats.'
  },
  {
    id: 'health',
    title: 'Health, Wellness & Guilt-Free',
    tagline: 'Gluten-free millets, superseed pops & zero-oil baked mathri',
    icon: '🌾',
    description: 'Mindful gifting crafted without refined sugars or frying, perfect for wellness-minded recipients.'
  },
  {
    id: 'relaxation',
    title: 'Festive Relaxation & Aromatherapy',
    tagline: 'Mithai scented candles, soothing herbal teas & lotus diyas',
    icon: '🕯️',
    description: 'Soothing sensory gifts blending sweet dessert fragrances, artisanal teas, and warm festive glows.'
  },
  {
    id: 'heritage',
    title: 'Royal Heritage & Home Decor',
    tagline: 'Pichwai art wooden trays, copper tumblers & handcrafted diyas',
    icon: '🪔',
    description: 'Traditional artistic pieces that become memorable permanent keepsakes in their homes.'
  },
  {
    id: 'party',
    title: 'Diwali Card Night & Celebration',
    tagline: '24K gold foil cards, poker chips, cocktail nuts & velvet box',
    icon: '♠️',
    description: 'Tailored for lively Diwali taash gatherings, festive house parties, and corporate leadership soirees.'
  }
];

const ITEM_PREFERENCES = [
  { id: 'cookies', label: 'Center-Filled Soft Cookies', category: 'bakery' },
  { id: 'millet', label: 'Gluten-Free Millet Treats', category: 'healthy' },
  { id: 'savory', label: 'Zero-Oil Spiced Mathri & Seed Pops', category: 'healthy' },
  { id: 'candle', label: 'Fragrant Scented Mithai Candle', category: 'decor' },
  { id: 'diya', label: 'Handcrafted Resin / Lotus Diya', category: 'decor' },
  { id: 'truffles', label: 'Handmade Couverture Truffles', category: 'chocolates' },
  { id: 'pichwai', label: 'Hand-Painted Pichwai Art Keepsake', category: 'heritage' },
  { id: 'copper', label: 'Handcrafted Pure Copper Tumbler', category: 'heritage' },
  { id: 'tea', label: 'Premium Loose-Leaf Tea Tube', category: 'beverage' },
  { id: 'cards', label: 'Golden Playing Cards & Poker Chips', category: 'games' }
];

export const PersonalizedGiftingConcierge: React.FC<PersonalizedGiftingConciergeProps> = ({
  onSelectHamper,
  onAddToQuote
}) => {
  const { hampers } = useCatalogue();
  // Wizard States
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange>('500-1000');
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('health');
  const [selectedItemTypes, setSelectedItemTypes] = useState<string[]>([
    'millet',
    'savory',
    'diya'
  ]);
  const [targetQuantity, setTargetQuantity] = useState<number>(50);

  const toggleItemPreference = (id: string) => {
    if (selectedItemTypes.includes(id)) {
      if (selectedItemTypes.length > 1) {
        setSelectedItemTypes(selectedItemTypes.filter((i) => i !== id));
      }
    } else {
      setSelectedItemTypes([...selectedItemTypes, id]);
    }
  };

  // Recommendation Scoring Engine
  const scoredRecommendations = useMemo(() => {
    return hampers.map((hamper) => {
      let score = 50; // base score

      // 1. Budget scoring
      const avgPrice = (hamper.basePrice + hamper.minPrice) / 2;
      if (selectedBudget === 'under-500') {
        if (hamper.minPrice <= 500) score += 35;
        else score -= 30;
      } else if (selectedBudget === '500-1000') {
        if (hamper.minPrice >= 400 && hamper.minPrice <= 1000) score += 35;
        else score -= 20;
      } else if (selectedBudget === '1000-2000') {
        if (hamper.minPrice >= 1000 && hamper.minPrice <= 2000) score += 35;
        else score -= 25;
      } else if (selectedBudget === 'above-2000') {
        if (hamper.minPrice >= 2000) score += 40;
        else score -= 30;
      }

      // 2. Theme scoring
      if (selectedTheme === 'gourmet') {
        if (
          hamper.id === 'pack-of-5-premium-cookies' ||
          hamper.id === 'assorted-truffles-pack-of-12' ||
          hamper.id === 'festive-cookie-candle-box'
        ) {
          score += 40;
        }
      } else if (selectedTheme === 'health') {
        if (
          hamper.id === 'perfect-diwali-healthy-hamper' ||
          hamper.id === 'festive-cookie-gift-bag-healthy'
        ) {
          score += 45;
        }
      } else if (selectedTheme === 'relaxation') {
        if (
          hamper.id === 'festive-cookie-candle-box' ||
          hamper.id === 'festive-premium-gift-bag'
        ) {
          score += 40;
        }
      } else if (selectedTheme === 'heritage') {
        if (
          hamper.id === 'nutrosa-pichwai-hamper' ||
          hamper.id === 'premium-rattan-box-hamper' ||
          hamper.id === 'elegant-festive-trio-box'
        ) {
          score += 45;
        }
      } else if (selectedTheme === 'party') {
        if (hamper.id === 'premium-luxurious-velvet-party-box') {
          score += 55;
        }
      }

      // 3. Item Preferences Scoring
      const hamperText = (
        hamper.title +
        ' ' +
        hamper.subtitle +
        ' ' +
        hamper.contents.join(' ')
      ).toLowerCase();

      selectedItemTypes.forEach((pref) => {
        if (pref === 'cookies' && hamperText.includes('cookie')) score += 8;
        if (pref === 'millet' && hamperText.includes('millet')) score += 12;
        if (pref === 'savory' && (hamperText.includes('mathri') || hamperText.includes('seed'))) score += 12;
        if (pref === 'candle' && hamperText.includes('candle')) score += 12;
        if (pref === 'diya' && hamperText.includes('diya')) score += 10;
        if (pref === 'truffles' && hamperText.includes('truffle')) score += 15;
        if (pref === 'pichwai' && hamperText.includes('pichwai')) score += 15;
        if (pref === 'copper' && hamperText.includes('copper')) score += 15;
        if (pref === 'tea' && hamperText.includes('tea')) score += 12;
        if (pref === 'cards' && (hamperText.includes('cards') || hamperText.includes('poker'))) score += 20;
      });

      // Calculate confidence percentage capped at 98%
      const matchPercentage = Math.min(98, Math.max(68, Math.round((score / 135) * 100)));

      // Calculate applied tier price for the chosen target quantity
      const tier =
        hamper.priceTiers.find(
          (t) =>
            targetQuantity >= t.minQty &&
            (t.maxQty === undefined || targetQuantity <= t.maxQty)
        ) || hamper.priceTiers[hamper.priceTiers.length - 1];

      const unitPrice = tier ? tier.pricePerUnit : hamper.basePrice;

      return {
        hamper,
        score,
        matchPercentage,
        unitPrice,
        totalEstimate: unitPrice * targetQuantity,
        savings: (hamper.basePrice - unitPrice) * targetQuantity
      };
    }).sort((a, b) => b.score - a.score);
  }, [hampers, selectedBudget, selectedTheme, selectedItemTypes, targetQuantity]);

  const primaryRecommendation = scoredRecommendations[0];
  const runnerUpRecommendations = scoredRecommendations.slice(1, 3);

  const handleSendConciergeToWhatsApp = (item: typeof primaryRecommendation) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    const activeThemeObj = THEMES.find((t) => t.id === selectedTheme);
    const msg = encodeURIComponent(
      `*NUTROSA PERSONALIZED GIFTING CONCIERGE INQUIRY*\n` +
      `-------------------------------------------\n` +
      `• Chosen Theme: ${activeThemeObj?.title}\n` +
      `• Budget Bracket: ${selectedBudget.replace('-', ' to ').toUpperCase()} per box\n` +
      `• Preferred Elements: ${selectedItemTypes.join(', ')}\n` +
      `• Target Volume: ${targetQuantity} units\n\n` +
      `*RECOMMENDED PACKAGE:* ${item.hamper.title}\n` +
      `• Applied Rate: ₹${item.unitPrice} / unit\n` +
      `• Total Estimate: ₹${item.totalEstimate.toLocaleString('en-IN')}\n\n` +
      `Hello Prachi, could you please confirm lead time and custom sleeve mockups for this selection?`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section id="personalized-concierge" className="py-20 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
            Smart Gifting Assistant
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal font-serif-heading text-[#142C20] leading-tight">
            Curate your ideal gift in 3 guided steps.
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-xl mx-auto">
            Not sure which hamper best matches your recipient profile and corporate budget? Select your parameters below and our concierge will curate the optimal package.
          </p>
        </div>

        {/* 3-Step Guided Filter Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E8DEC8] shadow-sm space-y-8">
          {/* Step 1: Budget Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-bold text-stone-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">1</span>
                Select Your Budget Per Hamper
              </label>
              <span className="text-xs text-stone-500">Tier rates adjust automatically</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'under-500', label: 'Under ₹500', sub: 'Thoughtful Favors & Tokens' },
                { id: '500-1000', label: '₹500 – ₹1,000', sub: 'Festive Classics & Healthy' },
                { id: '1000-2000', label: '₹1,000 – ₹2,000', sub: 'Heritage Pichwai & Deluxe Bags' },
                { id: 'above-2000', label: '₹2,000+', sub: 'Ultra Luxury Keepsakes & Velvet' }
              ].map((b) => {
                const isSelected = selectedBudget === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBudget(b.id as BudgetRange)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#142C20] text-amber-200 border-[#142C20] shadow-sm'
                        : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{b.label}</div>
                    <div className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {b.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose Theme */}
          <div className="space-y-3 pt-4 border-t border-[#F2ECE1]">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase tracking-wider font-bold text-stone-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">2</span>
                Choose The Gifting Theme
              </label>
              <span className="text-xs text-stone-500">Matches aesthetic and mood</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {THEMES.map((theme) => {
                const isSelected = selectedTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#142C20] bg-emerald-950/5 ring-1 ring-[#142C20]'
                        : 'border-stone-200 hover:border-stone-400 bg-stone-50/40'
                    }`}
                  >
                    <div>
                      <div className="text-2xl mb-1">{theme.icon}</div>
                      <div className="text-xs font-bold text-stone-900 leading-snug">{theme.title}</div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-tight">
                        {theme.tagline}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
                      <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-800' : 'text-stone-400'}`}>
                        {isSelected ? '✓ Selected' : 'Choose'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Pick Preferred Item Types & Volume */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#F2ECE1] items-start">
            <div className="lg:col-span-8 space-y-3">
              <label className="text-xs uppercase tracking-wider font-bold text-stone-800 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#142C20] text-amber-200 text-xs flex items-center justify-center font-bold">3</span>
                Preferred Inclusions (Multi-select)
              </label>

              <div className="flex flex-wrap gap-2">
                {ITEM_PREFERENCES.map((pref) => {
                  const isSelected = selectedItemTypes.includes(pref.id);
                  return (
                    <button
                      key={pref.id}
                      onClick={() => toggleItemPreference(pref.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#142C20] text-amber-200 shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 text-amber-300" /> : <span className="text-stone-400">+</span>}
                      <span>{pref.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Quantity Input */}
            <div className="lg:col-span-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#E2D5C0] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800">Target Order Volume:</span>
                <span className="font-bold text-[#142C20] text-sm tabular-nums">
                  {targetQuantity} boxes
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={targetQuantity}
                onChange={(e) => setTargetQuantity(parseInt(e.target.value))}
                className="w-full accent-[#142C20] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>10 units</span>
                <span>50 units (Bulk rate)</span>
                <span>200+ units (Max rate)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Recommendation Output Showcase */}
        {primaryRecommendation && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
                  Curated Match Found ({primaryRecommendation.matchPercentage}% Alignment)
                </span>
                <h3 className="text-2xl font-normal font-serif-heading text-stone-900 mt-0.5">
                  Our Top Recommendation For Your Brief
                </h3>
              </div>

              <div className="text-xs text-stone-500 hidden sm:block">
                Based on your {selectedBudget.replace('-', '–')} budget and theme selection
              </div>
            </div>

            {/* Hero Curated Showcase Card */}
            <div className="bg-white rounded-3xl border border-[#D5C6AF] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Visual Artwork */}
              <div className="lg:col-span-5 relative bg-stone-900 flex flex-col justify-center">
                <HamperVisualShowcase
                  hamper={primaryRecommendation.hamper}
                  size="lg"
                  className="rounded-t-none lg:rounded-l-3xl h-full min-h-[300px]"
                />
                <div className="absolute top-4 left-4 bg-emerald-900/90 text-amber-200 border border-emerald-500/30 px-3 py-1 rounded-md text-xs font-bold backdrop-blur-md">
                  ★ Best Alignment ({primaryRecommendation.matchPercentage}% Match)
                </div>
              </div>

              {/* Right Column: Detailed Brief Match Rationale */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="uppercase tracking-wider font-semibold text-[#8C6D38]">
                      {primaryRecommendation.hamper.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-800 font-medium">
                      {primaryRecommendation.hamper.badge}
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-medium font-serif-heading text-stone-900 leading-tight">
                    {primaryRecommendation.hamper.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {primaryRecommendation.hamper.description}
                  </p>

                  {/* Why this matches rationale */}
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl space-y-1 text-xs text-emerald-950">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Why This Is Your Ideal Match:
                    </div>
                    <p className="text-emerald-900/80 leading-relaxed font-light text-[11px]">
                      Aligns seamlessly with your chosen <strong className="font-semibold">{THEMES.find(t => t.id === selectedTheme)?.title}</strong> theme. Includes requested highlights like {primaryRecommendation.hamper.contents[0].split('–')[0]} and arrives within your targeted budget per box.
                    </p>
                  </div>

                  {/* Inclusions checklist preview */}
                  <div className="space-y-1.5 pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-700">
                      What's Inside This Curated Package:
                    </div>
                    {primaryRecommendation.hamper.contents.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="text-[#C59B27] mt-0.5">✦</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Order Action Bar */}
                <div className="pt-4 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
                        ₹{primaryRecommendation.unitPrice}
                      </span>
                      <span className="text-xs text-stone-500">/ unit</span>
                      {primaryRecommendation.unitPrice < primaryRecommendation.hamper.basePrice && (
                        <span className="text-xs text-stone-400 line-through tabular-nums">
                          ₹{primaryRecommendation.hamper.basePrice}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 tabular-nums">
                      Total for {targetQuantity} boxes: <strong className="text-stone-900 font-semibold">₹{primaryRecommendation.totalEstimate.toLocaleString('en-IN')}</strong>
                      {primaryRecommendation.savings > 0 && (
                        <span className="text-emerald-700 ml-1 font-medium">
                          (Save ₹{primaryRecommendation.savings.toLocaleString('en-IN')})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onSelectHamper(primaryRecommendation.hamper)}
                      className="px-4 py-2.5 border border-stone-300 hover:border-stone-900 text-stone-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Inspect Details
                    </button>

                    <button
                      onClick={() => {
                        onAddToQuote(primaryRecommendation.hamper, targetQuantity);
                      }}
                      className="px-4 py-2.5 bg-[#142C20] hover:bg-[#1C3E2D] text-amber-300 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add {targetQuantity} to Proposal</span>
                    </button>

                    <button
                      onClick={() => handleSendConciergeToWhatsApp(primaryRecommendation)}
                      className="p-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors cursor-pointer"
                      title="Send this brief directly to Prachi on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Runner-up Alternatives (if any) */}
            {runnerUpRecommendations.length > 0 && (
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-serif-heading text-stone-900">
                    Alternative Packages Fitting Your Criteria
                  </h4>
                  <span className="text-xs text-stone-500">
                    Compare other hampers matching your budget
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {runnerUpRecommendations.map((alt) => (
                    <div
                      key={alt.hamper.id}
                      className="bg-white p-5 rounded-2xl border border-[#E8DEC8] flex flex-col justify-between space-y-4 shadow-xs hover:border-[#142C20] transition-colors"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                          <HamperVisualShowcase hamper={alt.hamper} size="sm" className="h-full" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] text-stone-500">
                            <span>{alt.hamper.category}</span>
                            <span>·</span>
                            <span className="text-emerald-700 font-medium">{alt.matchPercentage}% match</span>
                          </div>
                          <h5 className="text-base font-semibold text-stone-900 font-serif-heading leading-tight">
                            {alt.hamper.title}
                          </h5>
                          <p className="text-xs text-stone-600 line-clamp-2">
                            {alt.hamper.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[#F2ECE1]">
                        <div>
                          <div className="text-base font-bold text-stone-900 tabular-nums">
                            ₹{alt.unitPrice} <span className="text-xs font-normal text-stone-500">/ unit</span>
                          </div>
                          <div className="text-[11px] text-stone-500 tabular-nums">
                            ₹{alt.totalEstimate.toLocaleString('en-IN')} for {targetQuantity} boxes
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectHamper(alt.hamper)}
                            className="px-3 py-1.5 border border-stone-300 hover:border-stone-800 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onAddToQuote(alt.hamper, targetQuantity)}
                            className="px-3 py-1.5 bg-[#142C20] hover:bg-[#1A382A] text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Add to Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
