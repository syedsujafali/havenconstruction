# Haven M Construction

A modern construction company website built with React, Vite, Tailwind CSS, and Framer Motion. Specialized in animal hospital construction and veterinary facility design.

## Features

- ✨ Smooth animations with Framer Motion
- 🎨 Modern UI with Tailwind CSS
- ⚡ Lightning-fast build with Vite
- 📱 Fully responsive design
- 🎥 Hero video background
- 📊 Project showcase and testimonials
- ✉️ Contact form integration

## Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/syedsujafali/havenconstruction.git
cd havenconstruction

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel Deployment (Recommended)

This project is configured for seamless Vercel deployment:

1. **Connect Repository**: Push your code to GitHub
2. **Import Project**: Go to [Vercel](https://vercel.com) and import your repository
3. **Deploy**: Vercel will automatically detect the Vite configuration and deploy

The project includes:
- ✅ `vercel.json` - Build configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ Optimized build output

**Automatic deployments**: Every push to the main branch triggers a new deployment.

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Set environment variables in Vercel dashboard under Project Settings → Environment Variables.

## Project Structure

```
heaven cons/
├── src/
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Application entry point
│   └── utils/
│       └── cn.ts         # Utility functions
├── public/
│   ├── logo.png          # Logo asset
│   └── hero1.mp4         # Hero video
├── package.json
├── tsconfig.json
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment config
└── README.md
```

## Performance Optimization

- 🚀 Code splitting with Vite
- 📦 Optimized bundle size
- 🎬 Lazy loading for media assets
- 💾 Caching headers configured in Vercel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary to Haven M Construction.

## Contact

For inquiries about the website or construction services:

- **Email**: info@havenconstruction.com
- **Phone**: (201) 264-3506
- **Location**: Verona, NJ

---

**Deployed on**: [Vercel](https://vercel.com)
