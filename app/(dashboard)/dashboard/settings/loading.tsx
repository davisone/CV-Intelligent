export default function SettingsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-72 bg-gray-200 rounded" />
      </div>

      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border">
            <div className="h-6 w-24 bg-gray-200 rounded mb-4" />
            <div className="space-y-3">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}