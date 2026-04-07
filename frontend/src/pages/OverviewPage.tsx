import { useState, useEffect } from 'react'
import { Users, Droplets, DollarSign, Activity } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function OverviewPage() {
  const [loading, setLoading] = useState(true)
  const [overview, setOverview] = useState<any>(null)
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [overviewData, trendData] = await Promise.all([
        dataService.getOverview(),
        dataService.getMonthlyTrend('collections')
      ])
      setOverview(overviewData)
      setMonthlyTrend(trendData)
    } catch (error) {
      console.error('Failed to load overview:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Key performance indicators across all zones</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Active Customers"
          value={overview?.customers?.active_total?.toLocaleString() || '0'}
          trend={overview?.customers?.trend}
          changePercent={overview?.customers?.change_pct}
          icon={<Users size={20} />}
        />
        <KPICard
          label="Water Produced (m³)"
          value={overview?.production?.vol_produced?.toLocaleString() || '0'}
          subtitle="This month"
          icon={<Droplets size={20} />}
        />
        <KPICard
          label="NRW Rate"
          value={`${overview?.production?.nrw_pct?.toFixed(1) || '0'}%`}
          trend={overview?.production?.nrw_pct > 30 ? 'down' : 'up'}
          icon={<Activity size={20} />}
        />
        <KPICard
          label="Collections (MWK)"
          value={`${(overview?.collections?.collected_total / 1000000000)?.toFixed(2) || '0'}B`}
          trend={overview?.collections?.trend}
          changePercent={overview?.collections?.change_pct}
          icon={<DollarSign size={20} />}
        />
      </div>

      {/* Customer Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Postpaid Customers"
          value={overview?.customers?.active_postpaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="Prepaid Customers"
          value={overview?.customers?.active_prepaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="New Connections"
          value={overview?.customers?.new_connections?.toLocaleString() || '0'}
          subtitle="This month"
        />
        <KPICard
          label="Collection Rate"
          value={`${overview?.collections?.collection_rate?.toFixed(1) || '0'}%`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Collections Trend" subtitle="Last 12 months">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="collected_total" stroke="#1A8FD1" strokeWidth={2} name="Collections" />
              <Line type="monotone" dataKey="billed_total" stroke="#8FA3B8" strokeWidth={2} name="Billed" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Production vs NRW" subtitle="Monthly comparison">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="vol_produced" fill="#1A8FD1" name="Produced" />
              <Bar dataKey="vol_nrw" fill="#D94040" name="NRW" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
