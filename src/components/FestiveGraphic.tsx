import React from 'react';
import { HamperItem } from '../types';

interface FestiveGraphicProps {
  hamper: HamperItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FestiveGraphic: React.FC<FestiveGraphicProps> = ({ hamper, className = '', size = 'md' }) => {
  const { graphicType, title } = hamper;

  const heightClass = size === 'lg' ? 'h-72 md:h-84' : size === 'sm' ? 'h-40' : 'h-56';

  return (
    <div
      className={`relative w-full ${heightClass} overflow-hidden rounded-t-xl flex items-center justify-center select-none ${className}`}
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${hamper.accentColor}25 0%, #172B20 85%, #0F1C15 100%)`
      }}
    >
      {/* Background festive mandala watermark */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
      >
        <circle cx="200" cy="150" r="110" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <circle cx="200" cy="150" r="70" stroke="#D4AF37" strokeWidth="0.8" fill="none" />
        <circle cx="200" cy="150" r="30" stroke="#D4AF37" strokeWidth="1" fill="none" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="200"
            y1="150"
            x2={200 + 130 * Math.cos((deg * Math.PI) / 180)}
            y2={150 + 130 * Math.sin((deg * Math.PI) / 180)}
            stroke="#D4AF37"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {/* Render unique illustrated artwork representation */}
      {graphicType === 'healthy-box' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="goldBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F5EC" />
              <stop offset="60%" stopColor="#EADEC7" />
              <stop offset="100%" stopColor="#D5C19A" />
            </linearGradient>
            <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFF2A7" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
          {/* Base Hamper Box */}
          <rect x="40" y="70" width="260" height="135" rx="10" fill="url(#goldBox)" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="35" y="60" width="270" height="24" rx="4" fill="#F4EADB" stroke="#C8B082" strokeWidth="1" />
          {/* Satin Ribbon */}
          <rect x="155" y="60" width="30" height="145" fill="url(#goldRibbon)" opacity="0.9" />
          <path d="M150 56 Q170 38 185 54 Q200 38 190 56 Z" fill="url(#goldRibbon)" />
          {/* Glass Jars inside display */}
          <g transform="translate(60, 95)">
            <rect x="0" y="0" width="46" height="70" rx="6" fill="#FFFFFF" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1" />
            <rect x="4" y="20" width="38" height="28" rx="2" fill="#2E4A35" />
            <text x="23" y="36" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">MILLET</text>
            <text x="23" y="44" fill="#D4AF37" fontSize="5.5" textAnchor="middle">COOKIES</text>
            <ellipse cx="23" cy="2" rx="20" ry="4" fill="#B8860B" />
          </g>
          <g transform="translate(116, 95)">
            <rect x="0" y="0" width="46" height="70" rx="6" fill="#FFFFFF" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1" />
            <rect x="4" y="20" width="38" height="28" rx="2" fill="#8B4513" />
            <text x="23" y="36" fill="#FFF" fontSize="6" textAnchor="middle" fontWeight="bold">7-SEEDS</text>
            <text x="23" y="44" fill="#FFE4B5" fontSize="5.5" textAnchor="middle">CRACKERS</text>
            <ellipse cx="23" cy="2" rx="20" ry="4" fill="#B8860B" />
          </g>
          <g transform="translate(196, 95)">
            <rect x="0" y="0" width="46" height="70" rx="6" fill="#FFFFFF" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1" />
            <rect x="4" y="20" width="38" height="28" rx="2" fill="#5A3A1B" />
            <text x="23" y="36" fill="#FFF" fontSize="6" textAnchor="middle" fontWeight="bold">ZERO-OIL</text>
            <text x="23" y="44" fill="#D4AF37" fontSize="5.5" textAnchor="middle">MATHRI</text>
            <ellipse cx="23" cy="2" rx="20" ry="4" fill="#B8860B" />
          </g>
          {/* Shubh Labh Diya */}
          <circle cx="264" cy="130" r="16" fill="#B22222" stroke="#FFD700" strokeWidth="1.5" />
          <path d="M264 120 Q267 112 264 105 Q261 112 264 120 Z" fill="#FFA500" />
          <circle cx="264" cy="112" r="3" fill="#FFF7B2" />
          <text x="264" y="133" fill="#FFF" fontSize="8" textAnchor="middle" fontWeight="bold">शुभ</text>
        </svg>
      )}

