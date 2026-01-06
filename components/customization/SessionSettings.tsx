'use client';

import { useMockupStore } from '@/store/mockup-store';

export default function SessionSettings() {
  const {
    photosReviewed,
    setPhotosReviewed,
    photosDeleted,
    setPhotosDeleted,
    photosKept,
    setPhotosKept,
    spaceSavedMB,
    setSpaceSavedMB,
  } = useMockupStore();

  return (
    <div className="space-y-4">
      {/* Photos Reviewed */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Photos Reviewed
        </label>
        <input
          type="number"
          value={photosReviewed}
          onChange={(e) => setPhotosReviewed(parseInt(e.target.value) || 0)}
          min={0}
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Photos Kept */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Photos Kept
        </label>
        <input
          type="number"
          value={photosKept}
          onChange={(e) => setPhotosKept(parseInt(e.target.value) || 0)}
          min={0}
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Photos Deleted */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Photos Deleted
        </label>
        <input
          type="number"
          value={photosDeleted}
          onChange={(e) => setPhotosDeleted(parseInt(e.target.value) || 0)}
          min={0}
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Space Saved */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Space Saved (MB)
        </label>
        <input
          type="number"
          value={spaceSavedMB}
          onChange={(e) => setSpaceSavedMB(parseFloat(e.target.value) || 0)}
          min={0}
          step={0.1}
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        />
        <p className="text-xs text-text-tertiary mt-1">
          Displayed in info overlay
        </p>
      </div>
    </div>
  );
}
