import React, { useState, useMemo, useEffect } from 'react';
import { CATALOGUE_ITEMS, BRAND_INFO } from './data/catalogue';
import { HamperItem, QuoteCartItem } from './types';
import { useCatalogue } from './utils/catalogueStore';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { HamperModal } from './components/HamperModal';
import { BulkQuoteDrawer } from './components/BulkQuoteDrawer';
import { BespokeHamperBuilder } from './components/BespokeHamperBuilder';
import { PersonalizedGiftingConcierge } from './components/PersonalizedGiftingConcierge';
import { CatalogueBookView } from './components/CatalogueBookView';
import { BrandStory } from './components/BrandStory';
import { SampleRequestModal } from './components/SampleRequestModal';
import { BrochurePhotoUploaderModal } from './components/BrochurePhotoUploaderModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { DiyaLightingBar } from './components/DiyaLightingBar';
import { InteractiveUnboxingModal } from './components/InteractiveUnboxingModal';
import { HamperCompareModal } from './components/HamperCompareModal';
import { CorporateBudgetCalculator } from './components/CorporateBudgetCalculator';
import { FestiveFortuneSpinner } from './components/FestiveFortuneSpinner';
import { FestiveDock } from './components/FestiveDock';
import { Footer } from './components/Footer';
import { Search, Sparkles, Filter, Check, ShoppingBag, ArrowRight, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const { hampers } = useCatalogue();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalHamper, setActiveModalHamper] = useState<HamperItem | null>(null);
  const [isQuoteDrawerOpen, setIsQuoteDrawerOpen] = useState<boolean>(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState<boolean>(false);
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [adminTargetHamperId, setAdminTargetHamperId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'storefront' | 'brochure'>('storefront');

  // Interactive Perks, Unboxing & Comparison states
  const [appliedPerk, setAppliedPerk] = useState<string | null>(
    'Diwali Illumination Blessing: Complimentary Custom Branded Sleeves & Wax-Seal Note Cards'
  );
  const [isUnboxModalOpen, setIsUnboxModalOpen] = useState<boolean>(false);
  const [unboxHamper, setUnboxHamper] = useState<HamperItem | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [compareInitialHamperId, setCompareInitialHamperId] = useState<string | null>(null);

  // Quote cart state
  const [cartItems, setCartItems] = useState<QuoteCartItem[]>(() => [
    // Seed with a default corporate sample item so the drawer is immediately illustrative
    {
      hamper: hampers[0] || CATALOGUE_ITEMS[0], // Perfect Diwali Healthy Hamper
      quantity: 50,
      unitPrice: 550,
      totalPrice: 27500
    }
  ]);

  // Keep cart items and active modal hamper in sync when prices are updated in Admin Panel
  useEffect(() => {
    setCartItems((prev) =>
      prev.map((item) => {
        const fresh = hampers.find((h) => h.id === item.hamper.id);
        if (!fresh) return item;
        const tier =
          fresh.priceTiers.find(
            (t) => item.quantity >= t.minQty && (t.maxQty === undefined || item.quantity <= t.maxQty)
          ) || fresh.priceTiers[fresh.priceTiers.length - 1];
        const unitPrice = tier ? tier.pricePerUnit : fresh.basePrice;
        return {
          ...item,
          hamper: fresh,
          unitPrice,
          totalPrice: unitPrice * item.quantity
        };
      })
    );
  }, [hampers]);

  const handleOpenAdminPanel = (hamperId?: string) => {
    setAdminTargetHamperId(hamperId || null);
    setIsAdminPanelOpen(true);
  };

  const categories = [
    { id: 'all', label: 'All 12 Hampers' },
    { id: 'healthy', label: 'Healthy & Millet (Gluten-Free)' },
    { id: 'luxury', label: 'Royal Keepsakes & Velvet' },
    { id: 'festive-boxes', label: 'Festive Classic Boxes' },
    { id: 'jute-bags', label: 'Eco-Luxe Jute Bags' },
    { id: 'cookies', label: 'Center-Filled Cookies & Truffles' },
    { id: 'budget', label: 'Favors Under ₹600' }
  ];

  // Filter products
  const filteredHampers = useMemo(() => {
    return hampers.filter((item) => {
      // Category check
      if (selectedCategory === 'healthy') {
        if (item.category !== 'Healthy & Millet') return false;
      } else if (selectedCategory === 'luxury') {
        if (item.category !== 'Ultra Luxury' && item.category !== 'Heritage & Pichwai') return false;
      } else if (selectedCategory === 'festive-boxes') {
        if (item.category !== 'Festive Boxes') return false;
      } else if (selectedCategory === 'jute-bags') {
        if (item.category !== 'Eco Jute Bags') return false;
      } else if (selectedCategory === 'cookies') {
        if (item.category !== 'Gourmet Cookies' && item.category !== 'Chocolates') return false;
      } else if (selectedCategory === 'budget') {
        if (item.minPrice > 600) return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesContents = item.contents.some((c) => c.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSubtitle && !matchesContents) return false;
      }

      return true;
    });
  }, [hampers, selectedCategory, searchQuery]);

  // Keep active modal hamper updated with fresh prices/images
  useEffect(() => {
    if (activeModalHamper) {
      const fresh = hampers.find((h) => h.id === activeModalHamper.id);
      if (fresh) setActiveModalHamper(fresh);
    }
  }, [hampers, activeModalHamper?.id]);

  // Cart operations
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToQuote = (hamper: HamperItem, qty: number) => {
    // Find tier unit price
    const tier =
      hamper.priceTiers.find(
        (t) => qty >= t.minQty && (t.maxQty === undefined || qty <= t.maxQty)
      ) || hamper.priceTiers[hamper.priceTiers.length - 1];
    const unitPrice = tier ? tier.pricePerUnit : hamper.basePrice;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.hamper.id === hamper.id);
      if (existing) {
        const newQty = existing.quantity + qty;
        const newTier =
          hamper.priceTiers.find(
            (t) => newQty >= t.minQty && (t.maxQty === undefined || newQty <= t.maxQty)
          ) || hamper.priceTiers[hamper.priceTiers.length - 1];
        const newUnitPrice = newTier ? newTier.pricePerUnit : hamper.basePrice;

        return prev.map((i) =>
          i.hamper.id === hamper.id
            ? {
                ...i,
                quantity: newQty,
                unitPrice: newUnitPrice,
                totalPrice: newUnitPrice * newQty
              }
            : i
        );
      } else {
        return [
          ...prev,
          {
            hamper,
            quantity: qty,
            unitPrice,
            totalPrice: unitPrice * qty
          }
        ];
      }
    });

    showToast(`Added ${qty} × "${hamper.title}" to proposal.`);
  };

  const handleLoadAllocation = (items: { hamper: HamperItem; qty: number }[]) => {
    items.forEach(({ hamper, qty }) => {
      handleAddToQuote(hamper, qty);
    });
    setIsQuoteDrawerOpen(true);
    showToast(`Loaded team & VIP client hampers into proposal!`);
  };

  const handleUpdateCartQuantity = (hamperId: string, newQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.hamper.id === hamperId) {
          const tier =
            item.hamper.priceTiers.find(
              (t) => newQty >= t.minQty && (t.maxQty === undefined || newQty <= t.maxQty)
            ) || item.hamper.priceTiers[item.hamper.priceTiers.length - 1];
          const unitPrice = tier ? tier.pricePerUnit : item.hamper.basePrice;
          return {
            ...item,
            quantity: newQty,
            unitPrice,
            totalPrice: unitPrice * newQty
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (hamperId: string) => {
    setCartItems((prev) => prev.filter((i) => i.hamper.id !== hamperId));
  };

  const totalCartUnits = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-stone-900 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#142C20] text-amber-200 px-5 py-3 rounded-xl shadow-2xl border border-amber-500/40 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsQuoteDrawerOpen(true)}
            className="ml-2 underline text-white hover:text-amber-300 cursor-pointer"
          >
            View Proposal
          </button>
        </div>
      )}

      {/* Top Auspicious Interactive Diya Lighting Bar */}
      <div id="diya-bar">
        <DiyaLightingBar
          onUnlockPerk={(perk) => {
            setAppliedPerk(perk);
            showToast(`✨ Auspicious Blessing: ${perk}`);
          }}
        />
      </div>

      {/* Header */}
      <Header
        totalItemsInQuote={totalCartUnits}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        onOpenAdminPanel={() => handleOpenAdminPanel()}
      />

      {/* Executive Corporate Gifting Command Center */}
      <Hero
        onExploreClick={() => {
          const el = document.getElementById('hampers');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSampleModal={() => setIsSampleModalOpen(true)}
        onOpenBespoke={() => {
          const el = document.getElementById('bespoke-builder');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenConcierge={() => {
          const el = document.getElementById('personalized-concierge');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenCompareModal={() => {
          setCompareInitialHamperId(null);
          setIsCompareModalOpen(true);
        }}
        onScrollToBudget={() => {
          const el = document.getElementById('budget-calculator');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        activeCategory={selectedCategory}
        viewMode={viewMode}
        onToggleViewMode={(mode) => setViewMode(mode)}
        onOpenAdminPanel={() => handleOpenAdminPanel()}
      />

      {/* Main Catalogue Section */}
      <main id="hampers" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-10">
        {/* Section Title & View Mode Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 border-b border-[#E8DEC8] pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              Diwali 2026 Curated Collection
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif-heading text-[#142C20] mt-1">
              Explore Our Festive Hampers
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl font-light">
              Review tiered bulk pricing slabs, ingredient profiles, transit-safe packaging specs, or try virtual 3D unboxing.
            </p>
          </div>

          {/* Mode Switcher Toggle, Photo Placement & Compare Action */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
            <button
              onClick={() => {
                setCompareInitialHamperId(null);
                setIsCompareModalOpen(true);
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-[#D5C6AF] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Compare hampers side-by-side"
            >
              <span>Compare Specs</span>
            </button>

            <button
              onClick={() => setIsPhotoUploaderOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Upload your camera photos from the brochure"
            >
              <Camera className="w-3.5 h-3.5 text-amber-800" />
              <span>Place Brochure Photos</span>
            </button>

            <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
              <button
                onClick={() => setViewMode('storefront')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === 'storefront'
                    ? 'bg-[#142C20] text-amber-200 shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                Storefront Grid
              </button>
              <button
                onClick={() => setViewMode('brochure')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'brochure'
                    ? 'bg-[#142C20] text-amber-200 shadow-sm'
                    : 'text-stone-700 hover:text-stone-900'
                }`}
              >
                <span>Brochure Mode (17 Pages)</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-900 px-1.5 py-0.2 rounded font-bold">PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* View Mode: Official Brochure Flipbook Mode (Pages 1 to 17) */}
        {viewMode === 'brochure' ? (
          <CatalogueBookView
            onSelectHamper={(h) => setActiveModalHamper(h)}
            onAddToQuote={handleAddToQuote}
            onUnboxHamper={(h) => {
              setUnboxHamper(h);
              setIsUnboxModalOpen(true);
            }}
          />
        ) : (
          <>
            {/* Search Input & Interactive Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#142C20] text-amber-200 shadow-sm'
                        : 'bg-white text-stone-700 hover:text-stone-900 border border-[#E6DACB] hover:border-stone-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search cookies, diyas, mathri..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#D5C6AF] rounded-lg text-xs focus:outline-none focus:border-[#142C20]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Product Cards Grid with Virtual Unbox & Compare Buttons */}
            {filteredHampers.length === 0 ? (
              <div className="py-20 text-center space-y-3 bg-white rounded-2xl border border-[#E8DEC8]">
                <h3 className="text-lg font-serif-heading text-stone-800">
                  No hampers matched your filter
                </h3>
                <p className="text-xs text-stone-500">
                  Try adjusting your search query or reset the category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#142C20] text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Show All Hampers
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredHampers.map((hamper, idx) => (
                  <ProductCard
                    key={hamper.id}
                    hamper={hamper}
                    index={idx}
                    onSelectHamper={(h) => setActiveModalHamper(h)}
                    onAddToQuote={handleAddToQuote}
                    onUnboxHamper={(h) => {
                      setUnboxHamper(h);
                      setIsUnboxModalOpen(true);
                    }}
                    onCompareHamper={(h) => {
                      setCompareInitialHamperId(h.id);
                      setIsCompareModalOpen(true);
                    }}
                    onEditHamper={(h) => handleOpenAdminPanel(h.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Corporate Trust Banner */}
        <div className="bg-[#142C20] text-stone-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#2B5541]">
          <div className="space-y-1">
            <h3 className="text-xl font-normal font-serif-heading text-stone-50">
              Ordering for 50+ clients or employees?
            </h3>
            <p className="text-xs text-stone-300 max-w-xl font-light">
              We provide complimentary company logo branded sleeves, personalized festive message cards, and staggered Pan-India shipping to individual client addresses.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsSampleModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-900/60 hover:bg-emerald-900 text-stone-100 border border-emerald-600/40 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
            >
              Request Tasting Box
            </button>
            <button
              onClick={() => setIsQuoteDrawerOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:brightness-105 transition-all"
            >
              Generate Proposal
            </button>
          </div>
        </div>
      </main>

      {/* Smart Personalized Gifting Concierge */}
      <PersonalizedGiftingConcierge
        onSelectHamper={(h) => setActiveModalHamper(h)}
        onAddToQuote={handleAddToQuote}
      />

      {/* Corporate Budget Allocation Calculator */}
      <div id="budget-calculator" className="scroll-mt-20">
        <CorporateBudgetCalculator
          onLoadAllocationToQuote={handleLoadAllocation}
        />
      </div>

      {/* Bespoke Hamper Builder Studio */}
      <BespokeHamperBuilder onAddCustomHamperToQuote={handleAddToQuote} />

      {/* Diwali 2026 Fortune & Card Draw Tradition */}
      <div id="fortune-draw" className="scroll-mt-20">
        <FestiveFortuneSpinner
          onApplyPerk={(perk) => {
            setAppliedPerk(perk);
            showToast(`🎁 Claimed: "${perk}" applied to proposal!`);
          }}
        />
      </div>

      {/* Brand Story & Segments We Offer */}
      <BrandStory />

      {/* Footer */}
      <Footer onOpenAdminPanel={() => handleOpenAdminPanel()} />

      {/* Floating Interactive Festive Action Dock */}
      <FestiveDock
        totalCartUnits={totalCartUnits}
        onOpenQuoteDrawer={() => setIsQuoteDrawerOpen(true)}
        onOpenUnboxModal={() => {
          setUnboxHamper(hampers[0] || CATALOGUE_ITEMS[0]);
          setIsUnboxModalOpen(true);
        }}
        onOpenCompareModal={() => {
          setCompareInitialHamperId(null);
          setIsCompareModalOpen(true);
        }}
        onScrollToBudget={() => {
          document.getElementById('budget-calculator')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToFortune={() => {
          document.getElementById('fortune-draw')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onScrollToDiyas={() => {
          document.getElementById('diya-bar')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hamper Detail Modal */}
      <HamperModal
        hamper={activeModalHamper}
        onClose={() => setActiveModalHamper(null)}
        onAddToQuote={handleAddToQuote}
        onOpenUnbox={(h) => {
          setUnboxHamper(h);
          setIsUnboxModalOpen(true);
        }}
        onOpenAdmin={(h) => handleOpenAdminPanel(h.id)}
      />

      {/* Interactive 3D Virtual Unboxing Modal */}
      <InteractiveUnboxingModal
        hamper={unboxHamper || activeModalHamper || hampers[0] || CATALOGUE_ITEMS[0]}
        isOpen={isUnboxModalOpen}
        onClose={() => setIsUnboxModalOpen(false)}
        onAddToQuote={handleAddToQuote}
      />

      {/* Side-by-Side Comparison Matrix Modal */}
      <HamperCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onAddToQuote={handleAddToQuote}
        initialHamperId={compareInitialHamperId}
      />

      {/* Bulk Quote & Printable Proposal Drawer */}
      <BulkQuoteDrawer
        isOpen={isQuoteDrawerOpen}
        onClose={() => setIsQuoteDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        appliedPerk={appliedPerk}
      />

      {/* Corporate Sample Tasting Request Modal */}
      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />

      {/* Brochure Real Photo Placement Modal */}
      <BrochurePhotoUploaderModal
        isOpen={isPhotoUploaderOpen}
        onClose={() => setIsPhotoUploaderOpen(false)}
      />

      {/* Bakery Admin Desk: Image & Price Manager */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        targetHamperId={adminTargetHamperId}
      />
    </div>
  );
}