      {graphicType === 'candle-box' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="emeraldBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#25513D" />
              <stop offset="100%" stopColor="#143224" />
            </linearGradient>
          </defs>
          <rect x="45" y="65" width="250" height="140" rx="8" fill="url(#emeraldBox)" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="40" y="55" width="260" height="20" rx="4" fill="#1C3E2E" stroke="#D4AF37" strokeWidth="1" />
          {/* Rasmalai Mithai Candle */}
          <g transform="translate(195, 100)">
            <ellipse cx="28" cy="28" rx="26" ry="18" fill="#DA9100" stroke="#FFE484" strokeWidth="1.5" />
            <ellipse cx="28" cy="24" rx="21" ry="13" fill="#FFF3BE" />
            <circle cx="28" cy="20" r="3" fill="#A83232" />
            {/* Candle Flame */}
            <path d="M28 17 Q31 7 28 0 Q25 7 28 17 Z" fill="#FFA200" />
            <circle cx="28" cy="8" r="2.5" fill="#FFFFE0" />
            <text x="28" y="39" fill="#1A3320" fontSize="5.5" textAnchor="middle" fontWeight="bold">RASMALAI GLOW</text>
          </g>
          {/* Shubh Labh Plaque */}
          <g transform="translate(70, 92)">
            <rect x="0" y="0" width="46" height="46" rx="6" fill="#8B0000" stroke="#FFD700" strokeWidth="1.5" />
            <text x="23" y="27" fill="#FFE484" fontSize="13" textAnchor="middle" fontWeight="bold">शुभ लाभ</text>
          </g>
          {/* Cookie Jars */}
          <g transform="translate(130, 90)">
            <rect x="0" y="0" width="38" height="54" rx="5" fill="#FAF5ED" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="16" width="32" height="20" rx="2" fill="#3D2612" />
            <text x="19" y="29" fill="#FFF" fontSize="5" textAnchor="middle" fontWeight="bold">CHURRO</text>
          </g>
          <g transform="translate(130, 150)">
            <rect x="0" y="0" width="38" height="45" rx="5" fill="#FAF5ED" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="12" width="32" height="18" rx="2" fill="#581845" />
            <text x="19" y="24" fill="#FFF" fontSize="5" textAnchor="middle" fontWeight="bold">ALMOND</text>
          </g>
          <g transform="translate(255, 95)">
            <rect x="0" y="0" width="30" height="42" rx="4" fill="#4A2E18" stroke="#D4AF37" strokeWidth="1" />
            <text x="15" y="24" fill="#FFE484" fontSize="5" textAnchor="middle">CHOCO</text>
          </g>
        </svg>
      )}

      {graphicType === 'rattan-chest' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E28743" />
              <stop offset="50%" stopColor="#B85D19" />
              <stop offset="100%" stopColor="#7E370C" />
            </linearGradient>
            <pattern id="rattanWeave" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect width="12" height="12" fill="#A87747" />
              <path d="M0 6 L12 6 M6 0 L6 12" stroke="#684222" strokeWidth="1.2" />
              <circle cx="6" cy="6" r="1.5" fill="#C29665" />
            </pattern>
          </defs>
          {/* Rattan box chest open */}
          <rect x="40" y="70" width="260" height="135" rx="12" fill="url(#rattanWeave)" stroke="#D4AF37" strokeWidth="2" />
          <path d="M35 70 L50 25 L290 25 L305 70 Z" fill="#916235" stroke="#D4AF37" strokeWidth="2" />
          {/* Inner velvet cushioning */}
          <rect x="48" y="78" width="244" height="119" rx="8" fill="#FFF8EE" stroke="#E6D3B3" strokeWidth="1" />
          {/* 2 Pure Copper Glasses */}
          <g transform="translate(68, 92)">
            <polygon points="5,0 35,0 30,55 10,55" fill="url(#copperGrad)" stroke="#FFE0B2" strokeWidth="1" />
            <text x="20" y="32" fill="#FFF3E0" fontSize="5" textAnchor="middle" fontWeight="bold">COPPER</text>
          </g>
          <g transform="translate(112, 92)">
            <polygon points="5,0 35,0 30,55 10,55" fill="url(#copperGrad)" stroke="#FFE0B2" strokeWidth="1" />
            <text x="20" y="32" fill="#FFF3E0" fontSize="5" textAnchor="middle" fontWeight="bold">COPPER</text>
          </g>
          {/* Cookie jar and treats */}
          <g transform="translate(160, 92)">
            <rect x="0" y="0" width="42" height="56" rx="5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <rect x="4" y="16" width="34" height="22" rx="2" fill="#C0392B" />
            <text x="21" y="30" fill="#FFF" fontSize="5.5" textAnchor="middle" fontWeight="bold">RED VELVET</text>
          </g>
          <g transform="translate(210, 92)">
            <rect x="0" y="0" width="42" height="56" rx="5" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <rect x="4" y="16" width="34" height="22" rx="2" fill="#27AE60" />
            <text x="21" y="30" fill="#FFF" fontSize="5.5" textAnchor="middle" fontWeight="bold">ALMONDS</text>
          </g>
          {/* Rangoli Kit Charm & Brass latch */}
          <circle cx="170" cy="172" r="14" fill="#E67E22" stroke="#FFD700" strokeWidth="1.5" />
          <text x="170" y="176" fill="#FFF" fontSize="7" textAnchor="middle">रंगोली</text>
          <circle cx="170" cy="70" r="8" fill="#D4AF37" stroke="#7A561E" strokeWidth="1.5" />
        </svg>
      )}

      {graphicType === 'pichwai-box' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="pichwaiSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3C72" />
              <stop offset="100%" stopColor="#0B1A30" />
            </linearGradient>
          </defs>
          <rect x="45" y="65" width="250" height="140" rx="8" fill="url(#pichwaiSky)" stroke="#D4AF37" strokeWidth="2" />
          {/* Pichwai Traditional Cow Motif & Lotus */}
          <g transform="translate(60, 80)">
            {/* Lotus Blossom */}
            <path d="M40 35 C30 15 50 15 40 35 C55 20 65 30 40 35 C25 30 15 20 40 35 Z" fill="#FF69B4" stroke="#FFF" strokeWidth="0.8" />
            {/* Sacred Pichwai Holy Cow outline */}
            <path d="M90 45 Q85 30 75 32 Q65 30 65 40 Q65 52 80 52 L95 52 Q105 52 105 45 Z" fill="#F8F8FF" stroke="#D4AF37" strokeWidth="1" />
            <circle cx="72" cy="33" r="1.5" fill="#333" />
            {/* Garland on cow */}
            <path d="M78 36 Q83 45 88 40" stroke="#FF4500" strokeWidth="1.5" fill="none" />
          </g>
          {/* Pichwai Shubh Labh Disc */}
          <g transform="translate(190, 85)">
            <circle cx="30" cy="30" r="24" fill="#D35400" stroke="#F39C12" strokeWidth="2" />
            <circle cx="30" cy="30" r="18" fill="#FFF9E6" />
            <text x="30" y="34" fill="#C0392B" fontSize="10" textAnchor="middle" fontWeight="bold">शुभ</text>
          </g>
          {/* Terracotta Elephant Diya */}
          <g transform="translate(85, 145)">
            <path d="M10 20 Q15 5 28 8 Q38 10 40 22 Q40 30 30 30 L10 30 Z" fill="#C0392B" stroke="#F1C40F" strokeWidth="1" />
            <circle cx="28" cy="8" r="4" fill="#F39C12" />
            <path d="M28 4 Q30 0 28 -3 Q26 0 28 4 Z" fill="#FFA500" />
            <text x="25" y="24" fill="#FFF" fontSize="5" textAnchor="middle">DIYA</text>
          </g>
          {/* Soft-baked Cookie Jar */}
          <g transform="translate(160, 140)">
            <rect x="0" y="0" width="38" height="48" rx="4" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="14" width="32" height="18" rx="2" fill="#5D4037" />
            <text x="19" y="26" fill="#FFF" fontSize="5.5" textAnchor="middle" fontWeight="bold">NUTROSA</text>
          </g>
          {/* Roasted Nuts Jar */}
          <g transform="translate(210, 140)">
            <rect x="0" y="0" width="38" height="48" rx="4" fill="#FFFDF9" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="14" width="32" height="18" rx="2" fill="#E67E22" />
            <text x="19" y="26" fill="#FFF" fontSize="5.5" textAnchor="middle" fontWeight="bold">ALMONDS</text>
          </g>
        </svg>
      )}

      {graphicType === 'cookies-pack' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="violetBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C287B" />
              <stop offset="100%" stopColor="#3C1147" />
            </linearGradient>
          </defs>
          <rect x="50" y="65" width="240" height="140" rx="8" fill="url(#violetBox)" stroke="#D4AF37" strokeWidth="2" />
          <text x="170" y="86" fill="#FFEAA7" fontSize="9" textAnchor="middle" letterSpacing="2" fontWeight="bold">NUTROSA SIGNATURE BAKES</text>
          {/* Center-filled Cookies Row */}
          <g transform="translate(65, 100)">
            {/* Nutella Red Velvet */}
            <g transform="translate(0, 0)">
              <circle cx="20" cy="20" r="18" fill="#991B1B" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#451A03" />
              <text x="20" y="47" fill="#FFF" fontSize="5" textAnchor="middle">RED VELVET</text>
            </g>
            {/* Pistachio Kunafa Crunch */}
            <g transform="translate(42, 0)">
              <circle cx="20" cy="20" r="18" fill="#15803D" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#CA8A04" />
              <text x="20" y="47" fill="#86EFAC" fontSize="5" textAnchor="middle">KUNAFA PISTA</text>
            </g>
            {/* Cinn Biscoff */}
            <g transform="translate(84, 0)">
              <circle cx="20" cy="20" r="18" fill="#B45309" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#FEF08A" />
              <text x="20" y="47" fill="#FDE68A" fontSize="5" textAnchor="middle">BISCOFF</text>
            </g>
            {/* ChocoChunk */}
            <g transform="translate(126, 0)">
              <circle cx="20" cy="20" r="18" fill="#3E2723" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#1C1917" />
              <text x="20" y="47" fill="#E2E8F0" fontSize="5" textAnchor="middle">CHOCOCHUNK</text>
            </g>
            {/* Churro */}
            <g transform="translate(168, 0)">
              <circle cx="20" cy="20" r="18" fill="#D97706" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="20" cy="20" r="7" fill="#FFFBEB" />
              <text x="20" y="47" fill="#FEF3C7" fontSize="5" textAnchor="middle">CHURRO</text>
            </g>
          </g>
          {/* Molten center tag */}
          <rect x="85" y="165" width="170" height="22" rx="4" fill="#000000" fillOpacity="0.5" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="170" y="179" fill="#FDE047" fontSize="7.5" textAnchor="middle" fontWeight="bold">60g MOLTEN GOOEY FILLINGS</text>
        </svg>
      )}

      {graphicType === 'velvet-party' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="emeraldVelvet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#123B2A" />
              <stop offset="60%" stopColor="#0A271B" />
              <stop offset="100%" stopColor="#04140D" />
            </linearGradient>
            <linearGradient id="goldCards" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>
          {/* Royal Emerald Velvet Round Hatbox */}
          <ellipse cx="170" cy="140" rx="125" ry="60" fill="url(#emeraldVelvet)" stroke="#D4AF37" strokeWidth="2" />
          <rect x="45" y="130" width="250" height="55" fill="url(#emeraldVelvet)" />
          <ellipse cx="170" cy="185" rx="125" ry="30" fill="#081E15" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Reindeer Lid Accent */}
          <circle cx="170" cy="72" r="14" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
          <path d="M165 64 Q160 52 153 50 M175 64 Q180 52 187 50 M165 58 L160 56 M175 58 L180 56" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          {/* Golden Playing Cards */}
          <g transform="translate(68, 105) rotate(-12)">
            <rect x="0" y="0" width="36" height="52" rx="4" fill="url(#goldCards)" stroke="#FFF" strokeWidth="1" />
            <text x="18" y="26" fill="#78350F" fontSize="12" textAnchor="middle" fontWeight="bold">♠ A</text>
          </g>
          <g transform="translate(90, 108) rotate(5)">
            <rect x="0" y="0" width="36" height="52" rx="4" fill="url(#goldCards)" stroke="#FFF" strokeWidth="1" />
            <text x="18" y="26" fill="#B91C1C" fontSize="12" textAnchor="middle" fontWeight="bold">♥ K</text>
          </g>
          {/* Casino Poker Chips */}
          <g transform="translate(138, 125)">
            <ellipse cx="18" cy="10" rx="16" ry="7" fill="#DC2626" stroke="#FFF" strokeWidth="1" />
            <ellipse cx="18" cy="17" rx="16" ry="7" fill="#1E3A8A" stroke="#FFF" strokeWidth="1" />
            <ellipse cx="18" cy="24" rx="16" ry="7" fill="#15803D" stroke="#FFF" strokeWidth="1" />
            <ellipse cx="18" cy="31" rx="16" ry="7" fill="#18181B" stroke="#D4AF37" strokeWidth="1.2" />
            <text x="18" y="33" fill="#D4AF37" fontSize="5" textAnchor="middle" fontWeight="bold">100</text>
          </g>
          {/* Gourmet Tea Tube */}
          <g transform="translate(195, 105) rotate(15)">
            <rect x="0" y="0" width="14" height="60" rx="6" fill="#F8FAFC" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1" />
            <rect x="0" y="0" width="14" height="10" rx="2" fill="#B45309" />
            <line x1="2" y1="20" x2="12" y2="20" stroke="#15803D" strokeWidth="1.5" />
            <line x1="2" y1="28" x2="12" y2="28" stroke="#15803D" strokeWidth="1.5" />
          </g>
          {/* Urli Floral Diya */}
          <g transform="translate(230, 125)">
            <ellipse cx="20" cy="18" rx="18" ry="12" fill="#D97706" stroke="#FEF08A" strokeWidth="1.5" />
            <ellipse cx="20" cy="16" rx="12" ry="7" fill="#FDE047" />
            <circle cx="20" cy="10" r="3" fill="#FFA500" />
            <path d="M20 7 Q22 0 20 -4 Q18 0 20 7 Z" fill="#FF4500" />
          </g>
        </svg>
      )}

      {graphicType === 'truffles-box' && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="truffleBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>
          <rect x="50" y="55" width="240" height="155" rx="8" fill="url(#truffleBox)" stroke="#D4AF37" strokeWidth="2" />
          {/* 12-slot gold grid */}
          <g transform="translate(65, 70)">
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => {
                const colors = ['#15803D', '#D97706', '#451A03', '#BE185D', '#F8FAFC', '#B45309', '#047857', '#9333EA', '#DC2626', '#CA8A04', '#1E293B', '#EA580C'];
                const idx = row * 4 + col;
                return (
                  <g key={`${row}-${col}`} transform={`translate(${col * 54}, ${row * 42})`}>
                    <rect x="0" y="0" width="46" height="36" rx="4" fill="#FEF08A" fillOpacity="0.2" stroke="#D4AF37" strokeWidth="1" />
                    <circle cx="23" cy="18" r="13" fill={colors[idx % colors.length]} stroke="#FEF08A" strokeWidth="0.8" />
                    <circle cx="23" cy="18" r="4" fill="#FFFFFF" fillOpacity="0.4" />
                  </g>
                );
              })
            )}
          </g>
        </svg>
      )}

      {/* Default / Jute Bags / Trio box generic festive render */}
      {(graphicType === 'jute-bag' || graphicType === 'jute-healthy' || graphicType === 'mini-jute' || graphicType === 'gift-bag' || graphicType === 'trio-box') && (
        <svg viewBox="0 0 340 240" className="w-full h-full max-w-sm drop-shadow-2xl">
          <defs>
            <linearGradient id="juteFabric" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFA075" />
              <stop offset="100%" stopColor="#8C6E45" />
            </linearGradient>
          </defs>
          {/* Handcrafted Jute Tote bag with handles */}
          <path d="M125 45 C125 15 155 15 155 45" stroke="#684F2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M185 45 C185 15 215 15 215 45" stroke="#684F2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x="70" y="55" width="200" height="150" rx="10" fill="url(#juteFabric)" stroke="#523B1E" strokeWidth="1.5" />
          {/* Transparent Lace Window */}
          <rect x="90" y="100" width="160" height="75" rx="6" fill="#FFFBF5" fillOpacity="0.9" stroke="#E5D6C1" strokeWidth="1.5" />
          {/* White Floral Lace Header */}
          <path d="M90 100 Q100 106 110 100 Q120 106 130 100 Q140 106 150 100 Q160 106 170 100 Q180 106 190 100 Q200 106 210 100 Q220 106 230 100 Q240 106 250 100" stroke="#FFFFFF" strokeWidth="3" fill="none" />
          {/* Visible Cookie Jars through window */}
          <g transform="translate(100, 110)">
            <rect x="0" y="0" width="38" height="55" rx="4" fill="#FAF5ED" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="15" width="32" height="22" rx="2" fill="#881337" />
            <text x="19" y="29" fill="#FFF" fontSize="5" textAnchor="middle" fontWeight="bold">COOKIES</text>
          </g>
          <g transform="translate(150, 110)">
            <rect x="0" y="0" width="38" height="55" rx="4" fill="#FAF5ED" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="15" width="32" height="22" rx="2" fill="#065F46" />
            <text x="19" y="29" fill="#FFF" fontSize="5" textAnchor="middle" fontWeight="bold">MILLET</text>
          </g>
          <g transform="translate(200, 110)">
            <rect x="0" y="0" width="38" height="55" rx="4" fill="#FAF5ED" stroke="#D4AF37" strokeWidth="1" />
            <rect x="3" y="15" width="32" height="22" rx="2" fill="#92400E" />
            <text x="19" y="29" fill="#FFF" fontSize="5" textAnchor="middle" fontWeight="bold">MATHRI</text>
          </g>
          {/* Nutrosa Logo Tag on Bag */}
          <rect x="120" y="180" width="100" height="18" rx="3" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
          <text x="170" y="192" fill="#B45309" fontSize="7" textAnchor="middle" fontWeight="bold" letterSpacing="1.5">NUTROSA BAKERY</text>
        </svg>
      )}

      {/* Floating Price Tag on Graphic */}
      <div className="absolute bottom-3 right-3 bg-stone-900/90 text-amber-300 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold border border-amber-500/30 shadow-lg tabular-nums">
        from ₹{hamper.minPrice} <span className="text-stone-400 font-normal text-[10px]">/ unit</span>
      </div>

      {/* Floating Category Badge */}
      <div className="absolute top-3 left-3 bg-stone-900/80 text-stone-200 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-medium border border-amber-500/20">
        {hamper.category}
      </div>
    </div>
  );
};
