'use client';

import Header from './Header';
import SwipeCard from './SwipeCard';
import ActionBar from './ActionBar';
import { swipeCard } from '@/lib/design-tokens';
import { useMockupStore } from '@/store/mockup-store';

export default function SwipeView() {
  const { totalPhotos, currentPhotoIndex } = useMockupStore();
  const photosLeft = totalPhotos - currentPhotoIndex;

  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <Header />

      {/* Photos Left & Time Remaining */}
      <div
        className="absolute left-0 right-0 flex items-center justify-between px-5"
        style={{
          top: 'calc(7% + 56px + 20px)', // Below header
        }}
      >
        <div className="text-text-secondary" style={{ fontSize: '15px' }}>
          {photosLeft} photo{photosLeft !== 1 ? 's' : ''} left
        </div>
        <div className="text-text-secondary" style={{ fontSize: '15px' }}>
          ~15 sec
        </div>
      </div>

      {/* SwipeCard - positioned at 26% from top */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: swipeCard.top,
        }}
      >
        <SwipeCard />
      </div>

      {/* ActionBar */}
      <ActionBar />
    </div>
  );
}
