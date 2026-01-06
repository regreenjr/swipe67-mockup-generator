/**
 * Font Embedding Utility
 * Embeds Google Fonts as data URLs to ensure they render in exported images
 */

interface FontConfig {
  family: string;
  weights: number[];
}

/**
 * Embeds Google Fonts as inline data URLs
 * This ensures fonts render correctly in html2canvas exports
 */
export async function embedGoogleFonts(fonts: FontConfig[]): Promise<() => void> {
  const styleElements: HTMLStyleElement[] = [];

  for (const font of fonts) {
    try {
      const styleElement = await embedFont(font.family, font.weights);
      if (styleElement) {
        styleElements.push(styleElement);
      }
    } catch (error) {
      console.error(`Failed to embed font ${font.family}:`, error);
    }
  }

  // Return cleanup function
  return () => {
    styleElements.forEach((el) => el.remove());
  };
}

/**
 * Embed a single font family
 */
async function embedFont(
  family: string,
  weights: number[]
): Promise<HTMLStyleElement | null> {
  try {
    // Construct Google Fonts CSS URL
    const familyParam = family.replace(/ /g, '+');
    const weightsParam = weights.join(';');
    const url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weightsParam}&display=swap`;

    // Fetch the CSS
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch font CSS: ${response.statusText}`);
    }

    let css = await response.text();

    // Extract font URLs from CSS
    const fontUrlRegex = /url\(([^)]+)\)/g;
    const fontUrls: string[] = [];
    let match;

    while ((match = fontUrlRegex.exec(css)) !== null) {
      fontUrls.push(match[1]);
    }

    // Convert font URLs to data URLs
    const dataUrls = await Promise.all(
      fontUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) return null;

          const arrayBuffer = await response.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          // Determine font format from URL
          let format = 'woff2';
          if (url.includes('.woff2')) format = 'woff2';
          else if (url.includes('.woff')) format = 'woff';
          else if (url.includes('.ttf')) format = 'truetype';

          return `data:font/${format};base64,${base64}`;
        } catch (error) {
          console.error(`Failed to fetch font file: ${url}`, error);
          return null;
        }
      })
    );

    // Replace URLs in CSS with data URLs
    let dataUrlIndex = 0;
    css = css.replace(fontUrlRegex, () => {
      const dataUrl = dataUrls[dataUrlIndex++];
      return dataUrl ? `url(${dataUrl})` : 'url()';
    });

    // Inject CSS into document
    const styleElement = document.createElement('style');
    styleElement.textContent = css;
    styleElement.setAttribute('data-font-embed', family);
    document.head.appendChild(styleElement);

    // Wait for fonts to load
    await document.fonts.ready;

    return styleElement;
  } catch (error) {
    console.error(`Error embedding font ${family}:`, error);
    return null;
  }
}

/**
 * Prepare all images in an element by converting them to data URLs
 * This ensures images are embedded in the exported canvas
 */
export async function convertImagesToDataUrls(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll('img');

  await Promise.all(
    Array.from(images).map(async (img) => {
      try {
        // Skip if already a data URL
        if (img.src.startsWith('data:')) return;

        // Fetch and convert to data URL
        const response = await fetch(img.src, { mode: 'cors' });
        const blob = await response.blob();

        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            img.src = reader.result as string;
            resolve();
          };
          reader.onerror = () => resolve(); // Continue even if conversion fails
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error('Failed to convert image to data URL:', error);
      }
    })
  );
}
