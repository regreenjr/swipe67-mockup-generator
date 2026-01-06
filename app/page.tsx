'use client';

import CustomizationPanel from '@/components/customization/CustomizationPanel';
import MockupCanvas from '@/components/mockup/MockupCanvas';

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Customization Sidebar */}
      <CustomizationPanel />

      {/* Preview Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="shadow-2xl">
          <MockupCanvas />
        </div>
      </div>
    </div>
  );
}
