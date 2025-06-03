
export const PricingSkeletonLoader = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-purple-50/30 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 py-8 sm:py-12 lg:py-16">
        {/* Header skeleton */}
        <div className="text-center space-y-4 px-4">
          <div className="h-8 bg-gray-200 rounded-full w-64 mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-80 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>

        {/* Cards skeleton */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/90 rounded-xl p-6 space-y-4 border border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-32"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional sections skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/90 rounded-xl p-6 mx-4">
              <div className="h-6 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
              <div className="grid md:grid-cols-3 gap-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
