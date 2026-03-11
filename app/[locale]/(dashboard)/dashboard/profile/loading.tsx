export default function ProfileLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-8">
        <div className="h-8 w-40 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-80 bg-gray-200 rounded" />
      </div>

      <div className="space-y-6">
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
    </div>
  )
}