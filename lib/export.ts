import html2canvas from 'html2canvas';
import { embedGoogleFonts, convertImagesToDataUrls } from './font-embed';
import type { ExportPreset, Resolution, ExportFormat } from '@/store/mockup-store';
import { exportPresets } from './design-tokens';

interface ExportOptions {
  preset: ExportPreset;
  resolution: Resolution;
  format: ExportFormat;
}

/**
 * Export the mockup canvas as an image
 */
export async function exportMockup(options: ExportOptions): Promise<void> {
  const canvas = document.getElementById('mockup-canvas');

  if (!canvas) {
    throw new Error('Mockup canvas not found');
  }

  try {
    // Get dimensions based on preset
    const dimensions = exportPresets[options.preset];

    // Step 1: Prepare for export
    await prepareForExport(canvas as HTMLElement);

    // Step 2: Capture with html2canvas
    const exportedCanvas = await html2canvas(canvas as HTMLElement, {
      backgroundColor: '#0A0A0A',
      scale: options.resolution,
      width: dimensions.width,
      height: dimensions.height,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 0,
      // Ensure pixel-perfect rendering
      windowWidth: dimensions.width,
      windowHeight: dimensions.height,
    });

    // Step 3: Convert to blob and download
    await downloadCanvas(exportedCanvas, options.format);
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error(`Failed to export mockup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Prepare the canvas for export
 */
async function prepareForExport(element: HTMLElement): Promise<void> {
  try {
    // 1. Convert uploaded images to data URLs
    await convertImagesToDataUrls(element);

    // 2. Embed Google Fonts as inline data URLs
    const cleanup = await embedGoogleFonts([
      { family: 'Inter', weights: [400, 500, 600, 700] },
      { family: 'Plus Jakarta Sans', weights: [400, 500, 600, 700] },
    ]);

    // Store cleanup function for later
    (window as any).__fontEmbedCleanup = cleanup;

    // 3. Force layout recalculation
    element.offsetHeight;

    // 4. Wait a bit for everything to settle
    await new Promise((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error('Failed to prepare for export:', error);
    throw error;
  }
}

/**
 * Download the canvas as an image
 */
async function downloadCanvas(
  canvas: HTMLCanvasElement,
  format: ExportFormat
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const quality = format === 'jpg' ? 0.95 : undefined;

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob from canvas'));
            return;
          }

          // Create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          link.download = `swipe67-mockup-${timestamp}.${format}`;
          link.href = url;

          // Trigger download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Cleanup
          URL.revokeObjectURL(url);

          // Cleanup font embeds
          if ((window as any).__fontEmbedCleanup) {
            (window as any).__fontEmbedCleanup();
            delete (window as any).__fontEmbedCleanup;
          }

          resolve();
        },
        mimeType,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get the estimated file size for the export
 */
export function getEstimatedFileSize(
  preset: ExportPreset,
  resolution: Resolution,
  format: ExportFormat
): string {
  const dimensions = exportPresets[preset];
  const pixels = dimensions.width * dimensions.height * resolution * resolution;

  // Rough estimates
  let bytesPerPixel: number;
  if (format === 'png') {
    bytesPerPixel = 4; // PNG with alpha
  } else {
    bytesPerPixel = 1; // JPEG compressed
  }

  const estimatedBytes = pixels * bytesPerPixel;

  // Format as human-readable
  if (estimatedBytes < 1024) {
    return `${estimatedBytes} B`;
  } else if (estimatedBytes < 1024 * 1024) {
    return `${(estimatedBytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(estimatedBytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
