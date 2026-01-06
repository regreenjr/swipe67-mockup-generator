import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewMode = 'swipe' | 'completion' | 'toast';
export type SwipeDirection = 'none' | 'keep' | 'delete';
export type ExportPreset = 'iphone' | 'social';
export type ExportFormat = 'png' | 'jpg';
export type Resolution = 1 | 2 | 3;

interface MockupState {
  // UI State
  viewMode: ViewMode;
  showInfoOverlay: boolean;
  swipeDirection: SwipeDirection;

  // Content
  uploadedImage: string | null;  // Data URL or file URL
  month: string;                  // "NOV"
  year: string;                   // "25"
  currentPhotoIndex: number;      // 12
  totalPhotos: number;            // 47

  // Session Stats
  photosReviewed: number;         // 35
  photosDeleted: number;          // 18
  photosKept: number;             // 17
  spaceSavedMB: number;           // 245.6

  // Export Settings
  showDeviceFrame: boolean;
  exportPreset: ExportPreset;
  resolution: Resolution;
  format: ExportFormat;

  // Actions
  setViewMode: (mode: ViewMode) => void;
  setShowInfoOverlay: (show: boolean) => void;
  setSwipeDirection: (direction: SwipeDirection) => void;
  setUploadedImage: (url: string | null) => void;
  setMonth: (month: string) => void;
  setYear: (year: string) => void;
  setCurrentPhotoIndex: (index: number) => void;
  setTotalPhotos: (total: number) => void;
  setPhotosReviewed: (reviewed: number) => void;
  setPhotosDeleted: (deleted: number) => void;
  setPhotosKept: (kept: number) => void;
  setSpaceSavedMB: (mb: number) => void;
  setShowDeviceFrame: (show: boolean) => void;
  setExportPreset: (preset: ExportPreset) => void;
  setResolution: (resolution: Resolution) => void;
  setFormat: (format: ExportFormat) => void;
  resetToDefaults: () => void;
}

const defaultState = {
  // UI State
  viewMode: 'swipe' as ViewMode,
  showInfoOverlay: true,
  swipeDirection: 'none' as SwipeDirection,

  // Content
  uploadedImage: null,
  month: 'NOV',
  year: '25',
  currentPhotoIndex: 12,
  totalPhotos: 47,

  // Session Stats
  photosReviewed: 35,
  photosDeleted: 18,
  photosKept: 17,
  spaceSavedMB: 245.6,

  // Export Settings
  showDeviceFrame: true,
  exportPreset: 'iphone' as ExportPreset,
  resolution: 2 as Resolution,
  format: 'png' as ExportFormat,
};

export const useMockupStore = create<MockupState>()(
  persist(
    (set) => ({
      ...defaultState,

      // Actions
      setViewMode: (mode) => set({ viewMode: mode }),
      setShowInfoOverlay: (show) => set({ showInfoOverlay: show }),
      setSwipeDirection: (direction) => set({ swipeDirection: direction }),
      setUploadedImage: (url) => set({ uploadedImage: url }),
      setMonth: (month) => set({ month }),
      setYear: (year) => set({ year }),
      setCurrentPhotoIndex: (index) => set({ currentPhotoIndex: index }),
      setTotalPhotos: (total) => set({ totalPhotos: total }),
      setPhotosReviewed: (reviewed) => set({ photosReviewed: reviewed }),
      setPhotosDeleted: (deleted) => set({ photosDeleted: deleted }),
      setPhotosKept: (kept) => set({ photosKept: kept }),
      setSpaceSavedMB: (mb) => set({ spaceSavedMB: mb }),
      setShowDeviceFrame: (show) => set({ showDeviceFrame: show }),
      setExportPreset: (preset) => set({ exportPreset: preset }),
      setResolution: (resolution) => set({ resolution }),
      setFormat: (format) => set({ format }),
      resetToDefaults: () => set(defaultState),
    }),
    {
      name: 'swipe67-mockup-settings',
      // Only persist user preferences, not uploaded images or temporary state
      partialize: (state) => ({
        month: state.month,
        year: state.year,
        showDeviceFrame: state.showDeviceFrame,
        exportPreset: state.exportPreset,
        resolution: state.resolution,
        format: state.format,
      }),
    }
  )
);
