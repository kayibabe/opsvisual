import { useState, useEffect } from 'react'
import { Droplets, TrendingDown } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ProductionPage() {
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
        dataService.getPanelData('production'),
        dataService.getMonthlyTrend('production')
      ])
      setData(panelData)
      setTrend(trendData)
    } catch (error) {
      console.error('Failed to load production data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Production & NRW</h1>
        <p className="text-sm text-gray-400 mt-1">Water production and non-revenue water metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Volume Produced (m³)"
          value={data?.vol_produced?.toLocaleString() || '0'}
          subtitle="This month"
          icon={<Droplets size={20} />}
        />
        <KPICard
          label="Revenue Water (m³)"
          value={data?.vol_rw?.toLocaleString() || '0'}
          subtitle="Billed water"
        />
        <KPICard
          label="Non-Revenue Water (m³)"
          value={data?.vol_nrw?.toLocaleString() || '0'}
          icon={<TrendingDown size={20} className="text-red-500" />}
        />
        <KPICard
          label="NRW Percentage"
          value={`${data?.nrw_pct?.toFixed(1) || '0'}%`}
          trend={data?.nrw_pct > 30 ? 'down' : 'up'}
          subtitle="Target: <25%"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <KPICard
          label="Postpaid Billed (m³)"
          value={data?.vol_billed_postpaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="Prepaid Billed (m³)"
          value={data?.vol_billed_prepaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="Supply Hours"
          value={data?.supply_hours?.toFixed(1) || '0'}
          subtitle="Avg per day"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Production Trend" subtitle="Last 12 months" fullWidth>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="vol_produced" stackId="1" stroke="#1A8FD1" fill="#1A8FD1" fillOpacity={0.6} name="Produced" />
              <Area type="monotone" dataKey="vol_rw" stackId="2" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} name="Revenue Water" />
              <Area type="monotone" dataKey="vol_nrw" stackId="2" stroke="#dc2626" fill="#dc2626" fillOpacity={0.6} name="NRW" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="NRW Percentage Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip />
                <Line type="monotone" dataKey="nrw_pct" stroke="#dc2626" strokeWidth={2} name="NRW %" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue Water vs NRW">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="vol_rw" stroke="#16a34a" strokeWidth={2} name="Revenue Water" />
                <Line type="monotone" dataKey="vol_nrw" stroke="#dc2626" strokeWidth={2} name="NRW" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
