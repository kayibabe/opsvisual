export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-gray-300 border-t-blue rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading data...</p>
      </div>
    </div>
  )
}
