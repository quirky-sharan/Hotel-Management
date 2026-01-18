import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hotels } from "../data/hotels";
import { calculateNights, calculatePrice } from "../utils/booking";
import { useAuth } from "../context/AuthContext";
import { addRecentlyViewed } from "../utils/recentlyViewed";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const hotel = hotels.find((h) => h.id === Number(id));

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hotel) addRecentlyViewed(hotel);
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold">Hotel not found</h1>
      </div>
    );
  }

  let nights = 0;
  let pricing = null;

  if (checkIn && checkOut) {
    nights = calculateNights(checkIn, checkOut);
    if (nights > 0) {
      pricing = calculatePrice(hotel.pricePerNight, nights);
    }
  }

  const handleBooking = () => {
    setError("");

    if (!user) {
      setError("Please login to book a hotel.");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }

    if (!pricing || nights <= 0) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const booking = {
      bookingId: Date.now(),
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      image: hotel.image,
      checkIn,
      checkOut,
      guests,
      nights,
      price: pricing,
      user: user.username || user.email,
      createdAt: new Date().toISOString(),
      status: "CONFIRMED",
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([booking, ...existing]));

    navigate("/bookings");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-xl overflow-hidden shadow-sm border dark:border-gray-800">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-80 object-cover"
          />
        </div>
        {/* ✅ Details Highlights Section */}
<div className="mt-6 grid md:grid-cols-3 gap-4">
  <div className="bg-white border rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">Check-in / Check-out</p>
    <p className="mt-1 font-semibold text-gray-900">12:00 PM · 11:00 AM</p>
    <p className="text-xs text-gray-500 mt-2">
      Early check-in subject to availability.
    </p>
  </div>

  <div className="bg-white border rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">Popular Amenities</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {(hotel.amenities || []).slice(0, 4).map((a) => (
        <span
          key={a}
          className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-800"
        >
          {a}
        </span>
      ))}
    </div>
    <p className="text-xs text-gray-500 mt-2">
      More amenities available on request.
    </p>
  </div>

  <div className="bg-white border rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">Cancellation</p>
    <p className="mt-1 font-semibold text-gray-900">Free cancellation</p>
    <p className="text-xs text-gray-500 mt-2">
      Cancel up to 24 hours before check-in.
    </p>
  </div>
</div>


        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {hotel.location}
          </p>

          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
              ⭐ {hotel.rating}
            </span>

            <span className="text-sm text-gray-600 dark:text-gray-300">
              ({hotel.reviews} reviews)
            </span>

            <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-700 dark:text-gray-200">
              {hotel.type}
            </span>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Price per night
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ₹{hotel.pricePerNight}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.map((a) => (
                <span
                  key={a}
                  className="text-sm px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Section */}
          <div className="mt-10 bg-gray-50 dark:bg-gray-900 p-5 rounded-xl border dark:border-gray-800">
            <h2 className="text-lg font-bold mb-4">Book your stay</h2>

            {error && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 px-4 py-3 rounded-lg">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full mt-1 border dark:border-gray-800 p-3 rounded-lg bg-white dark:bg-gray-950"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full mt-1 border dark:border-gray-800 p-3 rounded-lg bg-white dark:bg-gray-950"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  className="w-full mt-1 border dark:border-gray-800 p-3 rounded-lg bg-white dark:bg-gray-950"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Price Breakdown */}
            {pricing && nights > 0 ? (
              <div className="mt-6 bg-white dark:bg-gray-950 p-4 rounded-xl border dark:border-gray-800">
                <h3 className="font-bold mb-3">Price Breakdown</h3>

                <div className="text-sm text-gray-700 dark:text-gray-200 space-y-2">
                  <div className="flex justify-between">
                    <span>
                      Base Price ({nights} night{nights > 1 ? "s" : ""})
                    </span>
                    <span>₹{pricing.basePrice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes (12%)</span>
                    <span>₹{pricing.taxes}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Discount</span>
                    <span>- ₹{pricing.discount}</span>
                  </div>

                  <hr className="dark:border-gray-800" />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{pricing.total}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                Select valid check-in and check-out dates to view pricing.
              </p>
            )}

            <button
              className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition font-semibold"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
