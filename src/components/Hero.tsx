import React from 'react';
import {
  Sparkles,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  Calculator,
  SlidersHorizontal,
  BookOpen,
  Eye,
  Check,
  PackageCheck,
  Building2,
  PhoneCall
} from 'lucide-react';
import { BRAND_INFO } from '../data/catalogue';
import { festiveAudio } from '../utils/festiveAudio';

interface HeroProps {
  onExploreClick: () => void;
  onOpenSampleModal: () => void;
  onOpenBespoke: () => void;
  onOpenConcierge: () => void;
  onOpenCompareModal: () => void;
  onScrollToBudget: () => void;
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
  viewMode: 'storefront' | 'brochure';
  onToggleViewMode: (mode: 'storefront' | 'brochure') => void;
  onOpenAdminPanel?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenSampleModal,
  onOpenBespoke,
  onOpenConcierge,
  onOpenCompareModal,
  onScrollToBudget,
  onSelectCategory,
  activeCategory,
  viewMode,
  onToggleViewMode,
  onOpenAdminPanel
}) => {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${encodeURIComponent(
    'Hello! I am viewing the Nutrosa Diwali 2026 Executive Corporate Gifting Hub and would like to inquire about hamper options and bulk quotation for my team.'
  )}`;

  const quickBudgetTiers = [
    { id: 'all', label: 'All 12 Hampers', count: '12' },
    { id: 'budget', label: 'Under ₹600 (Favors)', count: '3' },
    { id: 'healthy', label: 'Healthy & Millet (Zero-Oil)', count: '2' },
    { id: 'festive-boxes', label: 'Festive Classic Boxes', count: '4' },
    { id: 'luxury', label: 'Royal Keepsakes & Velvet', count: '2' },
    { id: 'jute-bags', label: 'Eco-Luxe Jute Bags', count: '2' }
  ];

  const executiveShortcuts = [
    {
      icon: Gift,
      label: '12 Curated Hampers',
      desc: 'Browse tiered pricing slabs (₹325 - ₹2,950)',
      action: () => {
        festiveAudio.playClink();
        onToggleViewMode('storefront');
        onExploreClick();
      },
      tag: 'Storefront'
    },
    {
      icon: BookOpen,
      label: '17-Page Official Brochure',
      desc: 'Flip through full high-res catalogue pages',
      action: () => {
        festiveAudio.playClink();
        onToggleViewMode('brochure');
        onExploreClick();
      },
      tag: 'Brochure PDF'
    },
    {
      icon: Calculator,
      label: 'Corporate Budget Splitter',
      desc: 'Calculate team vs. VIP client allocations',
      action: () => {
        festiveAudio.playClink();
        onScrollToBudget();
      },
      tag: 'Calculator'
    },
    {
      icon: SlidersHorizontal,
      label: 'Bespoke Box Studio',
      desc: 'Assort custom cookies & savory jars',
      action: () => {
        festiveAudio.playClink();
        onOpenBespoke();
      },
      tag: 'Customizer'
    },
    {
      icon: Sparkles,
      label: 'Gifting Concierge',
      desc: 'Quick match by occasion, budget & dietary',
      action: () => {
        festiveAudio.playClink();
        onOpenConcierge();
      },
      tag: 'Smart Match'
    },
    {
      icon: Eye,
      label: 'Compare Specs Matrix',
      desc: 'Side-by-side comparison of items & weights',
      action: () => {
        festiveAudio.playClink();
        onOpenCompareModal();
      },
      tag: 'Compare'
    }
  ];

  return (
    <div className="relative bg-[#0F231A] text-stone-100 overflow-hidden border-b border-[#2C523F]">
      {/* Subtle festive background lighting */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl transform -translate-y-32" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#C49A45] rounded-full blur-3xl transform translate-y-32" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10 space-y-6 sm:space-y-7">
        {/* Executive Header Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 pb-6 border-b border-[#204332]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-amber-300 font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Diwali 2026 Executive Corporate Suite
              </span>
              <span aria-hidden="true" className="text-amber-500/40">·</span>
              <span>Pan-India Transit Safe</span>
              <span aria-hidden="true" className="text-amber-500/40">·</span>
              <span>Direct Bulk Tiers</span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-normal leading-tight text-stone-50 font-serif-heading">
              Corporate Festive Gifting & Quotation Command Center
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Explore 12 curated artisanal hampers, calculate team budget allocations, request complimentary tasting boxes, or customize company logo branding—all in one efficient workspace.
            </p>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-stretch sm:self-start lg:self-center">
            <button
              onClick={onOpenSampleModal}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-stone-100 text-stone-900 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <PackageCheck className="w-4 h-4 text-emerald-800" />
              <span>Request Tasting Sample Box</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 sm:gap-2 border border-emerald-600/40 cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              <span>Corporate Desk WhatsApp</span>
            </a>

            {onOpenAdminPanel && (
              <button
                onClick={onOpenAdminPanel}
                className="px-3 sm:px-3.5 py-2 sm:py-2.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 border border-amber-400/40 cursor-pointer shadow-sm hover:scale-[1.02]"
                title="Bakery Operations: Update Hamper Photos & Custom Prices"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Desk</span>
              </button>
            )}
          </div>
        </div>

        {/* 6 Quick Jump Workspace Shortcuts (Eliminates Long Manual Scrolling) */}
        <div>
          <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-400/90 mb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span>Fast-Track Workspace Tools (Jump Directly to Any Section):</span>
            <span className="text-stone-400 font-normal">Click to jump without endless scrolling</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {executiveShortcuts.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <button
                  key={idx}
                  onClick={tool.action}
                  className="p-3 bg-[#163526]/80 hover:bg-[#1C4230] text-left rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 text-amber-300 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] bg-stone-900/60 text-amber-300/80 px-1.5 py-0.5 rounded font-mono">
                      {tool.tag}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                      {tool.label}
                    </div>
                    <div className="text-[10px] text-stone-400 font-light mt-0.5 line-clamp-1">
                      {tool.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Budget Filter Pill Bar */}
        <div className="p-3.5 bg-[#142C20] rounded-xl border border-amber-500/25 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-amber-200 font-medium shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant Filter by Budget / Category:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
            {quickBudgetTiers.map((tier) => {
              const isSelected = activeCategory === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => {
                    festiveAudio.playClink();
                    onSelectCategory(tier.id);
                    if (viewMode === 'brochure') onToggleViewMode('storefront');
                    onExploreClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold shadow-sm'
                      : 'bg-emerald-950/60 text-stone-300 hover:text-stone-100 hover:bg-emerald-900/70 border border-emerald-800/60'
                  }`}
                >
                  <span>{tier.label}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full tabular-nums ${
                      isSelected ? 'bg-stone-900/20 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {tier.count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onExploreClick}
            className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1 underline underline-offset-4 shrink-0 cursor-pointer self-end md:self-center"
          >
            <span>Jump to Results</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Executive Logistics & Trust Indicators (Compact 4-Card Bar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 text-xs">
          <div className="p-2.5 bg-[#142C20]/50 rounded-lg border border-emerald-800/40 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <span className="font-bold text-[11px]">₹</span>
            </div>
            <div>
              <div className="font-semibold text-stone-100 text-[11px]">₹325 to ₹2,950 / Box</div>
              <div className="text-[10px] text-stone-400">Volume slabs from 10 to 200+ units</div>
            </div>
          </div>

          <div className="p-2.5 bg-[#142C20]/50 rounded-lg border border-emerald-800/40 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-stone-100 text-[11px]">Free Company Branding</div>
              <div className="text-[10px] text-stone-400">Custom logo sleeves on 50+ units</div>
            </div>
          </div>

          <div className="p-2.5 bg-[#142C20]/50 rounded-lg border border-emerald-800/40 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-stone-100 text-[11px]">Pan-India Transit Safe</div>
              <div className="text-[10px] text-stone-400">Vacuum cushioned & tin sealed</div>
            </div>
          </div>

          <div className="p-2.5 bg-[#142C20]/50 rounded-lg border border-emerald-800/40 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-400/10 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="font-semibold text-stone-100 text-[11px]">Zero Preservatives</div>
              <div className="text-[10px] text-stone-400">100% vegetarian & freshly baked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
