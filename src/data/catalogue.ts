import { HamperItem } from '../types';

export const CATALOGUE_ITEMS: HamperItem[] = [
  {
    id: 'perfect-diwali-healthy-hamper',
    title: 'Perfect Diwali Healthy Hamper',
    subtitle: 'Millet Cookies · 7-Seed Pop Crackers · Zero-Oil Mathri',
    category: 'Healthy & Millet',
    badge: 'Bestseller · Guilt-Free Indulgence',
    tagline: 'Celebrate guilt-free indulgence this festive season with our specially curated healthy hamper.',
    description: 'Packed with wholesome flavors and mindful ingredients, this makes the ideal gift of health and celebration. Baked with whole grains and superfoods without compromising on royal festive taste.',
    contents: [
      '2 Gluten-Free Millet Cookies (100g each) – made without refined sugar, wholesome sweetness you can enjoy worry-free.',
      '1 Gluten-Free Healthy Seed Pop Crackers (100g) – crunchy artisanal mix of 7 power seeds for nutritious munching.',
      '1 Baked Whole Wheat Mathri (100g) – zero oil, light, and perfectly spiced for traditional festive gatherings.'
    ],
    dietaryHighlights: [
      '100% Gluten-Free Cookies & Crackers',
      'No Refined Sugar',
      'Zero-Oil Baked Mathri',
      '7 Power Superfood Seeds',
      'Zero Artificial Preservatives'
    ],
    packagingType: 'Festive Ivory Gift Box with Golden Floral Mandala, Satin Ribbon & Shubh Labh Charm',
    basePrice: 600,
    minPrice: 400,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 600, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 580, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 550, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 500, label: '100+ units' },
      { minQty: 200, pricePerUnit: 400, label: '200+ units' }
    ],
    accentColor: '#C49A45',
    graphicType: 'healthy-box'
  },
  {
    id: 'festive-cookie-candle-box',
    title: 'Festive Cookie & Candle Box',
    subtitle: '4 Mini Cookie Packs · Shubh Labh · Rasmalai Mithai Candle',
    category: 'Festive Boxes',
    badge: 'Festive Classic',
    tagline: 'A sweet blend of tradition & indulgence, thoughtfully packed for festive gifting.',
    description: 'A glowing hamper of sweetness & celebration to light up every occasion. Blends aromatic dessert candles with fresh artisanal cookies and celebratory chocolates.',
    contents: [
      '4 Mini Cookie Packs (100g each) – Assorted premium flavours (Pista Sticks, Churro, Almond, Jeera Ajwain)',
      '1 Handcrafted Shubh Labh Auspicious Plaque Set',
      '1 Rasmalai Mithai Candle – Festive charm with fragrant sweet gourmet glow',
      'Handmade Artisanal Chocolates'
    ],
    dietaryHighlights: [
      'Freshly Baked to Order',
      'Pure Butter & Real Nuts',
      'Hand-Poured Soy Wax Candle',
      '100% Vegetarian'
    ],
    packagingType: 'Rigid Presentation Box with Gold Lotus Window & Decorative Band',
    basePrice: 500,
    minPrice: 380,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 500, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 480, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 450, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 400, label: '100+ units' },
      { minQty: 200, pricePerUnit: 380, label: '200+ units' }
    ],
    accentColor: '#1F4734',
    graphicType: 'candle-box'
  },
  {
    id: 'elegant-festive-trio-box',
    title: 'Elegant Festive Trio Box',
    subtitle: '3 Mini Cookie Packs · Shubh Labh Plaque · Designer Resin Diya',
    category: 'Festive Boxes',
    badge: 'Popular Corporate Choice',
    tagline: 'Graceful blend of indulgence & tradition, perfect for festive gifting.',
    description: 'A thoughtful gift that brings flavour, festivity & charm in every detail. Designed for streamlined corporate gifting with a high perceived value.',
    contents: [
      '3 Mini Cookie Packs (100g each) – Assorted flavors (Tiramisu, Almond Pista Sticks, Churro Cookie)',
      '1 Hand-Embellished Shubh Labh Plaque',
      '1 Designer Handcrafted Resin Diya with golden accents'
    ],
    dietaryHighlights: [
      'No Palm Oil',
      'Zero Preservatives',
      'Rich Butter Bakes',
      '100% Vegetarian'
    ],
    packagingType: 'Compartmentalized Ivory & Rose-Gold Drawer Gift Box',
    basePrice: 450,
    minPrice: 325,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 450, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 420, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 400, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 350, label: '100+ units' },
      { minQty: 200, pricePerUnit: 325, label: '200+ units' }
    ],
    accentColor: '#9C3D2E',
    graphicType: 'trio-box'
  },
  {
    id: 'premium-rattan-box-hamper',
    title: 'Nutrosa Premium Rattan Box Hamper',
    subtitle: 'Copper Glasses · Rattan Keepsake Chest · Mithai Candles · DIY Rangoli',
    category: 'Ultra Luxury',
    badge: 'Crown Jewel · Heirloom Chest',
    tagline: 'A thoughtfully curated festive gift that blends royal heritage with culinary indulgence.',
    description: 'Housed in an exquisite hand-woven rattan box with polished golden brass detailing. A statement gift for esteemed clients, VIP partners, and family matriarchs.',
    contents: [
      '2 Handcrafted Pure Copper Glasses – Luxurious Ayurvedic tumblers for a timeless healthy touch',
      'DIY Rangoli Kit – Vibrant natural colors & stencils to add creative festive charm',
      'Signature Nutrosa Cookie Jars – Assorted soft-baked gourmet recipes',
      'Auspicious Shubh Labh Set',
      'Mithai Candles – Sculpted like traditional Indian confections with evocative sweet aroma',
      'Soft Baked Cookie / Brownie Pack – Rich decadence baked with real couverture chocolate',
      '100g Hand-Selected California Almonds',
      'Handmade Gourmet Artisanal Chocolates'
    ],
    dietaryHighlights: [
      'Hand-Woven Natural Rattan Keepsake Chest',
      'Pure Hammered Copper Tumblers',
      'Finest California Almonds',
      'Gourmet Handcrafted Chocolates'
    ],
    packagingType: 'Handcrafted Heritage Woven Rattan Keepsake Box with Brass Catch & Golden Ribbons',
    basePrice: 2950,
    minPrice: 2250,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 2950, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 2800, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 2650, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 2450, label: '100+ units' },
      { minQty: 200, pricePerUnit: 2250, label: '200+ units' }
    ],
    accentColor: '#B07B37',
    graphicType: 'rattan-chest'
  },
  {
    id: 'nutrosa-pichwai-hamper',
    title: 'Nutrosa Pichwai Hamper',
    subtitle: 'Hand-Painted Pichwai Art Tray · Elephant Diyas · Phool Dhoop',
    category: 'Heritage & Pichwai',
    badge: 'Artisanal Heritage Box',
    tagline: 'Celebrate the festival of lights with a hamper inspired by timeless Indian Pichwai motifs.',
    description: 'Beautifully blends Rajasthani Pichwai art traditions with modern luxury baking. Features holy cows, dancing peacocks, lotus blossoms, and fragrant cow dung diyas.',
    contents: [
      'Pichwai Tray with Jar – A hand-painted festive jar nestled inside an elegant Pichwai-themed wooden tray',
      'Pichwai Shubh Labh Set – Artistic motifs symbolizing prosperity, wealth and auspicious beginnings',
      'Cow Dung Diyas & Phool Natural Dhoop Sticks (Eco-conscious artisanal aromas)',
      '2 Hand-Painted Elephant Terracotta Diyas',
      'Nutrosa Signature Soft-Baked Cookie Jars',
      'Almonds & Panned Gourmet Chocolate Nuts',
      'Assorted Handcrafted Chocolates'
    ],
    dietaryHighlights: [
      'Handmade Pichwai Art Keepsake Tray',
      'Eco-Friendly Phool Charcoal-Free Dhoop',
      'Artisanal Nutrosa Soft-Baked Bakes',
      'Pan-India Safe Shock-Absorbent Packing'
    ],
    packagingType: 'Royal Pichwai Art Collector Wooden Tray Box with Gilded Trim',
    basePrice: 1360,
    minPrice: 1150,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 1360, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 1340, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 1300, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 1200, label: '100+ units' },
      { minQty: 200, pricePerUnit: 1150, label: '200+ units' }
    ],
    accentColor: '#17365D',
    graphicType: 'pichwai-box'
  },
  {
    id: 'pack-of-5-premium-cookies',
    title: 'Pack of 5 – Center-Filled Artisan Cookies',
    subtitle: 'Nutella Red Velvet · Cinn Biscoff · Pistachio Kunafa Crunch · ChocoChunk',
    category: 'Gourmet Cookies',
    badge: 'Signature Bakery Star',
    tagline: 'Indulge in 5 premium soft-baked, center-filled cookies (60g each) crafted with molten gooey hearts.',
    description: 'A culinary masterclass of crisp edges and molten center fillings. Each 60g cookie is individually vacuum-sealed in foil sachets inside a luxury royal violet gift box.',
    contents: [
      '1x Nutella Red Velvet Bliss Cookie (Rich crimson dough oozing with molten Nutella)',
      '1x Cinn Biscoff Bliss Cookie (Spiced cinnamon dough filled with creamy Speculoos spread)',
      '1x Real Pistachio Kunafa Crunch Cookie (Crispy phyllo kataifi crunch with premium pistachio butter)',
      '1x Life ChocoChunk Cookie (Decadent dark Belgian chocolate melting core)',
      '1x Churro Cinnamon Sugar Cookie (Caramelized Spanish dulce de leche notes)'
    ],
    dietaryHighlights: [
      'Gooey Molten Core Centers',
      '60g Large Bakery Portion per cookie',
      'Pure Butter & Real Belgian Couverture',
      'Airtight Individual Foil Sachets'
    ],
    packagingType: 'Royal Violet & Metallic Gold Presentation Gift Box',
    basePrice: 500,
    minPrice: 350,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 500, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 480, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 450, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 400, label: '100+ units' },
      { minQty: 200, pricePerUnit: 350, label: '200+ units' }
    ],
    accentColor: '#5C2D6D',
    graphicType: 'cookies-pack'
  },
  {
    id: 'festive-premium-gift-bag',
    title: 'Festive Premium Gift Bag',
    subtitle: '3 Cookie Jars (200g) · Loose-Leaf Tea Tube · Lotus Diya · Shubh Labh',
    category: 'Festive Boxes',
    badge: 'Deluxe Hamper Bag',
    tagline: 'A thoughtfully curated hamper combining festive charm with Nutrosa’s signature delights.',
    description: 'A lavish gift blending taste, tradition, and elegance in one bag. Featuring substantial 200g jars and a bespoke tea blend in a test tube canister.',
    contents: [
      '3 Cookie Jars (200g each) – Soft-Baked Cookie / Brownie varieties',
      '1 Tea Tube – Premium aromatic whole loose-leaf herbal & floral tea blend',
      '1 Shubh Labh Set – Auspicious ornate home blessing charms',
      '1 Lotus Diya – Handcrafted sparkling multi-petaled diya'
    ],
    dietaryHighlights: [
      'Large 600g Total Cookie Volume',
      'Exotic Loose-Leaf Tea Blend',
      'Handcrafted Lotus Diya Keepsake',
      'Festive Golden Bag Presentation'
    ],
    packagingType: 'Golden Shimmer Bag with Sheer Organza Wrap & Silk Tassels',
    basePrice: 1365,
    minPrice: 1150,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 1365, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 1330, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 1300, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 1250, label: '100+ units' },
      { minQty: 200, pricePerUnit: 1150, label: '200+ units' }
    ],
    accentColor: '#D97706',
    graphicType: 'gift-bag'
  },
  {
    id: 'festive-cookie-gift-bag-classic',
    title: 'Festive Cookie Gift Bag (Classic Jute)',
    subtitle: 'Pack of 3 Cookies (200g jars) · Decorative Diya · Shubh Labh',
    category: 'Eco Jute Bags',
    badge: 'Eco-Luxe Favorite',
    tagline: 'A compact yet thoughtful gift that blends festive tradition with Nutrosa’s signature treats.',
    description: 'Crafted in an eco-friendly handwoven natural jute tote with an ornate white lace viewing window and soft rope carry handles.',
    contents: [
      'Pack of 3 Premium Cookies (200g airtight jars) in assorted flavours',
      '1 Decorative Handcrafted Diya to light up the festive night',
      '1 Auspicious Shubh Labh Set for good beginnings'
    ],
    dietaryHighlights: [
      'Reusable Sustainable Jute Tote with Lace',
      'Zero Single-Use Plastic Packing',
      'Assorted Fresh Artisanal Cookies',
      'Great for Corporate Return Favors'
    ],
    packagingType: 'Natural Jute Tote with White Floral Lace Window & Cotton Rope Handles',
    basePrice: 600,
    minPrice: 500,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 600, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 570, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 550, label: '50+ units' },
      { minQty: 100, pricePerUnit: 500, label: '100+ units' }
    ],
    accentColor: '#8C6D46',
    graphicType: 'jute-bag'
  },
  {
    id: 'festive-cookie-gift-bag-healthy',
    title: 'Festive Cookie Gift Bag (Option 2 – Healthy Bag)',
    subtitle: '2 Healthy Cookie Jars · Munching Snack · Phool Dhoop · Granola',
    category: 'Healthy & Millet',
    badge: 'Nutrient-Dense Gift',
    tagline: 'A thoughtfully created healthy hamper combining festive charm with nutritious superfood bites.',
    description: 'Curated for health-conscious teams, families, and fitness enthusiasts. Filled with clean granola, roasted superfoods, and millet bakery items.',
    contents: [
      'Pack of 2 Healthy Cookie Jars (200g each) made with unrefined sugars',
      '1 Jar Munching Healthy Superfood Snack Mix',
      '1 Soft Baked Millet Cookie / Millet Brownie',
      '1 Pack Phool Natural Temple Flower Dhoop Sticks',
      '1 Artisanal Crunchy Granola Mix',
      '1 Auspicious Shubh Labh Set'
    ],
    dietaryHighlights: [
      'Rich in Dietary Fiber & Plant Protein',
      'Superseed Crunchy Mix',
      'Clean Whole Grains & Millets',
      'Sacred Phool Sustainable Incense'
    ],
    packagingType: 'Eco Natural Jute Tote with Lace Window & Golden Twine Ribbon',
    basePrice: 955,
    minPrice: 750,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 955, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 930, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 900, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 850, label: '100+ units' },
      { minQty: 200, pricePerUnit: 750, label: '200+ units' }
    ],
    accentColor: '#36694C',
    graphicType: 'jute-healthy'
  },
  {
    id: 'mini-jute-bag-hamper',
    title: 'Mini Jute Bag Hamper',
    subtitle: 'Cookie Jar + Traditional Diya in Artisan Mini Tote',
    category: 'Party & Favors',
    badge: 'Affordable Gifting Token',
    tagline: 'Sweet bites & warm lights: The perfect little gift of love & light this festive season.',
    description: 'An adorable, budget-friendly festive favor ideal for Diwali card parties, puja return gifts, community gatherings, and corporate tokens.',
    contents: [
      '1 Nutrosa Signature Cookie Jar (assorted flavors)',
      '1 Handcrafted Decorative Terracotta Diya',
      'Custom Nutrosa branded festive sleeve with ribbon'
    ],
    dietaryHighlights: [
      'Handcrafted Jute Packaging with Display Window',
      'Perfect Entry-Level Budget Gift',
      'Zero Preservative Baking',
      'Custom Corporate Tag Support'
    ],
    packagingType: 'Mini Natural Burlap/Jute Gift Bag with Clear Display Window',
    basePrice: 380,
    minPrice: 275,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 380, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 350, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 320, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 295, label: '100+ units' },
      { minQty: 200, pricePerUnit: 275, label: '200+ units' }
    ],
    accentColor: '#96633E',
    graphicType: 'mini-jute'
  },
  {
    id: 'premium-luxurious-velvet-party-box',
    title: 'Premium Luxurious Velvet Party Box',
    subtitle: 'Golden Playing Cards · Poker Chips · Reindeer Jar · Urli Diya · Casino Chocolates',
    category: 'Ultra Luxury',
    badge: 'Diwali Card Night Edition',
    tagline: 'Celebrate in royal style with this elegant velvet keepsake box, filled with indulgent treats and party surprises.',
    description: 'The ultimate hamper for Diwali taash (card) night and lavish soirees. Housed in a bespoke deep emerald velvet round keepsake box with gold accents, golden ribbon, and antler finial.',
    contents: [
      'Fancy Reindeer Jar with 100g Cookies & Baked Mathri',
      '1 Deck of Waterproof 24K Gold Foil Playing Cards',
      '1 Professional Casino Poker Chips Set in Display Caddy',
      'Casino Gold Foil Wrapped Chocolates',
      'Urli Floral Diya with floating fragrance candle',
      'Premium Tea Tube – aromatic single-origin loose-leaf blend',
      'Mocktail Gourmet Nut Trail Mix'
    ],
    dietaryHighlights: [
      'Royalty Velvet Round Keepsake Hatbox',
      'Complete Luxury Card Party Companion',
      'Zero-Oil Baked Mathri & Gourmet Nuts',
      'Timeless Keepsakes for year-round reuse'
    ],
    packagingType: 'Deep Emerald Round Velvet Keepsake Hatbox with Satin Lining & Golden Ribbon',
    basePrice: 2756,
    minPrice: 2250,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 2756, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 2700, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 2600, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 2500, label: '100+ units' },
      { minQty: 200, pricePerUnit: 2250, label: '200+ units' }
    ],
    accentColor: '#0E3B29',
    graphicType: 'velvet-party'
  },
  {
    id: 'assorted-truffles-pack-of-12',
    title: 'Assorted Hand-Crafted Truffles – Box of 12',
    subtitle: 'Melt-in-the-Mouth Artisan Ganache · Pistachio · Hazelnut · Rose Dark Cocoa',
    category: 'Chocolates',
    badge: 'Artisanal Confection',
    tagline: 'A luxurious selection of 12 hand-crafted truffles, each bite bursting with rich flavours and a melt-in-the-mouth experience.',
    description: 'Perfect for intimate gifting or sweet sharing. Freshly rolled in toasted nuts, dried rose, rich cocoa powder, and Belgian crisp pearls.',
    contents: [
      '12 Artisanal Couverture Chocolate Truffles',
      'Flavor Profile: Kashmiri Rose & Pistachio, Belgian Dark Truffle, Hazelnut Praline, Roasted Almond Crunch, White Coconut Ganache, Salted Caramel Truffle',
      'Individual gold fluted cups in partitioned presentation gift box'
    ],
    dietaryHighlights: [
      'Handmade with Pure Cocoa Butter',
      'Melt-in-the-Mouth Smoothness',
      'No Artificial Essence or Preservatives',
      'Temperature-Controlled Transit Packing'
    ],
    packagingType: 'Crimson & Golden Partitioned Keepsake Box with Clear Top',
    basePrice: 480,
    minPrice: 360,
    priceTiers: [
      { minQty: 1, maxQty: 29, pricePerUnit: 480, label: '01–29 units' },
      { minQty: 30, maxQty: 49, pricePerUnit: 450, label: '30+ units' },
      { minQty: 50, maxQty: 99, pricePerUnit: 420, label: '50+ units' },
      { minQty: 100, maxQty: 199, pricePerUnit: 390, label: '100+ units' },
      { minQty: 200, pricePerUnit: 360, label: '200+ units' }
    ],
    accentColor: '#6B1F2A',
    graphicType: 'truffles-box'
  }
];

