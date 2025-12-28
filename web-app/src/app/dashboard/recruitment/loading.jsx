import TableSkeleton from '@/components/TableSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="container max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="h-10 bg-base-300 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-5 bg-base-300 rounded w-96 animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-base-300 rounded animate-pulse"></div>
        </div>

        {/* Table skeleton */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <TableSkeleton rows={8} columns={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
