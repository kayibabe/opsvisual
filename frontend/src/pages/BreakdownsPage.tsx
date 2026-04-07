import { useState, useEffect } from 'react'
import { Wrench, Zap } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function BreakdownsPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [trend, setTrend] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [panelData, trendData] = await Promise.all([
        dataService.getPanelData('breakdowns'),
        dataService.getMonthlyTrend('breakdowns')
      ])
      setData(panelData)
      setTrend(trendData)
    } catch (error) {
      console.error('Failed to load breakdowns data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Breakdowns & Infrastructure</h1>
        <p className="text-sm text-gray-400 mt-1">Pipe breakdowns, pump failures, and stuck meters</p>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Total Pipe Breakdowns"
          value={data?.pipe_breakdowns?.toLocaleString() || '0'}
          subtitle="This month"
          icon={<Wrench size={20} />}
          trend={data?.pipe_breakdowns > 50 ? 'down' : 'up'}
        />
        <KPICard
          label="Pump Breakdowns"
          value={data?.pump_breakdowns?.toLocaleString() || '0'}
          icon={<Zap size={20} />}
        />
        <KPICard
          label="Stuck Meters"
          value={data?.stuck_meters?.toLocaleString() || '0'}
          subtitle="Requires attention"
        />
        <KPICard
          label="Supply Hours"
          value={data?.supply_hours?.toFixed(1) || '0'}
          subtitle="Avg per day"
        />
      </div>

      {/* Pipe Breakdown Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="PVC Breakdowns"
          value={data?.pvc_breakdowns?.toLocaleString() || '0'}
        />
        <KPICard
          label="GI Breakdowns"
          value={data?.gi_breakdowns?.toLocaleString() || '0'}
        />
        <KPICard
          label="DI Breakdowns"
          value={data?.di_breakdowns?.toLocaleString() || '0'}
        />
        <KPICard
          label="HDPE/AC Breakdowns"
          value={data?.hdpe_ac_breakdowns?.toLocaleString() || '0'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Breakdown Trends" subtitle="Last 12 months" fullWidth>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="pipe_breakdowns" stroke="#dc2626" strokeWidth={2} name="Pipe Breakdowns" />
              <Line type="monotone" dataKey="pump_breakdowns" stroke="#ea580c" strokeWidth={2} name="Pump Breakdowns" />
              <Line type="monotone" dataKey="stuck_meters" stroke="#ca8a04" strokeWidth={2} name="Stuck Meters" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Pipe Breakdowns by Type">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="pvc_breakdowns" fill="#1A8FD1" name="PVC" />
                <Bar dataKey="gi_breakdowns" fill="#16a34a" name="GI" />
                <Bar dataKey="di_breakdowns" fill="#ea580c" name="DI" />
                <Bar dataKey="hdpe_ac_breakdowns" fill="#8b5cf6" name="HDPE/AC" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Supply Hours Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[0, 24]} />
                <Tooltip />
                <Line type="monotone" dataKey="supply_hours" stroke="#16a34a" strokeWidth={2} name="Supply Hours" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
