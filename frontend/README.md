# SRWB Operations Dashboard - Frontend

Modern React + TypeScript web/mobile application for the Southern Region Water Board Operations Dashboard.

## Features

- **Modern UI**: Built with React 18 and TypeScript
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **PWA Support**: Installable as a mobile app
- **Real-time Data**: Pulls monthly data from Excel files via FastAPI backend
- **Interactive Charts**: Visualize KPIs with Recharts
- **Role-based Access**: Admin, user, and viewer roles

## Dashboard Panels

Based on the Excel dashboard, the app includes:

1. **Overview** - Key metrics across all zones
2. **Production & NRW** - Water production and non-revenue water metrics
3. **Customers** - Active customers, connections, and growth trends
4. **Collections & Billing** - Revenue collection and billing performance
5. **Breakdowns** - Pipe breakdowns, pump failures, stuck meters
6. **Reports** - Downloadable performance reports

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: Zustand
- **Routing**: React Router
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **PWA**: Vite PWA Plugin

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the app
npm run build

# The output will be in ../app/static/dist
# This integrates with the FastAPI backend
```

### Running the Full Stack

From the project root:

```bash
# Terminal 1: Start backend API
uvicorn app.main:app --reload --port 8000

# Terminal 2: Start frontend dev server
cd frontend && npm run dev
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── DashboardLayout.tsx
│   │   ├── KPICard.tsx
│   │   ├── ChartCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── pages/           # Page components
│   │   ├── LoginPage.tsx
│   │   ├── OverviewPage.tsx
│   │   ├── ProductionPage.tsx
│   │   ├── CustomersPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── BreakdownsPage.tsx
│   │   └── ReportsPage.tsx
│   ├── lib/             # Utilities and services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   └── dataService.ts
│   ├── store/           # State management
│   │   └── authStore.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## API Integration

The frontend communicates with the FastAPI backend at `/api`:

- `POST /api/auth/login` - User authentication
- `GET /api/panels/overview` - Dashboard overview data
- `GET /api/panels/{panel_id}` - Specific panel data
- `GET /api/analytics/trend` - Monthly trend data
- `GET /api/reports/summary` - Reports data

All protected endpoints require a Bearer token obtained from login.

## Mobile App (PWA)

The dashboard can be installed as a mobile app:

1. Open the dashboard in a mobile browser
2. Tap "Add to Home Screen" or "Install App"
3. The app will work offline with cached data

## Environment Configuration

The frontend proxies API requests to the backend. To change the API URL:

Edit `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://your-backend-url:8000',
      changeOrigin: true
    }
  }
}
```

## Authentication

Default credentials (for development):
- Username: `admin`
- Password: `admin123`

In production, create users via the admin panel or backend API.

## Deployment

The build output is configured to be served by the FastAPI backend:

1. Build the frontend: `npm run build`
2. Files are placed in `../app/static/dist`
3. FastAPI serves these as static files
4. Access the app at `http://localhost:8000`

## Mobile Responsiveness

The dashboard is fully responsive with:
- Sidebar navigation on desktop
- Hamburger menu on mobile (can be added)
- Adaptive layouts for all screen sizes
- Touch-friendly interface
- Mobile-optimized charts

## Development

```bash
# Install dependencies
npm install

# Run dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Lint code
npm run lint
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test on both desktop and mobile
4. Submit a pull request

## License

Internal use - Southern Region Water Board
