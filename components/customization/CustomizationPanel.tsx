'use client';

import UIStateSelector from './UIStateSelector';
import ImageUploader from './ImageUploader';
import ContentSettings from './ContentSettings';
import SessionSettings from './SessionSettings';
import ExportControls from './ExportControls';

export default function CustomizationPanel() {
  return (
    <div className="w-80 h-screen overflow-y-auto bg-surface border-r border-text-tertiary/20 p-6 space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          Swipe67 Mockup Generator
        </h1>
        <p className="text-sm text-text-secondary">
          Customize and export your mockup
        </p>
      </div>

      {/* UI State Selection */}
      <section>
        <h2 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          UI State
        </h2>
        <UIStateSelector />
      </section>

      {/* Image Upload */}
      <section>
        <h2 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Photo
        </h2>
        <ImageUploader />
      </section>

      {/* Content Settings */}
      <section>
        <h2 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Content
        </h2>
        <ContentSettings />
      </section>

      {/* Session Stats */}
      <section>
        <h2 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Session Stats
        </h2>
        <SessionSettings />
      </section>

      {/* Export Settings */}
      <section>
        <h2 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wide">
          Export
        </h2>
        <ExportControls />
      </section>
    </div>
  );
}
