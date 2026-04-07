import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { authService } from '../lib/authService'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login(username, password)
      login(response.access_token, response.user)
      navigate('/')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-navy">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-navy flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-100px] right-[-60px] w-[340px] h-[340px] border border-blue/10 rounded-full pointer-events-none" />
        <div className="absolute top-[-40px] right-[10px] w-[180px] h-[180px] border border-blue/16 rounded-full pointer-events-none" />
        
        <div className="relative z-10 text-center">
          <img src="/static/logo.png" alt="SRWB Logo" className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg shadow-blue/45" />
          <h1 className="text-3xl font-semibold text-blue-light mb-2">Southern Region Water Board</h1>
          <p className="text-white/90 text-2xl font-light mb-4">
            <span className="font-semibold">Operations & Performance</span> Dashboard
          </p>
          <p className="text-white/45 text-sm max-w-md mx-auto mb-8">
            Real-time monitoring of water production, customer metrics, collections and infrastructure across all service zones.
          </p>
          
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="bg-white/5 border border-white/8 rounded-lg p-3 hover:bg-white/8 transition">
              <div className="text-white font-mono text-lg font-medium">75,595</div>
              <div className="text-white/40 text-[9px] uppercase tracking-wider">Active Customers</div>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-lg p-3 hover:bg-white/8 transition">
              <div className="text-white font-mono text-lg font-medium">1.22M m³</div>
              <div className="text-white/40 text-[9px] uppercase tracking-wider">Monthly Production</div>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-lg p-3 hover:bg-white/8 transition">
              <div className="text-white font-mono text-lg font-medium">32%</div>
              <div className="text-white/40 text-[9px] uppercase tracking-wider">NRW Rate</div>
            </div>
            <div className="bg-white/5 border border-white/8 rounded-lg p-3 hover:bg-white/8 transition">
              <div className="text-white font-mono text-lg font-medium">MWK 1.91B</div>
              <div className="text-white/40 text-[9px] uppercase tracking-wider">Collections</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden text-center">
            <img src="/static/logo.png" alt="SRWB" className="w-16 h-16 rounded-full mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-gray-800">SRWB Operations</h2>
          </div>

          <div className="mb-6">
            <p className="text-xs font-semibold text-blue uppercase tracking-wider mb-2">Secure Access</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">Welcome back</h2>
            <p className="text-sm text-gray-400">Sign in with your SRWB credentials to continue.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue focus:ring-4 focus:ring-blue-glow outline-none transition"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue focus:ring-4 focus:ring-blue-glow outline-none transition"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue/90 active:scale-[0.99] transition shadow-lg shadow-blue/30 disabled:opacity-65 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-8 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
            SRWB Operations Dashboard v2.0<br />
            For authorized personnel only
          </p>
        </div>
      </div>
    </div>
  )
}
