/**
 * Image storage & manager for real hamper & brochure photographs.
 * Supports dual storage:
 * 1. Synchronous localStorage with smart canvas downscaling (~60-90KB per image)
 * 2. Asynchronous IndexedDB for large/unlimited photo storage across sessions
 * 3. In-memory cache for instant UI rendering across all components
 */

const STORAGE_KEY = 'nutrosa_hamper_custom_images_v1';
const DB_NAME = 'nutrosa_catalogue_db';
const DB_VERSION = 1;
const STORE_NAME = 'hamper_images';

// Global memory cache for instant access
const memoryImageCache: Record<string, string> = {};

// Helper: Open or create IndexedDB
function openDatabase(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('IndexedDB open error, falling back to localStorage');
        resolve(null);
      };
    } catch (e) {
      console.warn('IndexedDB not supported or blocked in this environment', e);
      resolve(null);
    }
  });
}

// Save directly to IndexedDB
async function saveToIndexedDB(hamperId: string, dataUrl: string): Promise<void> {
  const db = await openDatabase();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(dataUrl, hamperId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      console.warn('Failed to write to IndexedDB', e);
      resolve();
    }
  });
}

// Remove from IndexedDB
async function removeFromIndexedDB(hamperId: string): Promise<void> {
  const db = await openDatabase();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.delete(hamperId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

// Clear all in IndexedDB
async function clearIndexedDB(): Promise<void> {
  const db = await openDatabase();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

// Hydrate from IndexedDB on startup
if (typeof window !== 'undefined') {
  // Prime memory cache from localStorage immediately
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      Object.assign(memoryImageCache, parsed);
    }
  } catch (e) {
    console.warn('LocalStorage prime warning', e);
  }

  // Then check IndexedDB for any additional or larger images
  openDatabase().then((db) => {
    if (!db) return;
    try {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      let hasNew = false;
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest).result;
        if (cursor) {
          const key = cursor.key as string;
          const val = cursor.value as string;
          if (!memoryImageCache[key] || memoryImageCache[key] !== val) {
            memoryImageCache[key] = val;
            hasNew = true;
          }
          cursor.continue();
        } else if (hasNew) {
          window.dispatchEvent(new Event('nutrosa_images_updated'));
        }
      };
    } catch (e) {
      console.warn('IndexedDB cursor warning', e);
    }
  });
}

export function getCustomHamperImages(): Record<string, string> {
  if (Object.keys(memoryImageCache).length > 0) {
    return { ...memoryImageCache };
  }
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      Object.assign(memoryImageCache, parsed);
    }
  } catch (e) {
    console.error('Failed to read custom hamper images from localStorage', e);
  }
  return { ...memoryImageCache };
}

export function saveCustomHamperImage(hamperId: string, base64Data: string): void {
  // 1. Immediately update memory cache
  memoryImageCache[hamperId] = base64Data;

  // 2. Persist to localStorage safely (handling quota exceptions)
  try {
    const existing = { ...memoryImageCache };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (quotaErr) {
    console.warn('LocalStorage quota limit reached, saving with compact fallback', quotaErr);
    try {
      // Keep recent images in localStorage
      const trimmed: Record<string, string> = {};
      const keys = Object.keys(memoryImageCache);
      const recentKeys = keys.slice(-6); // Keep last 6 in localStorage
      for (const k of recentKeys) {
        trimmed[k] = memoryImageCache[k];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e2) {
      console.warn('LocalStorage completely full, relying on IndexedDB & memory cache');
    }
  }

  // 3. Persist to IndexedDB (asynchronous backing store)
  saveToIndexedDB(hamperId, base64Data);

  // 4. Notify all components
  window.dispatchEvent(new Event('nutrosa_images_updated'));
  window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
}

export function removeCustomHamperImage(hamperId: string): void {
  delete memoryImageCache[hamperId];
  try {
    const existing = getCustomHamperImages();
    delete existing[hamperId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to remove image from localStorage', e);
  }
  removeFromIndexedDB(hamperId);
  window.dispatchEvent(new Event('nutrosa_images_updated'));
  window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
}

export function resetAllCustomHamperImages(): void {
  for (const k of Object.keys(memoryImageCache)) {
    delete memoryImageCache[k];
  }
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset all custom images', e);
  }
  clearIndexedDB();
  window.dispatchEvent(new Event('nutrosa_images_updated'));
  window.dispatchEvent(new Event('nutrosa_catalogue_updated'));
}

/**
 * Resizes and compresses an uploaded image file client-side.
 * Uses 800px max dimension and 0.78 JPEG quality for crisp visual presentation
 * while producing lightweight ~35-60KB strings that fit comfortably in browser storage.
 */
export function processUploadedImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file was selected.'));
      return;
    }

    // Accept standard image types
    const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|gif|bmp|avif)$/i.test(file.name);
    if (!isImage) {
      reject(new Error('Please select an image file (JPEG, PNG, WebP, etc.).'));
      return;
    }

    const processWithImage = (imageElement: HTMLImageElement, cleanup?: () => void) => {
      try {
        const canvas = document.createElement('canvas');
        const maxDimension = 800; // Sharp on high-DPI screens, compact file size
        let width = imageElement.naturalWidth || imageElement.width;
        let height = imageElement.naturalHeight || imageElement.height;

        if (!width || !height) {
          cleanup?.();
          reject(new Error('Unable to read image dimensions.'));
          return;
        }

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

        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          cleanup?.();
          reject(new Error('Canvas rendering is not supported in this browser.'));
          return;
        }

        // Clean white background for transparent PNG/WebP files
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
        cleanup?.();
        resolve(dataUrl);
      } catch (canvasErr) {
        cleanup?.();
        reject(new Error('Failed to process image canvas.'));
      }
    };

    // Attempt URL.createObjectURL for memory-efficient loading of large phone photos
    let objectUrl: string | null = null;
    try {
      objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        processWithImage(img, () => {
          if (objectUrl) URL.revokeObjectURL(objectUrl);
        });
      };
      img.onerror = () => {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
        // Fallback to FileReader if ObjectURL failed
        fallbackToFileReader(file, resolve, reject);
      };
      img.src = objectUrl;
    } catch (e) {
      // Direct fallback to FileReader
      fallbackToFileReader(file, resolve, reject);
    }
  });
}

function fallbackToFileReader(
  file: File,
  resolve: (value: string) => void,
  reject: (reason: Error) => void
) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const rawData = e.target?.result as string;
    if (!rawData) {
      reject(new Error('Failed to read file data.'));
      return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (w > h && w > maxDim) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else if (h > maxDim) {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.78));
          return;
        }
      } catch (err) {
        // continue
      }
      resolve(rawData);
    };

    img.onerror = () => {
      if (rawData.startsWith('data:image/')) {
        resolve(rawData);
      } else {
        reject(new Error('The image could not be decoded. Please choose a JPG, PNG, or WebP photo.'));
      }
    };

    img.src = rawData;
  };

  reader.onerror = () => reject(new Error('Failed to read file from disk.'));
  reader.readAsDataURL(file);
}
