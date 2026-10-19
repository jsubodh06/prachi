import React, { useState } from 'react';
import { QuoteCartItem } from '../types';
import { X, Trash2, Printer, MessageCircle, Building2, Phone, Mail, MapPin, Sparkles, FileText } from 'lucide-react';
import { BRAND_INFO } from '../data/catalogue';
import confetti from 'canvas-confetti';

interface BulkQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteCartItem[];
  onUpdateQuantity: (hamperId: string, qty: number) => void;
  onRemoveItem: (hamperId: string) => void;
  onClearCart: () => void;
  appliedPerk?: string | null;
}

export const BulkQuoteDrawer: React.FC<BulkQuoteDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedPerk
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');
  const [customLogoReq, setCustomLogoReq] = useState(true);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  if (!isOpen) return null;

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const standardTotal = cartItems.reduce(
    (acc, item) => acc + item.hamper.basePrice * item.quantity,
    0
  );
  const totalSavings = standardTotal - grandTotal;

  // Prepare formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `*NUTROSA BAKERY — DIWALI 2026 CORPORATE ORDER INQUIRY*\n`;
    msg += `-------------------------------------------\n`;
    if (companyName) msg += `*Company:* ${companyName}\n`;
    if (contactName) msg += `*Contact Person:* ${contactName}\n`;
    if (contactPhone) msg += `*Phone:* ${contactPhone}\n`;
    if (deliveryCity) msg += `*Delivery City:* ${deliveryCity}\n`;
    msg += `*Custom Branding Required:* ${customLogoReq ? 'Yes (Logo Sleeves/Tags)' : 'Standard Nutrosa Gift Packaging'}\n`;
    if (specialInstructions) msg += `*Special Notes:* ${specialInstructions}\n`;
    msg += `\n*SELECTED HAMPERS & TIERS:*\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.hamper.title}*\n`;
      msg += `   • Quantity: ${item.quantity} units\n`;
      msg += `   • Tier Rate: ₹${item.unitPrice} / unit\n`;
      msg += `   • Subtotal: ₹${item.totalPrice.toLocaleString('en-IN')}\n`;
    });

    msg += `\n-------------------------------------------\n`;
    msg += `*Total Units:* ${totalQuantity}\n`;
    msg += `*Estimated Grand Total:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
    if (totalSavings > 0) {
      msg += `*Tier Discount Saved:* ₹${totalSavings.toLocaleString('en-IN')}\n`;
    }
    if (appliedPerk) {
      msg += `*Unlocked Festive Perk:* ${appliedPerk}\n`;
    }
    msg += `-------------------------------------------\n`;
    msg += `Please confirm production schedule and corporate payment details for our team. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    const url = `https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  const handlePrintProposal = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setShowPrintModal(true);
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-950/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#DFD3C2] animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 bg-[#142C20] text-stone-100 flex items-center justify-between border-b border-[#2C523F]">
          <div>
            <div className="text-xs text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Nutrosa Bakery Corporate Proposal
            </div>
            <h2 className="text-lg sm:text-xl font-normal font-serif-heading text-stone-50 mt-0.5">
              Diwali Gifting Order Summary
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
            aria-label="Close quote drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-200 text-stone-500 mx-auto flex items-center justify-center">
                <FileText className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-lg font-medium text-stone-800 font-serif-heading">
                Your proposal list is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore the hampers in our 2026 catalogue, select your desired corporate quantities, and build an instant quotation.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-[#142C20] text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Browse Hampers
              </button>
            </div>
          ) : (
            <>
              {/* Active Perk Banner */}
              {appliedPerk && (
                <div className="p-3 bg-gradient-to-r from-amber-50 to-emerald-50 rounded-xl border border-amber-300 flex items-center gap-2.5 text-xs text-amber-950 shadow-xs">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold">Active Festive Perk: </span>
                    <span>{appliedPerk}</span>
                  </div>
                </div>
              )}

              {/* Itemized List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>Selected Hampers ({cartItems.length})</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-700 text-[11px] font-normal cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.hamper.id}
                    className="p-4 bg-white rounded-xl border border-[#E8DEC8] space-y-3 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">
                          {item.hamper.title}
                        </h4>
                        <div className="text-[11px] text-stone-500">
                          Applied Tier: ₹{item.unitPrice} / unit
                          {item.unitPrice < item.hamper.basePrice && (
                            <span className="text-emerald-700 ml-1 font-medium">
                              (Base ₹{item.hamper.basePrice})
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.hamper.id)}
                        className="text-stone-400 hover:text-red-600 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F2ECE1]">
                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500">Units:</span>
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            onClick={() =>
                              onUpdateQuantity(
                                item.hamper.id,
                                Math.max(1, item.quantity - 5)
                              )
                            }
                            className="px-2.5 py-1 text-xs hover:bg-stone-200 font-bold text-stone-700 cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              onUpdateQuantity(
                                item.hamper.id,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-14 text-center text-xs font-bold tabular-nums focus:outline-none bg-white"
                          />
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.hamper.id, item.quantity + 5)
                            }
                            className="px-2.5 py-1 text-xs hover:bg-stone-200 font-bold text-stone-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-stone-900 tabular-nums">
                          ₹{item.totalPrice.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Card */}
              <div className="bg-[#142C20] text-stone-100 p-5 rounded-xl space-y-2 border border-[#2C523F]">
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Total Hampers:</span>
                  <span className="tabular-nums font-semibold text-white">
                    {totalQuantity} boxes
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-300">
                  <span>Standard Catalog Rate:</span>
                  <span className="tabular-nums line-through text-stone-400">
                    ₹{standardTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-xs text-amber-300 font-medium">
                    <span>Bulk Tier Savings:</span>
                    <span className="tabular-nums">
                      -₹{totalSavings.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#2C523F] flex justify-between items-baseline">
                  <span className="text-sm font-serif-heading text-stone-200">
                    Estimated Proposal Value:
                  </span>
                  <span className="text-2xl font-bold text-amber-300 tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="text-[10px] text-stone-400 pt-1">
                  *Excludes GST (as applicable) and Pan-India freight dispatch.
                </div>
              </div>

              {/* Company & Customization Info Form */}
              <div className="bg-white p-5 rounded-xl border border-[#E8DEC8] space-y-3.5">
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-800">
                  Client & Delivery Details (Optional for Quote):
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Technologies Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Delivery City / Pin Code</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai / Bangalore / Delhi"
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="customLogo"
                    checked={customLogoReq}
                    onChange={(e) => setCustomLogoReq(e.target.checked)}
                    className="rounded text-[#142C20] focus:ring-[#142C20]"
                  />
                  <label htmlFor="customLogo" className="text-xs text-stone-700 cursor-pointer">
                    Include Custom Company Logo Sleeve & Personalized Greeting Cards
                  </label>
                </div>

                <div>
                  <label className="block text-stone-600 text-xs mb-1">
                    Special Packaging or Dietary Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Delivery required by Oct 24th, 50% gluten-free requests, etc."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 bg-white border-t border-[#E8DEC8] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handlePrintProposal}
                className="py-3 px-4 border border-[#142C20] text-[#142C20] hover:bg-stone-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Printable PDF Quote</span>
              </button>

              <button
                onClick={handleWhatsAppClick}
                className="py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            <div className="text-[11px] text-stone-500 text-center">
              Direct connection with Founder Prachi Kasliwal Kala ({BRAND_INFO.contacts.phoneDisplay})
            </div>
          </div>
        )}
      </div>

      {/* Hidden Printable Proposal Sheet for Browser Print / PDF Export */}
      {showPrintModal && (
        <div className="fixed inset-0 z-60 bg-white p-8 overflow-y-auto text-stone-900 print:block">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-start pb-6 border-b border-stone-300">
              <div>
                <h1 className="text-2xl font-bold font-serif-heading text-[#142C20]">
                  NUTROSA BAKERY
                </h1>
                <p className="text-xs text-stone-600">
                  Artisanal Cookies · Festive Hampers · Bespoke Gifting
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Founder: {BRAND_INFO.founder} · {BRAND_INFO.contacts.email} · {BRAND_INFO.contacts.phoneDisplay}
                </p>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold text-stone-800">CORPORATE ESTIMATE</div>
                <div className="text-stone-500">Date: {new Date().toLocaleDateString('en-IN')}</div>
                <div className="text-stone-500">Ref: NUT-DIWALI-2026</div>
              </div>
            </div>

            {companyName && (
              <div className="p-4 bg-stone-50 rounded-lg text-xs space-y-1 border border-stone-200">
                <div className="font-bold text-stone-800">Client Information:</div>
                <div>Company: {companyName}</div>
                {contactName && <div>Attention: {contactName}</div>}
                {contactPhone && <div>Phone: {contactPhone}</div>}
                {deliveryCity && <div>Destination: {deliveryCity}</div>}
              </div>
            )}

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-800 text-stone-800">
                  <th className="py-2">Item Description</th>
                  <th className="py-2 text-center">Quantity</th>
                  <th className="py-2 text-right">Unit Rate</th>
                  <th className="py-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5">
                      <div className="font-semibold text-stone-800">{item.hamper.title}</div>
                      <div className="text-[10px] text-stone-500">{item.hamper.subtitle}</div>
                    </td>
                    <td className="py-2.5 text-center font-semibold">{item.quantity}</td>
                    <td className="py-2.5 text-right tabular-nums">₹{item.unitPrice}</td>
                    <td className="py-2.5 text-right font-semibold tabular-nums">
                      ₹{item.totalPrice.toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-stone-800 font-bold">
                  <td colSpan={3} className="py-3 text-right">Total Estimated Value:</td>
                  <td className="py-3 text-right text-base tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>

            <div className="pt-4 border-t border-stone-200 text-[11px] text-stone-600 space-y-1">
              <div>• 100% Preservative-Free. Baked fresh to order with pure butter.</div>
              <div>• Corporate branding (custom logo sleeves & wax-seal cards) will be provided upon confirmation.</div>
              <div>• For order confirmation, kindly WhatsApp or call Prachi at {BRAND_INFO.contacts.phones[0]}.</div>
            </div>

            <div className="pt-4 print:hidden flex justify-end gap-3">
              <button
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 border border-stone-400 rounded text-xs cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-[#142C20] text-amber-200 rounded text-xs font-bold cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
