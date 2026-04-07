import api from './api'
import { MonthlyData, ZoneData } from '../types'

export const dataService = {
  // Get overview statistics for current fiscal year
  async getOverview(fiscalYear?: string) {
    const params = fiscalYear ? { fiscal_year: fiscalYear } : {}
    const response = await api.get('/panels/overview', { params })
    return response.data
  },

  // Get detailed panel data
  async getPanelData(panelId: string, fiscalYear?: string) {
    const params = fiscalYear ? { fiscal_year: fiscalYear } : {}
    const response = await api.get(`/panels/${panelId}`, { params })
    return response.data
  },

  // Get all available fiscal years
  async getFiscalYears() {
    const response = await api.get('/catalogue/fiscal-years')
    return response.data
  },

  // Get all zones
  async getZones() {
    const response = await api.get('/catalogue/zones')
    return response.data
  },

  // Get monthly trend data
  async getMonthlyTrend(metric: string, fiscalYear?: string, zone?: string) {
    const params: any = { metric }
    if (fiscalYear) params.fiscal_year = fiscalYear
    if (zone) params.zone = zone
    const response = await api.get<MonthlyData[]>('/analytics/trend', { params })
    return response.data
  },

  // Get zone comparison data
  async getZoneComparison(metric: string, fiscalYear?: string) {
    const params: any = { metric }
    if (fiscalYear) params.fiscal_year = fiscalYear
    const response = await api.get<ZoneData[]>('/analytics/zone-comparison', { params })
    return response.data
  },

  // Get reports data
  async getReports(fiscalYear?: string, zone?: string) {
    const params: any = {}
    if (fiscalYear) params.fiscal_year = fiscalYear
    if (zone) params.zone = zone
    const response = await api.get('/reports/summary', { params })
    return response.data
  },
}
