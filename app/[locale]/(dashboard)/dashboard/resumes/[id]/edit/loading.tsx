export default function EditResumeLoading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-8 w-8 bg-gray-200 rounded" />
        <div className="h-8 w-64 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border">
              <div className="h-5 w-32 bg-gray-200 rounded mb-4" />
              <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border h-[600px]" />
      </div>
    </div>
  )
}