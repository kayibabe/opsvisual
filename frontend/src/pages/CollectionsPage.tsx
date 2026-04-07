import { useState, useEffect } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'
import KPICard from '../components/KPICard'
import ChartCard from '../components/ChartCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CollectionsPage() {
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
        dataService.getPanelData('collections'),
        dataService.getMonthlyTrend('collections')
      ])
      setData(panelData)
      setTrend(trendData)
    } catch (error) {
      console.error('Failed to load collections data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `${(value / 1000000000).toFixed(2)}B`
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`
    return value.toLocaleString()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Collections & Billing</h1>
        <p className="text-sm text-gray-400 mt-1">Revenue collection and billing performance</p>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Total Collections (MWK)"
          value={formatCurrency(data?.collected_total || 0)}
          trend={data?.trend}
          changePercent={data?.change_pct}
          icon={<DollarSign size={20} />}
        />
        <KPICard
          label="Postpaid Collections"
          value={formatCurrency(data?.collected_postpaid || 0)}
        />
        <KPICard
          label="Prepaid Collections"
          value={formatCurrency(data?.collected_prepaid || 0)}
        />
        <KPICard
          label="Collection Rate"
          value={`${data?.collection_rate?.toFixed(1) || '0'}%`}
          trend={data?.collection_rate > 85 ? 'up' : 'down'}
          icon={<TrendingUp size={20} />}
        />
      </div>

      {/* Billing KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard
          label="Total Billed (MWK)"
          value={formatCurrency(data?.billed_total || 0)}
        />
        <KPICard
          label="Postpaid Billed"
          value={formatCurrency(data?.billed_postpaid || 0)}
        />
        <KPICard
          label="Prepaid Billed"
          value={formatCurrency(data?.billed_prepaid || 0)}
        />
        <KPICard
          label="Uncollected (MWK)"
          value={formatCurrency((data?.billed_total - data?.collected_total) || 0)}
          subtitle="Outstanding"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="Collections vs Billing Trend" subtitle="Last 12 months" fullWidth>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="collected_total" stroke="#16a34a" strokeWidth={2} name="Collections" />
              <Line type="monotone" dataKey="billed_total" stroke="#1A8FD1" strokeWidth={2} name="Billed" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Collections by Type">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="collected_postpaid" fill="#1A8FD1" name="Postpaid" />
                <Bar dataKey="collected_prepaid" fill="#16a34a" name="Prepaid" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Collection Rate Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" domain={[0, 100]} />
                <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                <Line type="monotone" dataKey="collection_rate" stroke="#16a34a" strokeWidth={2} name="Collection Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  )
}
