# Frontend - Japanese Language School Platform

Modern React-based single-page application for the Japanese Language School Platform.

## Tech Stack

- **Framework**: React 19.x
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.0
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Internationalization**: i18next
- **SEO**: React Helmet Async

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:8000
```

4. Start development server:
```bash
npm run dev
```

Application will be available at: `http://localhost:5173`

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Build
npm run build           # Build for production
npm run preview         # Preview production build

# Linting
npm run lint            # Run ESLint
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── SEO.jsx        # SEO component
│   ├── Footer.jsx     # Footer component
│   ├── BackToTop.jsx  # Back to top button
│   └── ...
├── pages/             # Page components
│   ├── Home.jsx       # Homepage
│   ├── Courses.jsx    # Courses listing
│   ├── About.jsx      # About page
│   └── admin/         # Admin pages
├── i18n/              # Internationalization
│   ├── config.js      # i18n configuration
│   └── locales/       # Translation files
│       ├── en.json    # English
│       ├── ja.json    # Japanese
│       └── my.json    # Myanmar
├── utils/             # Utility functions
│   └── structuredDataHelpers.js
└── App.jsx            # Main app component

public/
├── sitemap.xml        # SEO sitemap
└── robots.txt         # Robots configuration
```

## Features

### User Features
- Browse Japanese language courses
- User registration and authentication
- Course enrollment
- Progress tracking
- Responsive design for mobile/tablet/desktop
- Multi-language support (English, Japanese, Myanmar)

### Admin Features
- Course management (CRUD)
- Category management
- Student enrollment overview
- Admin dashboard

### SEO Features
- Dynamic meta tags
- Structured data (JSON-LD)
- Sitemap generation
- Social media optimization

## Environment Variables

```env
VITE_API_URL=http://localhost:8000    # Backend API URL
```

## Styling

This project uses Tailwind CSS with a custom blue and white theme inspired by Japanese minimalism.

### Theme Colors
- Primary: Blue tones
- Background: White/Light gray
- Accent: Japanese-inspired elements

## Internationalization

The app supports multiple languages using i18next:

- English (en)
- Japanese (ja) - 日本語
- Myanmar (my) - မြန်မာ

Translation files are located in `src/i18n/locales/`.

To add a new language:
1. Create a new JSON file in `src/i18n/locales/`
2. Update `src/i18n/config.js`
3. Add the language option to the LanguageSwitcher component

## API Integration

The frontend communicates with the Laravel backend via REST API. API calls are made using Axios with authentication tokens stored in localStorage.

### Authentication Flow
1. User logs in via `/api/login`
2. Token stored in localStorage
3. Token sent in Authorization header for protected routes
4. Token cleared on logout

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Platforms

The frontend can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

For detailed deployment instructions, see [DEPLOYMENT.md](../DEPLOYMENT.md) in the root directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend
- Ensure backend server is running

### Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Authentication Issues
- Clear localStorage
- Check token expiration
- Verify API credentials

## Contributing

When working on the frontend:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading for routes
- Minification in production build
