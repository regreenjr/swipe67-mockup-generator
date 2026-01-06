'use client';

import { useMockupStore } from '@/store/mockup-store';
import { utils } from '@/lib/design-tokens';

export default function ContentSettings() {
  const {
    month,
    setMonth,
    year,
    setYear,
    currentPhotoIndex,
    setCurrentPhotoIndex,
    totalPhotos,
    setTotalPhotos,
  } = useMockupStore();

  return (
    <div className="space-y-4">
      {/* Month Selection */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">Month</label>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        >
          {utils.months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Year Input */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">Year</label>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          maxLength={2}
          placeholder="25"
          className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
        />
        <p className="text-xs text-text-tertiary mt-1">
          2-digit year (e.g., &quot;25&quot; for 2025)
        </p>
      </div>

      {/* Photo Counter */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-text-secondary mb-2">Current</label>
          <input
            type="number"
            value={currentPhotoIndex}
            onChange={(e) => setCurrentPhotoIndex(parseInt(e.target.value) || 1)}
            min={1}
            className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs text-text-secondary mb-2">Total</label>
          <input
            type="number"
            value={totalPhotos}
            onChange={(e) => setTotalPhotos(parseInt(e.target.value) || 1)}
            min={1}
            className="w-full bg-background-dark border border-text-tertiary/30 rounded px-3 py-2 text-text-primary text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <p className="text-xs text-text-tertiary">
        Shows as &quot;{currentPhotoIndex}/{totalPhotos}&quot; in header
      </p>
    </div>
  );
}
