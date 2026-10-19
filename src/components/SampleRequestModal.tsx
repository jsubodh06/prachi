import React, { useState } from 'react';
import { X, Check, MessageCircle, Send, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '../data/catalogue';
import confetti from 'canvas-confetti';

interface SampleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleRequestModalProps> = ({
  isOpen,
  onClose
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('50-100');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    const msg = encodeURIComponent(
      `*NUTROSA CORPORATE SAMPLE BOX REQUEST*\n• Company: ${companyName}\n• Contact: ${contactName}\n• Phone: ${phone}\n• City: ${city}\n• Estimated Diwali Requirement: ${estimatedQuantity} boxes\nKindly arrange tasting samples and brochure.`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${msg}`, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D5C6AF] p-6 sm:p-8 space-y-5 animate-in fade-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-800 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Corporate Tasting Experience
          </div>
          <h3 className="text-2xl font-normal font-serif-heading text-[#142C20] mt-1">
            Request a Corporate Sample Box
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Evaluating gifting for 30+ recipients? We dispatch a curated sampler box featuring our signature cookies, healthy seed pops, and packaging finishes.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">
              Sample Request Received!
            </h4>
            <p className="text-xs text-stone-600 max-w-xs mx-auto">
              Redirecting you to Prachi Kasliwal Kala on WhatsApp to coordinate immediate dispatch to your office address.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 bg-[#142C20] text-amber-200 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Company / Organization *</label>
              <input
                type="text"
                required
                placeholder="e.g. Bain & Company / Google India / Reliance"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20] bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20] bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20] bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Office City / State *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pune, Mumbai, Bangalore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20] bg-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Estimated Diwali Gifting Quantity</label>
                <select
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:border-[#142C20] bg-white"
                >
                  <option value="30-49">30 – 49 units</option>
                  <option value="50-100">50 – 100 units</option>
                  <option value="100-200">100 – 200 units</option>
                  <option value="200+">200+ units (Custom tier)</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3 bg-[#142C20] hover:bg-[#1C3E2D] text-amber-300 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4 text-amber-300" />
                <span>Submit & Coordinate via WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
