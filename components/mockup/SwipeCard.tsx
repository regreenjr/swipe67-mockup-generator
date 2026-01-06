'use client';

import { useMockupStore } from '@/store/mockup-store';
import { swipeCard } from '@/lib/design-tokens';
import Image from 'next/image';

export default function SwipeCard() {
  const {
    uploadedImage,
    swipeDirection,
    showInfoOverlay,
    month,
    year,
    currentPhotoIndex,
    spaceSavedMB,
  } = useMockupStore();

  // Use placeholder if no image uploaded
  const imageUrl = uploadedImage || '/sample-photos/sample-1.jpg';

  // Card dimensions
  const { width, height, borderRadius, labels, shadow } = swipeCard;

  // Show KEEP label
  const showKeepLabel = swipeDirection === 'keep';
  const showDeleteLabel = swipeDirection === 'delete';

  return (
    <div
      className="relative bg-white"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        boxShadow: `${shadow.offset.width}px ${shadow.offset.height}px ${shadow.radius}px rgba(0, 0, 0, ${shadow.opacity})`,
      }}
    >
      {/* Photo Image */}
      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
        <Image
          src={imageUrl}
          alt="Swipe photo"
          fill
          className="object-cover"
          priority
          unoptimized // Allow external images
        />

        {/* KEEP Label */}
        {showKeepLabel && (
          <div
            className="absolute"
            style={{
              top: `${labels.keep.padding.top}px`,
              left: `${labels.keep.padding.left}px`,
              transform: `rotate(${labels.keep.rotation}deg)`,
              border: `${labels.keep.borderWidth}px solid ${labels.keep.color}`,
              backgroundColor: `rgba(126, 245, 177, 0.2)`,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            <span
              className="font-bold text-2xl"
              style={{ color: labels.keep.color }}
            >
              {labels.keep.text}
            </span>
          </div>
        )}

        {/* DELETE Label */}
        {showDeleteLabel && (
          <div
            className="absolute"
            style={{
              top: `${labels.delete.padding.top}px`,
              right: `${labels.delete.padding.right}px`,
              transform: `rotate(${labels.delete.rotation}deg)`,
              border: `${labels.delete.borderWidth}px solid ${labels.delete.color}`,
              backgroundColor: `rgba(166, 131, 240, 0.2)`,
              padding: '8px 20px',
              borderRadius: '8px',
            }}
          >
            <span
              className="font-bold text-2xl"
              style={{ color: labels.delete.color }}
            >
              {labels.delete.text}
            </span>
          </div>
        )}

        {/* Info Overlay */}
        {showInfoOverlay && (
          <div
            className="absolute bottom-0 left-0 p-4"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)',
              borderBottomLeftRadius: `${borderRadius}px`,
              borderBottomRightRadius: `${borderRadius}px`,
            }}
          >
            <div className="text-white">
              <p className="font-bold text-base">IMG_{currentPhotoIndex.toString().padStart(4, '0')}.HEIC</p>
              <p className="text-sm opacity-90">
                {month}/{year.length === 2 ? `20${year}` : year}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
