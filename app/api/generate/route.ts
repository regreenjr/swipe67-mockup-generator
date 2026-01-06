import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface GenerateRequest {
  imageUrl: string;
  month: string;
  year: string;
  currentPhoto: number;
  totalPhotos: number;
  photosReviewed: number;
  photosKept: number;
  photosDeleted: number;
  spaceSavedMB: number;
  viewMode: 'swipe' | 'completion' | 'toast';
  swipeDirection?: 'none' | 'keep' | 'delete';
  showInfoOverlay?: boolean;
  preset: 'iphone' | 'social';
  resolution: 1 | 2 | 3;
  format: 'png' | 'jpg';
}

const PRESET_DIMENSIONS = {
  iphone: { width: 393, height: 852 },
  social: { width: 1080, height: 1920 },
};

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // Validate required fields
    if (!body.imageUrl || !body.month || !body.year) {
      return NextResponse.json(
        { error: 'Missing required fields: imageUrl, month, year' },
        { status: 400 }
      );
    }

    // Get base URL
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Build preview URL with query params
    const params = new URLSearchParams({
      imageUrl: body.imageUrl,
      month: body.month,
      year: body.year,
      currentPhoto: body.currentPhoto?.toString() || '12',
      totalPhotos: body.totalPhotos?.toString() || '47',
      photosReviewed: body.photosReviewed?.toString() || '35',
      photosKept: body.photosKept?.toString() || '17',
      photosDeleted: body.photosDeleted?.toString() || '18',
      spaceSavedMB: body.spaceSavedMB?.toString() || '245.6',
      viewMode: body.viewMode || 'swipe',
      swipeDirection: body.swipeDirection || 'none',
      showInfoOverlay: body.showInfoOverlay !== false ? 'true' : 'false',
      preset: body.preset || 'iphone',
      resolution: body.resolution?.toString() || '2',
      format: body.format || 'png',
    });

    const previewUrl = `${baseUrl}/preview?${params.toString()}`;

    // Launch browser with serverless Chromium
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    const page = await browser.newPage();

    // Get dimensions
    const dimensions = PRESET_DIMENSIONS[body.preset || 'iphone'];
    const resolution = body.resolution || 2;

    // Set viewport to match preset dimensions
    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height,
      deviceScaleFactor: resolution,
    });

    // Navigate to preview page
    await page.goto(previewUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Capture screenshot
    const screenshot = await page.screenshot({
      type: body.format === 'jpg' ? 'jpeg' : 'png',
      quality: body.format === 'jpg' ? 95 : undefined,
      encoding: 'binary',
    });

    await browser.close();

    // Return image
    const contentType = body.format === 'jpg' ? 'image/jpeg' : 'image/png';
    const filename = `swipe67-mockup-${Date.now()}.${body.format}`;

    return new NextResponse(new Uint8Array(screenshot as Buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate mockup',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Rate limiting helper (optional)
const requestCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }

  if (record.count >= 10) {
    // 10 requests per minute
    return false;
  }

  record.count++;
  return true;
}

// Clean up old rate limit records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now > record.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);
