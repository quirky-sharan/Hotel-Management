🔵 coco
A Premium Hotel Booking Experience

coco is a fully responsive hotel booking web application built with React, Vite, and Tailwind CSS, focused on clean UI, smooth UX, and real-world frontend features.

Search hotels, apply smart filters, view rich hotel details, save favorites, and book stays — all wrapped in a luxurious glassmorphism-inspired design ✨

🌍 Live Demo

🚀 Explore the app here:
👉 https://coco-flax.vercel.app

✨ Highlights

Modern premium UI with glassmorphism

Fully responsive (mobile → desktop)

Realistic authentication flow

Smooth animations & micro-interactions

Built as part of a GDG Frontend Task

🔐 Authentication & Session

JWT-style authentication (Demo / local auth)

Login & Signup flow

Session persistence using localStorage

Protected routes:

📖 My Bookings

❤️ Favorites

👤 Profile

🏨 Hotels Search & Listings

Search hotels by city / destination

Elegant hotel cards with hover effects

Grid / List layout toggle

Manual pagination using Load More

Skeleton loaders while content loads

🎛 Filtering & Sorting

Filter hotels using multiple parameters:

🔎 Filters

💰 Price range slider

⭐ Rating filter

🏷 Property type:

Hotel

Resort

Apartment

🧩 Amenities:

WiFi

Pool

Parking

AC

🔁 Sorting

Popularity

Rating

Price: Low → High

Price: High → Low

🛏 Hotel Details & Booking

Dynamic hotel details page

Booking form with:

Check-in / Check-out dates

Guests selection

Price breakdown

Booking confirmation

All booking data stored locally for demo purposes

📖 My Bookings

View all bookings in one place

Separate Upcoming and Past / Cancelled bookings

Cancel upcoming bookings

Premium card-based UI with smooth transitions

❤️ Favorites

Add or remove hotels from wishlist

Persistent favorites using localStorage

Dedicated Favorites page

🚀 UX Enhancements (Brownie Points 🧁)

Debounced search input

Lazy loading images

Recently viewed hotels

Mobile-friendly filter drawer

Dark / Light theme toggle

Animated success states

Password strength indicator

Remember last login email

🛠 Tech Stack

⚛️ Frontend: React (Vite)

🎨 Styling: Tailwind CSS

🧭 Routing: React Router DOM

🔐 Auth: Demo JWT-style authentication

💾 Storage: localStorage (auth, bookings, wishlist)

📁 Folder Structure
src/
 ├── components/        # Reusable UI components
 ├── context/           # AuthContext & providers
 ├── data/              # Mock hotel data
 ├── pages/             # Home, Hotels, Details, Login, Profile, Bookings
 ├── utils/             # Helpers (auth, wishlist, recently viewed)
 ├── App.jsx
 └── main.jsx

🧠 What I Learned

Building scalable React components

State management & protected routing

UX-first frontend design

Handling authentication & persistence

Writing clean, maintainable frontend code

🙌 Acknowledgements

This project was built as part of a GDG Frontend Task.
AI tools were used as an assistant, not as a replacement — every feature was understood, customized, and implemented intentionally.

⭐ Final Note

If you like the project or the UI/UX approach, feel free to ⭐ the repo or drop feedback.
Always open to learning and improving 🚀
