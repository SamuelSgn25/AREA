# AREA Platform - Web Frontend

## Overview

React + TypeScript web client for the AREA automation platform.

### Features

- ✅ Modern React 18 with Hooks
- ✅ TypeScript for type safety
- ✅ React Router v6 for navigation
- ✅ TailwindCSS for styling
- ✅ Responsive design (mobile-first)
- ✅ Vite for fast development
- ✅ API client with interceptors
- ✅ Testing with Vitest

## Quick Start

```bash
cd web

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development
npm run dev

# Access at http://localhost:3000
```

## Project Structure

```
web/
├── src/
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Services.tsx
│   │   ├── Workflows.tsx
│   │   └── Profile.tsx
│   ├── components/          # Reusable components
│   ├── services/            # API client
│   ├── hooks/               # Custom hooks
│   ├── utils/               # Utility functions
│   ├── App.css
│   └── index.css
├── public/                  # Static files
├── index.html               # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Environment Variables

```
VITE_API_URL=http://localhost:5000/api
```

## Components

Each component should follow this structure:

```typescript
interface Props {
  // Props definition
}

interface State {
  // State if needed
}

const Component: React.FC<Props> = ({ prop }) => {
  return <div>{prop}</div>;
};

export default Component;
```

## Styling

We use TailwindCSS. Add classes directly in JSX:

```tsx
<div className="px-4 py-2 bg-blue-500 text-white rounded">
  Button
</div>
```

## Deployment

```bash
# Build
npm run build

# Output is in build/ directory

# Deploy to Netlify/Vercel
# - Connect repository
# - Set build command: npm run build
# - Set publish directory: build
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT - See [LICENSE](../LICENSE)
