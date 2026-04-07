import { useState, useEffect } from 'react'
import { FileText, Download } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import { dataService } from '../lib/dataService'

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [reports, setReports] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const data = await dataService.getReports()
      setReports(data)
    } catch (error) {
      console.error('Failed to load reports:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
        <p className="text-sm text-gray-400 mt-1">Generate and download performance reports</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-300 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-blue" size={24} />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Available Reports</h2>
            <p className="text-sm text-gray-400">Download comprehensive performance reports</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <h3 className="font-medium text-gray-800">Monthly Operations Summary</h3>
              <p className="text-sm text-gray-400">Comprehensive overview of all operations</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition">
              <Download size={16} />
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <h3 className="font-medium text-gray-800">Customer Analytics Report</h3>
              <p className="text-sm text-gray-400">Detailed customer metrics and trends</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition">
              <Download size={16} />
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <h3 className="font-medium text-gray-800">Collections Performance</h3>
              <p className="text-sm text-gray-400">Revenue collection and billing analysis</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition">
              <Download size={16} />
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <h3 className="font-medium text-gray-800">Infrastructure & Breakdowns</h3>
              <p className="text-sm text-gray-400">Maintenance and breakdown statistics</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition">
              <Download size={16} />
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <div>
              <h3 className="font-medium text-gray-800">NRW Analysis Report</h3>
              <p className="text-sm text-gray-400">Non-revenue water detailed analysis</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/90 transition">
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue/5 border border-blue/20 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Reports are generated based on the latest available data from the RawData Excel file. 
          Make sure to upload the latest monthly data for accurate reporting.
        </p>
      </div>
    </div>
  )
}
