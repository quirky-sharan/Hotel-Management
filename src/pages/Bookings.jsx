import { useEffect, useState } from "react";

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
  const past = bookings.filter((b) => isPast(b.checkOut) || b.status === "CANCELLED");

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        View your upcoming and past bookings.
      </p>

      {/* Upcoming */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Upcoming</h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No upcoming bookings.</p>
        ) : (
          <div className="space-y-5">
            {upcoming.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden flex flex-col md:flex-row"
              >
                <img
                  src={b.image}
                  alt={b.hotelName}
                  className="w-full md:w-56 h-48 md:h-auto object-cover"
                />

                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{b.hotelName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {b.hotelLocation}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {b.checkIn} → {b.checkOut} • {b.nights} night(s) • {b.guests} guest(s)
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {b.status}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      Total: ₹{b.price.total}
                    </p>

                    <button
                      onClick={() => cancelBooking(b.bookingId)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Past */}
      <section>
        <h2 className="text-xl font-bold mb-4">Past / Cancelled</h2>

        {past.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No past bookings.</p>
        ) : (
          <div className="space-y-5">
            {past.map((b) => (
              <div
                key={b.bookingId}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden flex flex-col md:flex-row opacity-90"
              >
                <img
                  src={b.image}
                  alt={b.hotelName}
                  className="w-full md:w-56 h-48 md:h-auto object-cover"
                />

                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold">{b.hotelName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {b.hotelLocation}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {b.checkIn} → {b.checkOut} • {b.nights} night(s) • {b.guests} guest(s)
                      </p>
                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        b.status === "CANCELLED"
                          ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {b.status === "CANCELLED" ? "CANCELLED" : "COMPLETED"}
                    </span>
                  </div>

                  <p className="mt-4 text-lg font-bold text-blue-600 dark:text-blue-400">
                    Total: ₹{b.price.total}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Bookings;
