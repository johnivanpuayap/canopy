# Canopy Logo — Usage Guidelines

## Files

| File | Purpose |
|---|---|
| `logo.svg` | Primary combination mark (icon + wordmark) — headers, docs, marketing |
| `logo-icon.svg` | Standalone canopy symbol — app icon, avatars, social profiles |
| `logo-wordmark.svg` | Text-only "Canopy" — footers, compact navigation |
| `favicon.svg` | Simplified mark for browser tabs (legible at 16px) |

Each of `logo`, `logo-icon`, and `logo-wordmark` ships in three color versions: full color (default), `-mono-dark` (`#1F2937`, for light backgrounds), and `-mono-light` (`#FFFFFF`, for dark backgrounds). The favicon has no mono variants — its simplification already reduces it to two colors.

## Clear Space

Keep a margin around the logo equal to the height of the canopy icon element. No text or graphics inside that space.

## Minimum Sizes

- **Digital:** 100px width minimum for the combination mark; the icon alone works down to 16px
- **Print:** 1 inch width minimum

## Color Usage

- **Full color** on white or light neutral backgrounds (`#FAFBF6`, `#F0F4ED`, white)
- **Mono light** on dark backgrounds (`#0C1A0F`, photos, primary-green fills)
- **Mono dark** for single-color contexts on light grounds (print, embossing, low-ink)

## Incorrect Usage

- Do not stretch, rotate, or skew
- Do not change the greens or the amber outside the approved palette
- Do not add shadows, glows, outlines, or gradients
- Do not place the full-color logo on busy or low-contrast backgrounds
- Do not rearrange the icon layers or detach the trunk

## Web Implementation

```html
<!-- Inline SVG (recommended — inherits nothing, full control) -->
<svg>…</svg>

<!-- Image tag -->
<img src="/logos/logo.svg" alt="Canopy" />
```

```css
/* Responsive sizing */
.logo { width: 100%; max-width: 200px; height: auto; }
@media (max-width: 768px) { .logo { max-width: 150px; } }
```

Note: the wordmark uses the Outfit font via `font-family`. Inline SVG inherits the page's loaded fonts (the app loads Outfit via `next/font/google`); in contexts without Outfit, it falls back to a clean sans-serif.

## Exporting to PNG

```bash
# Inkscape
inkscape logo.svg -o logo.png -w 1000

# ImageMagick
convert -background none logo.svg logo.png
```
