# Canopy — Visual Identity

## Color Palette (Light Mode)

| Token | Hex | Usage |
|---|---|---|
| Primary | #15803D | Main actions, active states — deep forest green |
| On Primary | #FFFFFF | Text on primary |
| Secondary | #6366F1 | Secondary actions, links — indigo |
| Accent | #D97706 | CTAs, highlights — warm amber |
| Background | #FAFBF6 | Light, warm off-white |
| Foreground | #0F172A | Dark slate text |
| Muted | #F0F4ED | Subtle green-tinted surface for cards |
| Border | #E2EBE0 | Soft green-gray borders |
| Destructive | #DC2626 | Errors, delete actions |
| Ring | #15803D | Focus rings |

## Color Palette (Dark Mode)

| Token | Hex | Usage |
|---|---|---|
| Background | #0C1A0F | Deep forest-dark ground |
| Foreground | #E8EFE8 | Soft off-white text |
| Primary | #34A45C | Desaturated, lifted green for dark grounds |
| Muted | #122417 | Card surfaces |
| Border | #1E3826 | Low-contrast green borders |
| Accent | #E9940F | Warm amber highlights preserved |

Key adjustments from light mode: greens are desaturated and lightened for contrast on the deep ground; amber highlights are kept warm so CTAs read identically in both themes.

## Typography

- **Headings:** Outfit (weights 400–700)
- **Body:** Work Sans (weights 300–700)
- **Mood:** Geometric, modern, clean, balanced
- **Base size:** 16px, line-height 1.5
- **Google Fonts:** https://fonts.google.com/share?selection.family=Outfit:wght@400..700|Work+Sans:wght@300..700
- **Loading:** via `next/font/google` (no CSS import needed in this project)

```ts
// next/font/google
import { Outfit, Work_Sans } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });
```

## UI Style

- **Style:** Flat with subtle motion
- **Keywords:** Clean surfaces, light and airy spacing, masonry idea board, color/opacity hover states
- **Key Effects:** 150–200ms ease transitions on interactive elements; no heavy shadows or gradients
- **Avoid:** Heavy drop shadows, gradient washes, dense layouts, noisy decoration
