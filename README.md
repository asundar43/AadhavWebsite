# Aadhav Sundar - Personal Website

Personal portfolio website built with Next.js 15, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
└── components/
    ├── Navigation.tsx  # Fixed navigation header
    ├── Hero.tsx        # Landing hero section
    ├── About.tsx       # About section with globe
    ├── Experience.tsx  # Experience timeline
    ├── Projects.tsx    # Project showcase
    ├── Achievements.tsx # Recognition & awards
    ├── Footer.tsx      # Site footer
    ├── SpinningGlobe.tsx
    └── StarfieldBackground.tsx
```
