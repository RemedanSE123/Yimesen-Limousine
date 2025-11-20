# Car Rent Next.js Project

A modern Next.js application for a car rental/limousine service, migrated from a static HTML website.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Bootstrap 5** for styling
- **Responsive Design** - Works on all devices
- **Modern React Components** - Reusable and maintainable
- **SEO Optimized** - Meta tags and proper structure
- **Image Optimization** - Next.js Image component
- **Carousel** - Embla Carousel for vehicle listings
- **Animations** - CSS animations and transitions

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── team/
│   │   └── page.tsx
│   ├── vehicle/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AboutSection.tsx
│   ├── BackToTop.tsx
│   ├── BlogGrid.tsx
│   ├── BookingForm.tsx
│   ├── Footer.tsx
│   ├── HeroCarousel.tsx
│   ├── Navbar.tsx
│   ├── Spinner.tsx
│   ├── TeamGrid.tsx
│   ├── Topbar.tsx
│   └── VehicleCarousel.tsx
├── public/
│   ├── img/
│   └── lib/
├── styles/
│   ├── bootstrap.min.css
│   ├── globals.css
│   └── style.css
├── next.config.js
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Pages

- **Home** (`/`) - Hero carousel with booking form, about section, vehicle carousel, team, and blog
- **About** (`/about`) - Company information and team members
- **Vehicle** (`/vehicle`) - Fleet of available vehicles
- **Team** (`/team`) - Customer support team
- **Blog** (`/blog`) - Latest blog posts and news
- **Contact** (`/contact`) - Contact form and map

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Bootstrap 5** - CSS framework
- **Embla Carousel** - Carousel component
- **Font Awesome** - Icons
- **Google Fonts** - Lato and Montserrat fonts

## Migration Notes

This project was migrated from a static HTML website to Next.js. Key changes:

- Converted HTML to React components
- Replaced jQuery with React hooks
- Replaced Owl Carousel with Embla Carousel
- Converted Bootstrap classes to React components
- Implemented proper routing with Next.js App Router
- Added TypeScript types
- Optimized images with Next.js Image component
- Added SEO metadata

## License

This project is for demonstration purposes.

