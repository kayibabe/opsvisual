import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  subtitle?: string
  trend?: 'up' | 'down' | 'neutral'
  changePercent?: number
  icon?: React.ReactNode
}

export default function KPICard({ label, value, subtitle, trend, changePercent, icon }: KPICardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-600'
    if (trend === 'down') return 'text-red-600'
    return 'text-gray-400'
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue/30 transition">
      <div className="flex items-start justify-between mb-2">
        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
          {label}
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="text-2xl font-semibold text-gray-800 font-mono mb-1">
        {value}
      </div>
      {(subtitle || (trend && changePercent !== undefined)) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && changePercent !== undefined && (
            <span className={`flex items-center gap-1 ${getTrendColor()}`}>
              <TrendIcon size={14} />
              {Math.abs(changePercent).toFixed(1)}%
            </span>
          )}
          {subtitle && <span className="text-gray-400">{subtitle}</span>}
        </div>
      )}
    </div>
  )
}
