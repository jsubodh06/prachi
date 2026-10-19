import React from 'react';
import { BRAND_INFO } from '../data/catalogue';
import { Phone, Mail, Instagram, Globe, MessageCircle, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdminPanel?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminPanel }) => {
  return (
    <footer id="contact" className="bg-[#0F2218] text-stone-300 border-t border-[#1F3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-2xl font-serif">✤</span>
              <span className="text-2xl font-bold tracking-wider text-white font-serif-heading">
                NUTROSA BAKERY
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              Nutrosa blends the art of baking with modern indulgence, crafting premium cookies, crackers, and bites for every festive occasion. Founded by <strong className="text-amber-200">Prachi Kasliwal Kala</strong>.
            </p>

            <div className="pt-2 text-xs text-amber-300 font-medium">
              Pan-India Delivery & Bespoke Corporate Customization
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              Festive 2026 Segments
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <a href="#hampers" className="hover:text-amber-200 transition-colors">
                  Healthy & Millet Hampers (Gluten-Free)
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-amber-200 transition-colors">
                  Royal Rattan & Pichwai Heritage Art Trays
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-amber-200 transition-colors">
                  Emerald Velvet Card Night Party Boxes
                </a>
              </li>
              <li>
                <a href="#hampers" className="hover:text-amber-200 transition-colors">
                  Eco-Luxe Jute Bags with Lace Windows
                </a>
              </li>
              <li>
                <a href="#bespoke-builder" className="hover:text-amber-200 transition-colors">
                  Curate Bespoke Corporate Hampers
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-amber-300 font-bold">
              Connect With Founder & Bakery
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${BRAND_INFO.contacts.phones[0]}`}
                  className="hover:text-amber-200 tabular-nums transition-colors"
                >
                  {BRAND_INFO.contacts.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${BRAND_INFO.contacts.email}`}
                  className="hover:text-amber-200 transition-colors"
                >
                  {BRAND_INFO.contacts.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="https://instagram.com/nutrosabakery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-200 transition-colors"
                >
                  {BRAND_INFO.contacts.instagram}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-stone-300">{BRAND_INFO.contacts.website}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href={`https://wa.me/${BRAND_INFO.contacts.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Prachi! I am contacting you from the Nutrosa Diwali 2026 Catalogue website for order inquiries.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/80 hover:bg-emerald-900 text-emerald-200 rounded-lg text-xs font-semibold transition-all border border-emerald-600/40"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright Line */}
        <div className="pt-8 border-t border-[#1C3B2C] flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
          <div>
            © {new Date().getFullYear()} Nutrosa Bakery. All rights reserved. Founded with love by Prachi Kasliwal Kala.
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-400">
              Diwali Festive Gifting Catalogue 2026 · Pan India Safe Transit
            </span>
            {onOpenAdminPanel && (
              <>
                <span className="text-stone-600">·</span>
                <button
                  onClick={onOpenAdminPanel}
                  className="text-amber-400/90 hover:text-amber-300 transition-colors underline cursor-pointer text-[11px] flex items-center gap-1"
                >
                  <span>⚙ Bakery Admin Desk</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
