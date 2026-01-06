'use client';

import { actionBar } from '@/lib/design-tokens';

export default function ActionBar() {
  const { height, paddingX, centerButtons } = actionBar;

  return (
    <div
      className="absolute left-0 right-0 flex items-center justify-between"
      style={{
        height: `${height}px`,
        paddingLeft: `${paddingX}px`,
        paddingRight: `${paddingX}px`,
        bottom: '4%',
      }}
    >
      {/* DELETE Button (X Icon) */}
      <div
        className="flex items-center justify-center"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#A683F0', // Purple/pink
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 15L35 35M15 35L35 15"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Center Icons (Share & Bookmark) */}
      <div
        className="flex items-center"
        style={{
          gap: `${centerButtons.gap}px`,
        }}
      >
        {/* Undo/Rotate Icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14H20C24.4183 14 28 17.5817 28 22C28 26.4183 24.4183 30 20 30C15.5817 30 12 26.4183 12 22"
            stroke="#888888"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 10L8 14L12 18"
            stroke="#888888"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Share Icon */}
        <svg
          width={centerButtons.shareIcon.width}
          height={centerButtons.shareIcon.width}
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5 20.5V8M15.5 8L10.5 13M15.5 8L20.5 13"
            stroke={centerButtons.shareIcon.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 18V24C8 24.5304 8.21071 25.0391 8.58579 25.4142C8.96086 25.7893 9.46957 26 10 26H21C21.5304 26 22.0391 25.7893 22.4142 25.4142C22.7893 25.0391 23 24.5304 23 24V18"
            stroke={centerButtons.shareIcon.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Bookmark Icon */}
        <svg
          width={centerButtons.bookmarkIcon.width}
          height={centerButtons.bookmarkIcon.width * 1.4}
          viewBox="0 0 22 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 3C3 2.46957 3.21071 1.96086 3.58579 1.58579C3.96086 1.21071 4.46957 1 5 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V28L11 23L3 28V3Z"
            stroke={centerButtons.bookmarkIcon.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* KEEP Button (Heart Icon) */}
      <div
        className="flex items-center justify-center"
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#7EF5B1', // Green
        }}
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 40L21.5 36.85C13 29.1 7.5 24.1 7.5 17.75C7.5 12.75 11.5 8.75 16.5 8.75C19.44 8.75 22.26 10.13 24 12.26C25.74 10.13 28.56 8.75 31.5 8.75C36.5 8.75 40.5 12.75 40.5 17.75C40.5 24.1 35 29.1 26.5 36.85L25 40Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
