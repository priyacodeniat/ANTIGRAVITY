import React, { useState, useRef } from 'react';
import { Upload, Camera, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  onClear: () => void;
  selectedImage: File | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onClear,
  selectedImage,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please choose a smaller image.');
        return;
      }
      onImageSelected(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleClear = () => {
    onClear();
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center max-h-80">
          <img src={preview} alt="Plant scan preview" className="object-contain max-h-80 w-auto" />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition"
            title="Remove image"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition bg-slate-50/50">
          <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">Upload Infected Crop Photo</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
            Take a clear, well-lit photo of the affected leaf, stem, or fruit. Max 8MB (JPG, PNG, WEBP).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Gallery Upload */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-xl shadow-xs transition">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Browse Photos</span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Direct Camera Capture (Mobile Ready) */}
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition">
              <Camera className="w-4 h-4" />
              <span>Use Camera</span>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

