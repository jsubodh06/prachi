import React, { useState } from 'react';
import { CATALOGUE_ITEMS, BRAND_INFO } from '../data/catalogue';
import { useCatalogue } from '../utils/catalogueStore';
import { HamperItem } from '../types';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import { FestiveBorder } from './FestiveBorder';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  MessageCircle,
  FileText,
  Sparkles,
  Phone,
  Mail,
  Instagram,
  Globe,
  Maximize2,
  PackageOpen
} from 'lucide-react';
import { festiveAudio } from '../utils/festiveAudio';

interface CatalogueBookViewProps {
  onSelectHamper: (hamper: HamperItem) => void;
  onAddToQuote: (hamper: HamperItem, qty: number) => void;
  onUnboxHamper?: (hamper: HamperItem) => void;
}

export const CatalogueBookView: React.FC<CatalogueBookViewProps> = ({
  onSelectHamper,
  onAddToQuote,
  onUnboxHamper
}) => {
  const { hampers } = useCatalogue();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 17;

  // Find corresponding hamper for product pages 4 to 15
  const pageToHamperMap: Record<number, HamperItem> = {
    4: hampers.find((h) => h.id === 'perfect-diwali-healthy-hamper') || CATALOGUE_ITEMS[0],
    5: hampers.find((h) => h.id === 'festive-cookie-candle-box') || CATALOGUE_ITEMS[1],
    6: hampers.find((h) => h.id === 'elegant-festive-trio-box') || CATALOGUE_ITEMS[2],
    7: hampers.find((h) => h.id === 'premium-rattan-box-hamper') || CATALOGUE_ITEMS[3],
    8: hampers.find((h) => h.id === 'nutrosa-pichwai-hamper') || CATALOGUE_ITEMS[4],
    9: hampers.find((h) => h.id === 'pack-of-5-premium-cookies') || CATALOGUE_ITEMS[5],
    10: hampers.find((h) => h.id === 'festive-premium-gift-bag') || CATALOGUE_ITEMS[6],
    11: hampers.find((h) => h.id === 'festive-cookie-gift-bag-classic') || CATALOGUE_ITEMS[7],
    12: hampers.find((h) => h.id === 'festive-cookie-gift-bag-healthy') || CATALOGUE_ITEMS[8],
    13: hampers.find((h) => h.id === 'mini-jute-bag-hamper') || CATALOGUE_ITEMS[9],
    14: hampers.find((h) => h.id === 'premium-luxurious-velvet-party-box') || CATALOGUE_ITEMS[10],
    15: hampers.find((h) => h.id === 'assorted-truffles-pack-of-12') || CATALOGUE_ITEMS[11]
  };

  const currentHamper = pageToHamperMap[currentPage];

  const isDarkPage = [2, 3, 5, 7, 9, 11, 13, 15, 16, 17].includes(currentPage);

  const nextPage = () => {
    festiveAudio.playClink();
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  };
  const prevPage = () => {
    festiveAudio.playClink();
    setCurrentPage((p) => Math.max(1, p - 1));
  };

  return (
    <div className="space-y-6">
      {/* Catalogue Book Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DEC8] shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#8C6D38]">
            Official Brochure Mode
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-xs text-stone-600 font-medium">
            Page <strong className="text-stone-900">{currentPage}</strong> of {totalPages}
          </span>
        </div>

        {/* Quick Page Jump Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-stone-500 hidden sm:inline">Jump to:</label>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#142C20]"
          >
            <option value={1}>Page 1: Title Cover</option>
            <option value={2}>Page 2: About Us & Founder</option>
            <option value={3}>Page 3: Segments We Offer</option>
            <option value={4}>Page 4: Perfect Diwali Healthy Hamper</option>
            <option value={5}>Page 5: Festive Cookie & Candle Box</option>
            <option value={6}>Page 6: Elegant Festive Trio Box</option>
            <option value={7}>Page 7: Nutrosa Premium Rattan Box Hamper</option>
            <option value={8}>Page 8: Nutrosa Pichwai Hamper</option>
            <option value={9}>Page 9: Pack of 5 Center-Filled Cookies</option>
            <option value={10}>Page 10: Festive Premium Gift Bag</option>
            <option value={11}>Page 11: Festive Cookie Gift Bag (Classic)</option>
            <option value={12}>Page 12: Festive Cookie Gift Bag (Healthy)</option>
            <option value={13}>Page 13: Mini Jute Bag Hamper</option>
            <option value={14}>Page 14: Premium Velvet Party Box</option>
            <option value={15}>Page 15: Assorted Truffles – Box of 12</option>
            <option value={16}>Page 16: Nutrosa Craft Promise</option>
            <option value={17}>Page 17: Official Back Cover & Contact</option>
          </select>

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The Digital Catalogue Page Container */}
      <div
        className={`relative w-full rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[580px] sm:min-h-[640px] ${
          isDarkPage
            ? 'bg-[#183928] border-[#D4AF37]/50 text-stone-100'
            : 'bg-[#F9F4EB] border-[#D4AF37]/40 text-stone-900'
        }`}
      >
        {/* Top Scalloped Festive Toran Border */}
        <FestiveBorder isDark={isDarkPage} />

        {/* Page Body Content */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
          {/* PAGE 1: COVER PAGE */}
          {currentPage === 1 && (
            <div className="max-w-3xl mx-auto w-full py-8 text-center space-y-6">
              {/* Grand Mughal / Rajput Scalloped Arch Crest */}
              <div className="relative mx-auto max-w-md p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37] bg-[#143122] text-stone-100 shadow-2xl space-y-4">
                {/* Lit Diya at top of arch */}
                <div className="mx-auto w-10 h-10 flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-8 h-8">
                    <circle cx="20" cy="20" r="18" fill="#D4AF37" opacity="0.3" />
                    <ellipse cx="20" cy="24" rx="14" ry="7" fill="#B45309" stroke="#FDE047" strokeWidth="1" />
                    <ellipse cx="20" cy="16" rx="3" ry="6" fill="#F59E0B" />
                    <ellipse cx="20" cy="17" rx="1.5" ry="3" fill="#FFFDE7" />
                  </svg>
                </div>

                <div className="text-3xl sm:text-5xl font-bold font-serif-heading tracking-widest text-[#FDFBF7]">
                  NUTRO<span className="text-amber-400">✿</span>SA
                </div>

                <div className="py-2 border-y border-[#D4AF37]/40">
                  <div className="text-xl sm:text-2xl font-normal font-serif-heading tracking-wider text-amber-200">
                    DIWALI CATALOGUE
                  </div>
                  <div className="text-xs text-amber-100/80 italic mt-1">
                    "let us spread happiness and joy all around us"
                  </div>
                </div>

                <div className="text-2xl font-serif-heading font-semibold text-amber-300">
                  2026
                </div>

                {/* Subtle cookie bite emblem */}
                <div className="pt-2 text-amber-300/80 text-xl">
                  🍪
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={nextPage}
                  className="px-6 py-2.5 bg-[#142C20] text-amber-200 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md hover:bg-[#1A3A28]"
                >
                  Turn Page To Hampers →
                </button>
              </div>
            </div>
          )}

          {/* PAGE 2: ABOUT US & OWNER */}
          {currentPage === 2 && (
            <div className="max-w-4xl mx-auto w-full py-4 space-y-8">
              <div className="text-center">
                <div className="text-3xl font-bold font-serif-heading tracking-widest text-white">
                  NUTRO<span className="text-amber-400">✿</span>SA
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-stone-200">
                <div className="space-y-3 bg-[#11281C] p-6 rounded-2xl border border-amber-500/30">
                  <h3 className="text-xl font-serif-heading text-amber-300">About us</h3>
                  <p className="text-xs leading-relaxed text-stone-300">
                    Nutrosa brings you premium cookies, crackers, and bites a perfect blend of everyday indulgence and festive gifting.
                  </p>
                  <h4 className="text-base font-serif-heading text-amber-300 pt-3">Why us?</h4>
                  <ul className="text-xs space-y-1.5 text-stone-300">
                    <li className="flex items-center gap-2">✦ Premium Ingredients</li>
                    <li className="flex items-center gap-2">✦ No preservatives</li>
                    <li className="flex items-center gap-2">✦ Wholesome Variety</li>
                    <li className="flex items-center gap-2">✦ Perfect for Gifting</li>
                    <li className="flex items-center gap-2">✦ Pan India delivery</li>
                  </ul>
                </div>

                <div className="space-y-3 bg-[#11281C] p-6 rounded-2xl border border-amber-500/30">
                  <h3 className="text-xl font-serif-heading text-amber-300">About The Owner</h3>
                  <p className="text-xs leading-relaxed text-stone-300">
                    Nutrosa, founded by <strong className="text-white">Prachi Kasliwal Kala</strong>, is a passion-born brand that blends premium taste, quality, and the joy of sharing sweet moments.
                  </p>
                  <h4 className="text-base font-serif-heading text-amber-300 pt-3">Our Promise</h4>
                  <p className="text-xs leading-relaxed text-stone-300">
                    Nutrosa crafts every bite with love and premium quality, bringing you freshness, taste, and joy in every moment.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: SEGMENTS WE OFFER */}
          {currentPage === 3 && (
            <div className="max-w-4xl mx-auto w-full py-6 text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl font-serif-heading tracking-widest text-amber-300">
                SEGMENTS WE OFFER
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                <div className="bg-[#11281C] p-8 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="text-4xl">📅</div>
                  <h3 className="text-xl font-serif-heading text-white">Events</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Celebrations, Diwali party favors, puja gifts & wedding announcements.
                  </p>
                </div>

                <div className="bg-[#11281C] p-8 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="text-4xl">🎁</div>
                  <h3 className="text-xl font-serif-heading text-white">Gifting</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Personalized festive gift boxes and royal artisan keepsakes.
                  </p>
                </div>

                <div className="bg-[#11281C] p-8 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="text-4xl">🛒</div>
                  <h3 className="text-xl font-serif-heading text-white">Bulk Buying</h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Corporate gifting packages with custom brand sleeves and tier discounts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAGES 4 TO 15: AUTHENTIC PRODUCT PAGES */}
          {currentPage >= 4 && currentPage <= 15 && currentHamper && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full">
              {/* Left Column: Authentic Copy & PDF Table */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xl font-bold font-serif-heading tracking-wider">
                  NUTRO<span className="text-amber-500">✿</span>SA
                </div>

                <h3 className={`text-2xl sm:text-3xl font-serif-heading font-medium leading-tight ${isDarkPage ? 'text-amber-200' : 'text-stone-900'}`}>
                  {currentHamper.title}
                </h3>

                <p className={`text-xs leading-relaxed font-light ${isDarkPage ? 'text-stone-300' : 'text-stone-700'}`}>
                  {currentHamper.tagline}
                </p>

                {/* What make me special / Curated Delights */}
                <div className="space-y-2 pt-2">
                  <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDarkPage ? 'text-amber-300' : 'text-[#8C6D38]'}`}>
                    <span>✦</span> What make me special / Curated Delights:
                  </div>
                  <ul className={`text-xs space-y-1.5 ${isDarkPage ? 'text-stone-200' : 'text-stone-800'}`}>
                    {currentHamper.contents.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-amber-500 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* The Exact PDF Quantity vs Cost Table */}
                <div className="pt-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-1.5 text-amber-500">
                    Quantity Rate Card (INR):
                  </div>
                  <table className={`w-full text-xs border rounded-lg overflow-hidden ${isDarkPage ? 'border-amber-500/40 bg-black/20' : 'border-amber-700/30 bg-white'}`}>
                    <thead>
                      <tr className={`${isDarkPage ? 'bg-emerald-950/80 text-amber-300' : 'bg-[#EADDC9] text-stone-900'} font-bold`}>
                        <th className="py-1.5 px-3 text-left">Quantity Slab</th>
                        <th className="py-1.5 px-3 text-right">Cost Per Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-500/20 tabular-nums">
                      {currentHamper.priceTiers.map((tier, idx) => (
                        <tr key={idx} className="hover:bg-amber-500/10 transition-colors">
                          <td className="py-1.5 px-3 font-medium">{tier.label}</td>
                          <td className="py-1.5 px-3 text-right font-bold text-amber-400 sm:text-inherit">
                            ₹{tier.pricePerUnit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Instant Actions on Page */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onSelectHamper(currentHamper)}
                    className="px-4 py-2 border border-amber-500/40 hover:border-amber-500 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Inspect Full Details
                  </button>

                  {onUnboxHamper && (
                    <button
                      onClick={() => onUnboxHamper(currentHamper)}
                      className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <PackageOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>Virtual Unbox</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      festiveAudio.playClink();
                      onAddToQuote(currentHamper, 30);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm cursor-pointer hover:brightness-105 flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add 30 Units</span>
                  </button>
                </div>
              </div>

              {/* Right Column: High-Fidelity Realistic Image Showcase */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="w-full max-w-md rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl">
                  <HamperVisualShowcase hamper={currentHamper} size="md" />
                </div>
              </div>
            </div>
          )}

          {/* PAGE 16: PHILOSOPHY */}
          {currentPage === 16 && (
            <div className="max-w-3xl mx-auto w-full py-12 text-center space-y-6">
              <div className="text-3xl font-bold font-serif-heading tracking-widest text-white">
                NUTRO<span className="text-amber-400">✿</span>SA
              </div>

              <blockquote className="text-lg sm:text-2xl font-serif-heading italic leading-relaxed text-amber-100 max-w-2xl mx-auto">
                "At Nutrosa, we craft cookies, crackers, and bites with premium ingredients and love. From soft-baked cookies to millet treats, brownies and mini nibbles, every bite is pure delight perfect for everyday indulgence or festive gifting."
              </blockquote>

              <div className="pt-4 text-xs tracking-widest uppercase text-amber-400 font-semibold">
                Nutrosa Bakery · Festive Collection 2026
              </div>
            </div>
          )}

          {/* PAGE 17: BACK COVER & DIRECT CONTACT */}
          {currentPage === 17 && (
            <div className="max-w-3xl mx-auto w-full py-8 text-center space-y-6">
              <div className="text-3xl sm:text-4xl font-bold font-serif-heading tracking-widest text-white">
                NUTRO<span className="text-amber-400">✿</span>SA
              </div>

              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                Nutrosa blends the art of baking with modern indulgence, crafting premium cookies, crackers, and bites for every occasion. We also offer bespoke gifting, curating hampers and treats tailored to your unique taste.
              </p>

              <div className="py-6 border-y border-amber-500/30 max-w-md mx-auto space-y-3">
                <div className="text-sm font-bold uppercase tracking-widest text-amber-300">
                  CONTACT US
                </div>
                <div className="text-2xl font-bold font-serif-heading text-white">
                  NUTROSA BAKERY
                </div>

                <div className="text-xs space-y-2 text-stone-200">
                  <div className="flex items-center justify-center gap-2">
                    <Instagram className="w-4 h-4 text-amber-400" />
                    <span>{BRAND_INFO.contacts.instagram}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span className="tabular-nums">{BRAND_INFO.contacts.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400" />
                    <span>{BRAND_INFO.contacts.email}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>{BRAND_INFO.contacts.website}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Prachi! I am contacting you through the Nutrosa 2026 Diwali catalogue.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Scalloped Festive Toran Border */}
        <FestiveBorder isDark={isDarkPage} />

        {/* Bottom Page Navigation Controls */}
        <div className="p-3 bg-black/40 backdrop-blur-md flex items-center justify-between text-xs text-stone-300">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-1 hover:text-white disabled:opacity-20 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="tabular-nums">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 hover:text-white disabled:opacity-20 cursor-pointer"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
