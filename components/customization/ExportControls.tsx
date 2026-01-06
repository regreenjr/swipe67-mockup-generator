'use client';

import { useState } from 'react';
import { useMockupStore } from '@/store/mockup-store';
import type { ExportPreset, Resolution, ExportFormat } from '@/store/mockup-store';
import { exportPresets } from '@/lib/design-tokens';
import { exportMockup } from '@/lib/export';

export default function ExportControls() {
  const {
    exportPreset,
    setExportPreset,
    resolution,
    setResolution,
    format,
    setFormat,
    showDeviceFrame,
    setShowDeviceFrame,
  } = useMockupStore();

  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets: { value: ExportPreset; label: string; dimensions: string }[] = [
    {
      value: 'iphone',
      label: exportPresets.iphone.name,
      dimensions: `${exportPresets.iphone.width}×${exportPresets.iphone.height}px`,
    },
    {
      value: 'social',
      label: exportPresets.social.name,
      dimensions: `${exportPresets.social.width}×${exportPresets.social.height}px`,
    },
  ];

  const resolutions: Resolution[] = [1, 2, 3];
  const formats: ExportFormat[] = ['png', 'jpg'];

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);

    try {
      await exportMockup({
        preset: exportPreset,
        resolution,
        format,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Preset Selector */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Export Preset
        </label>
        <div className="space-y-2">
          {presets.map((preset) => (
            <label
              key={preset.value}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="exportPreset"
                value={preset.value}
                checked={exportPreset === preset.value}
                onChange={() => setExportPreset(preset.value)}
                className="w-4 h-4 accent-primary"
              />
              <div className="flex-1">
                <span className="text-text-primary text-sm">{preset.label}</span>
                <span className="text-text-tertiary text-xs ml-2">
                  ({preset.dimensions})
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Resolution */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">
          Resolution
        </label>
        <div className="flex space-x-2">
          {resolutions.map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                resolution === res
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary border border-text-tertiary/30 hover:border-text-tertiary'
              }`}
            >
              {res}x
            </button>
          ))}
        </div>
        <p className="text-xs text-text-tertiary mt-1">
          Higher resolution = larger file size
        </p>
      </div>

      {/* Format */}
      <div>
        <label className="block text-xs text-text-secondary mb-2">Format</label>
        <div className="flex space-x-2">
          {formats.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setFormat(fmt)}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium uppercase transition-colors ${
                format === fmt
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary border border-text-tertiary/30 hover:border-text-tertiary'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Show Device Frame */}
      <div>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showDeviceFrame}
            onChange={(e) => setShowDeviceFrame(e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-text-secondary text-sm">Show iPhone Frame</span>
        </label>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
          isExporting
            ? 'bg-text-tertiary cursor-not-allowed'
            : 'bg-primary hover:bg-primary/90 text-white'
        }`}
      >
        {isExporting ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Export as Image</span>
          </>
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="text-xs text-delete bg-delete/10 border border-delete/30 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}
