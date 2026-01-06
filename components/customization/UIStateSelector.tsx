'use client';

import { useMockupStore } from '@/store/mockup-store';
import type { ViewMode, SwipeDirection } from '@/store/mockup-store';

export default function UIStateSelector() {
  const {
    viewMode,
    setViewMode,
    swipeDirection,
    setSwipeDirection,
    showInfoOverlay,
    setShowInfoOverlay,
  } = useMockupStore();

  const viewModes: { value: ViewMode; label: string }[] = [
    { value: 'swipe', label: 'Swipe View' },
    { value: 'completion', label: 'Completion View' },
    { value: 'toast', label: 'Progress Toast' },
  ];

  const swipeDirections: { value: SwipeDirection; label: string }[] = [
    { value: 'none', label: 'None' },
    { value: 'keep', label: 'Keep' },
    { value: 'delete', label: 'Delete' },
  ];

  return (
    <div className="space-y-4">
      {/* View Mode Radio Buttons */}
      <div className="space-y-2">
        {viewModes.map((mode) => (
          <label
            key={mode.value}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name="viewMode"
              value={mode.value}
              checked={viewMode === mode.value}
              onChange={() => setViewMode(mode.value)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-text-primary text-sm">{mode.label}</span>
          </label>
        ))}
      </div>

      {/* Swipe View Options */}
      {viewMode === 'swipe' && (
        <div className="pl-7 space-y-3 mt-4 pt-4 border-t border-text-tertiary/20">
          {/* Show Info Overlay */}
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showInfoOverlay}
              onChange={(e) => setShowInfoOverlay(e.target.checked)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-text-secondary text-sm">Show Info Overlay</span>
          </label>

          {/* Swipe Direction */}
          <div>
            <p className="text-xs text-text-secondary mb-2">Swipe Direction:</p>
            <div className="flex space-x-2">
              {swipeDirections.map((dir) => (
                <button
                  key={dir.value}
                  onClick={() => setSwipeDirection(dir.value)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    swipeDirection === dir.value
                      ? dir.value === 'keep'
                        ? 'bg-keep/20 text-keep border border-keep'
                        : dir.value === 'delete'
                        ? 'bg-delete/20 text-delete border border-delete'
                        : 'bg-text-tertiary/20 text-text-primary border border-text-tertiary'
                      : 'bg-surface text-text-secondary border border-text-tertiary/30 hover:border-text-tertiary'
                  }`}
                >
                  {dir.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