export const BRAND_INFO = {
  name: 'NUTROSA',
  fullName: 'Nutrosa Bakery',
  founder: 'Prachi Kasliwal Kala',
  tagline: 'Let us spread happiness and joy all around us',
  about: 'Nutrosa brings you premium cookies, crackers, and bites — a perfect blend of everyday indulgence and festive gifting. Founded by Prachi Kasliwal Kala, Nutrosa is a passion-born brand that blends premium taste, quality, and the pure joy of sharing sweet moments.',
  promise: 'Nutrosa crafts every bite with love and premium quality, bringing you freshness, taste, and joy in every moment.',
  pillars: [
    { title: 'Premium Ingredients', desc: 'Real butter, finest nuts, superfood seeds, and Belgian couverture chocolate.' },
    { title: 'No Preservatives', desc: 'Freshly baked without chemical preservatives or artificial shelf stabilizers.' },
    { title: 'Wholesome Variety', desc: 'Gluten-free millet bakes, zero-oil savory mathri, and melt-in-mouth cookies.' },
    { title: 'Bespoke Corporate Gifting', desc: 'Custom logo sleeves, branded ribbons, personalized cards, and custom hampers.' },
    { title: 'Pan-India Delivery', desc: 'Transit-tested shock-proof packaging delivered across all Indian pin codes.' }
  ],
  contacts: {
    phones: ['+918484911705', '+919405911705'],
    phoneDisplay: '+91 84849 11705 / +91 94059 11705',
    email: 'prachi@nutrosabakery.com',
    website: 'www.nutrosabakery.com',
    instagram: '@nutrosabakery',
    whatsappNumber: '918484911705'
  }
};

