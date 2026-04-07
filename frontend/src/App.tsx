import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import LoginPage from './pages/LoginPage'
import DashboardLayout from './components/DashboardLayout'
import OverviewPage from './pages/OverviewPage'
import ProductionPage from './pages/ProductionPage'
import CustomersPage from './pages/CustomersPage'
import CollectionsPage from './pages/CollectionsPage'
import BreakdownsPage from './pages/BreakdownsPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={<OverviewPage />} />
          <Route path="production" element={<ProductionPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="breakdowns" element={<BreakdownsPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
