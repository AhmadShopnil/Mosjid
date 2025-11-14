export default function SkeletonDescription() {
  return (
    <div className="animate-pulse">
      {/* title */}
      <div className="h-5 w-40 bg-gray-200 rounded mb-4"></div>

      {/* paragraph lines */}
      <div className="space-y-3">
        <div className="h-3 w-full bg-gray-200 rounded"></div>
        <div className="h-3 w-[95%] bg-gray-200 rounded"></div>
        <div className="h-3 w-[90%] bg-gray-200 rounded"></div>
        <div className="h-3 w-[80%] bg-gray-200 rounded"></div>
      </div>

      {/* bottom border social area skeleton */}
      <div className="border-t mt-8 pt-3 flex items-center gap-4">
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
