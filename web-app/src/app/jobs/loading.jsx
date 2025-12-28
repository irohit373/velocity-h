import JobCardSkeleton from '@/components/JobCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 bg-base-300 rounded w-96 mx-auto mb-2 animate-pulse"></div>
          <div className="h-6 bg-base-300 rounded w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Search & Filters skeleton */}
        <div className="card bg-base-100 shadow mb-6">
          <div className="card-body p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="h-12 bg-base-300 rounded flex-1 animate-pulse"></div>
              <div className="h-12 w-32 bg-base-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Jobs Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
