# Ricky Contiga - Developer Portfolio

A modern, production-ready personal portfolio website built with React, TypeScript, Next.js, and TailwindCSS. Features a sophisticated scroll-triggered timeline animation, dark neutral + violet accent color scheme, and fully responsive design.

## 🎨 Design Highlights

- **Dark Neutral + Violet Accent**: Premium Web3/AI-focused aesthetic with zinc-based neutrals and vibrant violet accents
- **Scroll Timeline Animation**: Custom-built scroll-triggered process timeline with smooth progress indicator
- **Responsive Design**: Mobile-first approach with excellent UX on all screen sizes
- **Smooth Animations**: Powered by Framer Motion with `prefers-reduced-motion` support
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML throughout
- **Performance Optimized**: Minimal bundle size, lazy-loaded components, smooth 60fps animations

## 📁 Project Structure

```
.
├── app/
│   ├── page.tsx              # Main page with all sections
│   ├── layout.tsx            # Root layout with metadata
│   └── globals.css           # Global styles & theme tokens
├── components/
│   ├── Navbar.tsx            # Navigation with scroll spy
│   ├── Hero.tsx              # Hero section with CTA
│   ├── About.tsx             # About section with stats
│   ├── Skills.tsx            # Skills grid with categories
│   ├── Experience.tsx        # Project showcase with filters
│   ├── ScrollTimeline.tsx    # Scroll-triggered process timeline
│   ├── Testimonials.tsx      # Social proof section
│   ├── Contact.tsx           # Contact form + social links
│   └── Footer.tsx            # Footer with quick links
├── hooks/
│   ├── useScrollSpy.ts       # Navbar active section detection
│   └── usePrefersReducedMotion.ts  # Accessibility hook
├── lib/
│   └── data/
│       ├── projects.ts       # Project data with filtering
│       └── process.ts        # Process steps data
├── public/
│   └── [assets]              # Images and static files
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm (or npm/yarn)

### Installation

1. **Clone or download the project**
   ```bash
   cd ricky-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 📝 Customization Guide

### Update Personal Info

Edit `/app/page.tsx` and component files to change:
- Name, title, and bio in Hero section
- Contact information in Contact section
- Social links in Navbar, Hero, Contact, and Footer

### Customize Projects

1. Open `/lib/data/projects.ts`
2. Update or add projects with your own information
3. Change project categories and tags as needed
4. Mark projects as `featured: true` to display them prominently

### Modify Process Steps

1. Open `/lib/data/process.ts`
2. Update the 4 main process steps (Discovery, Design, Build, Launch)
3. Customize descriptions and details to match your workflow

### Change Color Scheme

1. Open `/app/globals.css`
2. Update CSS variables in `:root` and `.dark` sections
3. The accent color (currently violet) controls highlights, buttons, and accent elements
4. Adjust neutral colors (zinc/stone) for background and text

### Add Testimonials

1. Open `/components/Testimonials.tsx`
2. Add new testimonial objects to the `testimonials` array
3. Update author names and roles

## 🎯 Key Features

### 1. **Scroll Timeline Animation** (`/components/ScrollTimeline.tsx`)
- Real-time progress indicator that fills based on scroll position
- Active step highlighting with smooth transitions
- Mobile-optimized with stacked layout
- Respects `prefers-reduced-motion` for accessibility

### 2. **Responsive Navigation** (`/components/Navbar.tsx`)
- Fixed navbar with scroll spy (highlights active section)
- Mobile hamburger menu with smooth animations
- Sticky positioning for easy access

### 3. **Project Filtering** (`/components/Experience.tsx`)
- Filter projects by category (All, Web, Web3, UI, Systems)
- Smooth layout animations with `AnimatePresence`
- Status badges (Production vs Personal/Practice)

### 4. **Contact Form** (`/components/Contact.tsx`)
- Client-side form with validation
- Success state animation
- Direct contact methods (email, GitHub, phone)

## 🛠 Tech Stack

- **React 19.2** - UI framework
- **Next.js 16** - React framework with SSR
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first CSS
- **Framer Motion 11** - Animation library
- **PostCSS & Autoprefixer** - CSS processing

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (full-width, stacked layout)
- **Tablet**: 768px - 1024px (2-column grids)
- **Desktop**: > 1024px (full layout with 3-column grids)

## ♿ Accessibility Features

- Semantic HTML (`<main>`, `<section>`, `<nav>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` support (all animations respect this)
- Screen reader friendly
- Color contrast compliance (WCAG AA)

## 🎬 Animation Performance

- Smooth 60fps animations with Framer Motion
- GPU-accelerated transforms
- No layout thrashing with efficient DOM queries
- Passive event listeners for scroll performance
- Debounced/throttled expensive operations

## 📊 SEO Optimized

- Metadata with dynamic title and description
- Semantic HTML structure
- Open Graph tags ready to add
- Sitemap and robots.txt ready to configure
- Mobile-responsive design

## 🔒 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 8+)

## 📝 License

This portfolio template is open for personal use. Feel free to customize and deploy!

## 🤝 Need Help?

- **Customize colors**: Edit CSS variables in `/app/globals.css`
- **Add new sections**: Create component in `/components/` and import in `page.tsx`
- **Change layout**: TailwindCSS classes control all styling
- **Add animations**: Use Framer Motion variants as examples

---

**Created with ❤️ using React, Next.js, and TailwindCSS**
