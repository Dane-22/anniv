# The Rose Report - Sunflower Medical Dashboard

A high-end, editorial-style React component inspired by LoreObsessed.com and GSAP.com, celebrating love and cherished memories.

## Features

- **Hero Section**: Lottie animation (heartbeat ECG morphing into sunflower), sound toggle, dark/light mode switch, masked text reveal animation
- **Vitals Counter**: Live countdown timer from May 12, 2021 with rolling number animations using GSAP TextPlugin
- **Editorial Gallery**: Broken grid layout with sunflower petal-shaped masks and parallax scrolling
- **Nurse Station**: Card-based section featuring "Shift Lead Mochi (RN)" with pull-quote and patient status cards
- **Administer Dosage**: Golden button with ripple effect triggering a glassmorphic modal with a heartfelt letter

## Tech Stack

- React 18 (Vite)
- TypeScript
- Tailwind CSS
- GSAP (ScrollTrigger, TextPlugin)
- Framer Motion
- Lottie React
- Lucide React Icons

## Color Palette

### Light Theme
- Sunburst Yellow: `#FFD700`
- Cream: `#F9F7F2`
- Emerald Green: `#10B981`

### Dark Theme
- Midnight Navy: `#0A0A0A`
- Goldenrod: `#DAA520`
- Deep Forest Green: `#228B22`

## Typography

- Headlines: Playfair Display (Serif)
- Body: Inter (Sans-Serif)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Open http://localhost:5173/ in your browser

## Adding Assets

### Images
Place your images in `/public/images/` with the naming convention `memory-1.jpg`, `memory-2.jpg`, etc.

The gallery currently uses placeholder gradients but will automatically display your images when added.

### Audio
Place your anniversary song in `/public/audio/anniversary-song.mp3` for the audio player to work.

## Customization

### Start Date
To change the countdown start date, edit `src/hooks/useVitalsCounter.ts`:
```typescript
const START_DATE = new Date('YYYY-MM-DDTHH:mm:ss');
```

### Letter Content
To customize the love letter, edit the `letterParagraphs` array in `src/components/DosageButton.tsx`.

### Colors
Modify the Tailwind config in `tailwind.config.js` to adjust the color palette.

## Mobile Responsiveness

All GSAP animations are optimized for touch devices with proper ScrollTrigger configuration. The layout uses Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for a flawless editorial look across all screen sizes.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- GSAP context is used for proper cleanup to prevent memory leaks
- ScrollTrigger instances are killed when components unmount
- Audio requires user interaction before playing (standard browser policy)

## License

Created with love for Rose Caroline Ramos 💛
