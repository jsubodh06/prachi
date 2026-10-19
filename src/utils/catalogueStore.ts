import { useState, useEffect, useCallback } from 'react';
import { CATALOGUE_ITEMS } from '../data/catalogue';
import { HamperItem, PriceTier } from '../types';
import {
  getCustomHamperImages,
  saveCustomHamperImage,
  removeCustomHamperImage,
  resetAllCustomHamperImages
} from './imageStorage';

export interface PriceOverride {
  basePrice: number;
  minPrice: number;
  priceTiers: PriceTier[];
  updatedAt?: string;
}

const PRICE_STORAGE_KEY = 'nutrosa_catalogue_price_overrides_v1';

export function getPriceOverrides(): Record<string, PriceOverride> {
  try {
    const data = localStorage.getItem(PRICE_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to read price overrides', e);
    return {};
  }
}

export function savePriceOverride(hamperId: string, override: PriceOverride): void {
  try {
    const existing = getPriceOverrides();
    existing[hamperId] = {
      ...override,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
  } catch (e) {
    console.error('Failed to save price override', e);
  }
}

export function removePriceOverride(hamperId: string): void {
  try {
    const existing = getPriceOverrides();
    delete existing[hamperId];
    localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
  } catch (e) {
    console.error('Failed to remove price override', e);
  }
}

export function resetAllPriceOverrides(): void {
  try {
    localStorage.removeItem(PRICE_STORAGE_KEY);
    window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
  } catch (e) {
    console.error('Failed to reset price overrides', e);
  }
}

export function getMergedCatalogue(): HamperItem[] {
  const overrides = getPriceOverrides();
  return CATALOGUE_ITEMS.map((item) => {
    const override = overrides[item.id];
    if (!override) return item;
    return {
      ...item,
      basePrice: typeof override.basePrice === 'number' ? override.basePrice : item.basePrice,
      minPrice: typeof override.minPrice === 'number' ? override.minPrice : item.minPrice,
      priceTiers:
        Array.isArray(override.priceTiers) && override.priceTiers.length > 0
          ? override.priceTiers
          : item.priceTiers
    };
  });
}

export function getAdminStats() {
  const priceOverrides = getPriceOverrides();
  const customImages = getCustomHamperImages();
  const customPriceCount = Object.keys(priceOverrides).length;
  const customImageCount = Object.keys(customImages).length;
  return {
    totalHampers: CATALOGUE_ITEMS.length,
    customPriceCount,
    customImageCount
  };
}

export function exportAdminConfiguration(): string {
  const payload = {
    appName: 'Nutrosa Bakery Diwali 2026',
    exportedAt: new Date().toISOString(),
    priceOverrides: getPriceOverrides(),
    customImages: getCustomHamperImages()
  };
  return JSON.stringify(payload, null, 2);
}

export function importAdminConfiguration(jsonString: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.priceOverrides && typeof parsed.priceOverrides === 'object') {
      localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(parsed.priceOverrides));
      window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
    }
    if (parsed.customImages && typeof parsed.customImages === 'object') {
      localStorage.setItem('nutrosa_hamper_custom_images_v1', JSON.stringify(parsed.customImages));
      window.dispatchEvent(new Event('nutrosa_images_updated'));
    }
    return { success: true, message: 'Settings imported successfully!' };
  } catch (e: any) {
    return { success: false, message: e.message || 'Invalid JSON file format.' };
  }
}

/**
 * Custom React hook to subscribe to catalogue price and image changes
 */
export function useCatalogue() {
  const [hampers, setHampers] = useState<HamperItem[]>(() => getMergedCatalogue());
  const [priceOverrides, setPriceOverrides] = useState<Record<string, PriceOverride>>(() =>
    getPriceOverrides()
  );
  const [customImages, setCustomImages] = useState<Record<string, string>>(() =>
    getCustomHamperImages()
  );

  const refreshCatalogue = useCallback(() => {
    setHampers(getMergedCatalogue());
    setPriceOverrides(getPriceOverrides());
    setCustomImages(getCustomHamperImages());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refreshCatalogue();
    window.addEventListener('nutrosa_catalogue_updated', handleUpdate);
    window.addEventListener('nutrosa_images_updated', handleUpdate);
    return () => {
      window.removeEventListener('nutrosa_catalogue_updated', handleUpdate);
      window.removeEventListener('nutrosa_images_updated', handleUpdate);
    };
  }, [refreshCatalogue]);

  const hasCustomPrice = useCallback(
    (hamperId: string) => Boolean(priceOverrides[hamperId]),
    [priceOverrides]
  );

  const hasCustomImage = useCallback(
    (hamperId: string) => Boolean(customImages[hamperId]),
    [customImages]
  );

  return {
    hampers,
    priceOverrides,
    customImages,
    refreshCatalogue,
    hasCustomPrice,
    hasCustomImage
  };
}
