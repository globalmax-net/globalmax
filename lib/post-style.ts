export const POST_THEMES = {
  ocean: {
    label: "Ocean blue",
    hero: "from-blue-100 via-sky-50 to-white",
    accent: "text-blue-700",
    accentHover: "hover:text-blue-900",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    prose: "prose-a:text-blue-700 prose-blockquote:border-blue-500",
    card: "group-hover:text-blue-700",
  },
  forest: {
    label: "Forest green",
    hero: "from-emerald-100 via-green-50 to-white",
    accent: "text-emerald-700",
    accentHover: "hover:text-emerald-900",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    prose: "prose-a:text-emerald-700 prose-blockquote:border-emerald-500",
    card: "group-hover:text-emerald-700",
  },
  burgundy: {
    label: "Burgundy",
    hero: "from-rose-100 via-red-50 to-white",
    accent: "text-rose-800",
    accentHover: "hover:text-rose-950",
    badge: "border-rose-200 bg-rose-50 text-rose-800",
    prose: "prose-a:text-rose-800 prose-blockquote:border-rose-600",
    card: "group-hover:text-rose-800",
  },
  sunset: {
    label: "Sunset amber",
    hero: "from-amber-100 via-orange-50 to-white",
    accent: "text-amber-700",
    accentHover: "hover:text-amber-900",
    badge: "border-amber-200 bg-amber-50 text-amber-800",
    prose: "prose-a:text-amber-800 prose-blockquote:border-amber-500",
    card: "group-hover:text-amber-800",
  },
} as const;

export type PostTheme = keyof typeof POST_THEMES;

export const POST_CONTENT_WIDTHS = {
  standard: {
    label: "Comfortable reading",
    className: "max-w-3xl",
  },
  wide: {
    label: "Wide layout",
    className: "max-w-none",
  },
} as const;

export type PostContentWidth = keyof typeof POST_CONTENT_WIDTHS;

export const POST_TYPOGRAPHY = {
  fontSize: {
    small: { label: "Small", className: "text-sm" },
    medium: { label: "Medium", className: "text-base" },
    large: { label: "Large", className: "text-lg" },
  },
  paragraphSpacing: {
    compact: { label: "Compact", className: "prose-p:mb-4" },
    comfortable: { label: "Comfortable", className: "prose-p:mb-7" },
    spacious: { label: "Spacious", className: "prose-p:mb-10" },
  },
  lineHeight: {
    tight: { label: "Tight", className: "prose-p:leading-7 prose-li:leading-7" },
    comfortable: { label: "Comfortable", className: "prose-p:leading-8 prose-li:leading-8" },
    relaxed: { label: "Relaxed", className: "prose-p:leading-9 prose-li:leading-9" },
  },
  fontFamily: {
    sans: { label: "Sans-serif", className: "font-sans" },
    serif: { label: "Serif", className: "font-serif" },
    mono: { label: "Monospace", className: "font-mono" },
  },
} as const;

export type PostFontSize = keyof typeof POST_TYPOGRAPHY.fontSize;
export type PostParagraphSpacing = keyof typeof POST_TYPOGRAPHY.paragraphSpacing;
export type PostLineHeight = keyof typeof POST_TYPOGRAPHY.lineHeight;
export type PostFontFamily = keyof typeof POST_TYPOGRAPHY.fontFamily;

export function isPostTheme(value: unknown): value is PostTheme {
  return typeof value === "string" && Object.hasOwn(POST_THEMES, value);
}

export function isPostContentWidth(value: unknown): value is PostContentWidth {
  return typeof value === "string" && Object.hasOwn(POST_CONTENT_WIDTHS, value);
}

export function isPostFontSize(value: unknown): value is PostFontSize {
  return typeof value === "string" && Object.hasOwn(POST_TYPOGRAPHY.fontSize, value);
}

export function isPostParagraphSpacing(value: unknown): value is PostParagraphSpacing {
  return typeof value === "string" && Object.hasOwn(POST_TYPOGRAPHY.paragraphSpacing, value);
}

export function isPostLineHeight(value: unknown): value is PostLineHeight {
  return typeof value === "string" && Object.hasOwn(POST_TYPOGRAPHY.lineHeight, value);
}

export function isPostFontFamily(value: unknown): value is PostFontFamily {
  return typeof value === "string" && Object.hasOwn(POST_TYPOGRAPHY.fontFamily, value);
}
