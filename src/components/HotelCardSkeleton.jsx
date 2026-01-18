function HotelCardSkeleton({ view = "grid" }) {
  return (
    <div
      className={`rounded-xl shadow-sm overflow-hidden border animate-pulse
      bg-white dark:bg-gray-900 dark:border-gray-800 ${
        view === "list" ? "flex" : ""
      }`}
    >
      <div
        className={`bg-gray-200 dark:bg-gray-800 ${
          view === "list" ? "w-48 h-40" : "w-full h-48"
        }`}
      />

      <div className="p-4 flex-1 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />

        <div className="flex gap-2 flex-wrap">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-14" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-16" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-12" />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-32" />
          <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg w-28" />
        </div>
      </div>
    </div>
  );
}

export default HotelCardSkeleton;
