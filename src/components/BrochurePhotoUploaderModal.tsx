import React, { useState, useEffect } from 'react';
import { CATALOGUE_ITEMS } from '../data/catalogue';
import { HamperItem } from '../types';
import {
  getCustomHamperImages,
  saveCustomHamperImage,
  removeCustomHamperImage,
  processUploadedImage
} from '../utils/imageStorage';
import { X, Upload, Check, Trash2, Camera, Sparkles, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BrochurePhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetHamperId?: string | null;
}

export const BrochurePhotoUploaderModal: React.FC<BrochurePhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  targetHamperId
}) => {
  const [imagesMap, setImagesMap] = useState<Record<string, string>>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const reloadImages = () => {
    setImagesMap(getCustomHamperImages());
  };

  useEffect(() => {
    if (isOpen) {
      reloadImages();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (hamperId: string, file: File) => {
    try {
      setUploadingId(hamperId);
      const dataUrl = await processUploadedImage(file);
      saveCustomHamperImage(hamperId, dataUrl);
      reloadImages();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Upload failed', err);
      alert('Could not process this image. Please upload a standard JPG or PNG file.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemove = (hamperId: string) => {
    removeCustomHamperImage(hamperId);
    reloadImages();
  };

  const hampersToDisplay = targetHamperId
    ? CATALOGUE_ITEMS.filter((h) => h.id === targetHamperId)
    : CATALOGUE_ITEMS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D5C6AF] overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-[#142C20] text-stone-100 flex items-center justify-between border-b border-[#2C523F]">
          <div>
            <div className="text-xs text-amber-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-amber-300" />
              Brochure Photo Placement Center
            </div>
            <h2 className="text-xl sm:text-2xl font-normal font-serif-heading text-stone-50 mt-1">
              Place Real Brochure Photos on Hampers
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-emerald-900/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-amber-500/10 border border-amber-600/30 rounded-xl p-4 text-xs text-stone-700 leading-relaxed space-y-1">
            <strong className="text-stone-900 font-semibold block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              How to place your authentic photos:
            </strong>
            <p>
              Upload the original high-resolution photo from your phone or photoshoot for each hamper below. Your photo is automatically optimized and permanently locked onto that hamper across all store cards, modals, and the digital flipbook.
            </p>
          </div>

          {/* Grid of Hampers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hampersToDisplay.map((hamper) => {
              const hasCustomPhoto = Boolean(imagesMap[hamper.id]);
              const isUploading = uploadingId === hamper.id;

              return (
                <div
                  key={hamper.id}
                  className="bg-white rounded-xl border border-[#E8DEC8] p-4 flex gap-4 items-center justify-between shadow-xs hover:border-[#142C20] transition-colors"
                >
                  {/* Photo Thumbnail */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-stone-900 relative border border-stone-200 flex items-center justify-center">
                    {hasCustomPhoto ? (
                      <img
                        src={imagesMap[hamper.id]}
                        alt={hamper.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2 text-stone-400">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-60" />
                        <span className="text-[9px] block leading-tight">Default Render</span>
                      </div>
                    )}

                    {hasCustomPhoto && (
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Hamper Info & Uploader */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <h4 className="text-xs font-bold text-stone-900 truncate">
                      {hamper.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {hamper.subtitle}
                    </p>

                    <div className="pt-1 flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#142C20] hover:bg-[#1C3E2D] text-amber-300 rounded-lg text-xs font-semibold transition-all shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isUploading ? 'Saving...' : hasCustomPhoto ? 'Replace Photo' : 'Upload Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(hamper.id, file);
                          }}
                        />
                      </label>

                      {hasCustomPhoto && (
                        <button
                          onClick={() => handleRemove(hamper.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Reset to default render"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8DEC8] flex items-center justify-between text-xs text-stone-600">
          <span>Photos persist in your browser across sessions.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#142C20] text-amber-200 font-semibold rounded-lg hover:bg-[#1C3E2D] cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
