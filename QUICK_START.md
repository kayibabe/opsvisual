# SRWB Dashboard - Quick Start Guide

## 📦 What's Included

This package contains a complete React + TypeScript frontend for the SRWB Operations Dashboard.

```
srwb-dashboard-frontend/
├── frontend/                      # React application
│   ├── src/                      # Source code
│   ├── package.json              # Dependencies
│   ├── vite.config.ts            # Build configuration
│   └── README.md                 # Detailed documentation
└── FRONTEND_IMPLEMENTATION.md    # Architecture guide
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Extract the Package

```bash
# Extract the archive
tar -xzf srwb-dashboard-frontend.tar.gz
cd frontend
```

Or on Windows with 7-Zip/WinRAR, extract the `.tar.gz` file.

### Step 2: Install Dependencies

```bash
# Install Node.js dependencies
npm install
```

**Note**: Requires Node.js 18+ and npm. [Download Node.js](https://nodejs.org/)

### Step 3: Start Development Server

```bash
npm run dev
```

The dashboard will open at: **http://localhost:3000**

### Step 4: Start Backend (Separate Terminal)

```bash
# Navigate to your opsvisual backend directory
cd path/to/opsvisual

# Start FastAPI backend
uvicorn app.main:app --reload --port 8000
```

### Step 5: Login and Test

1. Open http://localhost:3000
2. Login with your credentials (default: admin/admin123)
3. Explore the dashboard panels

## 📋 Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Backend API** running on port 8000

Check versions:
```bash
node --version   # Should be v18 or higher
npm --version    # Should be 9 or higher
```

## 🏗️ Production Build

To build for production:

```bash
cd frontend
npm run build
```

Output goes to: `../app/static/dist`

The FastAPI backend will automatically serve the built files.

## 📱 Mobile App (PWA)

After building, the dashboard can be installed as a mobile app:

1. Open the dashboard on mobile browser
2. Tap "Add to Home Screen" in browser menu
3. Icon appears on home screen
4. Works offline with cached data

## 🎨 Dashboard Features

### Available Pages

1. **Overview** - `/` 
   - Key metrics across all zones
   - Active customers, production, NRW, collections

2. **Production & NRW** - `/production`
   - Water production metrics
   - Revenue water vs non-revenue water
   - Supply hours

3. **Customers** - `/customers`
   - Active customers breakdown
   - New connections
   - Growth trends

4. **Collections & Billing** - `/collections`
   - Revenue collection
   - Billing performance
   - Collection rate

5. **Breakdowns** - `/breakdowns`
   - Pipe breakdowns by type
   - Pump failures
   - Stuck meters

6. **Reports** - `/reports`
   - Downloadable reports
   - Performance summaries

### Interactive Features

✅ Responsive design (works on all devices)
✅ Interactive charts with Recharts
✅ Real-time data from Excel uploads
✅ Role-based access control
✅ Dark sidebar navigation
✅ KPI cards with trend indicators

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is busy, Vite will use the next available port (3001, 3002, etc.)

### Cannot Connect to API

Ensure backend is running:
```bash
curl http://localhost:8000/api/catalogue/fiscal-years
```

### Build Errors

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📖 Additional Documentation

- **Frontend README**: `frontend/README.md` - Detailed setup and usage
- **Implementation Guide**: `FRONTEND_IMPLEMENTATION.md` - Architecture and design
- **Backend Integration**: See existing opsvisual backend documentation

## 🎯 What's Implemented

All 14 dashboard panels from the Excel template:

| Excel Panel | Frontend Page | Status |
|------------|---------------|--------|
| CUSTOMERS | `/customers` | ✅ Complete |
| NWCs | `/customers` | ✅ Complete |
| PRODUCTION | `/production` | ✅ Complete |
| RW & NRW | `/production` | ✅ Complete |
| WT & EI | `/production` | ✅ Complete |
| STUCK | `/breakdowns` | ✅ Complete |
| PIPELINES | `/breakdowns` | ✅ Complete |
| BREAKDOWNS | `/breakdowns` | ✅ Complete |
| CONNECTIVITY | `/` (Overview) | ✅ Complete |
| BILLED AMOUNT | `/collections` | ✅ Complete |
| EXPENSES | `/collections` | ✅ Complete |
| BILLS & COLLECTIONS | `/collections` | ✅ Complete |
| CHARGES | `/collections` | ✅ Complete |
| DEBTORS | `/collections` | ✅ Complete |

## 💡 Tips

1. **Development**: Use `npm run dev` for hot reload during development
2. **Production**: Always run `npm run build` before deploying
3. **Updates**: Pull latest changes from Git and run `npm install`
4. **Testing**: Test on multiple devices (desktop, tablet, mobile)

## 🆘 Support

For issues or questions:
1. Check the detailed README: `frontend/README.md`
2. Review implementation guide: `FRONTEND_IMPLEMENTATION.md`
3. Check the GitHub PR for updates
4. Contact the development team

## 🔐 Security Notes

- Never commit `node_modules/` to Git
- Keep dependencies updated: `npm update`
- Use environment variables for sensitive data
- Backend handles authentication via JWT tokens

## 🚀 Next Steps

1. **Install and test** the application
2. **Review the UI/UX** and provide feedback
3. **Test with real data** from monthly Excel uploads
4. **Deploy to production** when ready
5. **Train users** on the new interface

---

**Ready to get started?**

```bash
cd frontend
npm install
npm run dev
```

Then open http://localhost:3000 and login!
