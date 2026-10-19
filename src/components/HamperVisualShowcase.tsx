import React, { useState, useEffect, useRef } from 'react';
import { HamperItem } from '../types';
import { getCustomHamperImages, saveCustomHamperImage, processUploadedImage } from '../utils/imageStorage';
import { Camera, Check, Upload, Loader2 } from 'lucide-react';

interface HamperVisualShowcaseProps {
  hamper: HamperItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  onOpenUploader?: (hamperId: string) => void;
}

export const HamperVisualShowcase: React.FC<HamperVisualShowcaseProps> = ({
  hamper,
  className = '',
  size = 'md',
  onOpenUploader
}) => {
  const { id } = hamper;
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setImageLoadError(false);
    const updateImg = () => {
      const customMap = getCustomHamperImages();
      if (customMap[id]) {
        setCustomImage(customMap[id]);
        setImageLoadError(false);
      } else {
        setCustomImage(null);
      }
    };

    updateImg();
    window.addEventListener('nutrosa_images_updated', updateImg);
    return () => window.removeEventListener('nutrosa_images_updated', updateImg);
  }, [id]);

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (file) {
      try {
        setIsUploading(true);
        const dataUrl = await processUploadedImage(file);
        saveCustomHamperImage(id, dataUrl);
        setCustomImage(dataUrl);
        setImageLoadError(false);
      } catch (err: any) {
        console.error('Failed to process image', err);
        alert(err?.message || 'Failed to process image. Please choose a standard JPG, PNG, or WebP photo.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const heightClasses = {
    sm: 'h-44',
    md: 'h-64 sm:h-72',
    lg: 'h-80 sm:h-96',
    hero: 'h-96 sm:h-[450px]'
  };

  return (
    <div
      className={`relative w-full ${heightClasses[size]} overflow-hidden rounded-t-2xl flex items-center justify-center select-none ${className}`}
    >
      {/* Background Ambience with festive warm lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#183526] via-[#10241A] to-[#0A1610]" />

      {/* Warm golden festive bokeh & radial backlight */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${hamper.accentColor} 0%, rgba(212,175,55,0.25) 35%, transparent 70%)`
        }}
      />

      {/* Traditional Indian Paisley / Mandala Gold Watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-[120%] h-[120%]">
          <circle cx="200" cy="200" r="160" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle cx="200" cy="200" r="110" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle cx="200" cy="200" r="60" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
          {[...Array(16)].map((_, i) => {
            const rad = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={200 + 70 * Math.cos(rad)}
                y1={200 + 70 * Math.sin(rad)}
                x2={200 + 155 * Math.cos(rad)}
                y2={200 + 155 * Math.sin(rad)}
                stroke="#D4AF37"
                strokeWidth="0.75"
              />
            );
          })}
        </svg>
      </div>

      {customImage && !imageLoadError ? (
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={customImage}
            alt={hamper.title}
            onError={() => setImageLoadError(true)}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-3 right-3 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md">
            <Check className="w-3 h-3" />
            Brochure Photo
          </div>
        </div>
      ) : (
        <>
          {/* Photographic Hamper Compositions matching each page of the Nutrosa Catalogue */}

          {/* 1. Perfect Diwali Healthy Hamper (Page 4 of PDF) */}
          {id === 'perfect-diwali-healthy-hamper' && (
            <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="healthyBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF7" />
              <stop offset="60%" stopColor="#F5ECE0" />
              <stop offset="100%" stopColor="#E5D6C0" />
            </linearGradient>
            <linearGradient id="healthyLidRim" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
            <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FFA000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E91E63" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Open Ivory Gift Box Body with golden pattern */}
          <rect x="50" y="90" width="420" height="235" rx="14" fill="url(#healthyBoxGrad)" stroke="#D4AF37" strokeWidth="2.5" />
          {/* Subtle golden scalloped arches on box surface */}
          <g opacity="0.25" stroke="#B8860B" strokeWidth="1" fill="none">
            {[70, 130, 190, 250, 310, 370, 430].map((x, idx) => (
              <path key={idx} d={`M${x} 100 Q${x + 30} 115 ${x + 60} 100`} />
            ))}
          </g>

          {/* Golden Nutrosa Branding inside Box */}
          <text x="260" y="130" fill="#997A15" fontSize="13" textAnchor="middle" letterSpacing="4" fontWeight="600" fontFamily="serif">
            NUTRO✿SA
          </text>
          <text x="260" y="142" fill="#78350F" fontSize="7" textAnchor="middle" letterSpacing="1">
            CRAFTED TO DELIGHT · MADE TO REMEMBER
          </text>

          {/* Sparkling Pink Lotus Diya (Page 4) */}
          <g transform="translate(370, 85)">
            <circle cx="45" cy="45" r="45" fill="url(#lotusGlow)" />
            {/* Multi-petal crystal pink lotus */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <path
                key={i}
                d="M45 45 C40 18 50 18 45 45"
                transform={`rotate(${deg} 45 45)`}
                fill="#E91E63"
                stroke="#F8BBD0"
                strokeWidth="1.2"
                opacity="0.85"
              />
            ))}
            {/* Inner brass diya cup */}
            <circle cx="45" cy="45" r="18" fill="#D4AF37" stroke="#FFE082" strokeWidth="1.5" />
            <circle cx="45" cy="45" r="13" fill="#FFF9C4" />
            {/* Lit candle flame */}
            <ellipse cx="45" cy="42" rx="3.5" ry="6" fill="#FF9800" />
            <ellipse cx="45" cy="43" rx="1.8" ry="3.5" fill="#FFFDE7" />
          </g>

          {/* Red & Gold Shubh Labh Charm Plaque (Page 4 left) */}
          <g transform="translate(80, 95)">
            <path
              d="M35 15 L50 28 L45 48 L25 48 L20 28 Z"
              fill="#8B0000"
              stroke="#D4AF37"
              strokeWidth="2"
            />
            <text x="35" y="38" fill="#FFF8E7" fontSize="13" textAnchor="middle" fontWeight="bold">
              शुभ
            </text>
          </g>

          {/* Jars Showcase in Row (Exact from Page 4) */}
          {/* Jar 1: Healthy 6 Nut Fruit Millet Cookies */}
          <g transform="translate(85, 160)">
            <rect x="0" y="0" width="75" height="125" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="3" fill="#1C3879" />
            <text x="37" y="52" fill="#FFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">HEALTHY</text>
            <text x="37" y="65" fill="#FDE047" fontSize="8.5" textAnchor="middle" fontWeight="bold">6 NUT FRUIT</text>
            <text x="37" y="78" fill="#E0E7FF" fontSize="6.5" textAnchor="middle">MILLET COOKIES</text>
            <ellipse cx="37" cy="4" rx="33" ry="8" fill="url(#healthyLidRim)" stroke="#FFE082" strokeWidth="1" />
          </g>

          {/* Jar 2: Seed Pop Crackers */}
          <g transform="translate(175, 160)">
            <rect x="0" y="0" width="75" height="125" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="3" fill="#4A154B" />
            <text x="37" y="52" fill="#FCE7F3" fontSize="7.5" textAnchor="middle" fontWeight="bold">7 POWER SEED</text>
            <text x="37" y="66" fill="#FBCFE8" fontSize="8.5" textAnchor="middle" fontWeight="bold">POP CRACKERS</text>
            <text x="37" y="78" fill="#FFF" fontSize="6.5" textAnchor="middle">GLUTEN FREE</text>
            <ellipse cx="37" cy="4" rx="33" ry="8" fill="url(#healthyLidRim)" stroke="#FFE082" strokeWidth="1" />
          </g>

          {/* Jar 3: Choco Orange Bliss */}
          <g transform="translate(265, 160)">
            <rect x="0" y="0" width="75" height="125" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="3" fill="#2E1B0F" />
            <text x="37" y="52" fill="#FB923C" fontSize="7.5" textAnchor="middle" fontWeight="bold">HEALTHY</text>
            <text x="37" y="65" fill="#FED7AA" fontSize="8" textAnchor="middle" fontWeight="bold">CHOCO ORANGE</text>
            <text x="37" y="78" fill="#FFF" fontSize="6.5" textAnchor="middle">BLISS COOKIE</text>
            <ellipse cx="37" cy="4" rx="33" ry="8" fill="url(#healthyLidRim)" stroke="#FFE082" strokeWidth="1" />
          </g>

          {/* Jar 4: Baked Whole Wheat Mathri */}
          <g transform="translate(355, 160)">
            <rect x="0" y="0" width="75" height="125" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="3" fill="#6B21A8" />
            <text x="37" y="52" fill="#E9D5FF" fontSize="7.5" textAnchor="middle" fontWeight="bold">ZERO-OIL</text>
            <text x="37" y="65" fill="#FAF5FF" fontSize="8" textAnchor="middle" fontWeight="bold">BAKED MATHRI</text>
            <text x="37" y="78" fill="#F3E8FF" fontSize="6.5" textAnchor="middle">WHOLE WHEAT</text>
            <ellipse cx="37" cy="4" rx="33" ry="8" fill="url(#healthyLidRim)" stroke="#FFE082" strokeWidth="1" />
          </g>
        </svg>
      )}

      {/* 2. Festive Cookie & Candle Box (Page 5 of PDF) */}
      {id === 'festive-cookie-candle-box' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="candleBoxBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBF3" />
              <stop offset="100%" stopColor="#EADBCC" />
            </linearGradient>
            <radialGradient id="mithaiCandleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF176" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FFB74D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#D84315" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Box Outer */}
          <rect x="50" y="90" width="420" height="240" rx="14" fill="url(#candleBoxBg)" stroke="#D4AF37" strokeWidth="2.5" />
          <text x="260" y="130" fill="#997A15" fontSize="13" textAnchor="middle" letterSpacing="4" fontWeight="600" fontFamily="serif">
            NUTRO✿SA
          </text>

          {/* Clay Earthen Rasmalai Mithai Candle with Silver Foil & Pistachio (Page 5) */}
          <g transform="translate(190, 80)">
            <circle cx="55" cy="55" r="50" fill="url(#mithaiCandleGlow)" />
            {/* Earthen bowl */}
            <ellipse cx="55" cy="55" rx="46" ry="28" fill="#A0522D" stroke="#D7CCC8" strokeWidth="1.5" />
            <ellipse cx="55" cy="50" rx="38" ry="21" fill="#FFF9C4" />
            {/* Saffron & Cardamom strands + Pistachio bits */}
            <path d="M40 45 Q48 42 52 48" stroke="#D84315" strokeWidth="1.2" fill="none" />
            <path d="M58 46 Q64 42 70 48" stroke="#D84315" strokeWidth="1.2" fill="none" />
            <circle cx="48" cy="54" r="2.5" fill="#2E7D32" />
            <circle cx="62" cy="52" r="2.5" fill="#2E7D32" />
            {/* Pure Silver Vark leaf effect */}
            <polygon points="36,48 44,45 42,53" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="0.5" />
            <polygon points="65,46 72,43 70,51" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="0.5" />
            {/* Glowing wick */}
            <ellipse cx="55" cy="42" rx="4" ry="7" fill="#FF9800" />
            <ellipse cx="55" cy="43" rx="2" ry="4" fill="#FFFDE7" />
          </g>

          {/* Shubh Labh Wooden Ornament (Page 5 left) */}
          <g transform="translate(355, 95)">
            <path d="M40 10 L60 30 L50 60 L20 60 L10 30 Z" fill="#991B1B" stroke="#D4AF37" strokeWidth="2" />
            <text x="35" y="45" fill="#FEF08A" fontSize="15" textAnchor="middle" fontWeight="bold">लाभ</text>
          </g>

          {/* 4 Jars in Compartments (Page 5) */}
          {/* Jar 1: Almond Pista Sticks */}
          <g transform="translate(75, 175)">
            <rect x="0" y="0" width="70" height="120" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="30" width="62" height="55" rx="2" fill="#881337" />
            <text x="35" y="50" fill="#FFF" fontSize="7" textAnchor="middle" fontWeight="bold">ALMOND</text>
            <text x="35" y="62" fill="#FECDD3" fontSize="7.5" textAnchor="middle" fontWeight="bold">PISTA STICKS</text>
            <ellipse cx="35" cy="4" rx="30" ry="7" fill="#C59B27" />
          </g>

          {/* Jar 2: Churro Cookie */}
          <g transform="translate(160, 175)">
            <rect x="0" y="0" width="70" height="120" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="30" width="62" height="55" rx="2" fill="#1E3A8A" />
            <text x="35" y="50" fill="#FFF" fontSize="7" textAnchor="middle" fontWeight="bold">CHURRO</text>
            <text x="35" y="62" fill="#93C5FD" fontSize="7.5" textAnchor="middle" fontWeight="bold">COOKIE BITES</text>
            <ellipse cx="35" cy="4" rx="30" ry="7" fill="#C59B27" />
          </g>

          {/* Jar 3: Jeera Ajwain */}
          <g transform="translate(245, 175)">
            <rect x="0" y="0" width="70" height="120" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="30" width="62" height="55" rx="2" fill="#78350F" />
            <text x="35" y="50" fill="#FFF" fontSize="7" textAnchor="middle" fontWeight="bold">JEERA</text>
            <text x="35" y="62" fill="#FDE68A" fontSize="7.5" textAnchor="middle" fontWeight="bold">AJWAIN BAKES</text>
            <ellipse cx="35" cy="4" rx="30" ry="7" fill="#C59B27" />
          </g>

          {/* Jar 4: Handmade Chocolates */}
          <g transform="translate(330, 175)">
            <rect x="0" y="0" width="70" height="120" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="30" width="62" height="55" rx="2" fill="#3B0764" />
            <text x="35" y="50" fill="#FFF" fontSize="7" textAnchor="middle" fontWeight="bold">HANDMADE</text>
            <text x="35" y="62" fill="#F5D0FE" fontSize="7.5" textAnchor="middle" fontWeight="bold">CHOCOLATES</text>
            <ellipse cx="35" cy="4" rx="30" ry="7" fill="#C59B27" />
          </g>
        </svg>
      )}

      {/* 3. Nutrosa Premium Rattan Box Hamper (Page 7 of PDF) */}
      {id === 'premium-rattan-box-hamper' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <pattern id="luxRattan" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="#8B5A2B" />
              <path d="M0 8 L16 8 M8 0 L8 16" stroke="#5C3818" strokeWidth="2" />
              <circle cx="8" cy="8" r="2.5" fill="#B3814C" />
            </pattern>
            <linearGradient id="pureCopperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E28743" />
              <stop offset="35%" stopColor="#F9A825" />
              <stop offset="70%" stopColor="#C06C28" />
              <stop offset="100%" stopColor="#873600" />
            </linearGradient>
          </defs>

          {/* Open Handcrafted Woven Rattan Chest */}
          <rect x="50" y="80" width="420" height="250" rx="16" fill="url(#luxRattan)" stroke="#D4AF37" strokeWidth="3" />
          {/* Raised Lid of the Rattan Chest */}
          <path d="M45 80 L70 20 L450 20 L475 80 Z" fill="#6E441D" stroke="#D4AF37" strokeWidth="2.5" />
          {/* Inner satin velvet lining */}
          <rect x="62" y="92" width="396" height="226" rx="10" fill="#FFFDF8" stroke="#E6D3B3" strokeWidth="1" />

          {/* 2 Handcrafted Pure Hammered Copper Glasses (Page 7) */}
          <g transform="translate(85, 115)">
            <polygon points="10,0 55,0 48,95 17,95" fill="url(#pureCopperGrad)" stroke="#FFE0B2" strokeWidth="1.5" />
            <ellipse cx="32.5" cy="5" rx="22.5" ry="5" fill="#FFE0B2" />
            <text x="32.5" y="55" fill="#FFF3E0" fontSize="7" textAnchor="middle" fontWeight="bold">COPPER</text>
          </g>

          <g transform="translate(155, 115)">
            <polygon points="10,0 55,0 48,95 17,95" fill="url(#pureCopperGrad)" stroke="#FFE0B2" strokeWidth="1.5" />
            <ellipse cx="32.5" cy="5" rx="22.5" ry="5" fill="#FFE0B2" />
            <text x="32.5" y="55" fill="#FFF3E0" fontSize="7" textAnchor="middle" fontWeight="bold">COPPER</text>
          </g>

          {/* Nutrosa Soft Baked Cookie / Brownie Sealed Pack in Center (Page 7) */}
          <g transform="translate(230, 110)">
            <rect x="0" y="0" width="85" height="110" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="42.5" y="24" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">NUTRO✿SA</text>
            <text x="42.5" y="36" fill="#78350F" fontSize="6.5" textAnchor="middle">COOKIES</text>
            <circle cx="42.5" cy="62" r="18" fill="#B91C1C" />
            <text x="42.5" y="65" fill="#FFF" fontSize="6" textAnchor="middle" fontWeight="bold">RED VELVET</text>
            <text x="42.5" y="95" fill="#B45309" fontSize="6" textAnchor="middle">Soft-Baked Pack</text>
          </g>

          {/* California Almonds Jar & Jars on Right */}
          <g transform="translate(330, 115)">
            <rect x="0" y="0" width="60" height="95" rx="8" fill="#FFFFFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="3" y="24" width="54" height="45" rx="2" fill="#15803D" />
            <text x="30" y="42" fill="#FFF" fontSize="6" textAnchor="middle" fontWeight="bold">CALIFORNIA</text>
            <text x="30" y="54" fill="#BBF7D0" fontSize="7" textAnchor="middle" fontWeight="bold">ALMONDS</text>
            <ellipse cx="30" cy="3" rx="26" ry="6" fill="#C59B27" />
          </g>

          {/* DIY Rangoli Kit & Mithai Sweet Candle */}
          <g transform="translate(400, 115)">
            <circle cx="28" cy="28" r="26" fill="#EA580C" stroke="#FDE047" strokeWidth="2" />
            <text x="28" y="32" fill="#FFF" fontSize="8" textAnchor="middle" fontWeight="bold">रंगोली KIT</text>
          </g>

          {/* Cookie Jars in front row */}
          <g transform="translate(100, 225)">
            <rect x="0" y="0" width="140" height="75" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <text x="70" y="35" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">SIGNATURE COOKIE JARS</text>
            <text x="70" y="52" fill="#78350F" fontSize="7" textAnchor="middle">Assorted Fresh Bakes</text>
          </g>

          <g transform="translate(260, 225)">
            <rect x="0" y="0" width="140" height="75" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1" />
            <text x="70" y="35" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">MITHAI AROMA CANDLE</text>
            <text x="70" y="52" fill="#78350F" fontSize="7" textAnchor="middle">Sweet Festive Fragrance</text>
          </g>
        </svg>
      )}

      {/* 4. Nutrosa Pichwai Hamper (Page 8 of PDF) */}
      {id === 'nutrosa-pichwai-hamper' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="pichwaiMidnight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#102A43" />
              <stop offset="100%" stopColor="#06121E" />
            </linearGradient>
          </defs>

          {/* Regal Dark Pichwai Box & Hand-Painted Wooden Tray (Page 8) */}
          <rect x="50" y="70" width="420" height="260" rx="14" fill="url(#pichwaiMidnight)" stroke="#D4AF37" strokeWidth="3" />
          {/* Pichwai Traditional Floral Arch & Dancing Figures Motif */}
          <g opacity="0.4" stroke="#FDE047" strokeWidth="1" fill="none">
            <path d="M60 90 Q120 70 180 90 Q240 70 300 90 Q360 70 420 90" />
            <path d="M60 110 Q120 90 180 110 Q240 90 300 110 Q360 90 420 110" />
          </g>

          {/* Holy Cow Pichwai Artwork on Tray (Page 8) */}
          <g transform="translate(75, 100)">
            <rect x="0" y="0" width="130" height="110" rx="8" fill="#0B1A28" stroke="#D4AF37" strokeWidth="1.5" />
            {/* Sacred white cow outline with golden horn and bell */}
            <path d="M25 80 Q25 45 45 48 Q60 40 75 42 Q90 38 95 50 Q105 50 110 60 L110 80 Z" fill="#F8FAFC" stroke="#C59B27" strokeWidth="1" />
            <circle cx="92" cy="45" r="2.5" fill="#1E293B" />
            {/* Lotus Flower */}
            <path d="M65 25 C55 10 75 10 65 25 Z" fill="#F43F5E" />
            <text x="65" y="100" fill="#FDE047" fontSize="7" textAnchor="middle" fontWeight="bold">PICHWAI TRAY</text>
          </g>

          {/* Circular Pichwai Shubh Labh Plaque (Page 8 bottom center) */}
          <g transform="translate(225, 205)">
            <circle cx="50" cy="50" r="45" fill="#EA580C" stroke="#FBBF24" strokeWidth="3" />
            <circle cx="50" cy="50" r="35" fill="#FFF7ED" />
            <text x="50" y="58" fill="#C2410C" fontSize="18" textAnchor="middle" fontWeight="bold">शुभ</text>
          </g>

          {/* 2 Hand-Painted Elephant Terracotta Diyas (Page 8) */}
          <g transform="translate(220, 105)">
            <path d="M10 40 Q15 15 35 18 Q55 20 60 38 Q60 55 45 55 L10 55 Z" fill="#C2410C" stroke="#FDE047" strokeWidth="1.5" />
            <ellipse cx="38" cy="18" rx="7" ry="4" fill="#FBBF24" />
            <ellipse cx="38" cy="14" rx="3" ry="6" fill="#FF9800" />
            <text x="35" y="48" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">ELEPHANT DIYA</text>
          </g>

          <g transform="translate(300, 105)">
            <path d="M10 40 Q15 15 35 18 Q55 20 60 38 Q60 55 45 55 L10 55 Z" fill="#C2410C" stroke="#FDE047" strokeWidth="1.5" />
            <ellipse cx="38" cy="18" rx="7" ry="4" fill="#FBBF24" />
            <ellipse cx="38" cy="14" rx="3" ry="6" fill="#FF9800" />
            <text x="35" y="48" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">ELEPHANT DIYA</text>
          </g>

          {/* Cookie Jars & Roasted Almonds on Right */}
          <g transform="translate(380, 100)">
            <rect x="0" y="0" width="70" height="95" rx="8" fill="#FFFFFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="3" y="24" width="64" height="45" rx="2" fill="#78350F" />
            <text x="35" y="42" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">NUTROSA</text>
            <text x="35" y="54" fill="#FDE68A" fontSize="7" textAnchor="middle" fontWeight="bold">COOKIE JARS</text>
            <ellipse cx="35" cy="4" rx="30" ry="7" fill="#C59B27" />
          </g>

          {/* Phool Natural Dhoop Sticks Pack */}
          <g transform="translate(75, 230)">
            <rect x="0" y="0" width="130" height="85" rx="6" fill="#14532D" stroke="#D4AF37" strokeWidth="1" />
            <text x="65" y="35" fill="#FEF08A" fontSize="8" textAnchor="middle" fontWeight="bold">PHOOL DHOOP STICKS</text>
            <text x="65" y="52" fill="#DCFCE7" fontSize="7" textAnchor="middle">Sacred Temple Flower Incense</text>
          </g>

          <g transform="translate(340, 215)">
            <rect x="0" y="0" width="110" height="100" rx="8" fill="#FFFFFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="3" y="24" width="104" height="48" rx="2" fill="#9A3412" />
            <text x="55" y="42" fill="#FFF" fontSize="7" textAnchor="middle" fontWeight="bold">ROASTED ALMONDS</text>
            <text x="55" y="56" fill="#FED7AA" fontSize="7.5" textAnchor="middle" fontWeight="bold">& PANNED NUTS</text>
          </g>
        </svg>
      )}

      {/* 5. Pack of 5 Center-Filled Cookies (Page 9 of PDF) */}
      {id === 'pack-of-5-premium-cookies' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="purpleCookieBox" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="100%" stopColor="#3B0764" />
            </linearGradient>
          </defs>

          {/* Luxury Royal Violet Gift Box with Nutrosa Crest (Page 9) */}
          <rect x="160" y="40" width="200" height="140" rx="10" fill="url(#purpleCookieBox)" stroke="#D4AF37" strokeWidth="2.5" />
          <text x="260" y="90" fill="#FFF" fontSize="16" textAnchor="middle" letterSpacing="3" fontWeight="bold" fontFamily="serif">
            NUTRO✿SA
          </text>
          <text x="260" y="106" fill="#F5D0FE" fontSize="9" textAnchor="middle" letterSpacing="1">
            COOKIES
          </text>
          <text x="260" y="130" fill="#FEF08A" fontSize="8" textAnchor="middle" fontWeight="bold">
            Cinn Biscoff · Bliss Cookies
          </text>

          {/* The 4 Individual Premium White & Gold Sachet Pouches Arranged Around (Page 9) */}
          {/* Pouch 1: Nutella Red Velvet Bliss */}
          <g transform="translate(45, 175)">
            <rect x="0" y="0" width="95" height="150" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="47.5" y="30" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">NUTRO✿SA</text>
            <circle cx="47.5" cy="75" r="24" fill="#991B1B" />
            <circle cx="47.5" cy="75" r="9" fill="#451A03" />
            <text x="47.5" y="118" fill="#991B1B" fontSize="7" textAnchor="middle" fontWeight="bold">NUTELLA RED VELVET</text>
            <text x="47.5" y="130" fill="#78350F" fontSize="6.5" textAnchor="middle">Bliss Cookie (60g)</text>
          </g>

          {/* Pouch 2: Life ChocoChunk Cookie */}
          <g transform="translate(155, 175)">
            <rect x="0" y="0" width="95" height="150" rx="6" fill="#3E2723" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="47.5" y="30" fill="#FEF08A" fontSize="8" textAnchor="middle" fontWeight="bold">NUTRO✿SA</text>
            <circle cx="47.5" cy="75" r="24" fill="#1C1917" />
            <circle cx="47.5" cy="75" r="9" fill="#000" />
            <text x="47.5" y="118" fill="#FEF08A" fontSize="7" textAnchor="middle" fontWeight="bold">LIFE CHOCOCHUNK</text>
            <text x="47.5" y="130" fill="#D7CCC8" fontSize="6.5" textAnchor="middle">Belgian Core (60g)</text>
          </g>

          {/* Pouch 3: Real Pistachio Kunafa Crunch Cookie */}
          <g transform="translate(265, 175)">
            <rect x="0" y="0" width="95" height="150" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="47.5" y="30" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">NUTRO✿SA</text>
            <circle cx="47.5" cy="75" r="24" fill="#15803D" />
            <circle cx="47.5" cy="75" r="9" fill="#CA8A04" />
            <text x="47.5" y="118" fill="#15803D" fontSize="7" textAnchor="middle" fontWeight="bold">PISTACHIO KUNAFA</text>
            <text x="47.5" y="130" fill="#78350F" fontSize="6.5" textAnchor="middle">Crunch Cookie (60g)</text>
          </g>

          {/* Pouch 4: Signature Churro Cookie */}
          <g transform="translate(375, 175)">
            <rect x="0" y="0" width="95" height="150" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="47.5" y="30" fill="#997A15" fontSize="8" textAnchor="middle" fontWeight="bold">NUTRO✿SA</text>
            <circle cx="47.5" cy="75" r="24" fill="#D97706" />
            <circle cx="47.5" cy="75" r="9" fill="#FEF3C7" />
            <text x="47.5" y="118" fill="#B45309" fontSize="7" textAnchor="middle" fontWeight="bold">CHURRO BLISS</text>
            <text x="47.5" y="130" fill="#78350F" fontSize="6.5" textAnchor="middle">Cinnamon Sugar (60g)</text>
          </g>
        </svg>
      )}

      {/* 6. Premium Luxurious Velvet Party Box (Page 14 of PDF) */}
      {id === 'premium-luxurious-velvet-party-box' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="luxVelvetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B2B1B" />
              <stop offset="60%" stopColor="#061B11" />
              <stop offset="100%" stopColor="#020B07" />
            </linearGradient>
            <linearGradient id="goldCardsFoil" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF176" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A15" />
            </linearGradient>
          </defs>

          {/* Circular Royal Emerald Green Velvet Hatbox (Page 14) */}
          <ellipse cx="260" cy="200" rx="200" ry="90" fill="url(#luxVelvetGrad)" stroke="#D4AF37" strokeWidth="3" />
          <rect x="60" y="180" width="400" height="80" fill="url(#luxVelvetGrad)" />
          <ellipse cx="260" cy="260" rx="200" ry="50" fill="#031109" stroke="#D4AF37" strokeWidth="2" />

          {/* Golden Happy Diwali Badge on Top Lid (Page 14 top left) */}
          <circle cx="160" cy="110" r="38" fill="#143926" stroke="#D4AF37" strokeWidth="2.5" />
          <text x="160" y="105" fill="#FEF08A" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="serif">Happy</text>
          <text x="160" y="122" fill="#D4AF37" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="serif">Diwali</text>

          {/* Golden Antler Reindeer Finial Accent on Cookie Jar Lid (Page 14) */}
          <g transform="translate(300, 75)">
            <circle cx="25" cy="30" r="14" fill="#D4AF37" stroke="#FFF" strokeWidth="1" />
            <path d="M15 20 Q10 5 0 2 M35 20 Q40 5 50 2 M18 12 L10 10 M32 12 L40 10" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
            {/* Fancy Reindeer Jar Body with cookies & baked mathri */}
            <rect x="0" y="45" width="50" height="75" rx="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
            <text x="25" y="75" fill="#78350F" fontSize="5.5" textAnchor="middle" fontWeight="bold">COOKIES &</text>
            <text x="25" y="87" fill="#78350F" fontSize="5.5" textAnchor="middle" fontWeight="bold">MATHRI</text>
          </g>

          {/* Professional Poker Chips Display Caddy (Page 14 right) */}
          <g transform="translate(375, 120)">
            <rect x="0" y="0" width="75" height="135" rx="8" fill="#18181B" stroke="#D4AF37" strokeWidth="2" />
            <text x="37.5" y="20" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">POKER CHIPS</text>
            {/* Stacks of chips */}
            {[35, 52, 69, 86, 103].map((y, idx) => {
              const chipColors = ['#DC2626', '#1D4ED8', '#16A34A', '#000000', '#EA580C'];
              return (
                <ellipse key={idx} cx="37.5" cy={y} rx="26" ry="7" fill={chipColors[idx]} stroke="#FFF" strokeWidth="1" />
              );
            })}
          </g>

          {/* Golden Playing Cards Deck (Page 14 left) */}
          <g transform="translate(90, 150) rotate(-10)">
            <rect x="0" y="0" width="55" height="85" rx="5" fill="url(#goldCardsFoil)" stroke="#FFF" strokeWidth="1.5" />
            <text x="27.5" y="35" fill="#78350F" fontSize="16" textAnchor="middle" fontWeight="bold">♠ A</text>
            <text x="27.5" y="65" fill="#78350F" fontSize="8" textAnchor="middle" fontWeight="bold">24K GOLD</text>
          </g>

          {/* Premium Tea Tube in Glass Cylinder (Page 14) */}
          <g transform="translate(265, 130) rotate(10)">
            <rect x="0" y="0" width="18" height="90" rx="8" fill="#F8FAFC" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1.5" />
            <rect x="0" y="0" width="18" height="15" rx="2" fill="#B45309" />
            <text x="9" y="55" fill="#15803D" fontSize="6" textAnchor="middle" transform="rotate(90 9 55)">TEA TUBE</text>
          </g>

          {/* Floral Urli Diya & Casino Chocolates */}
          <g transform="translate(200, 205)">
            <ellipse cx="30" cy="20" rx="28" ry="15" fill="#D97706" stroke="#FEF08A" strokeWidth="2" />
            <ellipse cx="30" cy="18" rx="20" ry="10" fill="#FDE047" />
            <ellipse cx="30" cy="12" rx="4" ry="7" fill="#FF9800" />
            <ellipse cx="30" cy="13" rx="2" ry="4" fill="#FFFDE7" />
          </g>
        </svg>
      )}

      {/* 7. Assorted Truffles – Box of 12 (Page 15 of PDF) */}
      {id === 'assorted-truffles-pack-of-12' && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="truffleCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#450A0A" />
            </linearGradient>
          </defs>

          {/* Open Partitioned Gold Grid Truffle Box (Page 15) */}
          <rect x="80" y="50" width="360" height="280" rx="12" fill="url(#truffleCrimson)" stroke="#D4AF37" strokeWidth="3" />
          <rect x="95" y="65" width="330" height="250" rx="8" fill="#FFFBF5" stroke="#E5D3B8" strokeWidth="1" />

          {/* 12-slot gold grid with Handcrafted Gourmet Truffles */}
          <g transform="translate(110, 80)">
            {[
              { col: 0, row: 0, color: '#15803D', top: 'Rose Petals', desc: 'Pistachio' },
              { col: 1, row: 0, color: '#B91C1C', top: 'Cocoa', desc: 'Dark Ganache' },
              { col: 2, row: 0, color: '#F8FAFC', top: 'Coconut', desc: 'White Truffle' },
              { col: 3, row: 0, color: '#B45309', top: 'Hazelnut', desc: 'Praline' },
              { col: 0, row: 1, color: '#78350F', top: 'Almond', desc: 'Dark Rocher' },
              { col: 1, row: 1, color: '#047857', top: 'Cardamom', desc: 'Pista Roll' },
              { col: 2, row: 1, color: '#D97706', top: 'Gold Vark', desc: 'Salted Caramel' },
              { col: 3, row: 1, color: '#451A03', top: 'Belgian', desc: '70% Cocoa' },
              { col: 0, row: 2, color: '#BE185D', top: 'Berry', desc: 'Ruby Cocoa' },
              { col: 1, row: 2, color: '#CA8A04', top: 'Walnut', desc: 'Coffee Truffle' },
              { col: 2, row: 2, color: '#1E293B', top: 'Crisp Pearls', desc: 'Midnight Dark' },
              { col: 3, row: 2, color: '#9333EA', top: 'Lavender', desc: 'Earl Grey' }
            ].map((t, idx) => (
              <g key={idx} transform={`translate(${t.col * 78}, ${t.row * 78})`}>
                {/* Gold Fluted Cup Base */}
                <rect x="0" y="0" width="68" height="68" rx="6" fill="#FEF08A" fillOpacity="0.25" stroke="#D4AF37" strokeWidth="1.2" />
                {/* Handcrafted Truffle sphere */}
                <circle cx="34" cy="34" r="24" fill={t.color} stroke="#FEF08A" strokeWidth="1" />
                {/* Textures / toppings */}
                <circle cx="34" cy="34" r="10" fill="#FFFFFF" fillOpacity="0.25" />
                <circle cx="26" cy="26" r="3" fill="#FBBF24" />
                <circle cx="42" cy="28" r="2.5" fill="#F43F5E" />
              </g>
            ))}
          </g>
        </svg>
      )}

      {/* 8. Jute Bag Hampers (Pages 11, 12, 13) */}
      {(id === 'festive-cookie-gift-bag-classic' ||
        id === 'festive-cookie-gift-bag-healthy' ||
        id === 'mini-jute-bag-hamper') && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="luxJuteTex" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A87C" />
              <stop offset="50%" stopColor="#A68356" />
              <stop offset="100%" stopColor="#805F36" />
            </linearGradient>
          </defs>

          {/* Rope Handles (Page 11) */}
          <path d="M190 70 C190 10 240 10 240 70" stroke="#5D4321" strokeWidth="9" fill="none" strokeLinecap="round" />
          <path d="M280 70 C280 10 330 10 330 70" stroke="#5D4321" strokeWidth="9" fill="none" strokeLinecap="round" />

          {/* Natural Woven Jute Bag Body */}
          <rect x="100" y="70" width="320" height="260" rx="18" fill="url(#luxJuteTex)" stroke="#4A3419" strokeWidth="2.5" />

          {/* Transparent Lace Window with Floral Scalloped Trim (Page 11) */}
          <rect x="130" y="140" width="260" height="135" rx="10" fill="#FFFDF8" fillOpacity="0.9" stroke="#EADCC7" strokeWidth="2" />
          {/* White Floral Lace Header Band */}
          <path
            d="M130 140 Q145 152 160 140 Q175 152 190 140 Q205 152 220 140 Q235 152 250 140 Q265 152 280 140 Q295 152 310 140 Q325 152 340 140 Q355 152 370 140 Q385 152 390 140"
            stroke="#FFFFFF"
            strokeWidth="5"
            fill="none"
          />

          {/* Jars Visible inside the lace window */}
          <g transform="translate(145, 155)">
            <rect x="0" y="0" width="65" height="105" rx="6" fill="#FFF" stroke="#C59B27" strokeWidth="1" />
            <rect x="3" y="25" width="59" height="50" rx="2" fill="#881337" />
            <text x="32.5" y="45" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">COOKIES</text>
            <ellipse cx="32.5" cy="4" rx="28" ry="6" fill="#C59B27" />
          </g>

          <g transform="translate(225, 155)">
            <rect x="0" y="0" width="65" height="105" rx="6" fill="#FFF" stroke="#C59B27" strokeWidth="1" />
            <rect x="3" y="25" width="59" height="50" rx="2" fill="#14532D" />
            <text x="32.5" y="45" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">MILLET</text>
            <ellipse cx="32.5" cy="4" rx="28" ry="6" fill="#C59B27" />
          </g>

          <g transform="translate(305, 155)">
            <rect x="0" y="0" width="65" height="105" rx="6" fill="#FFF" stroke="#C59B27" strokeWidth="1" />
            <rect x="3" y="25" width="59" height="50" rx="2" fill="#78350F" />
            <text x="32.5" y="45" fill="#FFF" fontSize="6.5" textAnchor="middle" fontWeight="bold">MATHRI</text>
            <ellipse cx="32.5" cy="4" rx="28" ry="6" fill="#C59B27" />
          </g>

          {/* Nutrosa Logo Tag on Bag Front (Page 11 & 13) */}
          <rect x="180" y="285" width="160" height="26" rx="4" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="260" y="302" fill="#997A15" fontSize="10" textAnchor="middle" fontWeight="bold" letterSpacing="2">
            NUTRO✿SA
          </text>
        </svg>
      )}

      {/* 9. Festive Premium Gift Bag (Page 10 of PDF) & Elegant Trio Box (Page 6) */}
      {(id === 'festive-premium-gift-bag' || id === 'elegant-festive-trio-box') && (
        <svg viewBox="0 0 520 380" className="w-full h-full p-2 max-w-lg drop-shadow-2xl">
          <defs>
            <linearGradient id="goldBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9EB" />
              <stop offset="60%" stopColor="#F5E4BE" />
              <stop offset="100%" stopColor="#D9B76C" />
            </linearGradient>
          </defs>

          {/* Wooden / Ivory Presentation Platter Box */}
          <rect x="60" y="85" width="400" height="240" rx="14" fill="url(#goldBagGrad)" stroke="#D4AF37" strokeWidth="2.5" />
          <text x="260" y="125" fill="#997A15" fontSize="13" textAnchor="middle" letterSpacing="4" fontWeight="600" fontFamily="serif">
            NUTRO✿SA
          </text>

          {/* Sparkling Pink Lotus Diya (Page 10) */}
          <g transform="translate(360, 95)">
            <circle cx="40" cy="40" r="35" fill="#FFA000" fillOpacity="0.4" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <path key={i} d="M40 40 C35 15 45 15 40 40" transform={`rotate(${deg} 40 40)`} fill="#E91E63" stroke="#FCE7F3" strokeWidth="1" />
            ))}
            <circle cx="40" cy="40" r="14" fill="#D4AF37" stroke="#FFE082" strokeWidth="1" />
            <ellipse cx="40" cy="37" rx="3.5" ry="6" fill="#FF9800" />
            <ellipse cx="40" cy="38" rx="1.8" ry="3.5" fill="#FFFDE7" />
          </g>

          {/* Round Sunburst Golden Shubh Labh Charm (Page 10 bottom center) */}
          <g transform="translate(190, 195)">
            <circle cx="45" cy="45" r="42" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
            <circle cx="45" cy="45" r="32" fill="#FFFBEB" />
            <text x="45" y="52" fill="#B45309" fontSize="16" textAnchor="middle" fontWeight="bold">शुभ</text>
          </g>

          {/* Premium Loose-Leaf Tea Tube with Cork Stopper (Page 10) */}
          <g transform="translate(350, 175) rotate(-15)">
            <rect x="0" y="0" width="16" height="85" rx="8" fill="#F8FAFC" fillOpacity="0.85" stroke="#D4AF37" strokeWidth="1.5" />
            <rect x="0" y="0" width="16" height="14" rx="2" fill="#92400E" />
            <text x="8" y="50" fill="#15803D" fontSize="5.5" textAnchor="middle" transform="rotate(90 8 50)">TEA TUBE</text>
          </g>

          {/* 3 Large 200g Cookie Jars (Page 10) */}
          <g transform="translate(85, 155)">
            <rect x="0" y="0" width="75" height="130" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="2" fill="#881337" />
            <text x="37.5" y="55" fill="#FFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">200g JAR</text>
            <text x="37.5" y="68" fill="#FECDD3" fontSize="8" textAnchor="middle" fontWeight="bold">BROWNIE BITES</text>
            <ellipse cx="37.5" cy="4" rx="33" ry="8" fill="#C59B27" />
          </g>

          <g transform="translate(170, 155)">
            <rect x="0" y="0" width="75" height="130" rx="9" fill="#FFF" stroke="#C59B27" strokeWidth="1.5" />
            <rect x="4" y="32" width="67" height="60" rx="2" fill="#14532D" />
            <text x="37.5" y="55" fill="#FFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">200g JAR</text>
            <text x="37.5" y="68" fill="#BBF7D0" fontSize="8" textAnchor="middle" fontWeight="bold">MILLET COOKIES</text>
            <ellipse cx="37.5" cy="4" rx="33" ry="8" fill="#C59B27" />
          </g>
        </svg>
      )}
      </>
      )}

      {/* Upload Brochure Photo Trigger Button */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleDirectFileUpload}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          fileInputRef.current?.click();
        }}
        disabled={isUploading}
        className="absolute bottom-3 left-3 bg-stone-950/85 hover:bg-stone-900 text-stone-200 hover:text-amber-200 px-2.5 py-1 rounded-md text-[10px] font-semibold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all backdrop-blur-md shadow-md z-10 disabled:opacity-50"
        title="Upload authentic brochure photo for this hamper"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Camera className="w-3 h-3 text-amber-400" />
            <span>{customImage ? 'Change Photo' : 'Upload Photo'}</span>
          </>
        )}
      </button>

      {/* Floating Price Tag on Card */}
      <div className="absolute bottom-3 right-3 bg-stone-950/90 text-amber-300 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-500/30 shadow-xl tabular-nums z-10">
        from ₹{hamper.minPrice} <span className="text-stone-400 font-normal text-[10px]">/ unit</span>
      </div>

      {/* Floating Category Tag */}
      <div className="absolute top-3 left-3 bg-[#122A1F]/90 text-amber-200 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold border border-amber-500/30 z-10">
        {hamper.category}
      </div>
    </div>
  );
};
