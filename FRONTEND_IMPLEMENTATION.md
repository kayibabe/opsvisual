# Modern Web/Mobile Frontend Implementation

## Overview

This document describes the implementation of a modern React + TypeScript frontend for the SRWB Operations Dashboard, designed to replace the single-page HTML dashboard with a responsive web/mobile application.

## Problem Statement

The existing dashboard (`app/static/index.html`) is a single HTML file that:
- Is difficult to maintain and extend
- Has limited mobile responsiveness
- Cannot be installed as a mobile app
- Lacks modern development tooling
- Makes it hard to add new features

## Solution

A modern frontend built with:
- **React 18** - Component-based architecture
- **TypeScript** - Type safety and better IDE support
- **Vite** - Fast development and optimized builds
- **Tailwind CSS** - Utility-first styling
- **PWA** - Installable mobile app capability

## Architecture

### Directory Structure

```
opsvisual/
├── frontend/                    # New React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── lib/                # Services and utilities
│   │   ├── store/              # State management
│   │   ├── types/              # TypeScript definitions
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
└── app/                         # Existing FastAPI backend
    ├── static/                  # Static assets
    │   └── dist/               # Built frontend (generated)
    ├── routers/
    └── main.py
```

### Key Components

1. **Authentication Layer**
   - JWT-based authentication via FastAPI
   - Zustand store for auth state
   - Protected routes
   - Auto-redirect on logout

2. **Dashboard Pages**
   - Overview: Key metrics across all zones
   - Production: Water production and NRW metrics
   - Customers: Active customers and connections
   - Collections: Revenue and billing performance
   - Breakdowns: Infrastructure issues
   - Reports: Downloadable reports

3. **Data Visualization**
   - KPI Cards with trend indicators
   - Interactive charts (Recharts library)
   - Monthly trends
   - Zone comparisons

4. **Mobile Support**
   - Responsive design (Tailwind CSS)
   - PWA manifest for installation
   - Service worker for offline capability
   - Touch-friendly interface

## Dashboard Panels Mapping

Based on the Excel dashboard image provided:

| Excel Panel | Frontend Page | KPIs Displayed |
|------------|--------------|----------------|
| CUSTOMERS | `/customers` | Active customers, postpaid, prepaid, new connections |
| NWCs | `/customers` | New water connections by type |
| PRODUCTION | `/production` | Volume produced, revenue water, NRW |
| RW & NRW | `/production` | Revenue water vs non-revenue water |
| WT & EI | `/production` | Water treatment metrics |
| STUCK | `/breakdowns` | Stuck meters by type |
| PIPELINES | `/breakdowns` | Pipe breakdowns by material |
| BREAKDOWNS | `/breakdowns` | Pipe and pump breakdowns |
| CONNECTIVITY | Overview | Supply hours, power usage |
| BILLED AMOUNT | `/collections` | Total billed by customer type |
| EXPENSES | `/collections` | Operating expenses |
| BILLS & COLLECTIONS | `/collections` | Billing vs collections |
| CHARGES | `/collections` | Service charges breakdown |
| DEBTORS | `/collections` | Outstanding balances |

## API Integration

The frontend communicates with existing FastAPI endpoints:

```typescript
// Authentication
POST /api/auth/login
  Body: { username, password }
  Returns: { access_token, user }

// Dashboard Data
GET /api/panels/overview
GET /api/panels/{panel_id}
GET /api/analytics/trend?metric={metric}
GET /api/analytics/zone-comparison?metric={metric}

// Catalogue
GET /api/catalogue/fiscal-years
GET /api/catalogue/zones

// Reports
GET /api/reports/summary
```

## State Management

Using Zustand for simple, performant state:

```typescript
// Auth Store
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

// Persisted to localStorage
useAuthStore.persist({
  name: 'srwb-auth-storage'
})
```

## Build Process

### Development

```bash
cd frontend
npm install
npm run dev  # Runs on :3000, proxies /api to :8000
```

### Production

```bash
cd frontend
npm run build  # Outputs to ../app/static/dist
```

The Vite build is configured to output to `../app/static/dist`, which FastAPI serves:

```python
# app/main.py
if os.path.isdir(os.path.join(STATIC_DIR, "dist")):
    app.mount("/", StaticFiles(directory=os.path.join(STATIC_DIR, "dist"), html=True), name="frontend")
```

## Mobile App (PWA)

The PWA manifest enables installation:

```json
{
  "name": "SRWB Operations Dashboard",
  "short_name": "SRWB Dashboard",
  "theme_color": "#1A8FD1",
  "background_color": "#07192E",
  "display": "standalone",
  "icons": [
    { "src": "pwa-192x192.png", "sizes": "192x192" },
    { "src": "pwa-512x512.png", "sizes": "512x512" }
  ]
}
```

Users can install the app on mobile devices via browser menu.

## Responsive Design

Tailwind CSS breakpoints:

- **Mobile** (<768px): Stacked layout, simplified navigation
- **Tablet** (768px-1024px): 2-column grids, side navigation
- **Desktop** (>1024px): Full sidebar, 4-column grids

Example:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <KPICard ... />
</div>
```

## Data Flow

1. User logs in → Token stored in Zustand + localStorage
2. Navigate to page → Page component mounts
3. useEffect calls dataService → API request with Bearer token
4. Data received → State updated → UI renders
5. Charts display monthly trends and comparisons

## Testing

```bash
# Run linter
npm run lint

# Build and preview
npm run build
npm run preview
```

## Deployment Checklist

- [ ] Install frontend dependencies: `cd frontend && npm install`
- [ ] Build frontend: `npm run build`
- [ ] Verify build output in `app/static/dist`
- [ ] Start backend: `uvicorn app.main:app --port 8000`
- [ ] Access dashboard: `http://localhost:8000`
- [ ] Test login with existing credentials
- [ ] Verify all pages load correctly
- [ ] Test on mobile device/browser
- [ ] Test PWA installation

## Migration Path

### Phase 1: Parallel Operation (Current)
- Old HTML dashboard at `/static/index.html`
- New React app at `/` (root)
- Both functional, users can choose

### Phase 2: User Testing
- Collect feedback on new dashboard
- Fix bugs and improve UX
- Train users on new interface

### Phase 3: Full Migration
- Remove old HTML dashboard
- Update documentation
- Deploy to production

## Benefits

1. **Maintainability**: Component-based architecture
2. **Type Safety**: TypeScript catches errors early
3. **Mobile Support**: Responsive + PWA
4. **Performance**: Vite's optimized builds
5. **Developer Experience**: Hot reload, debugging tools
6. **Scalability**: Easy to add new features/panels
7. **Modern UX**: Smooth interactions, better visuals

## Future Enhancements

- [ ] Real-time data updates (WebSockets)
- [ ] Data export functionality
- [ ] Advanced filtering and search
- [ ] Customizable dashboards
- [ ] Dark mode
- [ ] Push notifications for alerts
- [ ] Offline data caching
- [ ] Multi-language support

## Support

For questions or issues:
1. Check the frontend README
2. Review API documentation
3. Contact the development team
