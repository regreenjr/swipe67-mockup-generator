'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMockupStore } from '@/store/mockup-store';
import Image from 'next/image';

export default function ImageUploader() {
  const { uploadedImage, setUploadedImage } = useMockupStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
          const dataUrl = reader.result as string;
          setUploadedImage(dataUrl);
        };

        reader.readAsDataURL(file);
      }
    },
    [setUploadedImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="space-y-3">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-text-tertiary/30 hover:border-text-tertiary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-text-secondary"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-2 text-sm text-text-secondary">
            {isDragActive ? (
              <span className="text-primary">Drop image here</span>
            ) : (
              <>
                <span className="text-text-primary font-medium">Click to upload</span> or
                drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-text-tertiary mt-1">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>
      </div>

      {/* Preview */}
      {uploadedImage && (
        <div className="relative">
          <div className="relative w-full h-32 rounded-lg overflow-hidden bg-surface">
            <Image
              src={uploadedImage}
              alt="Uploaded preview"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <button
            onClick={() => setUploadedImage(null)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-delete rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-delete/80 transition-colors"
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
