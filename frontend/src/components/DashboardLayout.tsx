import { Outlet, NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Droplets, 
  Users, 
  DollarSign, 
  Wrench, 
  FileText, 
  LogOut 
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'

const navigation = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Production & NRW', path: '/production', icon: Droplets },
  { name: 'Customers', path: '/customers', icon: Users },
  { name: 'Collections & Billing', path: '/collections', icon: DollarSign },
  { name: 'Breakdowns', path: '/breakdowns', icon: Wrench },
  { name: 'Reports', path: '/reports', icon: FileText },
]

export default function DashboardLayout() {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-300 flex items-center gap-3">
          <img src="/static/logo.png" alt="SRWB" className="w-9 h-9 rounded-full" />
          <div>
            <div className="text-sm font-semibold text-gray-800">SRWB Operations</div>
            <div className="text-xs text-gray-400">Dashboard</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition mb-1 ${
                  isActive
                    ? 'bg-blue/12 text-blue font-medium'
                    : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-gray-300">
          <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg mb-2">
            <div className="w-7 h-7 rounded-full bg-blue flex items-center justify-center text-white text-xs font-semibold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-800 truncate">{user?.username}</div>
              <div className="text-[10px] text-gray-400 capitalize">{user?.role || 'user'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-lg transition"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
