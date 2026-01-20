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

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (hotel) addRecentlyViewed(hotel);
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20 text-white">
        <h1 className="text-2xl font-semibold">Hotel not found</h1>
      </div>
    );
  }

  // 🔥 Auto-generated luxury gallery
  const gallery = [
    hotel.image,
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  ];

  let nights = 0;
  let pricing = null;

  if (checkIn && checkOut) {
    nights = calculateNights(checkIn, checkOut);
    if (nights > 0) pricing = calculatePrice(hotel.pricePerNight, nights);
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
    <div className="max-w-6xl mx-auto px-6 py-14 text-white">
      <div className="grid lg:grid-cols-2 gap-14">

        {/* ================= IMAGE GALLERY ================= */}
        <div>
          {/* Main Image */}
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]">
            <img
              src={gallery[activeImage]}
              alt="Hotel view"
              className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`flex-shrink-0 rounded-xl overflow-hidden border
                  ${
                    activeImage === i
                      ? "border-[#7fb6ff]"
                      : "border-white/10"
                  }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="w-24 h-20 object-cover hover:opacity-90 transition"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">
            {hotel.name}
          </h1>
          <p className="text-white/60 mt-3">{hotel.location}</p>

          <div className="mt-5 flex items-center gap-4 flex-wrap">
            <span className="text-sm px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30">
              ⭐ {hotel.rating}
            </span>
            <span className="text-sm text-white/50">
              ({hotel.reviews} reviews)
            </span>
            <span className="text-sm px-3 py-1 rounded-full bg-white/10 border border-white/15">
              {hotel.type}
            </span>
          </div>

          <div className="mt-8">
            <p className="text-white/50 text-sm">Price per night</p>
            <p className="text-4xl font-semibold text-[#7fb6ff]">
              ₹{hotel.pricePerNight}
            </p>
          </div>

          {/* Amenities */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {hotel.amenities.map((a) => (
                <span
                  key={a}
                  className="text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/15"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Booking Card */}
          <div className="mt-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
            <h2 className="text-xl font-semibold mb-5">
              Book your stay
            </h2>

            {error && (
              <div className="mb-4 text-sm text-red-300 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7fb6ff]"
              />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7fb6ff]"
              />
              <input
                type="number"
                min="1"
                max="10"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="bg-white/10 border border-white/20 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7fb6ff]"
              />
            </div>

            {pricing && nights > 0 && (
              <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-5">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBooking}
              className="mt-6 w-full py-4 rounded-2xl
                bg-[#7fb6ff]/90 text-black font-semibold
                hover:bg-[#9acbff]
                hover:shadow-[0_0_35px_rgba(127,182,255,0.5)]
                transition-all"
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
