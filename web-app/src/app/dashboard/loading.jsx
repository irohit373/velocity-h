import StatCardSkeleton from '@/components/StatCardSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="h-12 bg-base-300 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-5 bg-base-300 rounded w-96 animate-pulse"></div>
        </div>

        {/* Recruitment Stats Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-base-300 rounded w-64 animate-pulse"></div>
            <div className="h-9 w-32 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Applicant Stats Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-base-300 rounded w-64 animate-pulse"></div>
            <div className="h-9 w-32 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <StatCardSkeleton key={`applicant-${i}`} />
            ))}
          </div>
        </div>

        {/* Scheduling Stats Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="h-8 bg-base-300 rounded w-64 animate-pulse"></div>
            <div className="h-9 w-32 bg-base-300 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <StatCardSkeleton key={`scheduling-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
