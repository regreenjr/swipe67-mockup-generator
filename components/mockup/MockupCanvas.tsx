'use client';

import { useMockupStore } from '@/store/mockup-store';
import SwipeView from './SwipeView';
import { exportPresets } from '@/lib/design-tokens';

export default function MockupCanvas() {
  const { viewMode, exportPreset } = useMockupStore();

  // Get dimensions based on preset
  const dimensions = exportPresets[exportPreset];

  return (
    <div
      id="mockup-canvas"
      className="relative overflow-hidden"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        backgroundColor: 'var(--color-background-dark)',
      }}
    >
      {/* Render different views based on mode */}
      {viewMode === 'swipe' && <SwipeView />}

      {viewMode === 'completion' && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-text-primary">Completion View (Coming Soon)</p>
        </div>
      )}

      {viewMode === 'toast' && (
        <>
          <SwipeView />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-text-primary bg-surface px-8 py-4 rounded-lg">
              Toast View (Coming Soon)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
