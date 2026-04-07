export interface User {
  username: string
  role: 'admin' | 'user' | 'viewer'
  full_name?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface DashboardStats {
  customers: CustomerStats
  production: ProductionStats
  collections: CollectionStats
  breakdowns: BreakdownStats
}

export interface CustomerStats {
  active_total: number
  active_postpaid: number
  active_prepaid: number
  metered: number
  disconnected: number
  new_connections: number
  trend: 'up' | 'down' | 'neutral'
  change_pct: number
}

export interface ProductionStats {
  vol_produced: number
  vol_rw: number
  vol_nrw: number
  nrw_pct: number
  trend: 'up' | 'down' | 'neutral'
  change_pct: number
}

export interface CollectionStats {
  collected_total: number
  collected_postpaid: number
  collected_prepaid: number
  billed_total: number
  collection_rate: number
  trend: 'up' | 'down' | 'neutral'
  change_pct: number
}

export interface BreakdownStats {
  pipe_breakdowns: number
  pump_breakdowns: number
  stuck_meters: number
  supply_hours: number
  trend: 'up' | 'down' | 'neutral'
}

export interface MonthlyData {
  month: string
  year: number
  zone?: string
  scheme?: string
  [key: string]: any
}

export interface ZoneData {
  zone: string
  schemes: string[]
  stats: DashboardStats
}

export interface PanelData {
  id: string
  title: string
  subtitle?: string
  data: any
  chart_type?: 'line' | 'bar' | 'pie' | 'area'
}

export interface FiscalYear {
  id: string
  label: string
  start_year: number
  end_year: number
}
