import { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  fullWidth?: boolean
}

export default function ChartCard({ title, subtitle, children, fullWidth }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-300 p-4 ${fullWidth ? 'col-span-full' : ''}`}>
      <div className="mb-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="h-[250px]">
        {children}
      </div>
    </div>
  )
}
