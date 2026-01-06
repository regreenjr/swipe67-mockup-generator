'use client';

import Header from './Header';
import SwipeCard from './SwipeCard';
import ActionBar from './ActionBar';
import { swipeCard } from '@/lib/design-tokens';

export default function SwipeView() {
  return (
    <div className="relative w-full h-full">
      {/* Header */}
      <Header />

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
