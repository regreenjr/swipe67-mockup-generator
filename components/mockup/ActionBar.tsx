'use client';

import { actionBar } from '@/lib/design-tokens';

export default function ActionBar() {
  const { height, paddingX, deleteButton, keepButton, centerButtons } = actionBar;

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
      {/* DELETE Button */}
      <div
        className="font-bold"
        style={{
          fontFamily: deleteButton.fontFamily,
          fontSize: `${deleteButton.fontSize}px`,
          color: deleteButton.color,
        }}
      >
        {deleteButton.text}
      </div>

      {/* Center Icons (Share & Bookmark) */}
      <div
        className="flex items-center"
        style={{
          gap: `${centerButtons.gap}px`,
        }}
      >
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

      {/* KEEP Button */}
      <div
        className="font-bold"
        style={{
          fontFamily: keepButton.fontFamily,
          fontSize: `${keepButton.fontSize}px`,
          color: keepButton.color,
        }}
      >
        {keepButton.text}
      </div>
    </div>
  );
}
