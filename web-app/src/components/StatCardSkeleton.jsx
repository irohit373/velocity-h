export default function StatCardSkeleton() {
  return (
    <div className="stat bg-base-100 rounded-lg shadow animate-pulse">
      <div className="stat-figure">
        <div className="w-8 h-8 bg-base-300 rounded-full"></div>
      </div>
      <div className="stat-title">
        <div className="h-4 bg-base-300 rounded w-24 mb-2"></div>
      </div>
      <div className="stat-value">
        <div className="h-10 bg-base-300 rounded w-16"></div>
      </div>
      <div className="stat-desc mt-2">
        <div className="h-3 bg-base-300 rounded w-32"></div>
      </div>
    </div>
  );
}
