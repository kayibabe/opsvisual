import { useState, useEffect } from 'react'
import { Users, UserPlus } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CustomersPage() {
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
        dataService.getPanelData('customers'),
        dataService.getMonthlyTrend('customers')
      ])
      setData(panelData)
      setTrend(trendData)
    } catch (error) {
      console.error('Failed to load customer data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customer Management</h1>
        <p className="text-sm text-gray-400 mt-1">Active customers and connection statistics</p>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Total Active Customers"
          value={data?.active_total?.toLocaleString() || '0'}
          trend={data?.trend}
          changePercent={data?.change_pct}
          icon={<Users size={20} />}
        />
        <KPICard
          label="Postpaid Customers"
          value={data?.active_postpaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="Prepaid Customers"
          value={data?.active_prepaid?.toLocaleString() || '0'}
        />
        <KPICard
          label="New Connections"
          value={data?.new_connections?.toLocaleString() || '0'}
          subtitle="This month"
          icon={<UserPlus size={20} />}
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        <KPICard
          label="Metered Customers"
          value={data?.metered?.toLocaleString() || '0'}
        />
        <KPICard
          label="Disconnected"
          value={data?.disconnected?.toLocaleString() || '0'}
        />
        <KPICard
          label="Individual (Post)"
          value={data?.post_ind?.toLocaleString() || '0'}
        />
        <KPICard
          label="Institutional (Post)"
          value={data?.post_inst?.toLocaleString() || '0'}
        />
        <KPICard
          label="Commercial (Post)"
          value={data?.post_com?.toLocaleString() || '0'}
        />
        <KPICard
          label="CWP"
          value={data?.prep_cwp?.toLocaleString() || '0'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Customer Growth Trend" subtitle="Last 12 months">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="active_total" stroke="#1A8FD1" strokeWidth={2} name="Total Active" />
              <Line type="monotone" dataKey="metered" stroke="#8FA3B8" strokeWidth={2} name="Metered" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Postpaid vs Prepaid" subtitle="Monthly comparison">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="active_postpaid" fill="#1A8FD1" name="Postpaid" />
              <Bar dataKey="active_prepaid" fill="#16a34a" name="Prepaid" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
