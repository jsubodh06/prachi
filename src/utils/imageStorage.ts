/**
 * Image storage & manager for real brochure photographs.
 * Allows clients to upload and lock actual brochure photos into each hamper slot,
 * persisting them in localStorage across sessions.
 */

const STORAGE_KEY = 'nutrosa_hamper_custom_images_v1';

export function getCustomHamperImages(): Record<string, string> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to read custom hamper images from localStorage', e);
    return {};
  }
}

export function saveCustomHamperImage(hamperId: string, base64Data: string): void {
  try {
    const existing = getCustomHamperImages();
    existing[hamperId] = base64Data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event('nutrosa_images_updated'));
  } catch (e) {
    console.error('Failed to save image to localStorage', e);
  }
}

export function removeCustomHamperImage(hamperId: string): void {
  try {
    const existing = getCustomHamperImages();
    delete existing[hamperId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    window.dispatchEvent(new Event('nutrosa_images_updated'));
  } catch (e) {
    console.error('Failed to remove image from localStorage', e);
  }
}

export function resetAllCustomHamperImages(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('nutrosa_images_updated'));
  } catch (e) {
    console.error('Failed to reset all custom images', e);
  }
}

/**
 * Resizes and compresses an uploaded image file client-side so it fits efficiently into localStorage.
 */
export function processUploadedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Compress as progressive JPEG at 0.85 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image file'));
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
