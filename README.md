# Swipe67 Mockup Generator

Generate customizable Swipe67 app mockup images for marketing and content creation. Create pixel-perfect mockups of the Swipe67 photo cleanup app with customizable dates, images, and session statistics.

![Swipe67 Mockup Generator](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Live Demo

**Web App:** [https://swipe67-mockup-generator.vercel.app](https://swipe67-mockup-generator.vercel.app) ✅ **Fully Functional**

**API Endpoint:** ⚠️ **Not Available on Vercel** (see [API Limitations](#-api-limitations) below)

## ✨ Features

- 🎨 **Real-time Preview** - See mockup changes instantly
- 📸 **Image Upload** - Drag & drop or click to upload custom photos
- 🎯 **UI State Switching** - Swipe View, Completion View, Progress Toast
- 📅 **Date Customization** - Month and year selection
- 📊 **Session Statistics** - Customize photos reviewed, kept, deleted, space saved
- 🔄 **Swipe Direction** - Show KEEP/DELETE labels
- 📐 **Multiple Presets** - iPhone Preview (393×852px) & Social Media (1080×1920px)
- 🔧 **Resolution Options** - 1x, 2x, 3x export quality
- 💾 **Export Formats** - PNG or JPG
- ✨ **Pixel-Perfect Design** - Matches actual Swipe67 app UI

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5.9.2
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand with localStorage persistence
- **Image Export:** html2canvas for client-side generation
- **File Upload:** react-dropzone
- **Fonts:** Inter & Plus Jakarta Sans (Google Fonts)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/regreenjr/swipe67-mockup-generator.git

# Navigate to project
cd swipe67-mockup-generator

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Web Interface

1. **Upload an Image** - Drag & drop your photo or click to browse
2. **Customize Settings:**
   - Select UI state (Swipe View, Completion, Toast)
   - Choose month and year
   - Set photo counter (current/total)
   - Adjust session statistics
   - Toggle swipe direction (None/Keep/Delete)
   - Show/hide info overlay
3. **Export Settings:**
   - Choose preset (iPhone Preview or Social Media)
   - Select resolution (1x, 2x, 3x)
   - Pick format (PNG or JPG)
4. **Export** - Click "Export as Image" to download

### API Endpoint (Local Development & Self-Hosted Only)

⚠️ **Note:** The API endpoint does not work on the Vercel deployment. See [API Limitations](#-api-limitations) for alternatives. The documentation below applies to local development and self-hosted deployments.

**Endpoint:** `POST /api/generate`

**Request Body:**

```json
{
  "imageUrl": "https://example.com/photo.jpg",
  "month": "NOV",
  "year": "25",
  "currentPhoto": 12,
  "totalPhotos": 47,
  "photosReviewed": 35,
  "photosKept": 17,
  "photosDeleted": 18,
  "spaceSavedMB": 245.6,
  "viewMode": "swipe",
  "swipeDirection": "keep",
  "showInfoOverlay": true,
  "preset": "iphone",
  "resolution": 2,
  "format": "png"
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `imageUrl` | string | ✅ | - | URL of the image to display |
| `month` | string | ✅ | - | Month abbreviation (JAN-DEC) |
| `year` | string | ✅ | - | 2-digit year (e.g., "25") |
| `currentPhoto` | number | ❌ | 12 | Current photo index |
| `totalPhotos` | number | ❌ | 47 | Total photos in session |
| `photosReviewed` | number | ❌ | 35 | Number of photos reviewed |
| `photosKept` | number | ❌ | 17 | Number of photos kept |
| `photosDeleted` | number | ❌ | 18 | Number of photos deleted |
| `spaceSavedMB` | number | ❌ | 245.6 | Space saved in MB |
| `viewMode` | string | ❌ | "swipe" | UI state: `swipe`, `completion`, `toast` |
| `swipeDirection` | string | ❌ | "none" | Swipe label: `none`, `keep`, `delete` |
| `showInfoOverlay` | boolean | ❌ | true | Show file info overlay |
| `preset` | string | ❌ | "iphone" | Export size: `iphone`, `social` |
| `resolution` | number | ❌ | 2 | Scale: `1`, `2`, `3` |
| `format` | string | ❌ | "png" | Image format: `png`, `jpg` |

**Response:**

- **Success (200):** Returns image file (PNG or JPG)
- **Error (400):** Missing required fields
- **Error (429):** Rate limit exceeded (10 requests/minute)
- **Error (500):** Generation failed

**Example with cURL:**

```bash
curl -X POST https://swipe67-mockup-generator.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "imageUrl": "https://picsum.photos/400/600",
    "month": "NOV",
    "year": "25",
    "viewMode": "swipe",
    "swipeDirection": "keep",
    "preset": "iphone",
    "resolution": 2,
    "format": "png"
  }' \
  --output mockup.png
```

**Example with JavaScript:**

```javascript
async function generateMockup() {
  const response = await fetch('https://swipe67-mockup-generator.vercel.app/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageUrl: 'https://picsum.photos/400/600',
      month: 'NOV',
      year: '25',
      currentPhoto: 12,
      totalPhotos: 47,
      viewMode: 'swipe',
      swipeDirection: 'keep',
      preset: 'social',
      resolution: 2,
      format: 'png',
    }),
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    // Download the image
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swipe67-mockup.png';
    a.click();
  } else {
    console.error('Failed to generate mockup:', await response.json());
  }
}
```

**Example with Python:**

```python
import requests

response = requests.post(
    'https://swipe67-mockup-generator.vercel.app/api/generate',
    json={
        'imageUrl': 'https://picsum.photos/400/600',
        'month': 'NOV',
        'year': '25',
        'viewMode': 'swipe',
        'swipeDirection': 'keep',
        'preset': 'iphone',
        'resolution': 2,
        'format': 'png'
    }
)

if response.status_code == 200:
    with open('mockup.png', 'wb') as f:
        f.write(response.content)
    print('Mockup generated successfully!')
else:
    print('Error:', response.json())
```

## 🎨 Design System

The mockup generator uses the actual Swipe67 app design system:

- **Keep Color:** `#7EF5B1` (light green)
- **Delete Color:** `#A683F0` (purple)
- **Share/Bookmark:** `#E8AF96` (peach)
- **Background:** `#0A0A0A` (near black)
- **Card Size:** 294.22×452.73px
- **Border Radius:** 26px
- **Fonts:** Inter (headers/actions), Plus Jakarta Sans (body)

## 📁 Project Structure

```
swipe67-mockup-generator/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint
│   ├── preview/
│   │   └── page.tsx              # Preview page for API
│   ├── page.tsx                  # Main UI
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Design tokens
├── components/
│   ├── mockup/                   # Preview components
│   │   ├── MockupCanvas.tsx
│   │   ├── SwipeView.tsx
│   │   ├── SwipeCard.tsx
│   │   ├── Header.tsx
│   │   └── ActionBar.tsx
│   └── customization/            # Control panel
│       ├── CustomizationPanel.tsx
│       ├── UIStateSelector.tsx
│       ├── ImageUploader.tsx
│       ├── ContentSettings.tsx
│       ├── SessionSettings.tsx
│       └── ExportControls.tsx
├── lib/
│   ├── design-tokens.ts          # Swipe67 design system
│   ├── export.ts                 # Image export logic
│   └── font-embed.ts             # Font embedding
└── store/
    └── mockup-store.ts           # Zustand state
```

## 🚢 Deployment

The app is deployed on Vercel with automatic deployments from the `main` branch.

**Deploy your own:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/regreenjr/swipe67-mockup-generator)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Development

```bash
# Run development server
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Environment Variables

No environment variables required! The app works out of the box.

## ⚠️ API Limitations

**The API endpoint is currently not functional on Vercel** due to serverless platform limitations:

- **Issue:** Vercel's serverless functions don't support Puppeteer/Chromium
- **Reason:** 50MB size limit + missing system dependencies for headless browsers
- **Web UI:** ✅ Fully functional - use the web interface for manual mockup generation

### Alternatives for Programmatic Generation

If you need automated/batch mockup generation, consider these options:

1. **Self-Host on Railway/Render** (Recommended)
   - Deploy the same codebase to Railway or Render
   - Full Docker support means Puppeteer works perfectly
   - Free tier available
   - API will work as documented

2. **Use Screenshot API Services**
   - Integrate ApiFlash, ScreenshotAPI, or Urlbox
   - Point the service at your `/preview` route
   - Costs ~$10-20/month for moderate usage

3. **Local Development**
   - The API works perfectly in local development
   - Run `npm run dev` and use `http://localhost:3000/api/generate`

The API route code remains in this repository for reference and self-hosting.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Swipe67 app design and branding
- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Playwright for headless browser capabilities

## 📧 Contact

Created by [@regreenjr](https://github.com/regreenjr)

---

**Built with ❤️ using Claude Code**
