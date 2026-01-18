function HotelCardSkeleton({ view = "grid" }) {
  return (
    <div
      className={`relative overflow-hidden
        rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_25px_60px_-30px_rgba(0,0,0,0.9)]
        animate-pulse
        ${view === "list" ? "flex" : ""}`}
    >
      {/* Image skeleton */}
      <div
        className={`relative overflow-hidden
          bg-white/10
          ${view === "list" ? "w-56 h-full" : "w-full h-56"}`}
      >
        {/* shimmer */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 space-y-4">
        <div className="h-5 rounded-lg bg-white/10 w-2/3" />
        <div className="h-4 rounded-lg bg-white/10 w-1/2" />

        {/* Amenities */}
        <div className="flex gap-2 flex-wrap pt-2">
          <div className="h-6 w-14 rounded-full bg-white/10" />
          <div className="h-6 w-16 rounded-full bg-white/10" />
          <div className="h-6 w-12 rounded-full bg-white/10" />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4">
          <div className="h-4 w-32 rounded-lg bg-white/10" />
          <div className="h-9 w-28 rounded-xl bg-white/15" />
        </div>
      </div>

      {/* Local shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

export default HotelCardSkeleton;
