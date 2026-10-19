import React from 'react';
import { Calendar, Gift, ShoppingCart, Award, Sparkles, HeartHandshake, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_INFO } from '../data/catalogue';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header: Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold">
              The Nutrosa Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl font-normal font-serif-heading text-[#142C20] leading-tight">
              A passion-born bakery dedicated to elevated festive moments.
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light">
              Founded by <span className="font-semibold text-stone-900">Prachi Kasliwal Kala</span>, Nutrosa Bakery blends time-honored Indian traditions with contemporary baking craft. Every cookie, cracker, and bite is prepared with meticulous ingredient sourcing and festive love.
            </p>
            <div className="pt-2 text-xs text-stone-500 italic border-l-2 border-[#C59B27] pl-3">
              "From soft-baked cookies to millet treats, brownies, and mini nibbles, every bite is pure delight perfect for everyday indulgence or festive gifting."
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 font-serif-heading">
                About The Brand & Founder
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {BRAND_INFO.about}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8DEC8] space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-stone-900 font-serif-heading">
                Our Festive Promise
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {BRAND_INFO.promise}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Core Segments We Offer */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <div className="text-xs uppercase tracking-widest text-[#8C6D38] font-semibold">
              Tailored Solutions
            </div>
            <h3 className="text-2xl font-normal font-serif-heading text-stone-900">
              Segments We Specialize In
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-[#E8DEC8] text-center space-y-3.5 shadow-xs hover:border-[#142C20] transition-colors">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#142C20] text-amber-200 flex items-center justify-center shadow-sm">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-normal font-serif-heading text-stone-900">
                01. Events & Celebrations
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Diwali taash / card party hampers, puja return favors, wedding announcements, and festive milestone celebrations.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E8DEC8] text-center space-y-3.5 shadow-xs hover:border-[#142C20] transition-colors">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#142C20] text-amber-200 flex items-center justify-center shadow-sm">
                <Gift className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-normal font-serif-heading text-stone-900">
                02. Curated Festive Gifting
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bespoke gift boxes for loved ones, royal rattan keepsakes, Pichwai art trays, and hand-embellished resin diyas with scented sweets candles.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-[#E8DEC8] text-center space-y-3.5 shadow-xs hover:border-[#142C20] transition-colors">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#142C20] text-amber-200 flex items-center justify-center shadow-sm">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-normal font-serif-heading text-stone-900">
                03. Bulk & Corporate Buying
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Specialized bulk slabs starting at 30+ units for corporate HR, CXOs, and VIP clients with custom company branding and Pan-India dispatches.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Quality Pillars */}
        <div className="bg-[#142C20] text-stone-100 rounded-3xl p-8 sm:p-12 border border-[#2C523F] space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
              The Nutrosa Standard
            </span>
            <h3 className="text-2xl sm:text-3xl font-normal font-serif-heading text-stone-50">
              Why leading companies & families trust us
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {BRAND_INFO.pillars.map((pillar, idx) => (
              <div key={idx} className="space-y-2 border-t border-emerald-800/80 pt-4">
                <div className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                  0{idx + 1}. {pillar.title}
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
