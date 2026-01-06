/**
 * Swipe67 Design System Tokens
 * Extracted from actual app (SwipeMonthScreen.tsx, SwipeResultsScreen.tsx)
 *
 * IMPORTANT: Use actual app colors, NOT style guide values
 */

// Colors - Actual app values (priority over style guide)
export const colors = {
  // Core actions (from actual app)
  keep: '#7EF5B1',        // Light green (not #10B981 from style guide)
  delete: '#A683F0',      // Purple (not #F472B6 from style guide)
  shareBookmark: '#E8AF96', // Peach for share/bookmark icons

  // Backgrounds
  backgroundDark: '#0A0A0A',  // Near black
  surface: '#1A1A1A',         // Dark surface

  // Text
  textPrimary: '#FFFFFF',     // White
  textSecondary: '#888888',   // Gray
  textTertiary: '#A3A3A3',    // Light gray

  // Additional UI colors
  primary: '#FF6B35',         // Orange (from style guide)
  completionButton: '#A886F3', // Completion screen button

  // Gradients
  deleteGradient: ['#A886F3', '#A886F3'], // Solid purple for delete button
} as const;

// Typography - App uses Inter for headers/actions, Plus Jakarta Sans for body
export const typography = {
  // Headers (Inter)
  header: {
    fontFamily: 'Inter',
    fontSize: 22.83,  // px
    fontWeight: 'bold' as const,
    lineHeight: 1.2,
  },

  // Actions (Inter)
  action: {
    fontFamily: 'Inter',
    fontSize: 31.31,  // px
    fontWeight: 'bold' as const,
    lineHeight: 1.2,
  },

  // Body text (Plus Jakarta Sans)
  bodyMD: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 15,
    lineHeight: 23,
    fontWeight: 'normal' as const,
  },

  bodySM: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: 'normal' as const,
  },

  labelMD: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
  },
} as const;

// Spacing scale (from style guide)
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Border radii
export const radii = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

// SwipeCard specifications (from SwipeMonthScreen.tsx)
export const swipeCard = {
  width: 294.22,    // px
  height: 452.73,   // px
  borderRadius: 26, // px
  top: '26%',       // of screen height

  labels: {
    keep: {
      text: 'KEEP',
      color: colors.keep,
      borderWidth: 4,       // px
      rotation: 15,         // degrees
      position: 'top-left' as const,
      padding: {
        top: 20,
        left: 20,
      },
    },
    delete: {
      text: 'DELETE',
      color: colors.delete,
      borderWidth: 4,       // px
      rotation: -15,        // degrees
      position: 'top-right' as const,
      padding: {
        top: 20,
        right: 20,
      },
    },
  },

  shadow: {
    color: '#000',
    offset: { width: 0, height: 8 },
    opacity: 0.4,
    radius: 24,
    elevation: 10, // Android
  },
} as const;

// Header specifications
export const header = {
  height: 56,     // px
  paddingX: 20,   // px
  top: '7%',      // of screen height

  backButton: {
    width: 27,    // px
    height: 27,   // px
  },

  title: {
    ...typography.header,
    format: (month: string, year: string) => {
      // Convert abbreviated month to full name
      const monthMap: { [key: string]: string } = {
        'JAN': 'January', 'FEB': 'February', 'MAR': 'March',
        'APR': 'April', 'MAY': 'May', 'JUN': 'June',
        'JUL': 'July', 'AUG': 'August', 'SEP': 'September',
        'OCT': 'October', 'NOV': 'November', 'DEC': 'December',
      };
      const fullMonth = monthMap[month.toUpperCase()] || month;
      const fullYear = year.length === 2 ? `20${year}` : year;
      return `${fullMonth} ${fullYear}`;
    },
  },

  counter: {
    ...typography.header,
    color: colors.primary, // Orange color for counter
    format: (current: number, total: number) => `${current}/${total}`,
  },
} as const;

// ActionBar specifications
export const actionBar = {
  bottom: '4%',   // of screen height
  height: 50,     // px
  paddingX: 20,   // px

  deleteButton: {
    ...typography.action,
    text: 'DELETE',
    color: colors.delete,
    align: 'left' as const,
  },

  keepButton: {
    ...typography.action,
    text: 'KEEP',
    color: colors.keep,
    align: 'right' as const,
  },

  centerButtons: {
    gap: 28.19,   // px between share and bookmark

    shareIcon: {
      width: 30.52,   // px
      color: colors.shareBookmark,
    },

    bookmarkIcon: {
      width: 21.78,   // px
      color: colors.shareBookmark,
    },
  },
} as const;

// CompletionView specifications (from SwipeResultsScreen.tsx)
export const completionView = {
  grid: {
    columns: 3,
    gap: 0.5,         // px (tight grid)
    itemAspectRatio: 1, // square
  },

  deleteSection: {
    trashBadge: {
      backgroundColor: colors.completionButton,
      size: 30,         // px
      borderRadius: 15, // px (circular)
      position: 'bottom-right' as const,
      margin: 5,        // px
    },
  },

  bottomButton: {
    height: 60,         // px
    borderRadius: 30,   // px
    gradient: colors.deleteGradient,
    text: (count: number) => `Delete ${count} Images`,
    fontSize: 18,       // px
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
  },
} as const;

// Device dimensions
export const devices = {
  iphone14Pro: {
    width: 393,     // pt (CSS pixels)
    height: 852,    // pt
    aspectRatio: 393 / 852,

    notch: {
      width: 126,
      height: 37,
      borderRadius: 18,
    },

    bezel: {
      color: '#1C1C1E',
      borderRadius: 55,
      borderWidth: 14,
    },
  },

  socialMedia: {
    width: 1080,    // px
    height: 1920,   // px
    aspectRatio: 9 / 16,
  },
} as const;

// Export dimensions presets
export const exportPresets = {
  iphone: {
    name: 'iPhone Preview',
    width: devices.iphone14Pro.width,
    height: devices.iphone14Pro.height,
  },
  social: {
    name: 'Social Media',
    width: devices.socialMedia.width,
    height: devices.socialMedia.height,
  },
} as const;

// Utility functions
export const utils = {
  // Format bytes to human readable
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  },

  // Format date
  formatDate: (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString();
  },

  // Month abbreviations
  months: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'] as const,
};