export const BESPOKE_BOX_OPTIONS = [
  { id: 'velvet-round', name: 'Royal Emerald Velvet Hatbox', price: 650, desc: 'Lush green velvet round keepsake box with gold satin interior and lid pull' },
  { id: 'pichwai-tray', name: 'Handcrafted Pichwai Wood Tray', price: 500, desc: 'Artistic Pichwai painted tray with golden border finish' },
  { id: 'rattan-chest', name: 'Artisan Handwoven Rattan Box', price: 750, desc: 'Eco-luxury natural woven rattan chest with brass clasp' },
  { id: 'eco-jute-tote', name: 'Lace-Windowed Natural Jute Tote', price: 180, desc: 'Sustainable rustic chic tote bag with viewing lace panel' },
  { id: 'festive-gold-box', name: 'Nutrosa Golden Mandala Keepsake Box', price: 280, desc: 'Rigid magnetic gift box embossed in metallic gold foils' }
];

export const BESPOKE_TREAT_OPTIONS = [
  { id: 'millet-cookies', name: 'Gluten-Free Millet Cookies (100g)', price: 180, category: 'Bakery' },
  { id: 'kunafa-cookie', name: 'Pistachio Kunafa Crunch Cookie (60g)', price: 130, category: 'Bakery' },
  { id: 'biscoff-cookie', name: 'Molten Cinn Biscoff Cookie (60g)', price: 120, category: 'Bakery' },
  { id: 'red-velvet-cookie', name: 'Nutella Red Velvet Bliss Cookie (60g)', price: 125, category: 'Bakery' },
  { id: 'seed-crackers', name: '7-Seed Power Pop Crackers (100g)', price: 160, category: 'Healthy' },
  { id: 'baked-mathri', name: 'Zero-Oil Baked Whole Wheat Mathri (100g)', price: 140, category: 'Savory' },
  { id: 'almond-jar', name: 'Hand-Selected California Almonds (100g)', price: 190, category: 'Dry Fruits' },
  { id: 'truffles-6pack', name: 'Artisanal Couverture Truffles (Pack of 6)', price: 240, category: 'Chocolates' },
  { id: 'tea-tube', name: 'Signature Loose-Leaf Tea Tube', price: 220, category: 'Beverage' }
];

export const BESPOKE_KEEPSAKE_OPTIONS = [
  { id: 'copper-glass', name: 'Handcrafted Pure Copper Tumbler', price: 380 },
  { id: 'shubh-labh', name: 'Artistic Shubh Labh Auspicious Plaque', price: 120 },
  { id: 'lotus-diya', name: 'Hand-Embellished Sparkling Lotus Diya', price: 150 },
  { id: 'rasmalai-candle', name: 'Rasmalai Mithai Fragrant Sweet Candle', price: 160 },
  { id: 'gold-cards', name: '24K Gold Foil Waterproof Playing Cards', price: 290 },
  { id: 'phool-dhoop', name: 'Phool Natural Flower Dhoop Incense Pack', price: 110 }
];
