import TableSkeleton from '@/components/TableSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="h-10 bg-base-300 rounded w-64 mb-6 animate-pulse"></div>

        {/* Back button + Job info skeleton */}
        <div className="card bg-base-100 shadow mb-6">
          <div className="card-body">
            <div className="h-10 bg-base-300 rounded w-96 mb-2 animate-pulse"></div>
            <div className="h-5 bg-base-300 rounded w-48 animate-pulse"></div>
          </div>
        </div>

        {/* Table skeleton */}
        <div className="card bg-base-100 shadow">
          <div className="card-body p-0">
            <TableSkeleton rows={8} columns={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
