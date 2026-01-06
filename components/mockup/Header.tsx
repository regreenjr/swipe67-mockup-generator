'use client';

import { useMockupStore } from '@/store/mockup-store';
import { header } from '@/lib/design-tokens';

export default function Header() {
  const { month, year, currentPhotoIndex, totalPhotos } = useMockupStore();

  const { height, paddingX, backButton, title, counter } = header;

  return (
    <div
      className="absolute left-0 right-0 flex items-center justify-between px-5"
      style={{
        height: `${height}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        top: '7%',
      }}
    >
      {/* Back Button */}
      <div
        style={{
          width: `${backButton.width}px`,
          height: `${backButton.height}px`,
        }}
      >
        <svg
          width={backButton.width}
          height={backButton.height}
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 6L10 13.5L17 21"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <div
        className="font-bold"
        style={{
          fontFamily: title.fontFamily,
          fontSize: `${title.fontSize}px`,
          color: 'var(--color-text-primary)',
        }}
      >
        {title.format(month, year)}
      </div>

      {/* Counter */}
      <div
        className="font-bold"
        style={{
          fontFamily: counter.fontFamily,
          fontSize: `${counter.fontSize}px`,
          color: counter.color,
        }}
      >
        {counter.format(currentPhotoIndex, totalPhotos)}
      </div>
    </div>
  );
}
