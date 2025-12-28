/**
 * A flexible content skeleton component that can be used for various loading states
 * @param {number} rows - Number of skeleton rows to display
 * @param {string} className - Additional CSS classes
 */
export default function ContentSkeleton({ rows = 3, className = '' }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-2">
          <div className="h-4 bg-base-300 rounded w-3/4"></div>
          <div className="h-4 bg-base-300 rounded w-full"></div>
          <div className="h-4 bg-base-300 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
}
