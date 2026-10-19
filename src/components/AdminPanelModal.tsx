import React, { useState, useEffect, useRef } from 'react';
import { CATALOGUE_ITEMS } from '../data/catalogue';
import { HamperItem, PriceTier } from '../types';
import {
  useCatalogue,
  savePriceOverride,
  removePriceOverride,
  resetAllPriceOverrides,
  exportAdminConfiguration,
  importAdminConfiguration,
  PriceOverride
} from '../utils/catalogueStore';
import {
  getCustomHamperImages,
  saveCustomHamperImage,
  removeCustomHamperImage,
  resetAllCustomHamperImages,
  processUploadedImage
} from '../utils/imageStorage';
import { HamperVisualShowcase } from './HamperVisualShowcase';
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Camera,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Sparkles,
  Search,
  Filter,
  Download,
  Tag,
  Save,
  Eye,
  SlidersHorizontal,
  Image as ImageIcon,
  AlertCircle,
  TrendingDown,
  Layers,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/festiveAudio';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetHamperId?: string | null;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  targetHamperId
}) => {
  const { hampers, priceOverrides, customImages, hasCustomPrice, hasCustomImage, refreshCatalogue } =
    useCatalogue();

  // Mobile view tab state ('list' | 'editor')
  const [mobileTab, setMobileTab] = useState<'list' | 'editor'>('editor');

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nutrosa_admin_authenticated') === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterMode, setFilterMode] = useState<'all' | 'custom-price' | 'custom-image' | 'category'>(
    'all'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHamperId, setSelectedHamperId] = useState<string | null>(null);

  // Form edit states for the currently inspected hamper
  const [editedBasePrice, setEditedBasePrice] = useState<number>(0);
  const [editedMinPrice, setEditedMinPrice] = useState<number>(0);
  const [editedPriceTiers, setEditedPriceTiers] = useState<PriceTier[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Import / Export dialog
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Curated sample photography presets for quick 1-click preview
  const FESTIVE_SAMPLE_PHOTOS = [
    {
      name: 'Artisanal Cookies',
      url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Diwali Mithai & Bakes',
      url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Belgian Truffles',
      url: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=80'
    },
    {
      name: 'Festive Keepsake',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80'
    }
  ];

  // Initialize selected hamper
  useEffect(() => {
    if (isOpen) {
      if (targetHamperId) {
        setSelectedHamperId(targetHamperId);
        setMobileTab('editor');
      } else if (!selectedHamperId && hampers.length > 0) {
        setSelectedHamperId(hampers[0].id);
      }
    }
  }, [isOpen, targetHamperId, hampers]);

  // Sync form inputs whenever selected hamper changes
  useEffect(() => {
    if (!selectedHamperId) return;
    const current = hampers.find((h) => h.id === selectedHamperId);
    if (current) {
      setEditedBasePrice(current.basePrice);
      setEditedMinPrice(current.minPrice);
      setEditedPriceTiers(JSON.parse(JSON.stringify(current.priceTiers)));
      setImageUrlInput(customImages[current.id] && !customImages[current.id].startsWith('data:') ? customImages[current.id] : '');
      setSaveSuccessMsg(null);
    }
  }, [selectedHamperId, hampers, customImages]);

  if (!isOpen) return null;

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const entered = pinInput.trim();
    const customPin = localStorage.getItem('nutrosa_admin_custom_pin');
    
    // Check against configured or standard administrative passcodes
    const isValid =
      entered === '2026' ||
      entered.toLowerCase() === 'nutrosa' ||
      entered.toLowerCase() === 'nutrosa2026' ||
      (customPin && entered === customPin);

    if (isValid) {
      setIsAuthenticated(true);
      localStorage.setItem('nutrosa_admin_authenticated', 'true');
      setAuthError(null);
      festiveAudio.playSparkle();
    } else {
      setAuthError('Incorrect passcode. Please enter valid administrative credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('nutrosa_admin_authenticated');
    setPinInput('');
  };

  const currentHamper = hampers.find((h) => h.id === selectedHamperId) || hampers[0];

  // Save price updates
  const handleSavePrices = () => {
    if (!currentHamper) return;

    if (editedBasePrice <= 0) {
      alert('Base price must be greater than zero.');
      return;
    }

    if (editedMinPrice <= 0 || editedMinPrice > editedBasePrice) {
      alert('Minimum bulk price must be greater than zero and less than or equal to the Base Price.');
      return;
    }

    const newOverride: PriceOverride = {
      basePrice: Number(editedBasePrice),
      minPrice: Number(editedMinPrice),
      priceTiers: editedPriceTiers.map((t) => ({
        ...t,
        pricePerUnit: Number(t.pricePerUnit)
      }))
    };

    savePriceOverride(currentHamper.id, newOverride);
    festiveAudio.playClink();
    setSaveSuccessMsg(`Prices saved! Live updates applied across entire store for "${currentHamper.title}".`);
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.5 }
    });
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Reset prices for this single hamper
  const handleResetHamperPrice = () => {
    if (!currentHamper) return;
    const original = CATALOGUE_ITEMS.find((h) => h.id === currentHamper.id);
    if (!original) return;

    if (confirm(`Reset prices for "${currentHamper.title}" to factory defaults (Base: ₹${original.basePrice}, Min: ₹${original.minPrice})?`)) {
      removePriceOverride(currentHamper.id);
      setEditedBasePrice(original.basePrice);
      setEditedMinPrice(original.minPrice);
      setEditedPriceTiers(JSON.parse(JSON.stringify(original.priceTiers)));
      festiveAudio.playSparkle();
      setSaveSuccessMsg(`Restored factory default prices for "${currentHamper.title}".`);
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    }
  };

  // Auto-generate bulk discount tiers
  const handleAutoGenerateTiers = () => {
    if (editedBasePrice <= 0 || editedMinPrice <= 0 || editedMinPrice >= editedBasePrice) {
      alert('Please set a valid Base Price and a lower Minimum Bulk Price first.');
      return;
    }

    // Standard 5 volume steps
    const range = editedBasePrice - editedMinPrice;
    const tierSteps = [
      { minQty: 1, maxQty: 29, pricePerUnit: Math.round(editedBasePrice), label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: Math.round(editedBasePrice - range * 0.15), label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: Math.round(editedBasePrice - range * 0.35), label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: Math.round(editedBasePrice - range * 0.65), label: '100+ units' },
      { minQty: 200, pricePerUnit: Math.round(editedMinPrice), label: '200+ units' }
    ];

    setEditedPriceTiers(tierSteps);
    festiveAudio.playClink();
  };

  // Image Upload Handlers
  const handleImageFileUpload = async (file: File) => {
    if (!currentHamper) return;
    try {
      setIsUploading(true);
      const dataUrl = await processUploadedImage(file);
      saveCustomHamperImage(currentHamper.id, dataUrl);
      refreshCatalogue();
      festiveAudio.playSparkle();
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.6 } });
      setSaveSuccessMsg(`New photo saved and locked onto "${currentHamper.title}"!`);
      setTimeout(() => setSaveSuccessMsg(null), 3500);
    } catch (err: any) {
      console.error('Image upload failed', err);
      alert(err?.message || 'Failed to process image file. Please choose a standard JPG, PNG, or WebP photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyImageUrl = (urlToApply?: string) => {
    if (!currentHamper) return;
    const targetUrl = (typeof urlToApply === 'string' ? urlToApply : imageUrlInput).trim();
    if (!targetUrl) {
      alert('Please enter or select an image URL.');
      return;
    }

    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://') && !targetUrl.startsWith('data:image/')) {
      alert('Please enter a valid web image URL (starting with https:// or http://).');
      return;
    }

    saveCustomHamperImage(currentHamper.id, targetUrl);
    setImageUrlInput(targetUrl);
    refreshCatalogue();
    festiveAudio.playSparkle();
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    setSaveSuccessMsg(`Image updated for "${currentHamper.title}".`);
    setTimeout(() => setSaveSuccessMsg(null), 3500);
  };

  const handleRemoveImage = () => {
    if (!currentHamper) return;
    if (confirm(`Remove custom photo and restore festive artwork for "${currentHamper.title}"?`)) {
      removeCustomHamperImage(currentHamper.id);
      setImageUrlInput('');
      refreshCatalogue();
      festiveAudio.playSparkle();
    }
  };

  // Global Reset
  const handleResetAllToDefaults = () => {
    if (
      confirm(
        '⚠️ RESET ALL:\nAre you sure you want to revert ALL hamper images and price overrides across the entire store back to the original 2026 catalogue defaults?'
      )
    ) {
      resetAllPriceOverrides();
      resetAllCustomHamperImages();
      refreshCatalogue();
      festiveAudio.playSparkle();
      alert('All prices and images have been restored to initial factory defaults.');
    }
  };

  // Export JSON
  const handleExportConfig = () => {
    const json = exportAdminConfiguration();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `nutrosa-catalogue-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    festiveAudio.playClink();
  };

  // Import JSON
  const handleImportConfig = () => {
    if (!importJsonText.trim()) {
      setImportStatus('Please paste JSON configuration text.');
      return;
    }
    const res = importAdminConfiguration(importJsonText);
    if (res.success) {
      refreshCatalogue();
      setImportStatus('✅ Configuration imported successfully!');
      festiveAudio.playSparkle();
      setTimeout(() => {
        setIsImportModalOpen(false);
        setImportStatus(null);
        setImportJsonText('');
      }, 1500);
    } else {
      setImportStatus(`❌ ${res.message}`);
    }
  };

  // Filtered hampers list
  const filteredHampersList = hampers.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filterMode === 'custom-price') {
      return hasCustomPrice(item.id);
    } else if (filterMode === 'custom-image') {
      return hasCustomImage(item.id);
    } else if (filterMode === 'category' && selectedCategory !== 'all') {
      return item.category === selectedCategory;
    }

    return true;
  });

  const customPriceCount = Object.keys(priceOverrides).length;
  const customImageCount = Object.keys(customImages).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#D5C6AF] overflow-hidden my-4 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#142C20] text-stone-100 flex items-center justify-between border-b border-[#2C523F] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-amber-300 uppercase tracking-widest font-bold">
                  Nutrosa Bakery Operations
                </span>
                <span className="text-[10px] bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 px-2 py-0.5 rounded-full font-medium">
                  Catalogue Admin Desk
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-normal font-serif-heading text-stone-50">
                Price & Image Manager
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 text-xs text-stone-300 hover:text-white px-3 py-1.5 rounded-lg border border-stone-600/60 hover:bg-stone-800/60 transition-colors cursor-pointer"
                title="Lock Admin Panel"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lock Panel</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto w-full">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif-heading text-stone-900">
                Authorized Bakery Access
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enter your administrative passcode to adjust prices, customize bulk quantity tiers,
                and update hamper brochure photos.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter administrative passcode"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setAuthError(null);
                  }}
                  autoFocus
                  className="w-full px-4 py-3 bg-white border border-[#D5C6AF] rounded-xl text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#142C20] shadow-inner"
                />
                {authError && (
                  <p className="text-xs text-red-600 mt-2 font-medium flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#142C20] hover:bg-[#1a3829] text-amber-300 font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Admin Desk</span>
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Mobile View Tab Switcher (< md) */}
            <div className="md:hidden flex items-center bg-[#FAF7F2] border-b border-[#E5D7C5] p-2 gap-2 shrink-0">
              <button
                onClick={() => setMobileTab('list')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mobileTab === 'list'
                    ? 'bg-[#142C20] text-amber-200 shadow-xs'
                    : 'bg-white text-stone-700 border border-[#D5C6AF]'
                }`}
              >
                <span>Select Hamper</span>
                <span className="text-[10px] bg-stone-800/40 px-1.5 py-0.2 rounded-full tabular-nums">
                  {hampers.length}
                </span>
              </button>
              <button
                onClick={() => setMobileTab('editor')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 truncate ${
                  mobileTab === 'editor'
                    ? 'bg-[#142C20] text-amber-200 shadow-xs'
                    : 'bg-white text-stone-700 border border-[#D5C6AF]'
                }`}
              >
                <span>Edit Photo & Prices</span>
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#E5D7C5]">
              {/* Left Sidebar: Hampers List & Filters */}
              <div
                className={`w-full md:w-80 lg:w-96 flex flex-col bg-[#F5EFE6]/60 shrink-0 ${
                  mobileTab === 'list' ? 'flex-1 overflow-hidden' : 'hidden md:flex'
                }`}
              >
              {/* Search & Statistics Bar */}
              <div className="p-4 border-b border-[#E5D7C5] space-y-3 bg-[#FAF7F2]">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search 12 hampers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#D5C6AF] rounded-xl text-xs focus:outline-none focus:border-[#142C20]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      filterMode === 'all'
                        ? 'bg-[#142C20] text-amber-200'
                        : 'bg-white text-stone-600 hover:bg-stone-200 border border-[#D5C6AF]'
                    }`}
                  >
                    All ({hampers.length})
                  </button>

                  <button
                    onClick={() => setFilterMode('custom-price')}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                      filterMode === 'custom-price'
                        ? 'bg-amber-700 text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-200 border border-[#D5C6AF]'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    Prices ({customPriceCount})
                  </button>

                  <button
                    onClick={() => setFilterMode('custom-image')}
                    className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer ${
                      filterMode === 'custom-image'
                        ? 'bg-emerald-800 text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-200 border border-[#D5C6AF]'
                    }`}
                  >
                    <Camera className="w-3 h-3" />
                    Photos ({customImageCount})
                  </button>
                </div>
              </div>

              {/* Hampers Scrollable List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {filteredHampersList.length === 0 ? (
                  <div className="p-6 text-center text-stone-500 text-xs">
                    No hampers match your active filter.
                  </div>
                ) : (
                  filteredHampersList.map((hamper) => {
                    const isSelected = hamper.id === selectedHamperId;
                    const hasPriceOverride = hasCustomPrice(hamper.id);
                    const hasPhotoOverride = hasCustomImage(hamper.id);

                    return (
                      <div
                        key={hamper.id}
                        onClick={() => {
                          setSelectedHamperId(hamper.id);
                          setMobileTab('editor');
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#FFFFFF] border-[#142C20] shadow-md ring-2 ring-[#142C20]/10'
                            : 'bg-white/80 border-[#E8DEC8] hover:bg-white hover:border-stone-400'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200">
                            {customImages[hamper.id] ? (
                              <img
                                src={customImages[hamper.id]}
                                alt={hamper.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-amber-400 text-sm font-serif">
                                ✤
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-stone-900 truncate">
                              {hamper.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs font-bold text-[#142C20] tabular-nums">
                                ₹{hamper.basePrice}
                              </span>
                              <span className="text-[10px] text-stone-500 tabular-nums">
                                (Bulk min: ₹{hamper.minPrice})
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              {hasPriceOverride && (
                                <span className="text-[9px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded font-semibold">
                                  Custom Price
                                </span>
                              )}
                              {hasPhotoOverride && (
                                <span className="text-[9px] bg-emerald-100 text-emerald-900 border border-emerald-300 px-1.5 py-0.2 rounded font-semibold">
                                  Custom Photo
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-stone-400 text-xs">›</div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Quick Tools Bar */}
              <div className="p-3 border-t border-[#E5D7C5] bg-[#FAF7F2] flex items-center justify-between text-xs text-stone-600 gap-2">
                <button
                  onClick={handleExportConfig}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#D5C6AF] hover:bg-stone-100 text-[11px] font-medium transition-colors cursor-pointer"
                  title="Export current price & image settings as JSON"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>Backup JSON</span>
                </button>

                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#D5C6AF] hover:bg-stone-100 text-[11px] font-medium transition-colors cursor-pointer"
                  title="Import previously saved settings"
                >
                  <Upload className="w-3.5 h-3.5 text-stone-600" />
                  <span>Restore</span>
                </button>

                <button
                  onClick={handleResetAllToDefaults}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-red-700 hover:bg-red-50 text-[11px] font-medium transition-colors cursor-pointer"
                  title="Reset all hampers to initial catalogue values"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* Right Pane: Selected Hamper Editor */}
            <div
              className={`flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 bg-[#FAF7F2] ${
                mobileTab === 'editor' ? 'block' : 'hidden md:block'
              }`}
            >
              {/* Mobile Back to List Button (< md) */}
              <div className="md:hidden flex items-center justify-between pb-2">
                <button
                  type="button"
                  onClick={() => setMobileTab('list')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D5C6AF] text-xs font-semibold text-[#142C20] cursor-pointer"
                >
                  <span>← Choose Another Hamper</span>
                </button>
                <span className="text-[11px] text-stone-500 font-mono">
                  {currentHamper.category}
                </span>
              </div>

              {/* Success Toast */}
              {saveSuccessMsg && (
                <div className="p-3.5 bg-emerald-900 text-emerald-100 rounded-xl border border-emerald-500/40 text-xs font-semibold flex items-center justify-between gap-2 shadow-lg animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{saveSuccessMsg}</span>
                  </div>
                  <span className="text-[10px] text-emerald-300">Live in preview</span>
                </div>
              )}

              {/* Hamper Title & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5D7C5]">
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-[#8C6D38] flex items-center gap-2">
                    <span>{currentHamper.category}</span>
                    <span>·</span>
                    <span>Hamper ID: {currentHamper.id}</span>
                  </div>
                  <h3 className="text-2xl font-serif-heading font-medium text-stone-900 mt-1">
                    {currentHamper.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">{currentHamper.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {hasCustomPrice(currentHamper.id) && (
                    <button
                      onClick={handleResetHamperPrice}
                      className="px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 bg-white border border-[#D5C6AF] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      title="Revert to original factory price for this hamper"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                      <span>Reset Price to Default</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Two Column Section: Image Manager & Price Manager */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 1. Image Manager (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-amber-700" />
                      <span>Product Photograph</span>
                    </h4>

                    {hasCustomImage(currentHamper.id) ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                        Custom Photo Active
                      </span>
                    ) : (
                      <span className="text-[10px] bg-stone-200 text-stone-700 font-medium px-2 py-0.5 rounded-full">
                        Default Artwork
                      </span>
                    )}
                  </div>

                  {/* Photo Preview Container with Drag & Drop */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleImageFileUpload(file);
                    }}
                    className={`relative rounded-2xl overflow-hidden border shadow-md bg-stone-900 h-56 sm:h-64 flex items-center justify-center transition-all ${
                      isDragging ? 'border-amber-400 ring-4 ring-amber-400/40 scale-[1.01]' : 'border-[#D5C6AF]'
                    }`}
                  >
                    <HamperVisualShowcase hamper={currentHamper} size="md" className="h-full" />
                    {isDragging && (
                      <div className="absolute inset-0 bg-stone-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-amber-300 z-30 pointer-events-none">
                        <Upload className="w-9 h-9 animate-bounce mb-2 text-amber-300" />
                        <span className="text-xs font-bold tracking-wide">Drop photo here to upload</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleImageFileUpload(file);
                    }}
                    className={`space-y-3 bg-white p-4 rounded-2xl border transition-all ${
                      isDragging ? 'border-amber-500 bg-amber-50/50' : 'border-[#E8DEC8]'
                    }`}
                  >
                    {/* File Upload Button */}
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          e.target.value = '';
                          if (file) handleImageFileUpload(file);
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full py-2.5 bg-[#142C20] hover:bg-[#1a3829] text-amber-300 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                            <span>Compressing & Saving Photo...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            <span>Upload Image File (JPG / PNG / WebP)</span>
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-stone-500 text-center mt-1">
                        Drag & drop photo here or choose from your files.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-stone-400 text-xs">
                      <div className="flex-1 border-t border-[#E8DEC8]" />
                      <span>OR USE IMAGE URL</span>
                      <div className="flex-1 border-t border-[#E8DEC8]" />
                    </div>

                    {/* Image URL Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="w-full pl-8 pr-2.5 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-xs focus:outline-none focus:border-[#142C20]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleApplyImageUrl()}
                          className="px-3 py-2 bg-[#142C20] hover:bg-[#1a3829] text-white rounded-xl text-xs font-medium cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Sample Photography Presets */}
                    <div className="pt-1">
                      <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1.5">
                        Sample Photography Presets:
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {FESTIVE_SAMPLE_PHOTOS.map((sample) => (
                          <button
                            key={sample.name}
                            type="button"
                            onClick={() => handleApplyImageUrl(sample.url)}
                            className="px-2 py-1.5 rounded-lg border border-[#E8DEC8] hover:border-[#142C20] bg-[#FAF7F2] hover:bg-stone-100 text-[11px] font-medium text-stone-700 text-left truncate transition-colors cursor-pointer"
                            title={`Use ${sample.name} photo`}
                          >
                            ✦ {sample.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Revert Image Button */}
                    {hasCustomImage(currentHamper.id) && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="w-full py-1.5 text-stone-600 hover:text-red-700 text-xs font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Revert to Default Festive Artwork</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Price Manager (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-emerald-800" />
                      <span>Pricing & Volume Tiers</span>
                    </h4>

                    {hasCustomPrice(currentHamper.id) ? (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                        Custom Pricing Active
                      </span>
                    ) : (
                      <span className="text-[10px] bg-stone-200 text-stone-700 font-medium px-2 py-0.5 rounded-full">
                        Original Catalogue Rate
                      </span>
                    )}
                  </div>

                  {/* Base & Minimum Bulk Price Inputs */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Base Price */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                          Base Retail / 1–29 Qty (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-stone-500 text-sm">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="1"
                            step="10"
                            value={editedBasePrice}
                            onChange={(e) => setEditedBasePrice(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:border-[#142C20]"
                          />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1">
                          Standard single or small batch unit price.
                        </p>
                      </div>

                      {/* Minimum Bulk Price */}
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1">
                          Lowest Bulk Tier Rate (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-emerald-800 text-sm">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="1"
                            step="10"
                            value={editedMinPrice}
                            onChange={(e) => setEditedMinPrice(Number(e.target.value))}
                            className="w-full pl-8 pr-3 py-2 bg-[#FAF7F2] border border-[#D5C6AF] rounded-xl text-sm font-semibold text-stone-900 focus:outline-none focus:border-[#142C20]"
                          />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-1">
                          Shown as "From ₹X" on cards and budget tools.
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#F1E9DE]">
                      <span className="text-[11px] text-stone-600">
                        Max Bulk Discount: <strong className="text-emerald-800">
                          {editedBasePrice > 0 ? Math.round(((editedBasePrice - editedMinPrice) / editedBasePrice) * 100) : 0}% off
                        </strong>
                      </span>

                      <button
                        type="button"
                        onClick={handleAutoGenerateTiers}
                        className="text-xs text-[#142C20] hover:text-emerald-900 font-semibold underline cursor-pointer"
                      >
                        ⚡ Auto-Calculate Intermediate Tiers
                      </button>
                    </div>
                  </div>

                  {/* Tier-by-Tier Price Breakdown Table */}
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-stone-700" />
                        <span>Corporate Volume Price Tiers</span>
                      </h5>
                      <span className="text-[10px] text-stone-500">Edit per-tier unit rates</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#E8DEC8] text-stone-500 text-[10px] uppercase tracking-wider text-left">
                            <th className="py-2 font-semibold">Tier Bracket</th>
                            <th className="py-2 font-semibold">Unit Price (₹)</th>
                            <th className="py-2 font-semibold text-right">Savings / Box</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5EFE6]">
                          {editedPriceTiers.map((tier, idx) => {
                            const unitRate = tier.pricePerUnit;
                            const savings = editedBasePrice - unitRate;
                            const pct = editedBasePrice > 0 ? Math.round((savings / editedBasePrice) * 100) : 0;

                            return (
                              <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                                <td className="py-2.5 font-medium text-stone-800">
                                  {tier.label}
                                </td>

                                <td className="py-2.5">
                                  <div className="flex items-center gap-1 max-w-[120px]">
                                    <span className="text-stone-400 font-medium">₹</span>
                                    <input
                                      type="number"
                                      min="1"
                                      step="5"
                                      value={unitRate}
                                      onChange={(e) => {
                                        const val = Number(e.target.value);
                                        setEditedPriceTiers((prev) =>
                                          prev.map((t, i) => (i === idx ? { ...t, pricePerUnit: val } : t))
                                        );
                                      }}
                                      className="w-full px-2 py-1 bg-[#FAF7F2] border border-[#D5C6AF] rounded-lg text-xs font-semibold tabular-nums focus:outline-none focus:border-[#142C20]"
                                    />
                                  </div>
                                </td>

                                <td className="py-2.5 text-right font-medium">
                                  {savings > 0 ? (
                                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] tabular-nums">
                                      -₹{savings} ({pct}%)
                                    </span>
                                  ) : (
                                    <span className="text-stone-400 text-[11px]">Base Rate</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Save Button Bar */}
                    <div className="pt-3 border-t border-[#E8DEC8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="text-[11px] text-stone-500">
                        Changes immediately update cart, brochure, and storefront.
                      </div>

                      <button
                        onClick={handleSavePrices}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#142C20] to-[#1e4231] hover:brightness-110 text-amber-300 font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-amber-300" />
                        <span>Save & Apply Live Prices</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Footer Info Strip */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-t border-[#E8DEC8] text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Real-Time Catalogue Store · Client-side persistent in localStorage with instant storefront synchronization.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Done & Return to Site
          </button>
        </div>
      </div>

      {/* Import Settings Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D5C6AF] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-serif-heading font-medium text-stone-900">
                Import Admin Configuration
              </h4>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Paste JSON exported from another session or backup file:
            </p>

            <textarea
              rows={8}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste JSON settings here..."
              className="w-full p-3 font-mono text-xs bg-white border border-[#D5C6AF] rounded-xl focus:outline-none focus:border-[#142C20]"
            />

            {importStatus && (
              <p className="text-xs font-semibold text-stone-800">{importStatus}</p>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleImportConfig}
                className="px-4 py-2 bg-[#142C20] text-amber-300 text-xs font-semibold rounded-xl"
              >
                Restore Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
