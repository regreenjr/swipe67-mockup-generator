'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MockupCanvas from '@/components/mockup/MockupCanvas';
import { useMockupStore } from '@/store/mockup-store';

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const store = useMockupStore();

  useEffect(() => {
    // Load all parameters from URL
    const imageUrl = searchParams.get('imageUrl');
    const month = searchParams.get('month');
    const year = searchParams.get('year');
    const currentPhoto = searchParams.get('currentPhoto');
    const totalPhotos = searchParams.get('totalPhotos');
    const photosReviewed = searchParams.get('photosReviewed');
    const photosKept = searchParams.get('photosKept');
    const photosDeleted = searchParams.get('photosDeleted');
    const spaceSavedMB = searchParams.get('spaceSavedMB');
    const viewMode = searchParams.get('viewMode') as 'swipe' | 'completion' | 'toast' | null;
    const swipeDirection = searchParams.get('swipeDirection') as 'none' | 'keep' | 'delete' | null;
    const showInfoOverlay = searchParams.get('showInfoOverlay');
    const preset = searchParams.get('preset') as 'iphone' | 'social' | null;
    const resolution = searchParams.get('resolution');
    const format = searchParams.get('format') as 'png' | 'jpg' | null;

    // Update store with URL parameters
    if (imageUrl) store.setUploadedImage(imageUrl);
    if (month) store.setMonth(month);
    if (year) store.setYear(year);
    if (currentPhoto) store.setCurrentPhotoIndex(parseInt(currentPhoto));
    if (totalPhotos) store.setTotalPhotos(parseInt(totalPhotos));
    if (photosReviewed) store.setPhotosReviewed(parseInt(photosReviewed));
    if (photosKept) store.setPhotosKept(parseInt(photosKept));
    if (photosDeleted) store.setPhotosDeleted(parseInt(photosDeleted));
    if (spaceSavedMB) store.setSpaceSavedMB(parseFloat(spaceSavedMB));
    if (viewMode) store.setViewMode(viewMode);
    if (swipeDirection) store.setSwipeDirection(swipeDirection);
    if (showInfoOverlay !== null) store.setShowInfoOverlay(showInfoOverlay === 'true');
    if (preset) store.setExportPreset(preset);
    if (resolution) store.setResolution(parseInt(resolution) as 1 | 2 | 3);
    if (format) store.setFormat(format);
  }, [searchParams, store]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-dark">
      <MockupCanvas />
    </div>
  );
}
