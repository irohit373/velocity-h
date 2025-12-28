export default function JobCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-lg animate-pulse">
      <div className="card-body">
        {/* Header skeleton */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-1/2"></div>
          </div>
          <div className="w-16 h-8 bg-base-300 rounded-full"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-base-300 rounded w-full"></div>
          <div className="h-3 bg-base-300 rounded w-5/6"></div>
          <div className="h-3 bg-base-300 rounded w-4/6"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-base-300 rounded-full w-16"></div>
          <div className="h-6 bg-base-300 rounded-full w-20"></div>
          <div className="h-6 bg-base-300 rounded-full w-14"></div>
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-base-300">
          <div className="flex gap-4">
            <div className="h-4 bg-base-300 rounded w-24"></div>
            <div className="h-4 bg-base-300 rounded w-20"></div>
          </div>
          <div className="h-10 bg-base-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}
