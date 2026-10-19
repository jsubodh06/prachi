export interface PriceTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
  label: string;
}

export interface HamperItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Healthy & Millet' | 'Festive Boxes' | 'Ultra Luxury' | 'Heritage & Pichwai' | 'Gourmet Cookies' | 'Eco Jute Bags' | 'Party & Favors' | 'Chocolates';
  badge?: string;
  tagline: string;
  description: string;
  contents: string[];
  dietaryHighlights: string[];
  packagingType: string;
  basePrice: number; // lowest 1-29 price or start price
  minPrice: number;  // lowest bulk price
  priceTiers: PriceTier[];
  accentColor: string;
  graphicType: 'healthy-box' | 'candle-box' | 'trio-box' | 'rattan-chest' | 'pichwai-box' | 'cookies-pack' | 'gift-bag' | 'jute-bag' | 'jute-healthy' | 'mini-jute' | 'velvet-party' | 'truffles-box';
  pageNumber?: number;
  customImage?: string;
}

export interface QuoteCartItem {
  hamper: HamperItem;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface BespokeHamperSelection {
  boxId: string;
  selectedTreats: string[];
  selectedKeepsakes: string[];
  personalGreeting: string;
}
