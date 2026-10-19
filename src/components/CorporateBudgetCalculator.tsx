import React, { useState } from 'react';
import { CATALOGUE_ITEMS, BRAND_INFO } from '../data/catalogue';
import { useCatalogue } from '../utils/catalogueStore';
import { HamperItem } from '../types';
import { Calculator, Users, Award, ShoppingBag, MessageCircle, Sparkles, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/festiveAudio';

interface CorporateBudgetCalculatorProps {
  onLoadAllocationToQuote: (items: { hamper: HamperItem; qty: number }[]) => void;
}

export const CorporateBudgetCalculator: React.FC<CorporateBudgetCalculatorProps> = ({
  onLoadAllocationToQuote
}) => {
  const { hampers } = useCatalogue();
  const [employeeCount, setEmployeeCount] = useState<number>(50);
  const [employeeBudget, setEmployeeBudget] = useState<number>(550);

  const [clientCount, setClientCount] = useState<number>(20);
  const [clientBudget, setClientBudget] = useState<number>(1400);

  // Find best hamper match for employee group
  const teamHamper =
    hampers.filter((h) => h.minPrice <= employeeBudget && h.basePrice <= employeeBudget + 100)
      .sort((a, b) => Math.abs(a.minPrice - employeeBudget) - Math.abs(b.minPrice - employeeBudget))[0] ||
    hampers[0] ||
    CATALOGUE_ITEMS[0]; // fallback to Healthy Hamper

  // Find best hamper match for VIP clients
  const clientHamper =
    hampers.filter((h) => h.minPrice <= clientBudget && h.basePrice <= clientBudget + 250)
      .sort((a, b) => Math.abs(a.minPrice - clientBudget) - Math.abs(b.minPrice - clientBudget))[0] ||
    hampers[4] ||
    CATALOGUE_ITEMS[4]; // fallback to Pichwai Hamper

  // Pricing calculations
  const getTierPrice = (hamper: HamperItem, qty: number) => {
    const tier =
      hamper.priceTiers.find(
        (t) => qty >= t.minQty && (t.maxQty === undefined || qty <= t.maxQty)
      ) || hamper.priceTiers[hamper.priceTiers.length - 1];
    return tier ? tier.pricePerUnit : hamper.basePrice;
  };

  const teamUnitRate = getTierPrice(teamHamper, employeeCount);
  const teamTotalCost = teamUnitRate * employeeCount;
  const teamStandardCost = teamHamper.basePrice * employeeCount;

  const clientUnitRate = getTierPrice(clientHamper, clientCount);
  const clientTotalCost = clientUnitRate * clientCount;
  const clientStandardCost = clientHamper.basePrice * clientCount;

  const totalHamperUnits = employeeCount + clientCount;
  const grandTotalCost = teamTotalCost + clientTotalCost;
  const standardTotalCost = teamStandardCost + clientStandardCost;
  const totalSavings = standardTotalCost - grandTotalCost;

  const handleApplyAllocation = () => {
    festiveAudio.playFanfare();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    onLoadAllocationToQuote([
      { hamper: teamHamper, qty: employeeCount },
      { hamper: clientHamper, qty: clientCount }
    ]);
  };

  const handleWhatsAppAllocation = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    const msg = encodeURIComponent(
      `*NUTROSA CORPORATE BUDGET ALLOCATION INQUIRY*\n` +
      `-------------------------------------------\n` +
      `1. *Team/Staff Gifting:*\n` +
      `   • Hamper: ${teamHamper.title}\n` +
      `   • Quantity: ${employeeCount} units\n` +
      `   • Tier Rate: ₹${teamUnitRate}/box (Subtotal: ₹${teamTotalCost.toLocaleString('en-IN')})\n\n` +
      `2. *VIP Client/Executive Gifting:*\n` +
      `   • Hamper: ${clientHamper.title}\n` +
      `   • Quantity: ${clientCount} units\n` +
      `   • Tier Rate: ₹${clientUnitRate}/box (Subtotal: ₹${clientTotalCost.toLocaleString('en-IN')})\n\n` +
      `-------------------------------------------\n` +
      `*Total Hampers:* ${totalHamperUnits} boxes\n` +
      `*Estimated Corporate Total:* ₹${grandTotalCost.toLocaleString('en-IN')}\n` +
      `*Bulk Tier Savings:* ₹${totalSavings.toLocaleString('en-IN')}\n` +
      `-------------------------------------------\n` +
      `Hello Prachi, could you please confirm company sleeve branding and schedule for this requirement?`
    );
    window.open(`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4 text-[#C59B27]" />
            Corporate HR & Procurement Planner
          </div>
          <h2 className="text-3xl sm:text-4xl font-normal font-serif-heading text-stone-900">
            Interactive Corporate Budget & Volume Calculator
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light max-w-lg mx-auto">
            Plan multi-tier gifting across internal employees and external VIP clients with live quantity discount calculations.
          </p>
        </div>

        {/* Two Input Cards + Output Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input Sliders (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Group 1: Team & Staff Gifting */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      Tier 1: Team & Staff Gifting
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Festive treats & wellness hampers for employees
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  {employeeCount} boxes
                </span>
              </div>

              {/* Slider 1: Employee Count */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-600">Employee Count:</span>
                  <span className="font-bold text-stone-900 tabular-nums">
                    {employeeCount} members
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                  className="w-full accent-[#142C20] cursor-pointer"
                />
              </div>

              {/* Slider 2: Target Budget per Employee */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-600">Target Budget per Box:</span>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ₹{employeeBudget}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="25"
                  value={employeeBudget}
                  onChange={(e) => setEmployeeBudget(parseInt(e.target.value))}
                  className="w-full accent-[#142C20] cursor-pointer"
                />
              </div>

              {/* Recommended Team Match Card */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
                    Optimal Hamper Match:
                  </span>
                  <strong className="text-stone-900">{teamHamper.title}</strong>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    Applied Tier: ₹{teamUnitRate}/box (vs Base ₹{teamHamper.basePrice})
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">Subtotal:</span>
                  <strong className="text-sm font-bold text-stone-900 tabular-nums">
                    ₹{teamTotalCost.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>

            {/* Group 2: VIP Clients & Executive Gifting */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      Tier 2: VIP Clients & Leadership
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Luxury keepsakes, copper tumblers, Pichwai art & velvet boxes
                    </p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-1 rounded">
                  {clientCount} boxes
                </span>
              </div>

              {/* Slider 1: Client Count */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-600">VIP Client Count:</span>
                  <span className="font-bold text-stone-900 tabular-nums">
                    {clientCount} clients
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={clientCount}
                  onChange={(e) => setClientCount(parseInt(e.target.value))}
                  className="w-full accent-[#142C20] cursor-pointer"
                />
              </div>

              {/* Slider 2: Target Budget per Client */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-600">Target Budget per Box:</span>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ₹{clientBudget}
                  </span>
                </div>
                <input
                  type="range"
                  min="1100"
                  max="3000"
                  step="50"
                  value={clientBudget}
                  onChange={(e) => setClientBudget(parseInt(e.target.value))}
                  className="w-full accent-[#142C20] cursor-pointer"
                />
              </div>

              {/* Recommended Client Match Card */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase font-bold tracking-wider block">
                    Optimal Hamper Match:
                  </span>
                  <strong className="text-stone-900">{clientHamper.title}</strong>
                  <div className="text-[11px] text-amber-700 font-medium">
                    Applied Tier: ₹{clientUnitRate}/box (vs Base ₹{clientHamper.basePrice})
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-500 block">Subtotal:</span>
                  <strong className="text-sm font-bold text-stone-900 tabular-nums">
                    ₹{clientTotalCost.toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Grand Corporate Summary (5 Cols) */}
          <div className="lg:col-span-5 static lg:sticky lg:top-24">
            <div className="bg-[#142C20] text-stone-100 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#2C523F] shadow-xl space-y-6">
              <div className="border-b border-emerald-900/60 pb-3">
                <div className="text-xs uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Consolidated Budget Summary
                </div>
                <h4 className="text-xl font-normal font-serif-heading text-white mt-1">
                  Corporate Diwali 2026 Allocation
                </h4>
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Total Recipients:</span>
                  <strong className="text-white tabular-nums">{totalHamperUnits} boxes</strong>
                </div>

                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-300">Team Allocation:</span>
                    <strong className="text-white tabular-nums">₹{teamTotalCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {employeeCount} × {teamHamper.title} @ ₹{teamUnitRate}
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/40 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-stone-300">VIP Client Allocation:</span>
                    <strong className="text-white tabular-nums">₹{clientTotalCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {clientCount} × {clientHamper.title} @ ₹{clientUnitRate}
                  </div>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-amber-300 font-semibold pt-1">
                    <span>Corporate Tier Savings:</span>
                    <span className="tabular-nums">-₹{totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-emerald-900/60 flex justify-between items-baseline">
                  <span className="text-sm font-serif-heading text-stone-200">
                    Total Estimated Order:
                  </span>
                  <span className="text-2xl font-bold text-amber-300 tabular-nums">
                    ₹{grandTotalCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={handleApplyAllocation}
                  className="w-full py-3 bg-gradient-to-r from-[#E7C665] via-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-950" />
                  <span>Load Allocation into Proposal Drawer</span>
                </button>

                <button
                  onClick={handleWhatsAppAllocation}
                  className="w-full py-2.5 bg-emerald-900/60 hover:bg-emerald-900 text-stone-100 border border-emerald-600/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Share Allocation on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
