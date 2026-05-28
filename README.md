# Adorzia — The Design Incubator

A collaborative fashion house, coworking studio, curated marketplace, and global Spotlight programme for emerging designers.

## 🚀 Tech Stack

### Frontend Framework
- **React 19** — UI library
- **TanStack Start** — Full-stack React framework with SSR
- **TanStack Router** — File-based routing
- **TanStack React Query** — Server state management

### Build Tooling
- **Vite 7** — Next-gen frontend build tool
- **TypeScript 5.8** — Type-safe JavaScript
- **Tailwind CSS 4** — Utility-first CSS framework

### UI Components & Styling
- **Radix UI** — Unstyled, accessible components
- **Lucide React** — Beautiful icons
- **Embla Carousel** — Lightweight carousel
- **Sonner** — Toast notifications
- **Recharts** — Chart library

### Backend & Database
- **Supabase** — Backend-as-a-Service (Auth, Database, Storage)
- **Cloudflare Workers** — Edge computing platform

### Form Validation
- **React Hook Form** — Performant form library
- **Zod** — TypeScript-first schema validation
- **Hookform Resolvers** — Zod integration

### Development Tools
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Vite TSConfig Paths** — Path aliasing

## 📦 Project Structure

```
adorzia-the-design-incubator/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── admin/       # Admin dashboard components
│   │   ├── site/        # Site layout components
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── integrations/    # Third-party integrations
│   │   └── supabase/    # Supabase client & types
│   ├── lib/             # Utility functions
│   ├── routes/          # File-based routes
│   │   ├── _authenticated/  # Protected admin routes
│   │   └── ...          # Public routes
│   └── server.ts        # SSR server entry
├── supabase/            # Database migrations
├── wrangler.jsonc       # Cloudflare configuration
├── vite.config.ts       # Vite configuration
└── package.json
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ or Bun
- Supabase project (for backend)

### Installation

```bash
# Install dependencies
npm install

# Or with bun
bun install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

## 🌐 Deployment

### Cloudflare Pages (Recommended)

```bash
npx wrangler pages deploy dist
```

### Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Features

- **Fashion Coworking Studio** — Shared atelier workspace
- **Curated Marketplace** — Digital showroom for designers
- **Spotlight Programme** — Annual talent accelerator
- **Admin Dashboard** — Manage inquiries, designers, applications
- **Authentication** — Supabase Auth integration
- **Responsive Design** — Mobile-first approach

## 📄 License

Private — All rights reserved

## 🌐 Website

[https://adorzia.com](https://adorzia.com)
