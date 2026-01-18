import { useEffect, useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(stored);
  }, []);

  const cancelBooking = (bookingId) => {
    const updated = bookings.map((b) =>
      b.bookingId === bookingId ? { ...b, status: "CANCELLED" } : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const isPast = (checkOut) => {
    const today = new Date();
    const out = new Date(checkOut);
    return out < today;
  };

  const upcoming = bookings.filter(
    (b) => b.status !== "CANCELLED" && !isPast(b.checkOut)
  );
  const past = bookings.filter(
    (b) => isPast(b.checkOut) || b.status === "CANCELLED"
  );

  const renderCard = (b, isUpcoming) => (
    <div
      key={b.bookingId}
      className={`group flex flex-col md:flex-row gap-0
        rounded-2xl overflow-hidden
        border border-white/10
        bg-white/5 backdrop-blur-xl
        shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]
        ${!isUpcoming ? "opacity-80" : "hover:-translate-y-1"}
        transition-all duration-500`}
    >
      {/* IMAGE */}
      <div className="md:w-64 w-full h-48 md:h-auto shrink-0 overflow-hidden">
        <img
          src={b.image || FALLBACK_IMAGE}
          alt={b.hotelName}
          className="w-full h-full object-cover
            group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start gap-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {b.hotelName}
            </h3>
            <p className="text-sm text-white/60">
              {b.hotelLocation}
            </p>
            <p className="text-sm text-white/70 mt-3">
              {b.checkIn} → {b.checkOut} • {b.nights} night(s) •{" "}
              {b.guests} guest(s)
            </p>
          </div>

          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${
              b.status === "CANCELLED"
                ? "bg-red-500/15 text-red-300 border-red-500/30"
                : isUpcoming
                ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/30"
                : "bg-white/10 text-white/70 border-white/20"
            }`}
          >
            {b.status === "CANCELLED"
              ? "CANCELLED"
              : isUpcoming
              ? "CONFIRMED"
              : "COMPLETED"}
          </span>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg font-semibold text-[#7fb6ff]">
            Total: ₹{b.price?.total ?? 0}
          </p>

          {isUpcoming && (
            <button
              onClick={() => cancelBooking(b.bookingId)}
              className="px-5 py-2 rounded-xl
                bg-red-500/80 text-white
                hover:bg-red-500
                hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]
                transition-all"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 text-white">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">
          My Bookings
        </h1>
        <p className="mt-3 text-white/60">
          Manage your upcoming stays and review past experiences.
        </p>
      </div>

      {/* UPCOMING */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Upcoming</h2>

        {upcoming.length === 0 ? (
          <p className="text-white/50">No upcoming bookings.</p>
        ) : (
          <div className="space-y-6">
            {upcoming.map((b) => renderCard(b, true))}
          </div>
        )}
      </section>

      {/* PAST */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Past / Cancelled
        </h2>

        {past.length === 0 ? (
          <p className="text-white/50">No past bookings.</p>
        ) : (
          <div className="space-y-6">
            {past.map((b) => renderCard(b, false))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Bookings;
